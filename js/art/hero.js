/* The player character, drawn as a layered vector rig.

   Local space: feet on y = 0, facing right, about 150 units tall. The rig is
   built back to front — cape, far leg, far arm, near leg, body, armour, head,
   weapon, near arm and off hand — and every equipped item has its own layer,
   so a helmet, boots, chest armour, weapon, shield or second weapon, rings and
   charms all show on the character.

   Each role has a base look (clothes, hair, hat or hood, cape or scarf) that
   stays recognisable under light armour; heavy armour and helmets replace it. */

import {
  shade, rgba, inkOf, poly, smooth, ellipsePath, circlePath, roundRectPath,
  paint, line, limb, glow, gloss, withTransform, eye,
} from './vector.js';

const DEG = Math.PI / 180;

export const ROLE_LOOKS = {
  knight: {
    cloth: '#2f5fa8', trim: '#e3c25b', legs: '#3a3f4b', hair: '#6b4a2f', skin: '#e8b48a',
    back: { type: 'cape', colour: '#a8323a' }, head: { type: 'hair', style: 'short' }, skirt: 'tabard',
  },
  mage: {
    cloth: '#5a3fa8', trim: '#e3c25b', legs: '#3b2a6b', hair: '#ddd6c8', skin: '#efc39b',
    back: null, head: { type: 'wizard', colour: '#4f3696', band: '#e3c25b' }, skirt: 'robe', beard: '#ece6da',
  },
  rogue: {
    cloth: '#2f4a3a', trim: '#9fb37a', legs: '#1f2a24', hair: '#2b2018', skin: '#d9a07a',
    back: { type: 'scarf', colour: '#9a2f3c' }, head: { type: 'hood', colour: '#24382d' }, mask: '#1b241f',
  },
  cleric: {
    cloth: '#ece6d6', trim: '#d6a73a', legs: '#b9ae93', hair: '#c98b4a', skin: '#f0c7a0',
    back: { type: 'cape', colour: '#d6a73a' }, head: { type: 'hair', style: 'long', circlet: '#e3c25b' }, skirt: 'robe',
  },
  scholar: {
    cloth: '#7a5236', trim: '#e2d3ad', legs: '#4a3a2c', hair: '#3a2a1e', skin: '#e2b089',
    back: { type: 'satchel', colour: '#5b3d26' }, head: { type: 'hair', style: 'messy' }, glasses: true, skirt: 'coat',
  },
  warden: {
    cloth: '#3f6b3a', trim: '#a8c46a', legs: '#2a3a26', hair: '#5b3d26', skin: '#c99a72',
    back: { type: 'mantle', colour: '#2f5a33' }, head: { type: 'hood', colour: '#355f35', leaves: '#7fb05a' },
  },
};

export const HEAD = { x: 4, y: -133, r: 22 };
const BOOT_DEFAULT = '#4a3424';

/* ---------------------------------------------------------------
   Weapons — drawn pointing along +x from a grip at the origin
   --------------------------------------------------------------- */

