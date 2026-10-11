/* Item icons and scene props, drawn as vectors in a 64 x 64 box.

   Gear icons take the item's `look`, so two swords of different rarity look
   different, and weapons, shields and helmets reuse the exact drawings the
   hero wears — the icon is what you will see on the character. */

import {
  shade, rgba, poly, smooth, ellipsePath, circlePath, roundRectPath,
  paint, line, limb, glow, gloss, withTransform,
} from './vector.js';
import { drawWeapon, drawShield, drawHelmet } from './anime/gear.js';

/* ---------------------------------------------------------------
   Consumables
   --------------------------------------------------------------- */

function flask(liquid) {
  return (ctx) => {
    glow(ctx, 32, 40, 26, liquid, 0.3);
    roundRectPath(ctx, 26, 8, 12, 14, 3); paint(ctx, '#c8d4dc', 8, 22, { line: 2, alpha: 0.9 });
    roundRectPath(ctx, 24, 5, 16, 6, 2); paint(ctx, '#8a5a3a', 5, 11, { line: 1.8 });
    smooth(ctx, [[26, 20], [38, 20], [52, 38], [50, 54], [32, 59], [14, 54], [12, 38]]);
    paint(ctx, '#d8e4ec', 20, 59, { line: 2.4, alpha: 0.55 });
    ctx.save();
    smooth(ctx, [[26, 20], [38, 20], [52, 38], [50, 54], [32, 59], [14, 54], [12, 38]]);
    ctx.clip();
    ctx.fillStyle = shade(liquid, -0.05);
    ctx.fillRect(0, 34, 64, 30);
    ctx.fillStyle = shade(liquid, 0.3);
    ctx.fillRect(0, 34, 64, 3);
    for (const [x, y, r] of [[22, 46, 2.5], [36, 50, 1.8], [30, 42, 1.4]]) { circlePath(ctx, x, y, r); line(ctx, 'rgba(255,255,255,.6)', 1); }
    ctx.restore();
    smooth(ctx, [[26, 20], [38, 20], [52, 38], [50, 54], [32, 59], [14, 54], [12, 38]]); line(ctx, shade(liquid, -0.6), 2);
    gloss(ctx, 26, 42, 13, 13, 0.6);
  };
}

