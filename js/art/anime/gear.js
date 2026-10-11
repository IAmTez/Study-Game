/* Weapons, shields and helmets, cel-shaded and detailed.

   Weapons are drawn along +x from a grip at the origin, so the hand that
   holds one just rotates the frame. Shields are centred on the hand.
   Helmets are drawn in the head's frame (origin at the head's centre,
   face toward +x). The same drawings serve as inventory icons. */

import {
  cel, curve, poly, ellipse, circle, roundRect, capsule, stroke, fill, glow, sparkle, gem, hatch, frame,
  embroidery, shade, rgba, inkFor,
} from './cel.js';

const GOLD = '#e3b64a';
const STEEL = '#c3ccd6';
const LEATHER = '#6b4a30';

/* ---------------------------------------------------------------
   Weapon parts
   --------------------------------------------------------------- */

function grip(ctx, x0, x1, colour, width = 5.2) {
  const path = capsule(x0, 0, x1, 0, width / 2, width / 2);
  cel(ctx, path, colour, { y0: -3, y1: 3, cast: 1.4, rimWidth: 0.7, line: 0.9 });
  ctx.save();
  ctx.clip(path);
  for (let x = x0 + 1; x < x1; x += 2.6) {
    stroke(ctx, poly([[x, -3], [x + 2, 3]], false), shade(colour, -0.4), 0.7, 0.8);
  }
  ctx.restore();
}

function pommel(ctx, x, colour, jewel) {
  cel(ctx, circle(x, 0, 3.6), colour, { y0: -4, y1: 4, cast: 1.2, rimWidth: 0.6, line: 0.9, gloss: 1.2 });
  if (jewel) gem(ctx, x, 0, 1.7, jewel, { shape: 'round', glowAlpha: 0.3 });
}

function bladeShape(x0, x1, w0, w1, tipLen = 9) {
  return poly([[x0, -w0 / 2], [x1 - tipLen, -w1 / 2], [x1, 0.4], [x1 - tipLen, w1 / 2], [x0, w0 / 2]]);
}

function paintBlade(ctx, path, colour, x0, x1, w, opts = {}) {
  const { glowColour = null, fuller = true, runes = false } = opts;
  if (glowColour) {
    ctx.save();
    ctx.shadowColor = glowColour;
    ctx.shadowBlur = 10;
    fill(ctx, path, rgba(glowColour, 0.35));
    ctx.restore();
  }
  cel(ctx, path, colour, { y0: -w / 2, y1: w / 2, cast: w * 0.38, rim: '#ffffff', rimWidth: 0.9, rimAlpha: 0.75, line: 0.9, gloss: 1.1 });
  ctx.save();
  ctx.clip(path);
  // Bevelled edge: a bright strip along the upper edge.
  fill(ctx, poly([[x0, -w / 2], [x1, -0.3], [x1, -0.9], [x0, -w / 2 + 1.3]]), shade(colour, 0.55), 0.7);
  if (fuller) stroke(ctx, poly([[x0 + 3, 0], [x0 + (x1 - x0) * 0.72, 0]], false), shade(colour, -0.35), 1.1, 0.8);
  if (runes) {
    ctx.font = '4px serif';
    ctx.fillStyle = rgba(glowColour || '#9fd6ff', 0.95);
    for (let x = x0 + 6, i = 0; x < x0 + (x1 - x0) * 0.6; x += 6, i++) ctx.fillText('ᚠᚢᚦᚨᚱᚲ'[i % 6], x, 1.4);
  }
  ctx.restore();
}

function crossguard(ctx, colour, span = 11, jewel = null) {
  const path = curve([[-1.5, -span], [1.2, -span + 1], [1.6, -3], [3, 0], [1.6, 3], [1.2, span - 1], [-1.5, span], [-3, span - 2.5],
    [-1.2, 3], [-2.4, 0], [-1.2, -3], [-3, -span + 2.5]], true, 0.35);
  cel(ctx, path, colour, { y0: -span, y1: span, cast: 1.2, rimWidth: 0.6, line: 0.9, gloss: 1 });
  if (jewel) gem(ctx, 0, 0, 1.9, jewel, { glowAlpha: 0.35 });
}

/* ---------------------------------------------------------------
   Weapons
   --------------------------------------------------------------- */