export function drawWeapon(ctx, look) {
  const blade = look.blade || '#b9c2cf';
  const hilt = look.hilt || '#5b3d26';
  if (look.glow) glow(ctx, 34, 0, 34, look.glow, 0.4);

  switch (look.shape) {
    case 'dagger':
    case 'fang': {
      limb(ctx, [[-10, 0], [0, 0]], 5, hilt, { outline: 1.8 });
      roundRectPath(ctx, -1.5, -6, 3, 12, 1.5); paint(ctx, look.shape === 'fang' ? hilt : '#c9a227', -6, 6, { line: 1.6 });
      if (look.shape === 'fang') {
        smooth(ctx, [[2, -4], [18, -6], [34, -3], [44, 2], [30, 4], [14, 4], [2, 4]]);
      } else {
        poly(ctx, [[2, -3.5], [26, -2.5], [33, 0], [26, 2.5], [2, 3.5]]);
      }
      paint(ctx, blade, -5, 5, { line: 1.8, light: 0.3 });
      poly(ctx, [[5, -1], [28, 0]], false); line(ctx, 'rgba(255,255,255,.6)', 1);
      break;
    }
    case 'cleaver': {
      limb(ctx, [[-14, 0], [2, 0]], 5.5, hilt, { outline: 1.8 });
      poly(ctx, [[2, -5], [44, -7], [46, 12], [36, 16], [2, 6]]);
      paint(ctx, blade, -7, 16, { line: 2, light: 0.25 });
      poly(ctx, [[6, -3], [42, -5]], false); line(ctx, 'rgba(255,255,255,.55)', 1.4);
      circlePath(ctx, 38, 4, 2.4); paint(ctx, shade(blade, -0.5), 2, 6, { line: 0 });
      break;
    }
    case 'hammer': {
      limb(ctx, [[-22, 0], [52, 0]], 5, hilt, { outline: 1.8 });
      roundRectPath(ctx, 46, -13, 16, 26, 3); paint(ctx, blade, -13, 13, { line: 2 });
      circlePath(ctx, 54, 0, 8); line(ctx, look.accent || '#b5523b', 3);
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2;
        poly(ctx, [[54, 0], [54 + Math.cos(a) * 8, Math.sin(a) * 8]], false); line(ctx, look.accent || '#b5523b', 2);
      }
      break;
    }
    case 'rapier': {
      limb(ctx, [[-11, 0], [0, 0]], 4, hilt, { outline: 1.6 });
      ctx.beginPath(); ctx.arc(1, 0, 7, -Math.PI / 2, Math.PI / 2); line(ctx, hilt, 2.6);
      poly(ctx, [[3, -1.6], [68, -0.6], [72, 0], [68, 0.6], [3, 1.6]]);
      paint(ctx, blade, -2, 2, { line: 1.2, light: 0.3 });
      break;
    }
    case 'trident': {
      limb(ctx, [[-30, 0], [58, 0]], 4.5, hilt, { outline: 1.8 });
      poly(ctx, [[54, -11], [60, -11], [60, 11], [54, 11]]); paint(ctx, blade, -11, 11, { line: 1.8 });
      for (const y of [-9, 0, 9]) {
        poly(ctx, [[58, y - 2], [76 + (y === 0 ? 6 : 0), y - 0.5], [80 + (y === 0 ? 6 : 0), y], [76 + (y === 0 ? 6 : 0), y + 0.5], [58, y + 2]]);
        paint(ctx, blade, y - 2, y + 2, { line: 1.4, light: 0.3 });
      }
      break;
    }
    case 'quill': {
      limb(ctx, [[-10, 0], [2, 0]], 4.5, hilt, { outline: 1.6 });
      smooth(ctx, [[2, 0], [16, -9], [42, -11], [64, -4], [70, 0], [60, 4], [30, 7], [10, 5]]);
      paint(ctx, blade, -11, 7, { line: 1.8, light: 0.2 });
      for (let x = 14; x < 62; x += 7) {
        poly(ctx, [[x, 0], [x + 6, -7 + Math.abs(x - 40) * 0.12]], false); line(ctx, shade(blade, -0.3), 1);
      }
      poly(ctx, [[2, 0], [68, 0]], false); line(ctx, shade(blade, -0.45), 1.2);
      break;
    }
    case 'axe': {
      limb(ctx, [[-26, 0], [60, 0]], 5, hilt, { outline: 1.8 });
      smooth(ctx, [[40, -4], [46, -24], [62, -28], [58, -10], [60, 8], [56, 26], [44, 22], [40, 4]]);
      paint(ctx, blade, -28, 26, { line: 2, light: 0.35 });
      smooth(ctx, [[58, -24], [57, 0], [54, 22]], false); line(ctx, rgba(look.glow || '#ffffff', 0.7), 1.6);
      break;
    }
    case 'sword':
    default: {
      limb(ctx, [[-13, 0], [0, 0]], 5, hilt, { outline: 1.8 });
      circlePath(ctx, -14, 0, 3.2); paint(ctx, '#c9a227', -3, 3, { line: 1.4 });
      roundRectPath(ctx, -2, -9, 4.5, 18, 2); paint(ctx, look.glow ? '#c9a227' : shade(hilt, 0.2), -9, 9, { line: 1.6 });
      poly(ctx, [[2, -3.6], [56, -3], [64, 0], [56, 3], [2, 3.6]]);
      paint(ctx, blade, -4, 4, { line: 1.8, light: 0.3 });
      poly(ctx, [[5, 0], [55, 0]], false); line(ctx, shade(blade, -0.25), 1);
      poly(ctx, [[5, -1.8], [52, -1.4]], false); line(ctx, 'rgba(255,255,255,.55)', 0.9);
      break;
    }
  }
}

/* ---------------------------------------------------------------
   Shields — centred on the hand, facing the viewer
   --------------------------------------------------------------- */

export function drawShield(ctx, look) {
  const c = look.colour || '#8f969e';
  const trim = look.trim || shade(c, -0.3);
  if (look.glow) glow(ctx, 0, 0, 40, look.glow, 0.35);
  switch (look.shape) {
    case 'grate': {
      roundRectPath(ctx, -17, -21, 34, 42, 6); paint(ctx, c, -21, 21, { line: 2.4 });
      for (const x of [-8, 0, 8]) { poly(ctx, [[x, -18], [x, 18]], false); line(ctx, shade(c, -0.45), 2.2); }
      for (const y of [-10, 0, 10]) { poly(ctx, [[-14, y], [14, y]], false); line(ctx, shade(c, -0.45), 2.2); }
      roundRectPath(ctx, -17, -21, 34, 42, 6); line(ctx, trim, 3);
      break;
    }
    case 'kite':
    case 'aegis': {
      const pts = [[-16, -22], [16, -22], [18, -6], [0, 26], [-18, -6]];
      smooth(ctx, pts, true, 0.25);
      paint(ctx, c, -22, 26, { line: 2.6, light: 0.22 });
      smooth(ctx, [[-12, -18], [12, -18], [13, -6], [0, 19], [-13, -6]], true, 0.25); line(ctx, trim, 2.2);
      if (look.shape === 'aegis') {
        glow(ctx, 0, -2, 14, look.glow || '#6fb4ff', 0.8);
        poly(ctx, [[0, -12], [7, -2], [0, 10], [-7, -2]]); paint(ctx, look.glow || '#6fb4ff', -12, 10, { line: 1.4, ink: trim, light: 0.5 });
      } else {
        poly(ctx, [[0, -18], [0, 18]], false); line(ctx, trim, 3.4);
        poly(ctx, [[-13, -6], [13, -6]], false); line(ctx, trim, 3.4);
      }
      gloss(ctx, -3, -8, 12, 12, 0.4);
      break;
    }
    case 'tower': {
      smooth(ctx, [[-17, -24], [0, -29], [17, -24], [17, 24], [-17, 24]], true, 0.2);
      paint(ctx, c, -29, 24, { line: 2.6 });
      for (const [x, y, r] of [[-9, -12, 4], [6, -4, 3], [-4, 8, 5], [9, 14, 3], [-11, 17, 3], [10, -16, 2.5]]) {
        circlePath(ctx, x, y, r); paint(ctx, trim, y - r, y + r, { line: 1.2 });
        circlePath(ctx, x, y, r * 0.4); ctx.fillStyle = shade(c, -0.5); ctx.fill();
      }
      break;
    }
    case 'round':
    default: {
      circlePath(ctx, 0, 0, 19); paint(ctx, c, -19, 19, { line: 2.4, light: 0.3 });
      circlePath(ctx, 0, 0, 15.5); line(ctx, trim, 1.6);
      circlePath(ctx, 0, 0, 5); paint(ctx, shade(c, 0.2), -5, 5, { line: 1.6 });
      gloss(ctx, -2, -2, 13, 13, 0.45);
      break;
    }
  }
}

