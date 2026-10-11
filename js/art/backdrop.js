/* Side-on sewer backdrops, painted for depth and light.

   Each stage is framed like a stage set: stone columns, and between them two
   great arched openings — one behind each fighter — that look out over a
   deeper, fog-filled hall. Light pours through grates high in the vault as
   god rays; crystals, lanterns and glowing plants (different in every biome)
   breathe with a soft pulse; fog drifts; motes hang in the beams.

   Layers, back to front:
     far   — the hall seen through the openings (slow parallax)
     near  — the wall, columns, openings and walkway (moves with the world)
     live  — rays, glows, fog, water and motes, drawn each frame
     front — dark silhouettes of vines and chains along the top edge

   Static layers are baked once per floor at the screen's pixel density, and
   every layer tiles seamlessly across one stage width. */

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
    sky: ['#120d0b', '#3a2a22', '#1a1310'],
    fog: '#6a4e3a',
    far: ['#2c211b', '#3d2e24'],
    stone: ['#5a4838', '#4e3e30', '#665240', '#47382b'],
    stoneLit: '#8a7058',
    mortar: '#1c1510',
    trim: '#8a6a44',
    metal: '#a07a48',
    ledge: ['#6a5644', '#3a2e24'],
    water: ['#2e3a24', '#151d12', '#6a8a52'],
    light: '#ffcf8a',
    glow: '#ffb347',
    plant: '#5f8f4a',
    bloom: '#ffd36a',
    feature: 'lanterns',
    particle: '#ffe0a8',
  },
  flooded: {
    sky: ['#06111a', '#1d4552', '#081620'],
    fog: '#3a7a88',
    far: ['#11303c', '#1c4654'],
    stone: ['#355862', '#2c4c56', '#3e6670', '#26444e'],
    stoneLit: '#5f909a',
    mortar: '#0e2026',
    trim: '#4f8a8f',
    metal: '#6aa0a0',
    ledge: ['#3f6670', '#1b3238'],
    water: ['#1d4a5a', '#0b2530', '#5fb8cc'],
    light: '#a8f0ff',
    glow: '#5ff0e0',
    plant: '#3f8a7a',
    bloom: '#7affea',
    feature: 'algae',
    particle: '#c8f8ff',
  },
  fungal: {
    sky: ['#0e0716', '#3a1f4e', '#140a1e'],
    fog: '#7a4a9a',
    far: ['#26163a', '#36214f'],
    stone: ['#4a3358', '#40294e', '#563c66', '#382444'],
    stoneLit: '#7a5a8e',
    mortar: '#170e20',
    trim: '#8a5a90',
    metal: '#9a7aa0',
    ledge: ['#563f68', '#2a1a36'],
    water: ['#3e2654', '#1d1030', '#a06ac0'],
    light: '#e6b8ff',
    glow: '#e090ff',
    plant: '#6a4a8a',
    bloom: '#ff9ef0',
    feature: 'mushrooms',
    particle: '#f0c8ff',
  },
  bone: {
    sky: ['#0d0e10', '#3a3c38', '#151617'],
    fog: '#7a7c70',
    far: ['#2a2b28', '#3a3b36'],
    stone: ['#5e5b50', '#545146', '#6a665a', '#4a473e'],
    stoneLit: '#8e8a7a',
    mortar: '#1b1a17',
    trim: '#8a8470',
    metal: '#9a9480',
    ledge: ['#66614f', '#33302a'],
    water: ['#36382e', '#1a1c17', '#7a8068'],
    light: '#f4f2dc',
    glow: '#cfe8ff',
    plant: '#6a7058',
    bloom: '#e8f4ff',
    feature: 'candles',
    particle: '#f4f4e8',
  },
  drowned: {
    sky: ['#040a12', '#16384a', '#06121c'],
    fog: '#2f6a80',
    far: ['#0e2636', '#183a4e'],
    stone: ['#2a4e60', '#244656', '#33596c', '#1f3e4c'],
    stoneLit: '#4f8296',
    mortar: '#0a161d',
    trim: '#c9a227',
    metal: '#d0a84a',
    ledge: ['#2f5a6a', '#142a34'],
    water: ['#15384a', '#08202c', '#4fa0be'],
    light: '#ffe0a0',
    glow: '#7fd1ff',
    plant: '#2f7a6a',
    bloom: '#ff8a9a',
    feature: 'coral',
    particle: '#ffe8c0',
  },
  archive: {
    sky: ['#0a0814', '#2c2458', '#100c20'],
    fog: '#5a4a9a',
    far: ['#1d1838', '#2a2352'],
    stone: ['#3a3266', '#322a5a', '#463c78', '#2a2450'],
    stoneLit: '#6a5aa8',
    mortar: '#120e26',
    trim: '#a98ad8',
    metal: '#c9a2ff',
    ledge: ['#3e3670', '#1e1940'],
    water: ['#2c2560', '#150f34', '#7a6ad0'],
    light: '#d8c8ff',
    glow: '#a98bff',
    plant: '#4a4a8a',
    bloom: '#ffd56b',
    feature: 'books',
    particle: '#e0d8ff',
  },
};

export function paletteFor(biome) {
  return PALETTES[biome] || PALETTES.brick;
}