export function drawWeapon(ctx, look = {}) {
  const blade = look.blade || STEEL;
  const hilt = look.hilt || LEATHER;
  const glowC = look.glow || null;
  if (glowC) glow(ctx, 40, 0, 46, glowC, 0.32);

  switch (look.shape) {
    case 'dagger': {
      grip(ctx, -11, 0, hilt, 4.6);
      pommel(ctx, -12.5, GOLD, null);
      crossguard(ctx, GOLD, 6);
      const b = bladeShape(2, 36, 6, 4.4, 8);
      paintBlade(ctx, b, blade, 2, 36, 6, { glowColour: glowC });
      break;
    }
    case 'fang': {
      grip(ctx, -12, 0, hilt, 5);
      cel(ctx, circle(-13, 0, 3.2), '#e8dfc8', { cast: 1, line: 0.8 });
      crossguard(ctx, shade(hilt, 0.3), 6.5, glowC || '#7fd1c7');
      const b = curve([[2, -4], [18, -6.5], [34, -6], [48, -1], [54, 3], [42, 3.4], [24, 4.4], [2, 4]], true, 0.4);
      paintBlade(ctx, b, blade, 2, 54, 9, { glowColour: glowC, fuller: false });
      stroke(ctx, curve([[6, 1], [26, 0.5], [46, 1.5]], false), shade(blade, -0.2), 0.7, 0.7);
      break;
    }
    case 'cleaver': {
      grip(ctx, -15, 0, hilt, 5.6);
      pommel(ctx, -16.5, shade(hilt, 0.15), null);
      cel(ctx, roundRect(-1.5, -6, 4, 12, 1.5), STEEL, { cast: 1, line: 0.9 });
      const b = poly([[2.5, -5.5], [48, -9], [52, -6], [50, 13], [40, 18], [2.5, 7]]);
      paintBlade(ctx, b, blade, 2.5, 52, 18, { glowColour: glowC, fuller: false });
      fill(ctx, poly([[2.5, -5.5], [48, -9], [52, -6], [48, -6.2], [2.5, -3.2]]), shade(blade, -0.35), 0.8);
      cel(ctx, circle(42, 6, 2.6), '#2a2630', { cast: 0, rim: false, line: 0.7 });
      hatch(ctx, 26, 10, 4, 4, 3, shade(blade, -0.4), 0.5, 0.6, 0.9);
      break;
    }
    case 'hammer': {
      grip(ctx, -26, 60, hilt, 5);
      for (const x of [-22, 6, 34, 56]) cel(ctx, roundRect(x - 1.6, -3.4, 3.2, 6.8, 1), STEEL, { cast: 0.8, line: 0.7 });
      const head = roundRect(56, -14, 18, 28, 3.5);
      cel(ctx, head, blade, { y0: -14, y1: 14, cast: 3.4, line: 1.1, gloss: 1.4 });
      cel(ctx, roundRect(54, -16, 22, 5, 2), shade(blade, -0.15), { cast: 1, line: 0.9 });
      cel(ctx, roundRect(54, 11, 22, 5, 2), shade(blade, -0.15), { cast: 1, line: 0.9 });
      const wheel = look.accent || '#b5523b';
      ctx.save();
      ctx.lineWidth = 2.6;
      ctx.strokeStyle = inkFor(wheel);
      ctx.beginPath(); ctx.arc(65, 0, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = wheel;
      ctx.beginPath(); ctx.arc(65, 0, 8, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2 + 0.4;
        stroke(ctx, poly([[65, 0], [65 + Math.cos(a) * 8, Math.sin(a) * 8]], false), wheel, 1.6);
      }
      cel(ctx, circle(65, 0, 2.4), wheel, { cast: 0.8, line: 0.7, gloss: 1 });
      break;
    }
    case 'rapier': {
      grip(ctx, -12, 0, hilt, 4.2);
      pommel(ctx, -13.5, GOLD, glowC || '#c0392b');
      // Swept cage hilt.
      ctx.save();
      for (const [r, a0, a1] of [[9, -1.2, 1.4], [6.5, -1.5, 1.1], [11, -0.6, 0.9]]) {
        ctx.beginPath(); ctx.arc(-3, 0, r, a0, a1);
        ctx.lineWidth = 2.2; ctx.strokeStyle = inkFor(GOLD); ctx.stroke();
        ctx.lineWidth = 1.3; ctx.strokeStyle = GOLD; ctx.stroke();
      }
      ctx.restore();
      crossguard(ctx, GOLD, 7.5);
      const b = poly([[2, -1.8], [84, -0.7], [89, 0], [84, 0.7], [2, 1.8]]);
      paintBlade(ctx, b, blade, 2, 89, 3.6, { glowColour: glowC, fuller: false });
      break;
    }
    case 'trident': {
      grip(ctx, -34, 62, hilt, 4.6);
      for (const x of [-30, 14, 50]) cel(ctx, roundRect(x - 1.6, -3.2, 3.2, 6.4, 1), GOLD, { cast: 0.8, line: 0.7 });
      // Coral-like head.
      const base = curve([[58, -13], [66, -12], [68, 0], [66, 12], [58, 13], [61, 0]], true, 0.4);
      cel(ctx, base, blade, { y0: -13, y1: 13, cast: 2, line: 1, gloss: 1.2 });
      for (const y of [-11, 0, 11]) {
        const long = y === 0 ? 10 : 0;
        const prong = poly([[64, y - 2], [84 + long, y - 0.8], [92 + long, y], [84 + long, y + 0.8], [64, y + 2]]);
        paintBlade(ctx, prong, blade, 64, 92 + long, 4, { glowColour: glowC, fuller: false });
        fill(ctx, poly([[80 + long, y - 0.8], [77 + long, y - 4.2], [83 + long, y - 0.9]]), blade);
      }
      gem(ctx, 63, 0, 2.4, glowC || '#7fd1c7');
      break;
    }
    case 'quill': {
      grip(ctx, -11, 2, hilt, 4.6);
      pommel(ctx, -12.5, shade(hilt, 0.3), glowC);
      cel(ctx, roundRect(1, -4.5, 6, 9, 2), GOLD, { cast: 1, line: 0.8, gloss: 1 });
      const vane = curve([[6, 0], [16, -11], [40, -14], [66, -8], [80, -1], [82, 0.5], [64, 6], [36, 9], [14, 6.5]], true, 0.45);
      cel(ctx, vane, blade, { y0: -14, y1: 9, cast: 2.6, rim: '#ffffff', rimAlpha: 0.7, line: 0.9 });
      ctx.save();
      ctx.clip(vane);
      for (let x = 12; x < 78; x += 3.4) {
        stroke(ctx, curve([[x, 0], [x + 3, -6 + Math.abs(x - 44) * 0.08], [x + 6, -12 + Math.abs(x - 44) * 0.13]], false), shade(blade, -0.25), 0.55, 0.8);
        stroke(ctx, curve([[x, 0], [x + 3, 4], [x + 5, 8]], false), shade(blade, -0.2), 0.5, 0.6);
      }
      ctx.restore();
      stroke(ctx, curve([[6, 0], [44, -0.5], [82, 0.5]], false), shade(blade, -0.5), 1.1);
      // Steel nib at the tip.
      cel(ctx, poly([[78, -2.6], [90, 0], [78, 2.6]]), STEEL, { cast: 1, line: 0.7, gloss: 0.8 });
      if (glowC) for (const [x, y, r] of [[30, -6, 2.2], [52, -4, 1.6], [70, -2, 2.4]]) sparkle(ctx, x, y, r, '#ffffff', 0.8);
      break;
    }
    case 'axe': {
      grip(ctx, -30, 64, hilt, 5.2);
      for (const x of [-26, 24, 58]) cel(ctx, roundRect(x - 1.8, -3.6, 3.6, 7.2, 1), STEEL, { cast: 0.8, line: 0.7 });
      const head = curve([[50, -4], [54, -24], [66, -33], [72, -26], [66, -10], [70, 6], [72, 26], [62, 32], [54, 20], [50, 5]], true, 0.4);
      paintBlade(ctx, head, blade, 50, 72, 30, { glowColour: glowC, fuller: false });
      if (glowC) {
        // Glowing fractures through the volcanic glass.
        ctx.save();
        ctx.clip(head);
        ctx.shadowColor = glowC; ctx.shadowBlur = 6;
        stroke(ctx, poly([[58, -20], [62, -10], [59, -2], [64, 8], [61, 20]], false), glowC, 1.2);
        stroke(ctx, poly([[62, -10], [67, -14]], false), glowC, 0.8);
        stroke(ctx, poly([[64, 8], [68, 14]], false), glowC, 0.8);
        ctx.restore();
      }
      cel(ctx, roundRect(46, -6, 8, 12, 2), shade(hilt, 0.1), { cast: 1, line: 0.9 });
      break;
    }
    case 'sword':
    default: {
      grip(ctx, -15, 0, hilt, 5);
      pommel(ctx, -17, glowC ? GOLD : shade(hilt, 0.35), glowC || null);
      crossguard(ctx, glowC ? GOLD : shade(blade, -0.15), 11, glowC || null);
      const b = bladeShape(2, 74, 8, 6.4, 11);
      paintBlade(ctx, b, blade, 2, 74, 8, { glowColour: glowC, runes: !!glowC });
      if (glowC) for (const [x, r] of [[30, 2.4], [58, 1.8]]) sparkle(ctx, x, -2.5, r, '#ffffff', 0.85);
      break;
    }
  }
}

/** Total length of a weapon from its grip, used to place trails and icons. */
export const WEAPON_REACH = {
  sword: 74, dagger: 36, fang: 54, cleaver: 52, hammer: 74, rapier: 89, trident: 102, quill: 90, axe: 72,
};

/** How each weapon swings: a slash, a thrust or an overhead smash. */
export function weaponStyle(shape) {
  if (['rapier', 'trident', 'quill'].includes(shape)) return 'thrust';
  if (['hammer', 'axe'].includes(shape)) return 'smash';
  return 'slash';
}

/* ---------------------------------------------------------------
   Shields — centred on the hand, facing the viewer
   --------------------------------------------------------------- */

export function drawShield(ctx, look = {}) {
  const c = look.colour || '#8f969e';
  const trim = look.trim || shade(c, -0.3);
  if (look.glow) glow(ctx, 0, 0, 52, look.glow, 0.35);
  switch (look.shape) {
    case 'grate': {
      const body = roundRect(-18, -23, 36, 46, 7);
      cel(ctx, body, '#5b3d26', { y0: -23, y1: 23, cast: 3, line: 1.2 });
      ctx.save();
      ctx.clip(body);
      for (const x of [-9, 0, 9]) cel(ctx, roundRect(x - 1.8, -24, 3.6, 48, 1.4), c, { cast: 1, line: 0.7, gloss: 0.8 });
      for (const y of [-12, 0, 12]) cel(ctx, roundRect(-19, y - 1.8, 38, 3.6, 1.4), c, { cast: 1, line: 0.7, gloss: 0.8 });
      ctx.restore();
      cel(ctx, body, trim, { cast: 0, rim: false, line: 1.2, alpha: 0 });
      stroke(ctx, body, trim, 3.4);
      stroke(ctx, body, shade(trim, 0.35), 1.2);
      for (const [x, y] of [[-15, -20], [15, -20], [-15, 20], [15, 20]]) cel(ctx, circle(x, y, 1.6), STEEL, { cast: 0.6, line: 0.5 });
      break;
    }
    case 'kite':
    case 'aegis': {
      const outline = [[-17, -23], [0, -26], [17, -23], [19, -6], [12, 12], [0, 28], [-12, 12], [-19, -6]];
      const body = curve(outline, true, 0.3);
      cel(ctx, body, c, { y0: -26, y1: 28, cast: 4, line: 1.3, gloss: 2 });
      const inner = curve([[-13, -19], [0, -21.5], [13, -19], [15, -5], [9.5, 10], [0, 22.5], [-9.5, 10], [-15, -5]], true, 0.3);
      stroke(ctx, inner, inkFor(trim), 3.2);
      stroke(ctx, inner, trim, 2);
      if (look.shape === 'aegis') {
        // Wings of filigree and a radiant heart-stone.
        for (const s of [-1, 1]) {
          embroidery(ctx, [[s * 3, -12], [s * 9, -14], [s * 12, -8], [s * 9, -2]], trim, 1.3, 0.8);
          embroidery(ctx, [[s * 3, 4], [s * 8, 6], [s * 8, 12]], trim, 1.1, 0.7);
        }
        gem(ctx, 0, -2, 5, look.glow || '#6fb4ff', { glowAlpha: 0.6 });
        sparkle(ctx, 8, -14, 3, '#ffffff', 0.9);
      } else {
        // A heraldic chevron and a centre boss.
        const chev = poly([[-12, -2], [0, 8], [12, -2], [12, 4], [0, 14], [-12, 4]]);
        cel(ctx, chev, trim, { cast: 1.4, line: 0.9, gloss: 1 });
        cel(ctx, circle(0, -9, 4.4), STEEL, { cast: 1.4, line: 0.9, gloss: 1.2 });
      }
      break;
    }
    case 'tower': {
      const body = curve([[-18, -26], [0, -31], [18, -26], [19, 26], [0, 30], [-19, 26]], true, 0.2);
      cel(ctx, body, c, { y0: -31, y1: 30, cast: 4, line: 1.3, gloss: 1.6 });
      for (const y of [-14, 4, 20]) stroke(ctx, curve([[-17, y], [0, y + 2], [17, y]], false), shade(c, -0.3), 1.4);
      for (const [x, y, r] of [[-9, -18, 4.2], [7, -7, 3.2], [-4, 9, 5], [10, 16, 3.4], [-12, 20, 2.8], [11, -21, 2.6], [2, 24, 2.2]]) {
        cel(ctx, curve([[x - r, y + r * 0.6], [x - r * 0.6, y - r * 0.7], [x + r * 0.6, y - r * 0.7], [x + r, y + r * 0.6]], true), trim, { cast: r * 0.5, line: 0.7 });
        fill(ctx, ellipse(x, y - r * 0.15, r * 0.4, r * 0.25), shade(c, -0.55));
      }
      if (look.glow) glow(ctx, 0, 0, 30, look.glow, 0.25);
      break;
    }
    case 'round':
    default: {
      cel(ctx, circle(0, 0, 20), c, { y0: -20, y1: 20, cast: 3.6, line: 1.3, gloss: 2.2 });
      stroke(ctx, circle(0, 0, 16.5), shade(c, -0.25), 1.2);
      stroke(ctx, circle(0, 0, 11), shade(c, -0.15), 0.8, 0.8);
      cel(ctx, circle(0, 0, 5.2), shade(c, 0.15), { cast: 1.6, line: 1, gloss: 1.4 });
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        cel(ctx, circle(Math.cos(a) * 18, Math.sin(a) * 18, 1.1), trim, { cast: 0, line: 0.4 });
      }
      sparkle(ctx, -9, -10, 3.2, '#ffffff', 0.8);
      break;
    }
  }
}