/* ---------------------------------------------------------------
   Head pieces
   --------------------------------------------------------------- */

function drawHair(ctx, look, behind) {
  const { x, y, r } = HEAD;
  const hair = look.hair;
  const style = look.head?.style;
  if (behind) {
    if (style === 'long') {
      smooth(ctx, [[x - 14, y - 12], [x - 22, y + 8], [x - 20, y + 30], [x - 6, y + 34], [x + 2, y + 14]]);
      paint(ctx, hair, y - 12, y + 34, { line: 2.2 });
    }
    return;
  }
  if (style === 'messy') {
    smooth(ctx, [[x - 22, y + 2], [x - 24, y - 12], [x - 16, y - 24], [x - 4, y - 27], [x + 4, y - 30], [x + 12, y - 24],
      [x + 22, y - 20], [x + 20, y - 10], [x + 10, y - 12], [x - 2, y - 10], [x - 10, y - 4], [x - 14, y + 6]]);
  } else if (style === 'long') {
    smooth(ctx, [[x - 22, y + 4], [x - 22, y - 14], [x - 10, y - 25], [x + 8, y - 25], [x + 22, y - 12], [x + 18, y - 8],
      [x + 4, y - 14], [x - 8, y - 8], [x - 14, y + 8]]);
  } else {
    smooth(ctx, [[x - 22, y + 2], [x - 21, y - 14], [x - 8, y - 24], [x + 10, y - 23], [x + 22, y - 12], [x + 16, y - 9],
      [x + 2, y - 12], [x - 10, y - 6], [x - 14, y + 6]]);
  }
  paint(ctx, hair, y - 28, y + 6, { line: 2.2, light: 0.22 });
  gloss(ctx, x - 2, y - 14, 12, 7, 0.25);
  if (look.head?.circlet) {
    ctx.beginPath(); ctx.ellipse(x, y - 9, r - 1, 5, 0, Math.PI * 0.05, Math.PI * 0.95, true); line(ctx, look.head.circlet, 2.4);
    circlePath(ctx, x + 6, y - 14, 2.6); paint(ctx, '#e0607e', y - 17, y - 11, { line: 1 });
  }
}

function drawFace(ctx, look, covered) {
  const { x, y } = HEAD;
  if (!covered.eyes) {
    eye(ctx, x + 11, y - 2, 3.1, '#2a3550');
    poly(ctx, [[x + 7, y - 9], [x + 15, y - 9.5]], false); line(ctx, shade(look.hair, -0.2), 1.8);
  }
  if (!covered.mouth) {
    // Nose and a small determined mouth.
    smooth(ctx, [[x + 19, y - 1], [x + 22, y + 4], [x + 18, y + 5]], false); line(ctx, shade(look.skin, -0.35), 1.4);
    ctx.beginPath(); ctx.moveTo(x + 12, y + 11); ctx.quadraticCurveTo(x + 15, y + 12.5, x + 18, y + 10); line(ctx, '#7a3f35', 1.5);
    // A touch of colour in the cheek.
    ellipsePath(ctx, x + 9, y + 5, 3.5, 2.2); ctx.fillStyle = rgba('#e0607e', 0.25); ctx.fill();
  }
  if (look.glasses && !covered.eyes) {
    circlePath(ctx, x + 12, y - 2, 5.2); line(ctx, '#3a2a1e', 1.6);
    ctx.fillStyle = 'rgba(200,230,255,.18)'; ctx.fill();
    poly(ctx, [[x + 6.8, y - 3], [x - 4, y - 5]], false); line(ctx, '#3a2a1e', 1.4);
  }
  if (look.mask && !covered.mouth) {
    smooth(ctx, [[x - 4, y + 2], [x + 10, y + 1], [x + 22, y + 2], [x + 20, y + 13], [x + 8, y + 18], [x - 4, y + 14]]);
    paint(ctx, look.mask, y + 1, y + 18, { line: 1.8 });
  }
  if (look.beard && !covered.mouth) {
    smooth(ctx, [[x - 2, y + 4], [x + 10, y + 8], [x + 21, y + 6], [x + 20, y + 20], [x + 10, y + 36], [x + 2, y + 24]]);
    paint(ctx, look.beard, y + 4, y + 36, { line: 1.8, light: 0.1 });
    ctx.beginPath(); ctx.moveTo(x + 12, y + 11); ctx.quadraticCurveTo(x + 15, y + 12, x + 18, y + 10); line(ctx, '#7a5a50', 1.4);
  }
}