const ICONS = {
  potion_hp: flask('#e0565c'),
  potion_energy: flask('#f0a13a'),
  potion_mana: flask('#5aa9e6'),
  potion_cure: flask('#6fd66f'),

  shroom: (ctx) => {
    limb(ctx, [[32, 56], [31, 34]], 11, '#e8dfc8');
    smooth(ctx, [[8, 34], [16, 16], [32, 10], [48, 16], [56, 34], [40, 36], [24, 36]]);
    paint(ctx, '#b5523b', 10, 36, { line: 2.4, light: 0.25 });
    for (const [x, y, r] of [[22, 22, 3.5], [36, 18, 4], [46, 28, 2.6], [30, 30, 2.4]]) { circlePath(ctx, x, y, r); paint(ctx, '#f4efe2', y - r, y + r, { line: 0.8 }); }
    gloss(ctx, 30, 26, 18, 12, 0.35);
  },

  scroll: (ctx) => {
    roundRectPath(ctx, 14, 14, 36, 36, 3); paint(ctx, '#ece0bd', 14, 50, { line: 2.2 });
    for (let i = 0; i < 4; i++) { poly(ctx, [[20, 23 + i * 7], [44 - (i === 3 ? 10 : 0), 23 + i * 7]], false); line(ctx, '#8a7f62', 1.4); }
    for (const y of [12, 52]) { roundRectPath(ctx, 10, y - 4, 44, 8, 4); paint(ctx, '#c9b98e', y - 4, y + 4, { line: 2 }); }
    circlePath(ctx, 48, 44, 5); paint(ctx, '#b02e3b', 39, 49, { line: 1.6 });
  },

  ankh: (ctx) => {
    glow(ctx, 32, 30, 28, '#ffd56b', 0.4);
    ellipsePath(ctx, 32, 18, 9, 11); line(ctx, shade('#e3c25b', -0.55), 9); line(ctx, '#e3c25b', 6);
    poly(ctx, [[32, 28], [32, 58]], false); line(ctx, shade('#e3c25b', -0.55), 9); line(ctx, '#e3c25b', 6);
    poly(ctx, [[18, 34], [46, 34]], false); line(ctx, shade('#e3c25b', -0.55), 9); line(ctx, '#e3c25b', 6);
    poly(ctx, [[30, 32], [30, 54]], false); line(ctx, 'rgba(255,255,255,.4)', 1.6);
  },

  bomb: (ctx) => {
    circlePath(ctx, 30, 38, 18); paint(ctx, '#3a3f4b', 20, 56, { line: 2.4, light: 0.25 });
    roundRectPath(ctx, 24, 16, 12, 8, 2); paint(ctx, '#7d8590', 16, 24, { line: 1.8 });
    smooth(ctx, [[30, 16], [34, 8], [44, 6], [48, 10]], false); line(ctx, '#8a6a3c', 2.4);
    glow(ctx, 49, 9, 9, '#ffcf6a', 0.9);
    poly(ctx, [[49, 3], [50, 8], [55, 9], [50, 10], [49, 15], [48, 10], [43, 9], [48, 8]]); ctx.fillStyle = '#ffe9a8'; ctx.fill();
    gloss(ctx, 26, 34, 12, 12, 0.5);
  },

  gem: (ctx) => {
    glow(ctx, 32, 34, 26, '#6fb4ff', 0.4);
    poly(ctx, [[20, 18], [44, 18], [54, 30], [32, 56], [10, 30]]); paint(ctx, '#5aa9e6', 18, 56, { line: 2.2, light: 0.4 });
    poly(ctx, [[10, 30], [54, 30]], false); line(ctx, shade('#5aa9e6', -0.5), 1.4);
    poly(ctx, [[20, 18], [26, 30], [32, 56], [38, 30], [44, 18]], false); line(ctx, shade('#5aa9e6', -0.5), 1.2);
    poly(ctx, [[24, 22], [28, 28]], false); line(ctx, 'rgba(255,255,255,.85)', 2);
  },

  /* ---------------- materials ---------------- */
  tail: (ctx) => {
    smooth(ctx, [[12, 50], [24, 38], [40, 44], [50, 30], [44, 16], [34, 18]], false);
    line(ctx, shade('#e59a9a', -0.5), 7); line(ctx, '#e59a9a', 4.5);
  },
  core: (ctx) => {
    glow(ctx, 32, 34, 26, '#8fe06a', 0.45);
    circlePath(ctx, 32, 34, 16); paint(ctx, '#6fbf4a', 18, 50, { line: 2.4, light: 0.4, alpha: 0.9 });
    circlePath(ctx, 32, 34, 6); paint(ctx, '#d6ff5a', 28, 40, { line: 0, light: 0.5 });
    gloss(ctx, 28, 30, 10, 10, 0.6);
  },
  bone: (ctx) => {
    withTransform(ctx, 32, 32, -0.7, 1, () => {
      roundRectPath(ctx, -16, -4, 32, 8, 4); paint(ctx, '#e8dfc8', -4, 4, { line: 2 });
      for (const x of [-18, 18]) for (const y of [-5, 5]) { circlePath(ctx, x, y, 5.5); paint(ctx, '#e8dfc8', y - 5, y + 5, { line: 2 }); }
      roundRectPath(ctx, -16, -3, 32, 6, 3); ctx.fillStyle = '#ece6d6'; ctx.fill();
    });
  },
  cog: (ctx) => {
    ctx.beginPath();
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const r = i % 2 ? 15 : 21;
      ctx.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r);
    }
    ctx.closePath();
    paint(ctx, '#a0613f', 11, 53, { line: 2.2, light: 0.3 });
    circlePath(ctx, 32, 32, 6); paint(ctx, '#3a2a1e', 26, 38, { line: 1.6 });
    for (const [x, y] of [[24, 24], [40, 40], [42, 26]]) { circlePath(ctx, x, y, 2); ctx.fillStyle = rgba('#6b8a5a', 0.7); ctx.fill(); }
  },
  leather: (ctx) => {
    smooth(ctx, [[12, 20], [28, 12], [50, 16], [54, 36], [44, 52], [20, 52], [10, 38]]);
    paint(ctx, '#8a5a3a', 12, 52, { line: 2.2, light: 0.25 });
    smooth(ctx, [[16, 24], [30, 18], [48, 22], [50, 36], [42, 48], [22, 48], [14, 38]]);
    ctx.save(); ctx.setLineDash([3, 3]); line(ctx, '#d9b98e', 1.2); ctx.restore();
  },
  ingot: (ctx) => {
    poly(ctx, [[10, 44], [18, 26], [50, 26], [56, 44]]); paint(ctx, '#7d8590', 26, 44, { line: 2.2, light: 0.35 });
    poly(ctx, [[10, 44], [56, 44], [52, 52], [14, 52]]); paint(ctx, shade('#7d8590', -0.2), 44, 52, { line: 2 });
    poly(ctx, [[22, 30], [46, 30]], false); line(ctx, 'rgba(255,255,255,.5)', 1.6);
  },
  vial: (ctx) => {
    roundRectPath(ctx, 24, 10, 16, 44, 7); paint(ctx, '#c8d4dc', 10, 54, { line: 2.2, alpha: 0.5 });
    ctx.save(); roundRectPath(ctx, 24, 10, 16, 44, 7); ctx.clip();
    ctx.fillStyle = '#26245a'; ctx.fillRect(20, 24, 24, 34); ctx.restore();
    roundRectPath(ctx, 24, 10, 16, 44, 7); line(ctx, '#2a3040', 2);
    roundRectPath(ctx, 22, 6, 20, 8, 2); paint(ctx, '#8a5a3a', 6, 14, { line: 1.8 });
    gloss(ctx, 30, 36, 6, 14, 0.5, Math.PI * 0.9, Math.PI * 1.3);
  },
  scales: (ctx) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3 - (row % 2); col++) {
        const x = 18 + col * 14 + (row % 2) * 7;
        const y = 22 + row * 12;
        smooth(ctx, [[x - 7, y], [x, y - 8], [x + 7, y], [x, y + 10]]);
        paint(ctx, '#3f8f5a', y - 8, y + 10, { line: 1.8, light: 0.35 });
      }
    }
  },
  blueprint: (ctx) => {
    roundRectPath(ctx, 10, 12, 44, 40, 3); paint(ctx, '#2a1f2a', 12, 52, { line: 2.2, light: 0.1 });
    glow(ctx, 32, 32, 18, '#ff6b3a', 0.4);
    circlePath(ctx, 32, 32, 12); line(ctx, '#ffb36b', 1.6);
    poly(ctx, [[32, 20], [42, 38], [22, 38]]); line(ctx, '#ffb36b', 1.6);
    circlePath(ctx, 32, 32, 3); ctx.fillStyle = '#ffb36b'; ctx.fill();
  },
  pearl: (ctx) => {
    glow(ctx, 32, 34, 22, '#bfe6ff', 0.4);
    smooth(ctx, [[10, 44], [20, 30], [32, 28], [44, 30], [54, 44], [32, 54]]); paint(ctx, '#6b7f8a', 28, 54, { line: 2 });
    circlePath(ctx, 32, 34, 10); paint(ctx, '#eef4f8', 24, 44, { line: 1.8, light: 0.2 });
    gloss(ctx, 29, 31, 6, 6, 0.9);
  },
  dust: (ctx) => {
    glow(ctx, 32, 34, 28, '#c9a2ff', 0.5);
    for (let i = 0; i < 14; i++) {
      const a = i * 2.39;
      const r = 4 + (i * 7) % 16;
      circlePath(ctx, 32 + Math.cos(a) * r, 34 + Math.sin(a) * r * 0.8, 1.4 + (i % 3));
      ctx.fillStyle = i % 2 ? '#e7d6ff' : '#b48cff'; ctx.fill();
    }
  },
  key: (ctx) => {
    circlePath(ctx, 22, 32, 9); line(ctx, '#7a5a12', 6); line(ctx, '#e3c25b', 3.5);
    poly(ctx, [[30, 32], [54, 32], [54, 40], [48, 40]], false); line(ctx, '#7a5a12', 6); line(ctx, '#e3c25b', 3.5);
  },
  book: (ctx, look = {}) => {
    const c = look.colour || '#5a3fa8';
    glow(ctx, 32, 32, 28, c, 0.35);
    roundRectPath(ctx, 14, 12, 36, 42, 4); paint(ctx, c, 12, 54, { line: 2.4 });
    roundRectPath(ctx, 18, 14, 32, 38, 2); ctx.fillStyle = '#ece6d6'; ctx.fill();
    roundRectPath(ctx, 14, 12, 32, 42, 4); paint(ctx, shade(c, -0.1), 12, 54, { line: 2.4 });
    circlePath(ctx, 30, 30, 7); line(ctx, '#e3c25b', 2);
    poly(ctx, [[30, 24], [30, 36]], false); line(ctx, '#e3c25b', 1.6);
  },

  /* ---------------- rings and charms ---------------- */
  ring: (ctx, look = {}) => {
    const c = look.colour || '#e3c25b';
    ellipsePath(ctx, 32, 36, 16, 14); line(ctx, shade(c, -0.6), 9); line(ctx, c, 6);
    ctx.beginPath(); ctx.ellipse(32, 36, 16, 14, 0, Math.PI * 1.1, Math.PI * 1.5); line(ctx, 'rgba(255,255,255,.6)', 2);
  },
  ring_gem: (ctx, look = {}) => {
    const c = look.colour || '#c9a227';
    const gem = look.gem || '#b02e3b';
    ellipsePath(ctx, 32, 40, 15, 13); line(ctx, shade(c, -0.6), 8.5); line(ctx, c, 5.5);
    glow(ctx, 32, 22, 16, gem, 0.5);
    poly(ctx, [[24, 24], [28, 16], [36, 16], [40, 24], [32, 32]]); paint(ctx, gem, 16, 32, { line: 1.8, light: 0.45 });
    poly(ctx, [[29, 18], [31, 22]], false); line(ctx, 'rgba(255,255,255,.8)', 1.6);
  },
  charm: (ctx, look = {}) => {
    const c = look.colour || '#e8dfc8';
    smooth(ctx, [[14, 12], [32, 26], [50, 12]], false); line(ctx, '#8a6a3c', 1.6);
    glow(ctx, 32, 40, 18, c, 0.45);
    for (const [x, a] of [[22, -0.4], [32, 0], [42, 0.4]]) {
      withTransform(ctx, x, 30 - Math.abs(x - 32) * 0.3, a, 1, () => {
        poly(ctx, [[-4, 0], [4, 0], [0, 18]]); paint(ctx, c, 0, 18, { line: 1.6, light: 0.3 });
      });
    }
  },
  feather: (ctx, look = {}) => {
    const c = look.colour || '#dfe6ee';
    withTransform(ctx, 32, 32, -0.8, 0.6, () => withTransform(ctx, -37, 0, 0, 1, () => drawWeapon(ctx, { shape: 'quill', blade: c, hilt: '#3a2a1e' })));
  },
  lens: (ctx, look = {}) => {
    const c = look.colour || '#9fd3e6';
    smooth(ctx, [[10, 10], [24, 24]], false); line(ctx, '#c9a227', 1.6);
    circlePath(ctx, 34, 34, 15); paint(ctx, c, 19, 49, { line: 3.4, ink: '#c9a227', light: 0.45, alpha: 0.8 });
    gloss(ctx, 31, 31, 9, 9, 0.8);
  },
  amulet: (ctx, look = {}) => {
    const c = look.colour || '#7fd1c7';
    smooth(ctx, [[12, 10], [32, 26], [52, 10]], false); line(ctx, '#c9a227', 1.8);
    glow(ctx, 32, 40, 20, c, 0.5);
    circlePath(ctx, 32, 40, 13); paint(ctx, '#c9a227', 27, 53, { line: 2, light: 0.35 });
    circlePath(ctx, 32, 40, 8); paint(ctx, c, 32, 48, { line: 1.4, light: 0.45 });
    gloss(ctx, 30, 37, 5, 5, 0.8);
  },

  /* ---------------- props ---------------- */
  chest: (ctx) => chest(ctx, false),
  chest_open: (ctx) => chest(ctx, true),
  altar: (ctx) => {
    glow(ctx, 32, 20, 26, '#6fb4ff', 0.5);
    roundRectPath(ctx, 12, 30, 40, 28, 3); paint(ctx, '#8a99ad', 30, 58, { line: 2.4, light: 0.25 });
    roundRectPath(ctx, 8, 26, 48, 7, 2); paint(ctx, '#a6b3c4', 26, 33, { line: 2 });
    roundRectPath(ctx, 8, 56, 48, 6, 2); paint(ctx, '#5b6d8a', 56, 62, { line: 2 });
    poly(ctx, [[32, 6], [40, 16], [32, 26], [24, 16]]); paint(ctx, '#5aa9e6', 6, 26, { line: 1.8, light: 0.5 });
    for (const x of [20, 32, 44]) { poly(ctx, [[x, 36], [x, 52]], false); line(ctx, shade('#8a99ad', -0.3), 1.4); }
  },
};