/* ---------------------------------------------------------------
   Helmets — in the head's frame
   --------------------------------------------------------------- */

/**
 * Draw an equipped helmet. Returns what it hides: { hair: 'all' | 'bangs' |
 * 'none', face: bool } so the head knows what to draw underneath.
 */
export function drawHelmet(ctx, look = {}, t = 0) {
  const c = look.colour || '#8f969e';
  const trim = look.trim || shade(c, -0.3);
  if (look.glow) glow(ctx, 0, -10, 34, look.glow, 0.32);
  switch (look.shape) {
    case 'cap': {
      const dome = curve([[-15, 1], [-15, -10], [-8, -18.5], [4, -19.5], [13, -14], [15.5, -4], [12, -5.5], [0, -7], [-10, -4]], true, 0.4);
      cel(ctx, dome, c, { y0: -20, y1: 1, cast: 2.6, line: 1.1, gloss: 1.6 });
      const brim = curve([[9, -6], [26, -4.5], [27, -2.2], [10, -2.8]], true, 0.3);
      cel(ctx, brim, trim, { cast: 1, line: 0.9 });
      glow(ctx, 12, -12, 16, '#fff2b0', 0.5);
      cel(ctx, circle(11, -12, 4.4), '#fff7d6', { cast: 1, line: 0.9, ink: inkFor(trim), gloss: 1 });
      stroke(ctx, circle(11, -12, 4.4), trim, 1.4);
      stroke(ctx, curve([[-14, -6], [-2, -9], [12, -8]], false), shade(c, -0.25), 1, 0.7);
      return { hair: 'bangs', face: false };
    }
    case 'hood': {
      const hood = curve([[-19, 18], [-21, -2], [-15, -19], [0, -25], [14, -21], [20, -8], [19, 8], [14, 4], [12, -10],
        [2, -14], [-6, -9], [-8, 6], [-6, 22], [-16, 24]], true, 0.4);
      cel(ctx, hood, c, { y0: -25, y1: 24, cast: 3.4, line: 1.2 });
      stroke(ctx, curve([[12, -10], [2, -14], [-6, -9], [-8, 6]], false), trim, 1.6);
      stroke(ctx, curve([[-14, -14], [-17, 2], [-14, 16]], false), shade(c, -0.3), 0.9, 0.8);
      return { hair: 'bangs', face: false };
    }
    case 'helm': {
      const shell = curve([[-16, 8], [-16.5, -8], [-9, -18], [4, -19.5], [14, -13], [16, -3], [10, -4], [-2, -3], [-6, 4], [-8, 12]], true, 0.4);
      cel(ctx, shell, c, { y0: -20, y1: 12, cast: 3, line: 1.2, gloss: 2 });
      const band = curve([[-16, -1], [-4, -5.5], [10, -6], [16, -3], [15, 0], [10, -2.5], [-4, -2], [-16, 3]], true, 0.3);
      cel(ctx, band, trim, { cast: 1, line: 0.9, gloss: 1 });
      cel(ctx, roundRect(10.5, -6, 3.2, 14, 1.4), shade(c, -0.05), { cast: 1, line: 0.8, gloss: 1 });
      for (const [x, y] of [[-12, -11], [-3, -16], [7, -15], [-13, 1]]) cel(ctx, circle(x, y, 0.9), trim, { cast: 0, line: 0.3 });
      sparkle(ctx, -5, -12, 2.6, '#ffffff', 0.8);
      return { hair: 'bangs', face: false };
    }
    case 'greathelm': {
      const shell = roundRect(-16.5, -21, 34, 37, 11);
      cel(ctx, shell, c, { y0: -21, y1: 16, cast: 3.6, line: 1.3, gloss: 2.2 });
      fill(ctx, roundRect(2, -5, 16, 3.6, 1.8), '#0d0b12');
      glow(ctx, 9, -3, 8, look.glow || '#9fd6ff', 0.4);
      for (let i = 0; i < 4; i++) fill(ctx, circle(9 + i * 2.4, 5, 0.6), '#0d0b12');
      cel(ctx, roundRect(-0.8, -21, 3, 37, 1.2), trim, { cast: 0.8, line: 0.7, gloss: 1 });
      // A crest of horsehair sweeping back.
      const sway = Math.sin(t * 0.003) * 1.5;
      const plume = curve([[-2, -20], [6, -30], [-6, -33 + sway], [-20, -27 + sway], [-26, -14 + sway], [-14, -20]], true, 0.4);
      cel(ctx, plume, trim, { y0: -34, y1: -14, cast: 2.4, line: 1 });
      stroke(ctx, curve([[2, -28], [-10, -30 + sway], [-22, -20 + sway]], false), shade(trim, -0.3), 0.8);
      sparkle(ctx, -9, -10, 3, '#ffffff', 0.75);
      return { hair: 'none', face: true };
    }
    case 'crown': {
      const pts = [[-12, -10], [-14, -24], [-7, -16], [-1, -28], [5, -16], [12, -25], [13, -9], [0, -8]];
      cel(ctx, curve(pts, true, 0.15), c, { y0: -28, y1: -8, cast: 2, line: 1, gloss: 1.6 });
      cel(ctx, curve([[-13, -9], [0, -11.5], [13.5, -8.5], [13, -6], [0, -8.5], [-13, -6.5]], true, 0.3), shade(c, -0.1), { cast: 0.8, line: 0.8 });
      for (const [x, y] of [[-14, -24], [-1, -28], [12, -25]]) gem(ctx, x, y, 1.6, trim, { shape: 'round', glowAlpha: 0.3 });
      gem(ctx, 0, -12.5, 2.2, trim, { glowAlpha: 0.4 });
      if (look.glow) sparkle(ctx, 9, -20, 3, '#ffffff', 0.9);
      return { hair: 'all', face: false };
    }
    case 'diving': {
      const sphere = circle(1, -2, 20.5);
      cel(ctx, sphere, c, { y0: -23, y1: 19, cast: 4.2, line: 1.4, gloss: 2.4 });
      for (let i = 0; i < 10; i++) {
        const a = i * Math.PI / 5;
        cel(ctx, circle(8 + Math.cos(a) * 11.5, -1 + Math.sin(a) * 11.5, 1.1), shade(c, -0.25), { cast: 0, line: 0.4 });
      }
      stroke(ctx, circle(8, -1, 10.5), shade(c, -0.45), 3.2);
      stroke(ctx, circle(8, -1, 10.5), shade(c, 0.25), 1.4);
      cel(ctx, roundRect(-20, 2, 7, 10, 2), shade(c, -0.15), { cast: 1, line: 0.9 });
      return { hair: 'none', face: true, porthole: [8, -1, 9.2], glass: look.trim || '#7fd1c7' };
    }
    default:
      return { hair: 'all', face: false };
  }
}

export { GOLD, STEEL, LEATHER };