/** Role headgear (no helmet equipped). */
function drawRoleHat(ctx, look) {
  const { x, y, r } = HEAD;
  const head = look.head || {};
  if (head.type === 'wizard') {
    smooth(ctx, [[x - 20, y - 12], [x - 10, y - 30], [x - 6, y - 52], [x - 18, y - 70], [x - 2, y - 58], [x + 10, y - 34], [x + 22, y - 14]]);
    paint(ctx, head.colour, y - 70, y - 12, { line: 2.4, light: 0.2 });
    ellipsePath(ctx, x + 1, y - 13, 32, 6.5, -0.06); paint(ctx, shade(head.colour, -0.08), y - 19, y - 7, { line: 2.4 });
    ctx.beginPath(); ctx.ellipse(x + 1, y - 17, 20, 4, -0.06, Math.PI * 0.05, Math.PI * 0.95); line(ctx, head.band, 3);
    for (const [sx, sy] of [[x - 2, y - 40], [x + 4, y - 28]]) {
      poly(ctx, [[sx, sy - 3], [sx + 1, sy - 1], [sx + 3, sy], [sx + 1, sy + 1], [sx, sy + 3], [sx - 1, sy + 1], [sx - 3, sy], [sx - 1, sy - 1]]);
      ctx.fillStyle = head.band; ctx.fill();
    }
    return { eyes: false, mouth: false, hair: 'sides' };
  }
  if (head.type === 'hood') {
    smooth(ctx, [[x - 24, y + 14], [x - 26, y - 6], [x - 18, y - 24], [x, y - 30], [x + 18, y - 24], [x + 26, y - 6],
      [x + 22, y + 10], [x + 14, y + 4], [x + 8, y - 16], [x - 6, y - 14], [x - 8, y + 6], [x - 4, y + 22], [x - 18, y + 24]]);
    paint(ctx, head.colour, y - 30, y + 24, { line: 2.4, light: 0.2 });
    gloss(ctx, x - 6, y - 12, 15, 14, 0.2);
    if (head.leaves) {
      for (const [lx, ly, a] of [[x - 14, y - 26, -0.8], [x - 2, y - 32, -0.2], [x + 10, y - 30, 0.4], [x - 22, y - 14, -1.3]]) {
        withTransform(ctx, lx, ly, a, 1, () => {
          smooth(ctx, [[0, 0], [5, -6], [0, -14], [-5, -6]]);
          paint(ctx, head.leaves, -14, 0, { line: 1.4 });
          poly(ctx, [[0, 0], [0, -12]], false); line(ctx, shade(head.leaves, -0.4), 0.8);
        });
      }
    }
    return { eyes: false, mouth: false, hair: 'none' };
  }
  return null;
}

/** An equipped helmet. Returns which parts of the face it covers. */
export function drawHelmet(ctx, look, role) {
  const { x, y, r } = HEAD;
  const c = look.colour || '#8f969e';
  const trim = look.trim || shade(c, -0.3);
  if (look.glow) glow(ctx, x, y - 16, 30, look.glow, 0.35);
  switch (look.shape) {
    case 'cap': {
      smooth(ctx, [[x - 23, y - 2], [x - 20, y - 20], [x, y - 28], [x + 20, y - 20], [x + 23, y - 4]]);
      paint(ctx, c, y - 28, y - 2, { line: 2.4, light: 0.25 });
      poly(ctx, [[x + 14, y - 6], [x + 32, y - 3], [x + 30, y + 1], [x + 12, y - 1]]); paint(ctx, trim, y - 6, y + 1, { line: 1.8 });
      circlePath(ctx, x + 14, y - 16, 5); paint(ctx, '#ece6d6', y - 21, y - 11, { line: 1.6, ink: trim });
      gloss(ctx, x - 4, y - 14, 14, 10, 0.35);
      return { eyes: false, mouth: false, hair: 'sides' };
    }
    case 'hood': {
      drawRoleHat(ctx, { head: { type: 'hood', colour: c } });
      ctx.beginPath(); ctx.arc(x + 4, y - 4, 19, -Math.PI * 0.95, -Math.PI * 0.1); line(ctx, trim, 2);
      return { eyes: false, mouth: false, hair: 'none' };
    }
    case 'helm': {
      smooth(ctx, [[x - 24, y + 6], [x - 23, y - 16], [x - 8, y - 28], [x + 10, y - 27], [x + 23, y - 14], [x + 24, y - 2],
        [x + 16, y - 6], [x - 6, y - 4], [x - 8, y + 10]]);
      paint(ctx, c, y - 28, y + 10, { line: 2.4, light: 0.3 });
      roundRectPath(ctx, x + 15, y - 8, 4.5, 18, 2); paint(ctx, shade(c, -0.1), y - 8, y + 10, { line: 1.6 });
      for (const [rx, ry] of [[x - 14, y - 18], [x - 2, y - 24], [x + 10, y - 22], [x - 18, y - 4]]) {
        circlePath(ctx, rx, ry, 1.6); ctx.fillStyle = trim; ctx.fill();
      }
      gloss(ctx, x - 4, y - 14, 16, 12, 0.45);
      return { eyes: false, mouth: false, hair: 'none' };
    }
    case 'greathelm': {
      roundRectPath(ctx, x - 23, y - 26, 47, 50, 12); paint(ctx, c, y - 26, y + 24, { line: 2.6, light: 0.3 });
      roundRectPath(ctx, x + 2, y - 6, 22, 5, 2.5); ctx.fillStyle = '#0d1017'; ctx.fill();
      for (let i = 0; i < 3; i++) { circlePath(ctx, x + 14 + i * 3, y + 8, 1); ctx.fillStyle = '#0d1017'; ctx.fill(); }
      smooth(ctx, [[x - 10, y - 26], [x - 4, y - 40], [x + 8, y - 44], [x + 2, y - 30]]); paint(ctx, trim, y - 44, y - 26, { line: 1.8 });
      poly(ctx, [[x + 1, y - 24], [x + 1, y + 22]], false); line(ctx, trim, 2);
      gloss(ctx, x - 6, y - 8, 16, 18, 0.4);
      return { eyes: true, mouth: true, hair: 'none' };
    }
    case 'crown': {
      poly(ctx, [[x - 18, y - 14], [x - 20, y - 32], [x - 10, y - 22], [x - 2, y - 36], [x + 6, y - 22], [x + 16, y - 34], [x + 18, y - 14]]);
      paint(ctx, c, y - 36, y - 14, { line: 2.2, light: 0.35 });
      for (const [gx, gy] of [[x - 9, y - 18], [x + 1, y - 18], [x + 11, y - 18]]) {
        circlePath(ctx, gx, gy, 2.6); paint(ctx, trim, gy - 3, gy + 3, { line: 1 });
      }
      return { eyes: false, mouth: false, hair: 'all' };
    }
    case 'diving': {
      circlePath(ctx, x + 2, y - 2, 29); paint(ctx, c, y - 31, y + 27, { line: 2.8, light: 0.3 });
      circlePath(ctx, x + 12, y, 13); paint(ctx, look.trim || '#7fd1c7', y - 13, y + 13, { line: 3, ink: shade(c, -0.5), light: 0.5, alpha: 0.85 });
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        circlePath(ctx, x + 12 + Math.cos(a) * 16, Math.sin(a) * 16 + y, 1.6); ctx.fillStyle = shade(c, -0.5); ctx.fill();
      }
      gloss(ctx, x - 6, y - 10, 20, 18, 0.4);
      gloss(ctx, x + 10, y - 3, 8, 8, 0.6);
      return { eyes: true, mouth: true, hair: 'none', porthole: true };
    }
    default:
      return { eyes: false, mouth: false, hair: 'all' };
  }
}

