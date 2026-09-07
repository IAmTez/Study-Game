/* Side-on sewer backdrops.

   Deliberately NOT drawn as 16x16 tiles. The backgrounds are painted at full
   canvas resolution with gradients, layered translucency and soft light — the
   richer "32-bit" look — so that the chunky 16x16 character and item sprites
   drawn on top read as foreground. Two parallax layers are baked once per
   floor into tileable canvases; water, light shafts and drips animate live.

   Every layer is seamless across `width`, so panning the camera by any amount
   never shows a join. */

import { makeRng } from '../core/rng.js';

export const SCENE_W = 1120;  // also the width of one stage slot
export const SCENE_H = 406;
export const FLOOR_Y = 300;   // where the fighters' feet sit
export const CHANNEL_Y = 332; // top of the sludge channel in front

/* ---------------------------------------------------------------
   Biome palettes
   --------------------------------------------------------------- */

export const PALETTES = {
  brick: {
    void: ['#0a0d12', '#141b22'],
    farWall: ['#1b2028', '#2a3038'],
    wall: ['#3a3229', '#241f18'],
    brick: ['#4a3f33', '#403528', '#554636', '#372e24'],
    mortar: '#1d1913',
    trim: '#5a4a36',
    pipe: '#4a4034',
    grime: 'rgba(24,32,20,0.5)',
    moss: 'rgba(74,110,58,0.45)',
    ledge: ['#4e4436', '#2c261d'],
    water: ['#2b3a2a', '#16241a', '#4a6b45'],
    light: 'rgba(255,196,110,0.16)',
    lampCore: '#ffd88a',
    haze: 'rgba(255,190,120,0.05)',
    particle: 'rgba(255,220,160,0.5)',
  },
  flooded: {
    void: ['#050d14', '#0c1c26'],
    farWall: ['#122430', '#1b3644'],
    wall: ['#1e3a44', '#122630'],
    brick: ['#2a4c56', '#22414b', '#335a63', '#1c3a44'],
    mortar: '#0e1c22',
    trim: '#3d6b72',
    pipe: '#2f4f57',
    grime: 'rgba(14,40,44,0.55)',
    moss: 'rgba(46,120,110,0.45)',
    ledge: ['#2f5158', '#172e34'],
    water: ['#1d4451', '#0d2630', '#3f8497'],
    light: 'rgba(120,220,255,0.15)',
    lampCore: '#a8ecff',
    haze: 'rgba(120,210,255,0.06)',
    particle: 'rgba(170,235,255,0.5)',
  },
  fungal: {
    void: ['#0d0714', '#1a1024'],
    farWall: ['#241634', '#33204a'],
    wall: ['#33203f', '#20142a'],
    brick: ['#412a4e', '#372246', '#4d3159', '#2c1b38'],
    mortar: '#160e1e',
    trim: '#6a3f6e',
    pipe: '#432c4c',
    grime: 'rgba(40,20,50,0.5)',
    moss: 'rgba(150,70,140,0.4)',
    ledge: ['#453055', '#241631'],
    water: ['#3a2450', '#1d1030', '#7a4a8f'],
    light: 'rgba(210,130,255,0.16)',
    lampCore: '#e8b0ff',
    haze: 'rgba(200,120,255,0.06)',
    particle: 'rgba(226,168,255,0.55)',
  },
  bone: {
    void: ['#0d0e10', '#1b1d1f'],
    farWall: ['#252727', '#343735'],
    wall: ['#3b3a34', '#242320'],
    brick: ['#4c4a41', '#42403a', '#585448', '#39372f'],
    mortar: '#1a1917',
    trim: '#6a6555',
    pipe: '#4a483f',
    grime: 'rgba(30,30,26,0.5)',
    moss: 'rgba(96,104,80,0.35)',
    ledge: ['#544f43', '#2d2b24'],
    water: ['#33352c', '#1a1c17', '#5c6050'],
    light: 'rgba(226,230,210,0.14)',
    lampCore: '#f0f2dc',
    haze: 'rgba(220,225,205,0.05)',
    particle: 'rgba(235,238,220,0.45)',
  },
  drowned: {
    void: ['#04090f', '#0a1620'],
    farWall: ['#0f2130', '#173347'],
    wall: ['#16303f', '#0d1e29'],
    brick: ['#1f4152', '#1a3746', '#2a5162', '#16303e'],
    mortar: '#0a161d',
    trim: '#b08a3a',
    pipe: '#274653',
    grime: 'rgba(10,32,42,0.55)',
    moss: 'rgba(38,110,120,0.4)',
    ledge: ['#28505f', '#132832'],
    water: ['#15384a', '#08202c', '#317a92'],
    light: 'rgba(255,208,120,0.15)',
    lampCore: '#ffe0a0',
    haze: 'rgba(255,205,130,0.05)',
    particle: 'rgba(255,226,170,0.5)',
  },
  archive: {
    void: ['#0a0814', '#151024'],
    farWall: ['#1d1836', '#2a2350'],
    wall: ['#2a2450', '#181336'],
    brick: ['#352d5e', '#2d2653', '#3f3670', '#261f47'],
    mortar: '#120e26',
    trim: '#8a6ad0',
    pipe: '#372f60',
    grime: 'rgba(24,18,48,0.5)',
    moss: 'rgba(90,80,160,0.35)',
    ledge: ['#3a3268', '#1e1940'],
    water: ['#2c2560', '#150f34', '#5f4fae'],
    light: 'rgba(180,160,255,0.16)',
    lampCore: '#d8c8ff',
    haze: 'rgba(170,150,255,0.06)',
    particle: 'rgba(214,200,255,0.55)',
  },
};