function chest(ctx, open) {
  const wood = '#7a5a34';
  const band = '#c9a227';
  if (open) {
    glow(ctx, 32, 26, 30, '#ffd56b', 0.6);
    roundRectPath(ctx, 10, 6, 44, 16, 6); paint(ctx, shade(wood, -0.1), 6, 22, { line: 2.2 });
  }
  roundRectPath(ctx, 8, 26, 48, 30, 3); paint(ctx, wood, 26, 56, { line: 2.4, light: 0.2 });
  if (!open) {
    smooth(ctx, [[8, 28], [10, 16], [32, 10], [54, 16], [56, 28]]); paint(ctx, wood, 10, 28, { line: 2.4, light: 0.3 });
    poly(ctx, [[8, 28], [56, 28]], false); line(ctx, band, 3);
  } else {
    for (const [x, y, r] of [[22, 26, 4], [32, 24, 5], [42, 26, 4]]) { circlePath(ctx, x, y, r); paint(ctx, '#ffd56b', y - r, y + r, { line: 1.2 }); }
  }
  for (const x of [16, 48]) { poly(ctx, [[x, 26], [x, 56]], false); line(ctx, band, 3); }
  roundRectPath(ctx, 28, 30, 8, 10, 2); paint(ctx, band, 30, 40, { line: 1.6 });
  for (let i = 0; i < 3; i++) { poly(ctx, [[10, 36 + i * 7], [54, 36 + i * 7]], false); line(ctx, shade(wood, -0.3), 1, 0.6); }
}