/* ---------------------------------------------------------------
   Body pieces
   --------------------------------------------------------------- */

function drawBack(ctx, look, sway) {
  const back = look.back;
  if (!back) return;
  if (back.type === 'cape') {
    smooth(ctx, [[-16, -106], [8, -106], [2, -80], [-6, -40], [-20 + sway, -14], [-34 + sway, -18], [-30, -60], [-24, -96]]);
    paint(ctx, back.colour, -106, -14, { line: 2.4 });
    smooth(ctx, [[-20, -96], [-24, -60], [-28 + sway, -22]], false); line(ctx, shade(back.colour, -0.25), 2);
  } else if (back.type === 'scarf') {
    smooth(ctx, [[-4, -110], [-18, -104], [-38 + sway, -96], [-52 + sway * 1.4, -100], [-40 + sway, -104], [-24, -112]]);
    paint(ctx, back.colour, -112, -96, { line: 2 });
    smooth(ctx, [[-6, -106], [-22, -96], [-34 + sway, -84], [-40 + sway, -88], [-24, -102]]);
    paint(ctx, shade(back.colour, -0.1), -106, -84, { line: 2 });
  } else if (back.type === 'mantle') {
    smooth(ctx, [[-20, -108], [14, -110], [10, -92], [-6, -70], [-20 + sway, -54], [-30, -66], [-30, -92]]);
    paint(ctx, back.colour, -110, -54, { line: 2.4 });
    for (let i = 0; i < 4; i++) {
      withTransform(ctx, -26 + i * 2 + sway * 0.5, -62 + i * -10, -0.6 + i * 0.2, 1, () => {
        smooth(ctx, [[0, 0], [5, -6], [0, -13], [-5, -6]]);
        paint(ctx, shade(back.colour, 0.25), -13, 0, { line: 1.2 });
      });
    }
  } else if (back.type === 'satchel') {
    roundRectPath(ctx, -26, -76, 20, 22, 4); paint(ctx, back.colour, -76, -54, { line: 2.2 });
    poly(ctx, [[-26, -70], [-6, -70]], false); line(ctx, shade(back.colour, -0.35), 1.6);
    circlePath(ctx, -16, -66, 2); ctx.fillStyle = '#c9a227'; ctx.fill();
  }
}