export function paletteFor(biome) {
  return PALETTES[biome] || PALETTES.brick;
}

/* ---------------------------------------------------------------
   Drawing helpers
   --------------------------------------------------------------- */

function canvasOf(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/** Draw at x, and again either side, so anything crossing the seam wraps. */
function wrapped(ctx, width, x, draw) {
  draw(x);
  if (x < width * 0.25) draw(x + width);
  if (x > width * 0.75) draw(x - width);
}

function verticalGradient(ctx, x, y, w, h, stops) {
  const gradient = ctx.createLinearGradient(0, y, 0, y + h);
  stops.forEach(([offset, colour]) => gradient.addColorStop(offset, colour));
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
}

/* ---------------------------------------------------------------
   Layer builders
   --------------------------------------------------------------- */

function buildFarLayer(palette, rng, width, height) {
  const canvas = canvasOf(width, height);
  const ctx = canvas.getContext('2d');

  verticalGradient(ctx, 0, 0, width, height, [
    [0, palette.void[0]], [0.55, palette.void[1]], [1, palette.void[0]],
  ]);

  // A receding line of arches, evenly spaced so the strip tiles.
  const archCount = 4;
  const spacing = width / archCount;
  for (let i = 0; i < archCount; i++) {
    const cx = i * spacing + spacing / 2;
    const archW = spacing * 0.62;
    const archH = height * 0.56;
    const top = height * 0.12;

    const gradient = ctx.createLinearGradient(0, top, 0, top + archH);
    gradient.addColorStop(0, palette.farWall[1]);
    gradient.addColorStop(1, palette.farWall[0]);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(cx - archW / 2, top + archH);
    ctx.lineTo(cx - archW / 2, top + archW / 2);
    ctx.arc(cx, top + archW / 2, archW / 2, Math.PI, 0);
    ctx.lineTo(cx + archW / 2, top + archH);
    ctx.closePath();
    ctx.fill();

    // The dark tunnel mouth inside each arch.
    ctx.fillStyle = palette.void[0];
    ctx.beginPath();
    ctx.moveTo(cx - archW * 0.3, top + archH);
    ctx.lineTo(cx - archW * 0.3, top + archW * 0.5);
    ctx.arc(cx, top + archW * 0.5, archW * 0.3, Math.PI, 0);
    ctx.lineTo(cx + archW * 0.3, top + archH);
    ctx.closePath();
    ctx.fill();
  }

  verticalGradient(ctx, 0, height * 0.5, width, height * 0.5, [
    [0, 'rgba(0,0,0,0)'], [1, palette.void[0]],
  ]);
  return canvas;
}

function buildNearLayer(palette, rng, width, height) {
  const canvas = canvasOf(width, height);
  const ctx = canvas.getContext('2d');

  /* --- brick wall --- */
  verticalGradient(ctx, 0, 0, width, FLOOR_Y, [
    [0, palette.wall[1]], [0.38, palette.wall[0]], [0.72, palette.wall[0]], [1, palette.wall[1]],
  ]);

  const brickW = 56;
  const brickH = 18;
  ctx.fillStyle = palette.mortar;
  for (let y = 0; y < FLOOR_Y; y += brickH) {
    const offset = (y / brickH) % 2 ? brickW / 2 : 0;
    for (let x = -brickW; x < width + brickW; x += brickW) {
      const bx = x + offset;
      ctx.fillStyle = palette.brick[Math.floor(rng() * palette.brick.length)];
      ctx.fillRect(bx + 1, y + 1, brickW - 2, brickH - 2);
      // A lit top edge and shaded bottom give each brick some relief.
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      ctx.fillRect(bx + 1, y + 1, brickW - 2, 2);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(bx + 1, y + brickH - 3, brickW - 2, 2);
    }
  }

  /* --- vaulted ceiling --- */
  const ceilH = 84;
  verticalGradient(ctx, 0, 0, width, ceilH, [
    [0, 'rgba(0,0,0,0.8)'], [0.6, 'rgba(0,0,0,0.32)'], [1, 'rgba(0,0,0,0)'],
  ]);
  const vaults = 4;
  for (let i = 0; i < vaults; i++) {
    const cx = (i + 0.5) * (width / vaults);
    const r = width / vaults / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(cx, 0, r, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = palette.trim;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, 0, r, 0, Math.PI);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /* --- horizontal pipe run, shaded as a cylinder --- */
  const pipeY = 128;
  const pipeH = 30;
  verticalGradient(ctx, 0, pipeY, width, pipeH, [
    [0, 'rgba(0,0,0,0.5)'],
    [0.22, palette.pipe],
    [0.38, 'rgba(255,255,255,0.22)'],
    [0.6, palette.pipe],
    [1, 'rgba(0,0,0,0.6)'],
  ]);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, pipeY + pipeH, width, 7);
  // Seven flanges divide the width exactly, so the pipe stays seamless.
  const flangeStep = width / 7;
  for (let i = 0; i < 7; i++) {
    const fx = i * flangeStep;
    verticalGradient(ctx, fx, pipeY - 4, 14, pipeH + 8, [
      [0, 'rgba(0,0,0,0.45)'], [0.4, palette.trim], [1, 'rgba(0,0,0,0.55)'],
    ]);
    // A rust streak weeping down the wall below each joint.
    const streak = ctx.createLinearGradient(0, pipeY + pipeH, 0, pipeY + pipeH + 90);
    streak.addColorStop(0, palette.grime);
    streak.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = streak;
    ctx.fillRect(fx + 3, pipeY + pipeH, 8, 90);
  }

  /* --- grime, stains and moss --- */
  for (let i = 0; i < 44; i++) {
    const x = rng() * width;
    const y = rng.range(ceilH, FLOOR_Y - 20);
    const w = rng.range(20, 90);
    const h = rng.range(30, 130);
    wrapped(ctx, width, x, (px) => {
      const gradient = ctx.createLinearGradient(0, y, 0, y + h);
      gradient.addColorStop(0, palette.grime);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(px, y, w, h);
    });
  }
  for (let i = 0; i < 26; i++) {
    const x = rng() * width;
    const y = rng.range(ceilH, FLOOR_Y - 60);
    const w = rng.range(30, 110);
    wrapped(ctx, width, x, (px) => {
      const gradient = ctx.createLinearGradient(0, y, 0, y + 46);
      gradient.addColorStop(0, palette.moss);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(px, y, w, 46);
    });
  }

  /* --- wall lamps, evenly spaced so they tile --- */
  const lampCount = 3;
  for (let i = 0; i < lampCount; i++) {
    const x = (i + 0.5) * (width / lampCount);
    const y = 190;
    ctx.fillStyle = palette.pipe;
    ctx.fillRect(x - 5, y, 10, 22);
    ctx.fillStyle = palette.lampCore;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    const glow = ctx.createRadialGradient(x, y, 2, x, y, 190);
    glow.addColorStop(0, palette.light);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, 190, 0, Math.PI * 2);
    ctx.fill();
  }

  /* --- the walkway the fighters stand on --- */
  verticalGradient(ctx, 0, FLOOR_Y, width, CHANNEL_Y - FLOOR_Y, [
    [0, palette.ledge[0]], [1, palette.ledge[1]],
  ]);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, FLOOR_Y, width, 3);
  // Flagstone joints across the walkway.
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  for (let x = 0; x < width; x += 70) ctx.fillRect(x, FLOOR_Y + 3, 2, CHANNEL_Y - FLOOR_Y - 10);
  // Kerb overhanging the channel.
  verticalGradient(ctx, 0, CHANNEL_Y - 8, width, 8, [
    [0, palette.ledge[0]], [1, '#000'],
  ]);
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, CHANNEL_Y, width, 4);

  // Contact shadow where the wall meets the walkway.
  verticalGradient(ctx, 0, FLOOR_Y - 40, width, 40, [
    [0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.42)'],
  ]);
  return canvas;
}

