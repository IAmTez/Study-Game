/* Rendering entry points for the vector art.

   `spriteElement(name, scale)` keeps the old API — a canvas 16 × scale CSS
   pixels square — but draws the vector art at the screen's full resolution,
   so icons, portraits and creatures stay crisp on any display. `name` can be
   a role (drawn as the hero), a creature, an item icon or a prop. */

import { drawIcon } from './icons.js';
import { CREATURE_ART, drawCreatureAnime } from './anime/creatures.js';
import { drawAnimeHero, ROLE_STYLE, ANIME_HERO_BOUNDS } from './anime/hero.js';
import { idlePose, stanceOf } from './anime/hero-anim.js';
import { gearLooks, STARTER_GEAR } from './gear.js';

export const SPRITE_SIZE = 16;
const ICON_BOX = 64;

export function pixelRatio() {
  return Math.min(3, Math.max(1, (typeof window !== 'undefined' && window.devicePixelRatio) || 1));
}

export function isHero(name) {
  return !!ROLE_STYLE[name];
}

export function isCreature(name) {
  return !!CREATURE_ART[name];
}

/** The drawing's bounds in its own units. */
export function artBounds(name) {
  if (isHero(name)) return ANIME_HERO_BOUNDS;
  if (isCreature(name)) return CREATURE_ART[name].size;
  return { x: 0, y: 0, w: ICON_BOX, h: ICON_BOX };
}

/** Draw `name` in its own units (heroes and creatures stand on y = 0). */
export function drawArt(ctx, name, opts = {}) {
  if (isHero(name)) {
    const gear = opts.gear || gearLooks(opts.equipped || STARTER_GEAR);
    const t = opts.t || 0;
    drawAnimeHero(ctx, name, gear, opts.pose || idlePose(stanceOf(gear), t), { now: t });
    return;
  }
  if (isCreature(name)) {
    drawCreatureAnime(ctx, name, opts.anim || { t: opts.t || 0, now: opts.t || 0, wind: 0, strike: 0, hurt: 0, phys: null });
    return;
  }
  if (!drawIcon(ctx, name, opts.look || null)) {
    // Unknown art: a clear placeholder rather than nothing at all.
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(8, 8, 48, 48);
  }
}

/** Draw `name` scaled to fit a w × h box, centred, with a little padding. */
export function paintArt(ctx, name, w, h, opts = {}) {
  const b = artBounds(name);
  const pad = opts.pad ?? 0.06;
  const k = Math.min((w * (1 - pad * 2)) / b.w, (h * (1 - pad * 2)) / b.h);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(k, k);
  ctx.translate(-(b.x + b.w / 2), -(b.y + b.h / 2));
  drawArt(ctx, name, opts);
  ctx.restore();
}

/** A standalone <canvas> showing one drawing — for use in the DOM UI. */
export function spriteElement(name, scale = 3, opts = {}) {
  const size = SPRITE_SIZE * scale;
  const ratio = pixelRatio();
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(size * ratio);
  canvas.height = Math.round(size * ratio);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  canvas.className = opts.className || 'art';
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  if (opts.flip) { ctx.translate(size, 0); ctx.scale(-1, 1); }
  paintArt(ctx, name, size, size, opts);
  return canvas;
}

/* A cache of rendered static drawings (props), keyed by name and resolution. */
const cache = new Map();

/**
 * An offscreen canvas of `name` drawn so that one art unit is `unit` world
 * pixels, at `res` device pixels per world pixel. Returns the canvas plus its
 * size in world pixels and where its origin (feet) sits inside it.
 */
export function renderArt(name, unit, res, opts = {}, target = null) {
  const b = artBounds(name);
  const w = b.w * unit;
  const h = b.h * unit;
  const key = !target && !opts.animated ? `${name}|${unit}|${res}|${opts.look ? JSON.stringify(opts.look) : ''}` : null;
  if (key && cache.has(key)) return cache.get(key);

  const canvas = target || document.createElement('canvas');
  const cw = Math.max(1, Math.ceil(w * res));
  const ch = Math.max(1, Math.ceil(h * res));
  if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cw, ch);
  const k = unit * res;
  ctx.setTransform(k, 0, 0, k, -b.x * k, -b.y * k);
  drawArt(ctx, name, opts);
  const out = { canvas, w, h, originX: -b.x * unit, originY: -b.y * unit };
  if (key) cache.set(key, out);
  return out;
}