function drawLeg(ctx, hip, knee, ankle, colour, boots) {
  limb(ctx, [hip, knee, ankle], 14, colour);
  const [ax, ay] = ankle;
  if (!boots) {
    smooth(ctx, [[ax - 8, ay - 4], [ax + 2, ay - 8], [ax + 14, ay - 4], [ax + 16, ay + 6], [ax - 8, ay + 6]], true, 0.3);
    paint(ctx, BOOT_DEFAULT, ay - 8, ay + 6, { line: 2.2 });
    return;
  }
  const c = boots.colour || '#3d4a3a';
  const trim = boots.trim || shade(c, -0.3);
  if (boots.glow) glow(ctx, ax + 3, ay - 10, 18, boots.glow, 0.35);
  if (boots.shape === 'wraps') {
    limb(ctx, [[knee[0] * 0.4 + ax * 0.6, knee[1] * 0.4 + ay * 0.6], [ax, ay - 2]], 15, c, { outline: 2 });
    for (let i = 0; i < 4; i++) {
      const t = 0.2 + i * 0.2;
      const px = knee[0] * (0.4 - t * 0.4) + ax * (0.6 + t * 0.4);
      const py = knee[1] * (0.4 - t * 0.4) + ay * (0.6 + t * 0.4);
      poly(ctx, [[px - 7, py - 3], [px + 7, py + 1]], false); line(ctx, trim, 1.4);
    }
    smooth(ctx, [[ax - 7, ay - 4], [ax + 2, ay - 7], [ax + 13, ay - 3], [ax + 15, ay + 6], [ax - 7, ay + 6]], true, 0.3);
    paint(ctx, shade(c, -0.25), ay - 7, ay + 6, { line: 2 });
    return;
  }
  // Tall boots: shaft up to just below the knee, then the foot.
  const top = [knee[0] * 0.75 + ax * 0.25, knee[1] * 0.75 + ay * 0.25];
  limb(ctx, [top, [ax, ay - 2]], 16.5, c);
  smooth(ctx, [[ax - 9, ay - 6], [ax + 2, ay - 10], [ax + 15, ay - 5], [ax + 17, ay + 5], [ax - 9, ay + 6]], true, 0.3);
  paint(ctx, c, ay - 10, ay + 6, { line: 2.2 });
  poly(ctx, [[ax - 9, ay + 4], [ax + 17, ay + 4]], false); line(ctx, shade(c, -0.55), 2.6);
  poly(ctx, [[top[0] - 8, top[1] + 1], [top[0] + 8, top[1] - 1]], false); line(ctx, trim, 3);
  if (boots.shape === 'striders') {
    smooth(ctx, [[top[0] + 4, top[1] + 2], [ax + 8, ay - 14], [ax + 4, ay - 8], [top[0] + 1, top[1] + 4]]);
    paint(ctx, trim, top[1], ay - 8, { line: 1.6 });
  }
}

function drawArmSleeve(ctx, shoulder, elbow, hand, colour) {
  limb(ctx, [shoulder, elbow, hand], 12, colour);
}

function drawHand(ctx, [x, y], skin, ring) {
  circlePath(ctx, x, y, 5.6);
  paint(ctx, skin, y - 6, y + 6, { line: 2 });
  if (ring) {
    poly(ctx, [[x - 1, y - 4.5], [x + 2.5, y - 4.5]], false); line(ctx, ring.colour || '#e3c25b', 2.4);
    if (ring.gem) { circlePath(ctx, x + 1, y - 5.5, 1.5); ctx.fillStyle = ring.gem; ctx.fill(); }
  }
}

function drawTorso(ctx, look, breathe) {
  const top = -106 + breathe;
  // Base garment.
  smooth(ctx, [[-19, top + 2], [-4, top - 2], [16, top], [22, top + 8], [19, -78], [17, -58], [-15, -58], [-19, -80]], true, 0.35);
  paint(ctx, look.cloth, top, -58, { line: 2.4 });
  // Collar trim.
  ctx.beginPath(); ctx.moveTo(-6, top); ctx.quadraticCurveTo(6, top + 10, 16, top + 1); line(ctx, look.trim, 2.6);
}

function drawSkirt(ctx, look, sway) {
  switch (look.skirt) {
    case 'robe':
      smooth(ctx, [[-17, -64], [17, -64], [24, -30], [28 + sway * 0.3, -6], [-24 + sway * 0.3, -6], [-21, -32]], true, 0.3);
      paint(ctx, look.cloth, -64, -6, { line: 2.4 });
      poly(ctx, [[-24 + sway * 0.3, -9], [28 + sway * 0.3, -9]], false); line(ctx, look.trim, 3);
      poly(ctx, [[4, -60], [6, -12]], false); line(ctx, look.trim, 2.2, 0.8);
      break;
    case 'tabard':
      poly(ctx, [[-6, -64], [14, -64], [16, -34], [4, -30], [-8, -34]]);
      paint(ctx, look.cloth, -64, -30, { line: 2.2 });
      poly(ctx, [[4, -60], [4, -36]], false); line(ctx, look.trim, 2.4);
      break;
    case 'coat':
      smooth(ctx, [[-18, -66], [18, -66], [20, -36], [10 + sway * 0.3, -30], [-22 + sway * 0.3, -32], [-21, -50]], true, 0.3);
      paint(ctx, look.cloth, -66, -30, { line: 2.2 });
      break;
    default:
      break;
  }
}