/* ---------------------------------------------------------------
   Gear icons from the hero's own drawings
   --------------------------------------------------------------- */

const WEAPON_SHAPES = { sword: 'sword', dagger: 'dagger', cleaver: 'cleaver', hammer: 'hammer', rapier: 'rapier', trident: 'trident', quill: 'quill', axe: 'axe' };

function weaponIcon(ctx, look) {
  const shape = look.shape || 'sword';
  // Fit the weapon's full length — pommel to tip — along the icon's diagonal.
  const start = { sword: -21, dagger: -16, fang: -14, cleaver: -20, hammer: -28, rapier: -17, trident: -36, quill: -16, axe: -32 }[shape] ?? -21;
  const reach = { sword: 74, dagger: 36, fang: 54, cleaver: 52, hammer: 74, rapier: 89, trident: 102, quill: 90, axe: 72 }[shape] ?? 74;
  const length = reach - start;
  const scale = Math.min(1.7, 80 / length);
  withTransform(ctx, 32, 32, -Math.PI / 4, scale, () => {
    withTransform(ctx, -(start + length / 2), 0, 0, 1, () => drawWeapon(ctx, look));
  });
}

function shieldIcon(ctx, look) {
  withTransform(ctx, 32, 32, 0, 1.05, () => drawShield(ctx, look));
}

