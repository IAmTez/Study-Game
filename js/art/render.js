/* Canvas rendering for the 16x16 sprite grids.

   Sprites are rasterised once per (name, scale, tint) into an offscreen
   canvas and cached — the battle scene redraws every frame, so re-reading the
   character grids each time would be wasteful. */

import { SPRITES } from './sprites.js';

export const SPRITE_SIZE = 16;

const cache = new Map();

function rasterise(name, scale, tint, tintAlpha) {
  const sprite = SPRITES[name];
  const canvas = document.createElement('canvas');
  canvas.width = SPRITE_SIZE * scale;
  canvas.height = SPRITE_SIZE * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  if (!sprite) {
    // Unknown sprite: draw a magenta "missing" box rather than nothing at all.
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(scale, scale, canvas.width - scale * 2, canvas.height - scale * 2);
    return canvas;
  }
  for (let y = 0; y < Math.min(SPRITE_SIZE, sprite.p.length); y++) {
    const row = sprite.p[y];
    for (let x = 0; x < Math.min(SPRITE_SIZE, row.length); x++) {
      const ch = row[x];
      if (ch === '.') continue;
      const colour = sprite.c[ch];
      if (!colour) continue;
      ctx.fillStyle = colour;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
  if (tint) {
    ctx.globalAlpha = tintAlpha;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
  return canvas;
}

/** Cached offscreen canvas for a sprite at a given scale. */
export function spriteCanvas(name, scale = 3, tint = null, tintAlpha = 0.35) {
  const key = `${name}|${scale}|${tint || ''}|${tintAlpha}`;
  let canvas = cache.get(key);
  if (!canvas) {
    canvas = rasterise(name, scale, tint, tintAlpha);
    cache.set(key, canvas);
  }
  return canvas;
}

/** Blit a sprite onto a 2D context at device pixel (x, y). */
export function drawSprite(ctx, name, x, y, scale = 3, opts = {}) {
  const { flip = false, alpha = 1, tint = null, tintAlpha = 0.35 } = opts;
  const src = spriteCanvas(name, scale, tint, tintAlpha);
  const prevAlpha = ctx.globalAlpha;
  if (alpha !== 1) ctx.globalAlpha = alpha;
  if (flip) {
    ctx.save();
    ctx.translate(x + src.width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(src, 0, 0);
    ctx.restore();
  } else {
    ctx.drawImage(src, x, y);
  }
  ctx.globalAlpha = prevAlpha;
}

/** A standalone <canvas> element showing one sprite — for use in the DOM UI. */
export function spriteElement(name, scale = 3, opts = {}) {
  const src = spriteCanvas(name, scale, opts.tint || null, opts.tintAlpha ?? 0.35);
  const canvas = document.createElement('canvas');
  canvas.width = src.width;
  canvas.height = src.height;
  canvas.className = opts.className || '';
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  if (opts.flip) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(src, 0, 0);
  return canvas;
}

/** Development helper: report malformed sprite grids. */
export function validateSprites() {
  const problems = [];
  for (const [name, sprite] of Object.entries(SPRITES)) {
    if (sprite.p.length !== SPRITE_SIZE) problems.push(`${name}: ${sprite.p.length} rows`);
    sprite.p.forEach((row, i) => {
      if (row.length !== SPRITE_SIZE) problems.push(`${name} row ${i}: ${row.length} chars`);
      for (const ch of row) {
        if (ch !== '.' && !(ch in sprite.c)) problems.push(`${name} row ${i}: unmapped '${ch}'`);
      }
    });
  }
  if (problems.length) console.warn('[sprites] problems:\n' + problems.join('\n'));
  else console.info(`[sprites] ${Object.keys(SPRITES).length} sprites OK`);
  return problems;
}