/** Chest armour drawn over the base garment. */
function drawChest(ctx, armour, look, breathe) {
  if (!armour) return;
  const c = armour.colour || '#8f969e';
  const trim = armour.trim || shade(c, -0.3);
  const top = -106 + breathe;
  if (armour.glow) glow(ctx, 2, -84, 34, armour.glow, 0.3);
  switch (armour.shape) {
    case 'tunic': {
      // A patched tunic over the role's clothes: patches and a rope belt.
      roundRectPath(ctx, 4, -92, 9, 8, 2); paint(ctx, c, -92, -84, { line: 1.4 });
      poly(ctx, [[5, -91], [12, -85]], false); line(ctx, shade(c, -0.4), 0.8);
      roundRectPath(ctx, -14, -80, 8, 7, 2); paint(ctx, shade(c, 0.15), -80, -73, { line: 1.4 });
      break;
    }
    case 'vest': {
      smooth(ctx, [[-17, top + 6], [16, top + 4], [20, -80], [16, -64], [-14, -64], [-18, -84]], true, 0.3);
      paint(ctx, trim, top, -64, { line: 2.2 });
      roundRectPath(ctx, 0, -98, 17, 15, 3); paint(ctx, c, -98, -83, { line: 1.8, light: 0.35 });
      roundRectPath(ctx, 0, -81, 16, 14, 3); paint(ctx, c, -81, -67, { line: 1.8, light: 0.35 });
      for (const [rx, ry] of [[3, -95], [14, -95], [3, -70], [13, -70]]) { circlePath(ctx, rx, ry, 1.3); ctx.fillStyle = shade(c, -0.5); ctx.fill(); }
      break;
    }
    case 'coat': {
      smooth(ctx, [[-20, top + 2], [16, top], [22, top + 8], [20, -60], [24, -26], [-24, -28], [-20, -60]], true, 0.3);
      paint(ctx, c, top, -26, { line: 2.4, light: 0.25 });
      poly(ctx, [[8, top + 2], [8, -30]], false); line(ctx, shade(c, -0.35), 1.6);
      smooth(ctx, [[-8, top], [6, top + 14], [16, top]], false); line(ctx, trim, 3);
      gloss(ctx, -4, -86, 14, 16, 0.3);
      break;
    }
    case 'robe': {
      smooth(ctx, [[-20, top + 2], [16, top], [22, top + 8], [24, -40], [28, -6], [-24, -6], [-22, -40]], true, 0.3);
      paint(ctx, c, top, -6, { line: 2.4 });
      poly(ctx, [[-24, -9], [28, -9]], false); line(ctx, trim, 3);
      poly(ctx, [[6, top + 6], [7, -12]], false); line(ctx, trim, 2.4);
      smooth(ctx, [[-8, top], [6, top + 14], [16, top]], false); line(ctx, trim, 3);
      break;
    }
    case 'mail':
    case 'scale': {
      smooth(ctx, [[-19, top + 2], [16, top], [22, top + 8], [20, -60], [21, -44], [-19, -44], [-19, -62]], true, 0.3);
      paint(ctx, c, top, -44, { line: 2.4 });
      ctx.save();
      smooth(ctx, [[-19, top + 2], [16, top], [22, top + 8], [20, -60], [21, -44], [-19, -44], [-19, -62]], true, 0.3);
      ctx.clip();
      for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 9; col++) {
          const px = -20 + col * 5.2 + (row % 2) * 2.6;
          const py = top + 4 + row * 5;
          ctx.beginPath();
          ctx.arc(px, py, armour.shape === 'scale' ? 3.4 : 2.4, 0, Math.PI);
          line(ctx, armour.shape === 'scale' ? shade(c, 0.3) : shade(c, -0.35), armour.shape === 'scale' ? 1.2 : 1, armour.shape === 'scale' ? 0.8 : 1);
        }
      }
      ctx.restore();
      // Shoulder guards.
      ellipsePath(ctx, 12, top + 6, 11, 7, 0.3); paint(ctx, shade(c, armour.shape === 'scale' ? 0 : 0.1), top - 1, top + 13, { line: 2 });
      poly(ctx, [[-18, -60], [20, -60]], false); line(ctx, trim, 3.4);
      break;
    }
    case 'plate': {
      smooth(ctx, [[-19, top + 2], [16, top], [23, top + 10], [20, -66], [-17, -66], [-20, -84]], true, 0.3);
      paint(ctx, c, top, -66, { line: 2.6, light: 0.35 });
      smooth(ctx, [[6, top + 6], [12, -86], [8, -70]], false); line(ctx, 'rgba(255,255,255,.35)', 2);
      for (let i = 0; i < 3; i++) {
        roundRectPath(ctx, -18 + i * 0.5, -66 + i * 7, 39 - i, 8, 3); paint(ctx, shade(c, -0.05 * i), -66 + i * 7, -58 + i * 7, { line: 1.8 });
      }
      ellipsePath(ctx, 12, top + 6, 13, 9, 0.3); paint(ctx, c, top - 3, top + 15, { line: 2.2, light: 0.4 });
      poly(ctx, [[2, top + 2], [22, top + 12]], false); line(ctx, trim, 2);
      gloss(ctx, -2, -88, 14, 14, 0.4);
      break;
    }
    default:
      break;
  }
}

function drawBelt(ctx, look, armour) {
  const colour = armour?.shape === 'tunic' ? '#8a6a3c' : shade(look.legs, -0.15);
  roundRectPath(ctx, -17, -66, 36, 7, 2.5); paint(ctx, colour, -66, -59, { line: 1.8 });
  roundRectPath(ctx, 6, -67, 8, 9, 1.5); paint(ctx, '#c9a227', -67, -58, { line: 1.4 });
}

function drawCharm(ctx, charm, breathe, index) {
  if (!charm) return;
  const x = 8 + index * 7;
  const y = -94 + breathe + index * 3;
  poly(ctx, [[x - 6, -104 + breathe], [x, y - 3], [x + 6, -104 + breathe]], false); line(ctx, '#c9a227', 1.1);
  if (index === 0) glow(ctx, x, y, 7, charm.colour, 0.45);
  poly(ctx, [[x, y - 4], [x + 3.5, y], [x, y + 4.5], [x - 3.5, y]]);
  paint(ctx, charm.colour, y - 4, y + 4.5, { line: 1.2, light: 0.4 });
}

/* ---------------------------------------------------------------
   The rig
   --------------------------------------------------------------- */