/** Build both parallax layers for a floor. Cheap enough to redo per floor. */
export function buildBackdrop(biome, seed, width = SCENE_W, height = SCENE_H) {
  const palette = paletteFor(biome);
  const rng = makeRng(`${seed}:backdrop:${biome}`);
  return {
    biome,
    palette,
    width,
    height,
    far: buildFarLayer(palette, rng, width, height),
    near: buildNearLayer(palette, rng, width, height),
  };
}

/* ---------------------------------------------------------------
   Per-frame rendering
   --------------------------------------------------------------- */

function tileImage(ctx, image, offset, width, viewW, y = 0) {
  let x = -(((offset % width) + width) % width);
  while (x < viewW) {
    ctx.drawImage(image, Math.round(x), y);
    x += width;
  }
}

/**
 * Draw the scene background for a camera at `camX`, `camY`.
 * `time` drives the water, drips and motes.
 */
export function drawBackdrop(ctx, backdrop, camX, time, viewW, viewH, camY = 0) {
  const { palette, width } = backdrop;

  ctx.save();
  ctx.translate(0, -camY);

  // Far layer scrolls slowly; near layer at full speed.
  tileImage(ctx, backdrop.far, camX * 0.35, width, viewW);
  tileImage(ctx, backdrop.near, camX, width, viewW);

  // While climbing, the camera rises past the top of one strip — repeat it
  // above so the shaft has wall either side instead of empty black.
  if (camY < 0) {
    tileImage(ctx, backdrop.far, camX * 0.35, width, viewW, -SCENE_H);
    tileImage(ctx, backdrop.near, camX, width, viewW, -SCENE_H);
  }

  drawChannel(ctx, palette, camX, time, viewW);
  drawLightShafts(ctx, palette, camX, time, viewW);
  drawMotes(ctx, palette, camX, time, viewW);

  ctx.restore();

  // Vignette sits in screen space so the edges stay dark while panning.
  const vignette = ctx.createRadialGradient(viewW / 2, viewH / 2, viewH * 0.5, viewW / 2, viewH / 2, viewH * 1.15);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.42)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, viewW, viewH);
}