/* ---------------------------------------------------------------
   Colour helpers
   --------------------------------------------------------------- */

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

function mix(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const c = (x, y) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}

function shade(hex, amount) {
  return amount >= 0 ? mix(hex, '#ffffff', amount) : mix(hex, '#000000', -amount);
}

/* ---------------------------------------------------------------
   Canvas helpers
   --------------------------------------------------------------- */

let buildRes = 1;

function canvasOf(width, height, res = buildRes) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * res));
  canvas.height = Math.max(1, Math.round(height * res));
  canvas.getContext('2d').scale(res, res);
  return canvas;
}

function roundedRect(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** Draw at x, and again either side, so anything crossing the seam wraps. */
function wrapped(width, x, draw) {
  draw(x);
  draw(x + width);
  draw(x - width);
}

function vGradient(ctx, x, y, w, h, stops) {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}

function radialGlow(ctx, x, y, r, colour, alpha) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(colour, alpha));
  g.addColorStop(0.35, rgba(colour, alpha * 0.45));
  g.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

/** An arch path: straight sides up to `spring`, a round top. */
function archPath(ctx, cx, top, w, bottom) {
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(cx - r, bottom);
  ctx.lineTo(cx - r, top + r);
  ctx.arc(cx, top + r, r, Math.PI, 0);
  ctx.lineTo(cx + r, bottom);
  ctx.closePath();
}

/* Stage layout within one slot. */
const COLUMNS = [0, 560];
const OPENINGS = [280, 840];
const OPEN_W = 360;
const OPEN_TOP = 64;
const PARAPET_Y = 252;

/* ---------------------------------------------------------------
   Far layer: the hall beyond the openings
   --------------------------------------------------------------- */

