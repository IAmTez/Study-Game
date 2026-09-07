/* Procedural sewer floor generation.

   Rooms are placed by rejection sampling, connected with L-shaped corridors,
   then dressed with water channels, grates, rubble and wall torches. Every
   floor is derived from a seed so the same floor of the same run regenerates
   identically after a reload. */

import { makeRng } from '../core/rng.js';
import { enemiesForFloor, bossForFloor, bossLoop } from '../data/enemies.js';

export const MAP_W = 46;
export const MAP_H = 32;

export const WALKABLE = new Set(['floor', 'stairs', 'chest', 'chest_open', 'altar', 'grate', 'bones']);

export function isBossFloor(floor) {
  return floor > 0 && floor % 10 === 0;
}

/* ---------------------------------------------------------------
   Enemy instances
   --------------------------------------------------------------- */

export function scaleEnemy(template, floor, rng, { isBoss = false } = {}) {
  const growth = 1 + (floor - 1) * 0.155;
  // Beyond floor 20 the curve steepens so late floors stay threatening.
  const lateSpike = Math.pow(1.035, Math.max(0, floor - 20));
  const loops = isBoss ? bossLoop(floor) : 0;
  const loopBonus = 1 + loops * 0.45;

  const maxHp = Math.round(26 * template.hp * growth * lateSpike * loopBonus);
  const atk = Math.round(6.5 * template.atk * Math.pow(growth, 0.94) * lateSpike * (1 + loops * 0.2));
  const def = Math.round(2.2 * template.def * Math.pow(growth, 0.8) * (1 + loops * 0.15));
  const xp = Math.round(13 * template.xp * Math.pow(growth, 0.88) * loopBonus);

  return {
    uid: `${template.id}-${rng.int(1000, 999999)}`,
    template,
    name: loops > 0 && isBoss ? `${template.name} (Echo ${loops + 1})` : template.name,
    sprite: template.sprite,
    maxHp,
    hp: maxHp,
    atk: Math.max(2, atk),
    def: Math.max(0, def),
    xp: Math.max(4, xp),
    traits: template.traits || [],
    flavour: template.flavour,
    taunt: template.taunt,
    isBoss,
    statuses: {},
    x: 0,
    y: 0
  };
}

/* ---------------------------------------------------------------
   Map generation
   --------------------------------------------------------------- */

function blankGrid() {
  return Array.from({ length: MAP_H }, () => new Array(MAP_W).fill('wall'));
}

function carveRoom(tiles, room) {
  for (let y = room.y; y < room.y + room.h; y++) {
    for (let x = room.x; x < room.x + room.w; x++) {
      tiles[y][x] = 'floor';
    }
  }
}

function carveCorridor(tiles, ax, ay, bx, by, rng) {
  const horizontalFirst = rng.chance(0.5);
  const stepX = () => {
    const [from, to] = ax < bx ? [ax, bx] : [bx, ax];
    for (let x = from; x <= to; x++) {
      const row = horizontalFirst ? ay : by;
      if (tiles[row][x] === 'wall') tiles[row][x] = 'floor';
    }
  };
  const stepY = () => {
    const [from, to] = ay < by ? [ay, by] : [by, ay];
    for (let y = from; y <= to; y++) {
      const col = horizontalFirst ? bx : ax;
      if (tiles[y][col] === 'wall') tiles[y][col] = 'floor';
    }
  };
  if (horizontalFirst) { stepX(); stepY(); } else { stepY(); stepX(); }
}

function roomsOverlap(a, b, padding = 1) {
  return a.x - padding < b.x + b.w
    && a.x + a.w + padding > b.x
    && a.y - padding < b.y + b.h
    && a.y + a.h + padding > b.y;
}

function neighbours(x, y) {
  return [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
}

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < MAP_W && y < MAP_H;
}

/**
 * Dress the carved floor with sewer detail.
 *
 * Anything that blocks movement (water, rubble) is placed through
 * `placeBlocking`, which reverts the tile if it would cut any part of the
 * floor off from the player's start. A neighbour-count heuristic is not
 * enough here — a single rubble tile on a corridor's only cut vertex will
 * strand half the map.
 */