function drawChannel(ctx, palette, camX, time, viewW) {
  const top = CHANNEL_Y;
  const height = SCENE_H - top;
  verticalGradient(ctx, 0, top, viewW, height, [
    [0, palette.water[1]], [0.18, palette.water[0]], [0.72, palette.water[0]], [1, palette.water[1]],
  ]);

  /* Lamps reflected in the surface, smeared vertically and wobbling. */
  const spacing = SCENE_W / 3;
  const first = Math.floor(camX / spacing) - 1;
  for (let i = first; i < first + Math.ceil(viewW / spacing) + 2; i++) {
    const x = (i + 0.5) * spacing - camX;
    if (x < -80 || x > viewW + 80) continue;
    const wobble = Math.sin(time * 0.0012 + i) * 4;
    const glow = ctx.createLinearGradient(0, top, 0, top + height * 0.8);
    glow.addColorStop(0, palette.light);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = glow;
    ctx.fillRect(x - 14 + wobble, top, 28, height * 0.8);
    ctx.restore();
  }

  // Slow surface ripples, offset by the camera so they belong to the world.
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = palette.water[2];
  ctx.lineWidth = 2;
  for (let band = 0; band < 5; band++) {
    const y = top + 8 + band * 14;
    const speed = 12 + band * 5;
    ctx.beginPath();
    for (let x = 0; x <= viewW; x += 8) {
      const world = x + camX;
      const wave = Math.sin((world * 0.02) + time * 0.0016 * speed + band) * 2.2;
      const y2 = y + wave;
      x === 0 ? ctx.moveTo(x, y2) : ctx.lineTo(x, y2);
    }
    ctx.globalAlpha = 0.42 - band * 0.055;
    ctx.stroke();
  }
  ctx.restore();

  // A bright lip where the sludge meets the kerb.
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = palette.water[2];
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x <= viewW; x += 6) {
    const y = top + 1 + Math.sin((x + camX) * 0.035 + time * 0.002) * 1.6;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawLightShafts(ctx, palette, camX, time, viewW) {
  const spacing = 320;
  const first = Math.floor(camX / spacing) - 1;
  for (let i = first; i < first + Math.ceil(viewW / spacing) + 2; i++) {
    const worldX = i * spacing + 140;
    const x = worldX - camX;
    if (x < -180 || x > viewW + 180) continue;
    const flicker = 0.82 + Math.sin(time * 0.001 + i) * 0.18;
    const gradient = ctx.createLinearGradient(x, 0, x - 60, FLOOR_Y);
    gradient.addColorStop(0, palette.light);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.globalAlpha = flicker;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x - 26, 0);
    ctx.lineTo(x + 26, 0);
    ctx.lineTo(x - 34, FLOOR_Y);
    ctx.lineTo(x - 112, FLOOR_Y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function drawMotes(ctx, palette, camX, time, viewW) {
  ctx.save();
  ctx.fillStyle = palette.particle;
  for (let i = 0; i < 46; i++) {
    // Deterministic pseudo-positions so motes belong to world space.
    const seedX = (i * 137.5) % 1;
    const seedY = (i * 71.3) % 1;
    const drift = Math.sin(time * 0.0004 + i) * 18;
    const worldX = seedX * 1920 + Math.floor(camX / 1920) * 1920 + drift;
    const y = 70 + seedY * (FLOOR_Y - 90) + Math.sin(time * 0.0007 + i * 2) * 10;
    for (const wx of [worldX, worldX + 1920]) {
      const x = wx - camX;
      if (x < -10 || x > viewW + 10) continue;
      ctx.globalAlpha = 0.25 + ((i % 5) / 12);
      const size = 1 + (i % 3);
      ctx.fillRect(x, y, size, size);
    }
  }
  ctx.restore();
}

/* ---------------------------------------------------------------
   The ladder section at the end of a floor
   --------------------------------------------------------------- */

export function drawLadder(ctx, palette, x, camY = 0) {
  const topY = -SCENE_H * 2;
  const bottomY = FLOOR_Y;

  // Shaft recess behind the ladder. Drawn in world space so it scrolls with
  // the camera during the climb.
  ctx.save();
  ctx.translate(0, -camY);
  const recess = ctx.createLinearGradient(x - 46, 0, x + 46, 0);
  recess.addColorStop(0, 'rgba(0,0,0,0.1)');
  recess.addColorStop(0.5, 'rgba(0,0,0,0.72)');
  recess.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = recess;
  ctx.fillRect(x - 46, topY, 92, bottomY - topY);

  // Rails and rungs.
  ctx.fillStyle = palette.trim;
  ctx.fillRect(x - 22, topY, 6, bottomY - topY);
  ctx.fillRect(x + 16, topY, 6, bottomY - topY);
  for (let y = bottomY - 14; y > topY; y -= 26) {
    ctx.fillStyle = palette.trim;
    ctx.fillRect(x - 22, y, 44, 5);
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.fillRect(x - 22, y, 44, 1);
  }

  // Light spilling down from the floor above.
  const glow = ctx.createLinearGradient(0, topY, 0, topY + 260);
  glow.addColorStop(0, palette.light);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(x - 80, topY, 160, 260);
  ctx.restore();
}