function buildFar(p, rng, width, height) {
  const canvas = canvasOf(width, height);
  const ctx = canvas.getContext('2d');
  vGradient(ctx, 0, 0, width, height, [[0, p.sky[0]], [0.55, p.sky[1]], [1, p.sky[2]]]);

  // Light from far-off openings high up.
  for (let i = 0; i < 3; i++) {
    const x = (i + 0.3 + rng() * 0.4) * (width / 3);
    wrapped(width, x, (px) => radialGlow(ctx, px, 40 + rng() * 30, 240, p.light, 0.32));
  }

  // Two rows of arcades receding into fog: the back row paler and smaller.
  for (const [row, count, base, archW, alpha] of [[0, 9, 230, 70, 0.55], [1, 6, 262, 120, 0.85]]) {
    const colour = mix(p.far[row], p.fog, row ? 0.25 : 0.5);
    ctx.fillStyle = colour;
    const step = width / count;
    for (let i = 0; i < count; i++) {
      const cx = (i + 0.5) * step;
      const pierW = step - archW;
      // Piers between arches, with a lintel line above.
      ctx.globalAlpha = alpha;
      ctx.fillRect(cx - step / 2, base - (row ? 170 : 120), pierW, row ? 170 : 120);
      ctx.fillRect(cx - step / 2, base - (row ? 190 : 135), step, row ? 26 : 18);
      // Arch spandrels.
      ctx.beginPath();
      ctx.moveTo(cx - archW / 2, base - (row ? 170 : 120) + archW / 2);
      ctx.arc(cx, base - (row ? 170 : 120) + archW / 2, archW / 2, Math.PI, 0);
      ctx.lineTo(cx + archW / 2, base - (row ? 190 : 135) + (row ? 26 : 18));
      ctx.lineTo(cx - archW / 2, base - (row ? 190 : 135) + (row ? 26 : 18));
      ctx.closePath();
      ctx.fill();
      // A soft highlight down the lit edge of each pier.
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillStyle = mix(colour, p.light, 0.35);
      ctx.fillRect(cx - step / 2, base - (row ? 170 : 120), 3, row ? 170 : 120);
      ctx.fillStyle = colour;
    }
    ctx.globalAlpha = 1;
    // Fog pooling at the base of each row.
    vGradient(ctx, 0, base - 60, width, 80, [[0, rgba(p.fog, 0)], [0.7, rgba(p.fog, row ? 0.35 : 0.5)], [1, rgba(p.fog, 0.2)]]);
  }

  // Baked light shafts falling through the hall.
  for (let i = 0; i < 4; i++) {
    const x = (i + 0.5) * (width / 4) + (rng() - 0.5) * 60;
    wrapped(width, x, (px) => {
      const g = ctx.createLinearGradient(px, 0, px - 80, 280);
      g.addColorStop(0, rgba(p.light, 0.22));
      g.addColorStop(1, rgba(p.light, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(px - 18, 0);
      ctx.lineTo(px + 18, 0);
      ctx.lineTo(px - 50, 290);
      ctx.lineTo(px - 120, 290);
      ctx.closePath();
      ctx.fill();
    });
  }

  // Atmospheric haze: the far hall glows softly through the fog.
  vGradient(ctx, 0, 60, width, 220, [[0, rgba(p.fog, 0)], [0.45, rgba(p.fog, 0.42)], [0.8, rgba(mix(p.fog, p.light, 0.3), 0.38)], [1, rgba(p.fog, 0.2)]]);

  // Distant water far below, catching the light.
  vGradient(ctx, 0, 268, width, height - 268, [[0, mix(p.water[0], p.fog, 0.4)], [1, p.water[1]]]);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = mix(p.water[2], p.light, 0.3);
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const x = rng() * width;
    const y = 272 + rng() * 40;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10 + rng() * 30, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Specks of distant glow: crystals, lamps, fireflies.
  for (let i = 0; i < 26; i++) {
    const x = rng() * width;
    const y = 140 + rng() * 130;
    wrapped(width, x, (px) => radialGlow(ctx, px, y, 6 + rng() * 10, i % 3 ? p.glow : p.light, 0.5));
  }
  return canvas;
}

/* ---------------------------------------------------------------
   Near layer: wall, columns, openings, walkway
   --------------------------------------------------------------- */

/** Masonry in rows of irregular blocks that sum exactly to the width, so it tiles. */
function masonry(ctx, p, rng, width, y0, y1, rowH = 30) {
  for (let y = y0; y < y1; y += rowH) {
    const widths = [];
    let total = 0;
    while (total < width) { const w = 54 + rng() * 46; widths.push(w); total += w; }
    const k = width / total;
    let x = rng() * 30;
    for (const w0 of widths) {
      const w = w0 * k;
      const base = p.stone[Math.floor(rng() * p.stone.length)];
      wrapped(width, x, (bx) => {
        roundedRect(ctx, bx + 1.5, y + 1.5, w - 3, rowH - 3, 5);
        const g = ctx.createLinearGradient(0, y, 0, y + rowH);
        g.addColorStop(0, shade(base, 0.08));
        g.addColorStop(1, shade(base, -0.12));
        ctx.fillStyle = g;
        ctx.fill();
        // Cel bevel: a lit top edge and a hard shadow underneath.
        ctx.fillStyle = rgba(p.stoneLit, 0.55);
        roundedRect(ctx, bx + 3, y + 2.5, w - 7, 2.6, 1.3);
        ctx.fill();
        ctx.fillStyle = 'rgba(0,0,0,0.28)';
        roundedRect(ctx, bx + 2, y + rowH - 6, w - 4, 4, 2);
        ctx.fill();
      });
      // Cracks and chips on some blocks.
      if (rng() < 0.22) {
        const cx = x + w * (0.2 + rng() * 0.6);
        const cy = y + 6 + rng() * (rowH - 12);
        const pts = [[cx, cy], [cx + 6 + rng() * 6, cy + 3], [cx + 10 + rng() * 6, cy - 2]];
        wrapped(width, 0, (dx) => {
          ctx.strokeStyle = 'rgba(0,0,0,0.45)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          pts.forEach(([px, py], i) => (i ? ctx.lineTo(px + dx, py) : ctx.moveTo(px + dx, py)));
          ctx.stroke();
        });
      }
      x += w;
    }
  }
}

function drawColumn(ctx, p, cx, width) {
  const w = 74;
  wrapped(width, cx, (x) => {
    // Shaft: cel-shaded cylinder — lit left, hard shadow right, rim light.
    const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0);
    g.addColorStop(0, shade(p.stone[0], 0.05));
    g.addColorStop(0.3, shade(p.stoneLit, -0.05));
    g.addColorStop(0.55, p.stone[0]);
    g.addColorStop(0.56, shade(p.stone[0], -0.28));
    g.addColorStop(0.92, shade(p.stone[0], -0.34));
    g.addColorStop(1, rgba(p.light, 0.5));
    ctx.fillStyle = g;
    ctx.fillRect(x - w / 2, 0, w, FLOOR_Y);
    // Fluting.
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 2;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * 11, 60);
      ctx.lineTo(x + i * 11, FLOOR_Y - 40);
      ctx.stroke();
    }
    // Capital and base, with trim.
    for (const [y, h] of [[44, 22], [FLOOR_Y - 40, 40]]) {
      roundedRect(ctx, x - w / 2 - 10, y, w + 20, h, 4);
      const cg = ctx.createLinearGradient(0, y, 0, y + h);
      cg.addColorStop(0, shade(p.stoneLit, 0.05));
      cg.addColorStop(1, shade(p.stone[0], -0.3));
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.strokeStyle = rgba(p.trim, 0.8);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.fillStyle = rgba(p.trim, 0.9);
    ctx.fillRect(x - w / 2 - 10, 66, w + 20, 3);
  });
}