function decorate(tiles, rooms, rng, floor, start) {
  const walkableCount = () => reachableFrom(tiles, start.x, start.y).size;
  let reachable = walkableCount();

  /** Set a blocking tile only if the map stays fully connected. */
  const placeBlocking = (x, y, type) => {
    const previous = tiles[y][x];
    if (!WALKABLE.has(previous)) return false;
    if (x === start.x && y === start.y) return false;
    tiles[y][x] = type;
    const after = walkableCount();
    if (after !== reachable - 1) {   // lost more than just this tile
      tiles[y][x] = previous;
      return false;
    }
    reachable = after;
    return true;
  };

  // Water channels: a strip through some rooms, always leaving a dry path.
  for (const room of rooms) {
    if (room.h < 5 || !rng.chance(0.35)) continue;
    const channelY = room.y + Math.floor(room.h / 2);
    for (let x = room.x; x < room.x + room.w; x++) {
      // Leave a crossing so the room never becomes impassable.
      if (x === room.x + Math.floor(room.w / 2)) continue;
      placeBlocking(x, channelY, 'water');
    }
  }

  // Grates, rubble and bones scattered on floor tiles.
  const scatter = (type, count, blocking) => {
    let placed = 0;
    let attempts = 0;
    while (placed < count && attempts < count * 30) {
      attempts++;
      const x = rng.int(1, MAP_W - 2);
      const y = rng.int(1, MAP_H - 2);
      if (tiles[y][x] !== 'floor') continue;
      if (blocking) {
        if (placeBlocking(x, y, type)) placed++;
        continue;
      }
      tiles[y][x] = type;
      placed++;
    }
  };

  scatter('grate', rng.int(3, 6), false);
  scatter('bones', rng.int(2, 5), false);
  scatter('rubble', rng.int(2, 4), true);

  // Wall torches and pipes: purely visual variants of wall tiles.
  for (let i = 0; i < 26 + floor; i++) {
    const x = rng.int(1, MAP_W - 2);
    const y = rng.int(1, MAP_H - 2);
    if (tiles[y][x] !== 'wall') continue;
    const touchesFloor = neighbours(x, y).some(([nx, ny]) => inBounds(nx, ny) && tiles[ny][nx] === 'floor');
    if (!touchesFloor) continue;
    tiles[y][x] = rng.chance(0.45) ? 'torch' : 'wall_pipe';
  }
}

/** Flood fill from the start so we can guarantee everything is reachable. */
function reachableFrom(tiles, sx, sy) {
  const seen = new Set([`${sx},${sy}`]);
  const queue = [[sx, sy]];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [nx, ny] of neighbours(x, y)) {
      const key = `${nx},${ny}`;
      if (!inBounds(nx, ny) || seen.has(key)) continue;
      if (!WALKABLE.has(tiles[ny][nx])) continue;
      seen.add(key);
      queue.push([nx, ny]);
    }
  }
  return seen;
}

/** Carve corridors from any floor tile the player cannot reach back to start. */
function connectOrphans(tiles, start, rng) {
  for (let guard = 0; guard < 20; guard++) {
    const reachable = reachableFrom(tiles, start.x, start.y);
    let orphan = null;
    for (let y = 0; y < MAP_H && !orphan; y++) {
      for (let x = 0; x < MAP_W; x++) {
        if (tiles[y][x] === 'floor' && !reachable.has(`${x},${y}`)) { orphan = { x, y }; break; }
      }
    }
    if (!orphan) return;
    carveCorridor(tiles, orphan.x, orphan.y, start.x, start.y, rng);
  }
}