function helmetIcon(ctx, look) {
  const crown = look.shape === 'crown';
  const k = crown ? 1.7 : 1.22;
  const cy = crown ? 32 + 18 * k : 36;
  withTransform(ctx, 32 - 2 * k, cy, 0, k, () => {
    if (!crown) {
      // A dark lining so open helmets read as hollow.
      ellipsePath(ctx, 0, 2, 14, 15); ctx.fillStyle = 'rgba(20,24,32,.55)'; ctx.fill();
    }
    drawHelmet(ctx, look);
  });
}

function armourIcon(ctx, look = {}) {
  const c = look.colour || '#8f969e';
  const trim = look.trim || shade(c, -0.3);
  const shape = look.shape || 'vest';
  if (look.glow) glow(ctx, 32, 32, 30, look.glow, 0.35);
  const long = shape === 'robe' || shape === 'coat';
  const body = [[16, 12], [26, 9], [38, 9], [48, 12], [56, 22], [50, 28], [46, 24], [46, long ? 58 : 50], [18, long ? 58 : 50], [18, 24], [14, 28], [8, 22]];
  poly(ctx, body); paint(ctx, shape === 'tunic' ? '#7a6a52' : c, 9, long ? 58 : 50, { line: 2.4, light: 0.3 });
  ctx.save(); poly(ctx, body); ctx.clip();
  if (shape === 'mail' || shape === 'scale') {
    for (let row = 0; row < 10; row++) for (let col = 0; col < 10; col++) {
      ctx.beginPath(); ctx.arc(8 + col * 5.4 + (row % 2) * 2.7, 14 + row * 4.5, shape === 'scale' ? 3.2 : 2.2, 0, Math.PI);
      line(ctx, shape === 'scale' ? trim : shade(c, -0.35), 1);
    }
  }
  ctx.restore();
  smooth(ctx, [[26, 9], [32, 16], [38, 9]], false); line(ctx, trim, 2.4);
  if (shape === 'tunic') {
    roundRectPath(ctx, 34, 20, 8, 8, 2); paint(ctx, '#9a8a6a', 20, 28, { line: 1.2 });
    roundRectPath(ctx, 22, 34, 7, 6, 2); paint(ctx, '#6b5a42', 34, 40, { line: 1.2 });
    poly(ctx, [[18, 42], [46, 42]], false); line(ctx, '#8a6a3c', 3);
  } else if (shape === 'vest' || shape === 'plate') {
    roundRectPath(ctx, 22, 18, 20, 13, 3); paint(ctx, shade(c, 0.1), 18, 31, { line: 1.6, light: 0.4 });
    roundRectPath(ctx, 22, 33, 20, 12, 3); paint(ctx, shade(c, 0.05), 33, 45, { line: 1.6, light: 0.4 });
    if (shape === 'plate') for (const x of [12, 52]) { ellipsePath(ctx, x, 18, 9, 7); paint(ctx, c, 11, 25, { line: 2, light: 0.4 }); }
  } else if (shape === 'robe' || shape === 'coat') {
    poly(ctx, [[32, 14], [32, 58]], false); line(ctx, trim, 2);
    poly(ctx, [[18, 54], [46, 54]], false); line(ctx, trim, 2.4);
  }
  if (shape === 'mail' || shape === 'scale') { poly(ctx, [[18, 44], [46, 44]], false); line(ctx, trim, 3); }
  gloss(ctx, 26, 26, 12, 12, 0.3);
}