/** Little lit features that change with the biome. */
function drawFeature(ctx, p, rng, x, y, kind, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  switch (kind) {
    case 'algae':
    case 'crystals': {
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i - 2) * 0.32;
        const len = 18 + rng() * 22;
        const w = 5 + rng() * 4;
        ctx.save();
        ctx.rotate(a + Math.PI / 2);
        const g = ctx.createLinearGradient(-w, 0, w, 0);
        g.addColorStop(0, shade(p.glow, 0.5));
        g.addColorStop(0.5, p.glow);
        g.addColorStop(0.51, shade(p.glow, -0.25));
        g.addColorStop(1, shade(p.glow, -0.4));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(-w, 0);
        ctx.lineTo(-w * 0.8, -len * 0.8);
        ctx.lineTo(0, -len);
        ctx.lineTo(w * 0.8, -len * 0.8);
        ctx.lineTo(w, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = shade(p.glow, -0.55);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
    case 'mushrooms': {
      for (let i = 0; i < 4; i++) {
        const mx = (i - 1.5) * 12 + rng() * 6;
        const h = 10 + rng() * 18;
        const r = 7 + rng() * 6;
        ctx.fillStyle = '#e8dcc8';
        ctx.fillRect(mx - 2, -h, 4, h);
        const g = ctx.createLinearGradient(0, -h - r, 0, -h);
        g.addColorStop(0, shade(p.glow, 0.3));
        g.addColorStop(1, shade(p.glow, -0.3));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(mx, -h, r, r * 0.6, 0, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(mx - r * 0.3, -h - r * 0.3, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'coral': {
      ctx.strokeStyle = p.bloom;
      ctx.lineCap = 'round';
      for (let i = 0; i < 4; i++) {
        const bx = (i - 1.5) * 10;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(bx, 0);
        ctx.quadraticCurveTo(bx - 6, -16, bx + 2, -26 - rng() * 10);
        ctx.stroke();
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(bx - 2, -12);
        ctx.quadraticCurveTo(bx + 8, -18, bx + 8, -24);
        ctx.stroke();
      }
      break;
    }
    case 'candles': {
      for (let i = 0; i < 3; i++) {
        const bx = (i - 1) * 10;
        const h = 12 + i * 5;
        ctx.fillStyle = '#efe8d4';
        roundedRect(ctx, bx - 3, -h, 6, h, 2);
        ctx.fill();
        ctx.fillStyle = shade(p.light, 0.1);
        ctx.beginPath();
        ctx.ellipse(bx, -h - 4, 2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#e8e0cc';
      ctx.beginPath();
      ctx.ellipse(18, -4, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(15, -6, 2, 2);
      ctx.fillRect(19, -6, 2, 2);
      break;
    }
    case 'books': {
      const colours = ['#8a2a3a', '#2a5a8a', '#3a7a4a', '#8a6a2a', '#5a3a8a'];
      let bx = -22;
      for (let i = 0; i < 6; i++) {
        const w = 5 + rng() * 4;
        const h = 18 + rng() * 10;
        ctx.fillStyle = colours[i % colours.length];
        ctx.fillRect(bx, -h, w, h);
        ctx.fillStyle = 'rgba(255,220,140,0.6)';
        ctx.fillRect(bx, -h + 4, w, 1.5);
        bx += w + 1;
      }
      break;
    }
    case 'lanterns':
    default: {
      // Glowing bulbs on a creeping plant.
      ctx.strokeStyle = p.plant;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.quadraticCurveTo(-6, -20, 8, -30);
      ctx.stroke();
      for (const [bx, by] of [[-8, -12], [2, -24], [8, -30]]) {
        ctx.fillStyle = p.bloom;
        ctx.beginPath();
        ctx.ellipse(bx, by, 4, 5, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();
}

function buildNear(p, rng, width, height, glows) {
  const canvas = canvasOf(width, height);
  const ctx = canvas.getContext('2d');

  // Wall masonry, then darkened toward the vault.
  masonry(ctx, p, rng, width, 0, FLOOR_Y, 30);
  vGradient(ctx, 0, 0, width, 130, [[0, 'rgba(0,0,0,0.75)'], [1, 'rgba(0,0,0,0)']]);

  // Cut the openings out of the wall so the far hall shows through.
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#000000';
  for (const cx of OPENINGS) wrapped(width, cx, (x) => { archPath(ctx, x, OPEN_TOP, OPEN_W, PARAPET_Y + 2); ctx.fill(); });
  ctx.restore();

  for (const cx of OPENINGS) {
    wrapped(width, cx, (x) => {
      // Moulded arch frame: voussoirs around the opening.
      const r = OPEN_W / 2;
      const ring = 22;
      for (let i = 0; i <= 12; i++) {
        const a0 = Math.PI + (i / 13) * Math.PI;
        const a1 = Math.PI + ((i + 1) / 13) * Math.PI;
        ctx.beginPath();
        ctx.arc(x, OPEN_TOP + r, r + ring, a0 + 0.01, a1 - 0.01);
        ctx.arc(x, OPEN_TOP + r, r, a1 - 0.01, a0 + 0.01, true);
        ctx.closePath();
        const lit = Math.cos((a0 + a1) / 2 + 2.2) * 0.5 + 0.5;
        ctx.fillStyle = mix(shade(p.stone[2], -0.1), p.stoneLit, lit * 0.6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      // Keystone with a glowing gem.
      roundedRect(ctx, x - 14, OPEN_TOP - 26, 28, 34, 4);
      ctx.fillStyle = shade(p.stoneLit, -0.05);
      ctx.fill();
      ctx.strokeStyle = rgba(p.trim, 0.9);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = p.glow;
      ctx.beginPath();
      ctx.moveTo(x, OPEN_TOP - 18); ctx.lineTo(x + 6, OPEN_TOP - 8); ctx.lineTo(x, OPEN_TOP + 2); ctx.lineTo(x - 6, OPEN_TOP - 8);
      ctx.closePath();
      ctx.fill();
      glows.push({ x, y: OPEN_TOP - 8, r: 34, colour: p.glow, phase: x * 0.01, strength: 0.8 });
      // Jambs with a hard inner shadow so the opening reads as deep.
      const jamb = ctx.createLinearGradient(x - r, 0, x - r + 26, 0);
      jamb.addColorStop(0, 'rgba(0,0,0,0.55)');
      jamb.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = jamb;
      ctx.fillRect(x - r, OPEN_TOP + r, 26, PARAPET_Y - OPEN_TOP - r);
      // Parapet in front of the opening, with a balustrade.
      ctx.fillStyle = shade(p.stone[1], -0.1);
      ctx.fillRect(x - r - 2, PARAPET_Y, OPEN_W + 4, FLOOR_Y - PARAPET_Y);
      for (let b = x - r + 14; b < x + r - 8; b += 22) {
        roundedRect(ctx, b - 5, PARAPET_Y - 30, 10, 30, 4);
        const bg = ctx.createLinearGradient(b - 5, 0, b + 5, 0);
        bg.addColorStop(0, p.stoneLit);
        bg.addColorStop(0.55, p.stone[0]);
        bg.addColorStop(0.56, shade(p.stone[0], -0.3));
        bg.addColorStop(1, shade(p.stone[0], -0.35));
        ctx.fillStyle = bg;
        ctx.fill();
      }
      roundedRect(ctx, x - r - 6, PARAPET_Y - 36, OPEN_W + 12, 9, 3);
      ctx.fillStyle = p.stoneLit;
      ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(x - r - 6, PARAPET_Y - 28, OPEN_W + 12, 3);
      roundedRect(ctx, x - r - 6, PARAPET_Y - 2, OPEN_W + 12, 8, 3);
      ctx.fillStyle = shade(p.stoneLit, -0.1);
      ctx.fill();
    });

    // Biome features clustered at the base of each opening, glowing.
    for (const side of [-1, 1]) {
      const fx = cx + side * (OPEN_W / 2 - 4);
      const kind = p.feature === 'lanterns' ? 'lanterns' : p.feature;
      wrapped(width, fx, (x) => drawFeature(ctx, p, makeRng(`${fx}:${side}`), x, PARAPET_Y - 34, kind, 1.1));
      glows.push({ x: fx, y: PARAPET_Y - 54, r: 70, colour: p.glow, phase: fx * 0.02, strength: 0.75 });
    }
  }

  // Hanging ivy from the arch frames, with blossoms.
  for (let i = 0; i < 16; i++) {
    const x = rng() * width;
    const len = 30 + rng() * 70;
    wrapped(width, x, (px) => {
      ctx.strokeStyle = shade(p.plant, -0.2);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, 40);
      ctx.quadraticCurveTo(px + 6, 40 + len * 0.5, px - 2, 40 + len);
      ctx.stroke();
      for (let k = 0; k < len; k += 9) {
        ctx.fillStyle = k % 18 ? p.plant : shade(p.plant, 0.2);
        ctx.beginPath();
        ctx.ellipse(px + (k % 18 ? 4 : -4) + Math.sin(k) * 2, 44 + k, 4.4, 2.4, k % 18 ? 0.5 : -0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (len > 60) {
        ctx.fillStyle = p.bloom;
        ctx.beginPath();
        ctx.arc(px - 2, 40 + len, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  // Columns between the openings.
  for (const cx of COLUMNS) drawColumn(ctx, p, cx, width);

  // Lanterns hanging from brackets on each column.
  for (const cx of COLUMNS) {
    wrapped(width, cx + 46, (x) => {
      ctx.strokeStyle = shade(p.metal, -0.3);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 10, 150); ctx.lineTo(x + 6, 150); ctx.lineTo(x + 6, 160);
      ctx.stroke();
      roundedRect(ctx, x - 3, 160, 18, 26, 4);
      ctx.fillStyle = shade(p.metal, -0.4);
      ctx.fill();
      roundedRect(ctx, x, 164, 12, 18, 3);
      ctx.fillStyle = shade(p.light, 0.2);
      ctx.fill();
      ctx.fillStyle = shade(p.metal, 0.1);
      ctx.beginPath();
      ctx.moveTo(x - 5, 160); ctx.lineTo(x + 6, 152); ctx.lineTo(x + 17, 160);
      ctx.closePath();
      ctx.fill();
    });
    glows.push({ x: cx + 52, y: 173, r: 120, colour: p.light, phase: cx * 0.013, strength: 0.6, flicker: true });
  }

  // The walkway: big slabs with a lit lip, cracks and puddles.
  vGradient(ctx, 0, FLOOR_Y, width, CHANNEL_Y - FLOOR_Y, [[0, p.ledge[0]], [1, p.ledge[1]]]);
  let sx = 0;
  while (sx < width) {
    const w = 80 + rng() * 60;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(sx, FLOOR_Y + 4, 2, CHANNEL_Y - FLOOR_Y - 10);
    ctx.fillStyle = rgba(p.stoneLit, 0.25);
    ctx.fillRect(sx + 2, FLOOR_Y + 4, 1, CHANNEL_Y - FLOOR_Y - 10);
    sx += w;
  }
  ctx.fillStyle = rgba(p.stoneLit, 0.8);
  ctx.fillRect(0, FLOOR_Y, width, 2.5);
  for (let i = 0; i < 6; i++) {
    const x = rng() * width;
    wrapped(width, x, (px) => {
      ctx.fillStyle = rgba(p.water[2], 0.35);
      ctx.beginPath();
      ctx.ellipse(px, FLOOR_Y + 14 + rng() * 8, 20 + rng() * 20, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  vGradient(ctx, 0, CHANNEL_Y - 8, width, 8, [[0, p.ledge[0]], [1, '#000000']]);
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, CHANNEL_Y, width, 4);

  // Contact shadow where the wall meets the walkway.
  vGradient(ctx, 0, FLOOR_Y - 30, width, 30, [[0, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,0.4)']]);

  // Baked warm light pooling around each lantern and feature.
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const g of glows) wrapped(width, g.x, (x) => radialGlow(ctx, x, g.y, g.r * 1.4, g.colour, 0.12));
  ctx.restore();
  return canvas;
}

/* ---------------------------------------------------------------
   Front layer: silhouettes along the top edge
   --------------------------------------------------------------- */

function buildFront(p, rng, width) {
  const h = 120;
  const canvas = canvasOf(width, h);
  const ctx = canvas.getContext('2d');
  const dark = mix(p.sky[0], '#000000', 0.4);
  // A sagging pipe and hanging chains, vines and roots.
  ctx.fillStyle = dark;
  for (let i = 0; i < 3; i++) {
    const x = (i + rng()) * (width / 3);
    const len = 40 + rng() * 60;
    wrapped(width, x, (px) => {
      ctx.strokeStyle = dark;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.quadraticCurveTo(px + 10, len * 0.5, px - 4, len);
      ctx.stroke();
      ctx.strokeStyle = rgba(p.light, 0.25);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px + 2, 0);
      ctx.quadraticCurveTo(px + 12, len * 0.5, px - 2, len);
      ctx.stroke();
      for (let k = 8; k < len; k += 10) {
        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.ellipse(px + (k % 20 ? 6 : -6), k, 7, 3, k % 20 ? 0.6 : -0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
  // Chains.
  for (let i = 0; i < 2; i++) {
    const x = (i + 0.3 + rng() * 0.4) * (width / 2);
    const len = 50 + rng() * 40;
    wrapped(width, x, (px) => {
      ctx.strokeStyle = dark;
      ctx.lineWidth = 2.6;
      for (let y = 0; y < len; y += 9) {
        ctx.beginPath();
        ctx.ellipse(px, y + 4, (y / 9) % 2 ? 1.6 : 3.6, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }
  // A dark ragged vault edge.
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let x = 0; x <= width; x += 20) ctx.lineTo(x, 8 + Math.sin(x * 0.03) * 4 + (rng() * 6));
  ctx.lineTo(width, 0);
  ctx.closePath();
  ctx.fill();
  return canvas;
}

/* ---------------------------------------------------------------
   Live sprites (baked once, drawn many times)
   --------------------------------------------------------------- */

function glowSprite(colour) {
  const c = canvasOf(128, 128, 1);
  const ctx = c.getContext('2d');
  radialGlow(ctx, 64, 64, 64, colour, 1);
  return c;
}

function raySprite(colour) {
  // One tall soft beam, brighter at the top, with streaks inside it.
  const w = 220;
  const h = 340;
  const c = canvasOf(w, h, 1);
  const ctx = c.getContext('2d');
  const body = ctx.createLinearGradient(0, 0, 0, h);
  body.addColorStop(0, rgba(colour, 0.55));
  body.addColorStop(0.6, rgba(colour, 0.18));
  body.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(w * 0.42, 0);
  ctx.lineTo(w * 0.58, 0);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 7; i++) {
    const f = (i + 0.5) / 7;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, rgba(colour, 0.25));
    g.addColorStop(1, rgba(colour, 0));
    ctx.strokeStyle = g;
    ctx.lineWidth = 2 + (i % 3) * 2;
    ctx.beginPath();
    ctx.moveTo(w * (0.44 + f * 0.12), 0);
    ctx.lineTo(w * f, h);
    ctx.stroke();
  }
  // Soften the sides.
  ctx.globalCompositeOperation = 'destination-in';
  const side = ctx.createLinearGradient(0, 0, w, 0);
  side.addColorStop(0, 'rgba(0,0,0,0)');
  side.addColorStop(0.3, 'rgba(0,0,0,1)');
  side.addColorStop(0.7, 'rgba(0,0,0,1)');
  side.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, w, h);
  return c;
}

function fogSprite(colour, width, rng) {
  const h = 120;
  const c = canvasOf(width, h, 0.5);
  const ctx = c.getContext('2d');
  for (let i = 0; i < 24; i++) {
    const x = rng() * width;
    const y = 50 + rng() * 40;
    const r = 60 + rng() * 80;
    wrapped(width, x, (px) => {
      const g = ctx.createRadialGradient(px, y, 0, px, y, r);
      g.addColorStop(0, rgba(colour, 0.22));
      g.addColorStop(1, rgba(colour, 0));
      ctx.fillStyle = g;
      ctx.fillRect(px - r, y - r, r * 2, r * 2);
    });
  }
  return c;
}

/* ---------------------------------------------------------------
   Build
   --------------------------------------------------------------- */

/** Build every layer for a floor. Cheap enough to redo per floor. */
export function buildBackdrop(biome, seed, width = SCENE_W, height = SCENE_H, res = 1) {
  const palette = paletteFor(biome);
  const rng = makeRng(`${seed}:backdrop:${biome}`);
  buildRes = Math.max(1, Math.min(2.5, res));
  const glows = [];
  const backdrop = {
    biome,
    seed,
    palette: { ...palette, light: rgba(palette.light, 0.18), lightHex: palette.light },
    width,
    height,
    res: buildRes,
    far: buildFar(palette, rng, width, height),
    near: buildNear(palette, rng, width, height, glows),
    front: buildFront(palette, rng, width),
    glows,
    glowSprites: { light: glowSprite(palette.light), glow: glowSprite(palette.glow) },
    ray: raySprite(palette.light),
    fog: fogSprite(palette.fog, width, rng),
  };
  buildRes = 1;
  return backdrop;
}

/* ---------------------------------------------------------------
   Per-frame rendering
   --------------------------------------------------------------- */

function tileImage(ctx, image, offset, width, viewW, y = 0, height = SCENE_H) {
  let x = -(((offset % width) + width) % width);
  while (x < viewW) {
    ctx.drawImage(image, x, y, width, height);
    x += width;
  }
}

/** Repeat world-space items (period `width`) that fall within the view. */
function eachInView(items, width, camX, viewW, margin, fn) {
  const start = Math.floor((camX - margin) / width);
  const end = Math.floor((camX + viewW + margin) / width);
  for (let k = start; k <= end; k++) {
    for (const item of items) {
      const x = item.x + k * width - camX;
      if (x < -margin || x > viewW + margin) continue;
      fn(item, x, k);
    }
  }
}

/**
 * Draw the scene background for a camera at `camX`, `camY`.
 * `time` drives the light, fog, water and motes.
 */
export function drawBackdrop(ctx, backdrop, camX, time, viewW, viewH, camY = 0, res = 1) {
  const { palette: p, width } = backdrop;
  const raw = PALETTES[backdrop.biome] || PALETTES.brick;

  /* The far hall, fog and wall only change when the camera moves, so they
     are composited into one view-sized canvas and reused between moves. */
  const key = `${camX.toFixed(2)}|${camY.toFixed(2)}|${Math.round(viewW)}|${Math.round(viewH)}|${res.toFixed(2)}`;
  if (!backdrop.composite || backdrop.composite.key !== key) {
    const canvas = backdrop.composite?.canvas || document.createElement('canvas');
    const cw = Math.ceil(viewW * res);
    const ch = Math.ceil(viewH * res);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    const c = canvas.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, cw, ch);
    c.setTransform(res, 0, 0, res, 0, -camY * res);
    tileImage(c, backdrop.far, camX * 0.3, width, viewW);
    c.globalAlpha = 0.9;
    tileImage(c, backdrop.fog, camX * 0.45, width, viewW, 150, 120);
    c.globalAlpha = 1;
    tileImage(c, backdrop.near, camX, width, viewW);
    if (camY < 0) {
      tileImage(c, backdrop.far, camX * 0.3, width, viewW, -SCENE_H);
      tileImage(c, backdrop.near, camX, width, viewW, -SCENE_H);
    }
    // The vignette is baked in too: it only needs redrawing with the view.
    c.setTransform(res, 0, 0, res, 0, 0);
    const g = c.createRadialGradient(viewW / 2, viewH * 0.55, viewH * 0.45, viewW / 2, viewH * 0.55, viewH * 1.2);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.5)');
    c.fillStyle = g;
    c.fillRect(0, 0, viewW, viewH);
    backdrop.composite = { key, canvas };
  }
  ctx.drawImage(backdrop.composite.canvas, 0, 0, viewW, viewH);

  ctx.save();
  ctx.translate(0, -camY);

  // God rays pouring through each opening onto the walkway.
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  eachInView(OPENINGS.map(x => ({ x })), width, camX, viewW, 260, (item, x, k) => {
    const pulse = 0.7 + 0.3 * Math.sin(time * 0.0007 + item.x * 0.01 + k);
    ctx.globalAlpha = 0.42 * pulse;
    ctx.drawImage(backdrop.ray, x - 70, OPEN_TOP - 20, 240, FLOOR_Y - OPEN_TOP + 30);
    ctx.globalAlpha = 0.22 * pulse;
    ctx.drawImage(backdrop.ray, x - 170, OPEN_TOP + 10, 170, FLOOR_Y - OPEN_TOP);
  });
  // Lanterns, crystals and plants breathing with light.
  for (const g of backdrop.glows) {
    eachInView([g], width, camX, viewW, g.r, (item, x) => {
      const f = item.flicker
        ? 0.75 + 0.15 * Math.sin(time * 0.011 + item.phase) + 0.1 * Math.sin(time * 0.027 + item.phase * 2)
        : 0.6 + 0.4 * Math.sin(time * 0.0016 + item.phase);
      ctx.globalAlpha = item.strength * f * 0.55;
      const sprite = item.colour === raw.light ? backdrop.glowSprites.light : backdrop.glowSprites.glow;
      ctx.drawImage(sprite, x - item.r, item.y - item.r, item.r * 2, item.r * 2);
    });
  }
  ctx.restore();

  drawChannel(ctx, backdrop, raw, camX, time, viewW);
  drawMotes(ctx, raw, camX, time, viewW);

  ctx.restore();
  void p;
}

/** The top-edge silhouettes, drawn over the fighters for depth. */
export function drawForeground(ctx, backdrop, camX, viewW, camY = 0) {
  if (!backdrop.front) return;
  ctx.save();
  ctx.translate(0, -camY * 1.2);
  tileImage(ctx, backdrop.front, camX * 1.25, backdrop.width, viewW, -2, 120);
  ctx.restore();
}

function drawChannel(ctx, backdrop, p, camX, time, viewW) {
  const top = CHANNEL_Y;
  const height = SCENE_H - top;
  vGradient(ctx, 0, top, viewW, height, [
    [0, p.water[1]], [0.15, p.water[0]], [0.7, p.water[0]], [1, p.water[1]],
  ]);

  // Light from the openings and lanterns reflected as wobbling streaks.
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const sources = [...OPENINGS.map(x => ({ x, c: p.light, w: 90, a: 0.16 })), ...COLUMNS.map(x => ({ x: x + 52, c: p.light, w: 26, a: 0.3 }))];
  eachInView(sources, SCENE_W, camX, viewW, 100, (s, x, k) => {
    for (let i = 0; i < 5; i++) {
      const y = top + 6 + i * 12;
      const wob = Math.sin(time * 0.002 + i * 1.7 + k) * 5;
      ctx.fillStyle = rgba(s.c, s.a * (1 - i / 6));
      ctx.fillRect(x - s.w / 2 + wob, y, s.w * (1 - i * 0.12), 3);
    }
  });
  ctx.restore();

  // Ripple lines that belong to the world.
  ctx.save();
  ctx.strokeStyle = p.water[2];
  ctx.lineWidth = 1.6;
  for (let band = 0; band < 4; band++) {
    const y = top + 10 + band * 16;
    ctx.globalAlpha = 0.34 - band * 0.06;
    ctx.beginPath();
    for (let x = 0; x <= viewW; x += 12) {
      const world = x + camX;
      const yy = y + Math.sin(world * 0.02 + time * 0.0016 * (12 + band * 5) + band) * 2;
      x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  // A bright lip where the water meets the kerb.
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  for (let x = 0; x <= viewW; x += 8) {
    const y = top + 1 + Math.sin((x + camX) * 0.035 + time * 0.002) * 1.4;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
  void backdrop;
}

function drawMotes(ctx, p, camX, time, viewW) {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 40; i++) {
    // Deterministic pseudo-positions so motes belong to world space.
    const seedX = (i * 137.508) % 1;
    const seedY = (i * 71.31) % 1;
    const drift = Math.sin(time * 0.0004 + i) * 18;
    const span = 1680;
    const base = Math.floor(camX / span) * span;
    const y = 80 + seedY * (FLOOR_Y - 90) + Math.sin(time * 0.0007 + i * 2) * 10 - ((time * 0.006 * (1 + (i % 3))) % 60);
    for (const wx of [base + seedX * span + drift, base + span + seedX * span + drift]) {
      const x = wx - camX;
      if (x < -10 || x > viewW + 10) continue;
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.002 + i));
      ctx.globalAlpha = twinkle * (i % 4 ? 0.5 : 0.85);
      ctx.fillStyle = i % 5 ? p.particle : p.glow;
      const size = 1 + (i % 3) * 0.7;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
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
  const metal = palette.metal || '#a07a48';

  ctx.save();
  ctx.translate(0, -camY);
  const recess = ctx.createLinearGradient(x - 50, 0, x + 50, 0);
  recess.addColorStop(0, 'rgba(0,0,0,0.1)');
  recess.addColorStop(0.5, 'rgba(0,0,0,0.75)');
  recess.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = recess;
  ctx.fillRect(x - 50, topY, 100, bottomY - topY);

  // Brass rails, cel-shaded: lit left half, shadowed right.
  for (const rx of [x - 22, x + 16]) {
    const g = ctx.createLinearGradient(rx, 0, rx + 6, 0);
    g.addColorStop(0, shade(metal, 0.35));
    g.addColorStop(0.5, metal);
    g.addColorStop(0.51, shade(metal, -0.35));
    g.addColorStop(1, shade(metal, -0.45));
    ctx.fillStyle = g;
    ctx.fillRect(rx, topY, 6, bottomY - topY);
  }
  for (let y = bottomY - 14; y > topY; y -= 26) {
    ctx.fillStyle = shade(metal, -0.15);
    ctx.fillRect(x - 22, y, 44, 5);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x - 22, y, 44, 1.2);
  }

  // Light spilling down from the floor above.
  const glow = ctx.createLinearGradient(0, topY, 0, topY + 300);
  glow.addColorStop(0, rgba(palette.lightHex || '#ffcf8a', 0.35));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(x - 90, topY, 180, 300);
  ctx.restore();
}