/**
 * Draw the hero. `gear` holds item looks: { head, chest, feet, main,
 * mainTwoHanded, off, offKind ('shield'|'weapon'), rings: [], charms: [] }.
 * `pose`: { t (ms), swing (0..1, decays after an attack), climb }.
 */
export function drawHero(ctx, roleId, gear = {}, pose = {}) {
  const look = ROLE_LOOKS[roleId] || ROLE_LOOKS.knight;
  const t = pose.t || 0;
  const breathe = Math.sin(t * 0.003) * 1.2;
  const sway = Math.sin(t * 0.0021) * 3;

  // Attack: a fast slash from raised to forward-down, then recovery.
  const swing = Math.max(0, Math.min(1, pose.swing || 0));
  const p = 1 - swing;
  let angle = -50;
  let reach = 0;
  if (swing > 0) {
    angle = p < 0.3 ? -100 + 145 * (p / 0.3) : 45 - 95 * ((p - 0.3) / 0.7);
    reach = Math.sin(Math.min(1, p / 0.3) * Math.PI) * 8;
  }
  const twoHanded = !!gear.mainTwoHanded;
  if (twoHanded && swing === 0) angle = -62;

  const farShoulder = [15, -100 + breathe];
  const farHand = [38 + reach, -74 + breathe];
  const farElbow = [29 + reach * 0.5, -88 + breathe];

  // --- back layers ---
  drawBack(ctx, look, sway);
  drawHair(ctx, look, true);
  drawLeg(ctx, [-4, -58], [-11, -31], [-13, -8], look.legs, gear.feet);
  drawArmSleeve(ctx, farShoulder, farElbow, farHand, look.cloth);

  // --- body ---
  drawLeg(ctx, [8, -58], [15, -31], [14, -8], look.legs, gear.feet);
  drawSkirt(ctx, look, sway);
  drawTorso(ctx, look, breathe);
  drawChest(ctx, gear.chest, look, breathe);
  if (look.back?.type === 'satchel') { poly(ctx, [[14, -104 + breathe], [-14, -70]], false); line(ctx, look.back.colour, 3.4); }
  drawBelt(ctx, look, gear.chest);
  (gear.charms || []).slice(0, 2).forEach((charm, i) => drawCharm(ctx, charm, breathe, i));

  // --- head ---
  withTransform(ctx, 0, breathe, 0, 1, () => {
    roundRectPath(ctx, -3, -116, 11, 10, 3); paint(ctx, look.skin, -116, -106, { line: 2 });
    circlePath(ctx, HEAD.x, HEAD.y, HEAD.r);
    paint(ctx, look.skin, HEAD.y - HEAD.r, HEAD.y + HEAD.r, { line: 2.4, light: 0.14, dark: 0.12 });
    ellipsePath(ctx, HEAD.x - 4, HEAD.y + 1, 4, 5.5); paint(ctx, shade(look.skin, -0.06), HEAD.y - 5, HEAD.y + 6, { line: 1.6 });

    if (gear.head) {
      const hairMode = ['crown'].includes(gear.head.shape) ? 'all' : 'sides';
      if (hairMode === 'all') drawHair(ctx, look, false);
      drawFace(ctx, look, { eyes: false, mouth: false });
      const covered = drawHelmet(ctx, gear.head, roleId);
      if (covered.porthole) {
        // Face visible through the porthole glass.
        ctx.save(); circlePath(ctx, HEAD.x + 12, HEAD.y, 11); ctx.clip();
        eye(ctx, HEAD.x + 13, HEAD.y - 2, 3, '#2a3550');
        ctx.restore();
      }
    } else {
      const hat = drawRoleHat(ctx, look);
      if (!hat) drawHair(ctx, look, false);
      drawFace(ctx, look, { eyes: false, mouth: false });
    }
  });

  // --- main-hand weapon and the hand holding it ---
  if (gear.main) {
    withTransform(ctx, farHand[0], farHand[1], angle * DEG, 1, () => drawWeapon(ctx, gear.main));
  }
  drawHand(ctx, farHand, look.skin, gear.rings?.[1]);

  // --- near arm and off hand ---
  const nearShoulder = [-1, -100 + breathe];
  let nearElbow = [-5, -82 + breathe];
  let nearHand = [8, -72 + breathe];
  if (twoHanded && gear.main) {
    nearElbow = [12, -84 + breathe];
    nearHand = [farHand[0] - 12 * Math.cos(angle * DEG), farHand[1] - 12 * Math.sin(angle * DEG)];
  } else if (gear.off && gear.offKind === 'shield') {
    nearElbow = [-6, -84 + breathe];
    nearHand = [9, -80 + breathe];
  }
  drawArmSleeve(ctx, nearShoulder, nearElbow, nearHand, shade(look.cloth, 0.06));
  if (gear.off && !twoHanded) {
    if (gear.offKind === 'shield') {
      drawHand(ctx, nearHand, look.skin);
      withTransform(ctx, nearHand[0] + 4, nearHand[1] + 2, 0, 1, () => drawShield(ctx, gear.off));
    } else {
      const offAngle = swing > 0 ? angle * 0.6 + 20 : 18;
      withTransform(ctx, nearHand[0], nearHand[1], offAngle * DEG, 1, () => drawWeapon(ctx, gear.off));
      drawHand(ctx, nearHand, look.skin, gear.rings?.[0]);
    }
  } else {
    drawHand(ctx, nearHand, look.skin, gear.rings?.[0]);
  }
}

/** Approximate bounds of the rig in local units, for fitting into a box. */
export const HERO_BOUNDS = { x: -58, y: -204, w: 142, h: 212 };