function bootIcon(ctx, look = {}) {
  const c = look.colour || '#3d4a3a';
  const trim = look.trim || shade(c, -0.3);
  if (look.glow) glow(ctx, 32, 34, 28, look.glow, 0.35);
  if (look.shape === 'wraps') {
    smooth(ctx, [[22, 10], [38, 10], [38, 40], [52, 44], [54, 54], [18, 54], [20, 30]], true, 0.2);
    paint(ctx, c, 10, 54, { line: 2.4 });
    for (let i = 0; i < 5; i++) { poly(ctx, [[21, 16 + i * 6], [38, 20 + i * 6]], false); line(ctx, trim, 1.4); }
    return;
  }
  smooth(ctx, [[20, 8], [40, 8], [40, 38], [54, 42], [56, 54], [18, 54], [18, 30]], true, 0.2);
  paint(ctx, c, 8, 54, { line: 2.4, light: 0.25 });
  poly(ctx, [[18, 52], [56, 52]], false); line(ctx, shade(c, -0.55), 3.4);
  poly(ctx, [[19, 12], [40, 12]], false); line(ctx, trim, 3);
  if (look.shape === 'striders') { smooth(ctx, [[34, 14], [40, 34], [34, 36], [30, 16]]); paint(ctx, trim, 14, 36, { line: 1.4 }); }
  gloss(ctx, 28, 24, 8, 14, 0.3);
}