export function generateFloor(seedBase, floor) {
  const rng = makeRng(`${seedBase}:floor:${floor}`);
  const boss = isBossFloor(floor);
  const tiles = blankGrid();
  const rooms = [];

  if (boss) {
    // Boss floors are a single arena with an antechamber.
    const arena = { x: 12, y: 6, w: 22, h: 18 };
    const entry = { x: 4, y: 13, w: 7, h: 6 };
    carveRoom(tiles, arena);
    carveRoom(tiles, entry);
    carveCorridor(tiles, entry.x + 3, entry.y + 3, arena.x + 3, arena.y + 9, rng);
    rooms.push(entry, arena);
  } else {
    const targetRooms = Math.min(11, 6 + Math.floor(floor / 6));
    let attempts = 0;
    while (rooms.length < targetRooms && attempts < 400) {
      attempts++;
      const w = rng.int(5, 11);
      const h = rng.int(4, 8);
      const room = {
        x: rng.int(1, MAP_W - w - 2),
        y: rng.int(1, MAP_H - h - 2),
        w, h
      };
      if (rooms.some(other => roomsOverlap(room, other))) continue;
      rooms.push(room);
    }
    rooms.forEach(carveRoom.bind(null, tiles));
    for (let i = 1; i < rooms.length; i++) {
      const a = rooms[i - 1];
      const b = rooms[i];
      carveCorridor(
        tiles,
        a.x + Math.floor(a.w / 2), a.y + Math.floor(a.h / 2),
        b.x + Math.floor(b.w / 2), b.y + Math.floor(b.h / 2),
        rng,
      );
    }
    // One extra loop connection so floors are not pure trees.
    if (rooms.length > 3) {
      const a = rng.pick(rooms);
      const b = rng.pick(rooms);
      if (a !== b) {
        carveCorridor(
          tiles,
          a.x + Math.floor(a.w / 2), a.y + Math.floor(a.h / 2),
          b.x + Math.floor(b.w / 2), b.y + Math.floor(b.h / 2),
          rng,
        );
      }
    }
  }

  const startRoom = rooms[0];
  const start = {
    x: startRoom.x + Math.floor(startRoom.w / 2),
    y: startRoom.y + Math.floor(startRoom.h / 2)
  };
  tiles[start.y][start.x] = 'floor';

  // Corridor carving can still leave a room stranded (an overlapping corridor
  // may be consumed by a later room). Splice any orphan back in before we
  // decorate, so the floor is guaranteed fully walkable.
  connectOrphans(tiles, start, rng);

  decorate(tiles, rooms, rng, floor, start);

  const reachable = reachableFrom(tiles, start.x, start.y);
  const freeTiles = [];
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (tiles[y][x] === 'floor' && reachable.has(`${x},${y}`)) freeTiles.push({ x, y });
    }
  }

  const farFromStart = freeTiles
    .filter(t => Math.abs(t.x - start.x) + Math.abs(t.y - start.y) > (boss ? 8 : 16))
    .sort((a, b) => (Math.abs(b.x - start.x) + Math.abs(b.y - start.y)) - (Math.abs(a.x - start.x) + Math.abs(a.y - start.y)));

  const stairsTile = farFromStart[0] || freeTiles[freeTiles.length - 1] || start;
  tiles[stairsTile.y][stairsTile.x] = 'stairs';

  const taken = new Set([`${start.x},${start.y}`, `${stairsTile.x},${stairsTile.y}`]);
  const takeTile = (predicate = () => true) => {
    const options = freeTiles.filter(t => !taken.has(`${t.x},${t.y}`) && predicate(t));
    if (!options.length) return null;
    const tile = rng.pick(options);
    taken.add(`${tile.x},${tile.y}`);
    return tile;
  };

  /* --- chests --- */
  const chests = [];
  const chestCount = boss ? 1 : rng.int(1, 3);
  for (let i = 0; i < chestCount; i++) {
    const tile = takeTile();
    if (!tile) break;
    tiles[tile.y][tile.x] = 'chest';
    chests.push({ x: tile.x, y: tile.y, opened: false });
  }

  /* --- rest altar, roughly every third floor --- */
  let altar = null;
  if (!boss && floor % 3 === 0) {
    const tile = takeTile();
    if (tile) {
      tiles[tile.y][tile.x] = 'altar';
      altar = { x: tile.x, y: tile.y, used: false };
    }
  }

  /* --- enemies --- */
  const enemies = [];
  if (boss) {
    const template = bossForFloor(floor);
    const instance = scaleEnemy(template, floor, rng, { isBoss: true });
    const centre = { x: rooms[1].x + Math.floor(rooms[1].w / 2), y: rooms[1].y + Math.floor(rooms[1].h / 2) };
    instance.x = centre.x;
    instance.y = centre.y;
    enemies.push(instance);
  } else {
    const pool = enemiesForFloor(floor);
    const count = Math.min(14, 4 + Math.floor(floor / 3) + rng.int(0, 2));
    for (let i = 0; i < count; i++) {
      const tile = takeTile(t => Math.abs(t.x - start.x) + Math.abs(t.y - start.y) > 5);
      if (!tile) break;
      const template = rng.weighted(pool.map(t => ({ ...t, weight: t.weight || 5 })));
      const instance = scaleEnemy(template, floor, rng, { isBoss: false });
      instance.x = tile.x;
      instance.y = tile.y;
      enemies.push(instance);
    }
  }

  return {
    floor,
    seed: `${seedBase}:floor:${floor}`,
    tiles,
    rooms,
    player: { ...start },
    stairs: { x: stairsTile.x, y: stairsTile.y },
    chests,
    altar,
    enemies,
    isBoss: boss,
    steps: 0,
    revealed: new Set()
  };
}