const GEAR_DRAWERS = {
  sword: weaponIcon, dagger: weaponIcon, cleaver: weaponIcon, hammer: weaponIcon,
  rapier: weaponIcon, trident: weaponIcon, quill: weaponIcon, axe: weaponIcon,
  shield_round: shieldIcon, shield_kite: shieldIcon, shield_tower: shieldIcon, shield: shieldIcon,
  helm_cap: helmetIcon, hood: helmetIcon, helm: helmetIcon, crown: helmetIcon, diving_helm: helmetIcon,
  tunic: armourIcon, coat: armourIcon, armour: armourIcon, robe: armourIcon,
  boots: bootIcon, wraps: bootIcon,
};

const DEFAULT_LOOKS = {
  sword: { shape: 'sword' }, dagger: { shape: 'dagger' }, cleaver: { shape: 'cleaver' }, hammer: { shape: 'hammer' },
  rapier: { shape: 'rapier' }, trident: { shape: 'trident' }, quill: { shape: 'quill' }, axe: { shape: 'axe' },
  shield_round: { shape: 'round' }, shield_kite: { shape: 'kite' }, shield_tower: { shape: 'tower' }, shield: { shape: 'round' },
  helm_cap: { shape: 'cap' }, hood: { shape: 'hood' }, helm: { shape: 'helm' }, crown: { shape: 'crown', colour: '#d6a73a' },
  diving_helm: { shape: 'diving', colour: '#b5833a' },
  tunic: { shape: 'tunic' }, coat: { shape: 'coat' }, armour: { shape: 'vest' }, robe: { shape: 'robe' },
  boots: { shape: 'boots' }, wraps: { shape: 'wraps' },
};

/** Draw icon `name` into a 64 x 64 box, optionally using an item's look. */
export function drawIcon(ctx, name, look = null) {
  const gear = GEAR_DRAWERS[name];
  if (gear) { gear(ctx, look || DEFAULT_LOOKS[name] || {}); return true; }
  const icon = ICONS[name];
  if (icon) { icon(ctx, look || {}); return true; }
  return false;
}

export function hasIcon(name) {
  return !!(GEAR_DRAWERS[name] || ICONS[name]);
}