/* ---------------------------------------------------------------
   Movement
   --------------------------------------------------------------- */

export function tileAt(map, x, y) {
  if (!inBounds(x, y)) return 'wall';
  return map.tiles[y][x];
}

export function enemyAt(map, x, y) {
  return map.enemies.find(e => e.hp > 0 && e.x === x && e.y === y) || null;
}

/**
 * Attempt to move the player one tile. Returns a description of what happened
 * so the caller can open combat, a chest, the next floor, and so on.
 */
export function tryMove(map, dx, dy) {
  const nx = map.player.x + dx;
  const ny = map.player.y + dy;
  const tile = tileAt(map, nx, ny);

  if (!WALKABLE.has(tile)) return { kind: 'blocked', tile };

  const enemy = enemyAt(map, nx, ny);
  if (enemy) return { kind: 'enemy', enemy };

  map.player.x = nx;
  map.player.y = ny;
  map.steps++;

  if (tile === 'stairs') return { kind: 'stairs' };
  if (tile === 'chest') {
    const chest = map.chests.find(c => c.x === nx && c.y === ny && !c.opened);
    if (chest) return { kind: 'chest', chest };
  }
  if (tile === 'altar' && map.altar && map.altar.x === nx && map.altar.y === ny && !map.altar.used) {
    return { kind: 'altar', altar: map.altar };
  }
  return { kind: 'moved' };
}

/**
 * Enemies take their step after the player moves. Bosses hold their arena;
 * everything else drifts toward the player once it is close enough to notice.
 */
export function stepEnemies(map, rng) {
  const contacts = [];
  for (const enemy of map.enemies) {
    if (enemy.hp <= 0 || enemy.isBoss) continue;

    const dx = map.player.x - enemy.x;
    const dy = map.player.y - enemy.y;
    const distance = Math.abs(dx) + Math.abs(dy);

    if (distance === 1) { contacts.push(enemy); continue; }

    let stepX = 0;
    let stepY = 0;
    if (distance <= 7) {
      if (Math.abs(dx) > Math.abs(dy)) stepX = Math.sign(dx);
      else stepY = Math.sign(dy);
    } else if (rng.chance(0.35)) {
      const [rx, ry] = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      stepX = rx;
      stepY = ry;
    }
    if (!stepX && !stepY) continue;

    const tx = enemy.x + stepX;
    const ty = enemy.y + stepY;
    if (!WALKABLE.has(tileAt(map, tx, ty))) continue;
    if (enemyAt(map, tx, ty)) continue;
    if (tx === map.player.x && ty === map.player.y) { contacts.push(enemy); continue; }
    enemy.x = tx;
    enemy.y = ty;
  }
  return contacts;
}

/* Serialisation: `revealed` is a Set, which JSON cannot carry. */
export function serialiseMap(map) {
  if (!map) return null;
  return { ...map, revealed: [...map.revealed] };
}

export function deserialiseMap(data) {
  if (!data) return null;
  return { ...data, revealed: new Set(data.revealed || []) };
}
