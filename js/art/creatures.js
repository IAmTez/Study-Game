/* Enemies and bosses as layered vector drawings.

   Each draw function works in local units with the creature standing on
   y = 0, centred on x = 0 and facing right (the battle scene mirrors them to
   face the player). `t` is the animation clock in ms. `size` gives the
   drawing's bounds, used to fit it into a box or scale it in the scene. */

import {
  shade, rgba, poly, smooth, ellipsePath, circlePath, roundRectPath,
  paint, line, limb, glow, gloss, withTransform, eye,
} from './vector.js';

const wave = (t, speed, amount, phase = 0) => Math.sin(t * speed + phase) * amount;

function fang(ctx, x, y, w, h, colour = '#f4efe2') {
  poly(ctx, [[x, y], [x + w, y], [x + w / 2, y + h]]);
  paint(ctx, colour, y, y + h, { line: 1, ink: '#5a4a40' });
}

function glowEye(ctx, x, y, r, colour) {
  glow(ctx, x, y, r * 4, colour, 0.6);
  ellipsePath(ctx, x, y, r * 1.2, r);
  paint(ctx, colour, y - r, y + r, { line: 1.2, ink: shade(colour, -0.6), light: 0.6 });
  circlePath(ctx, x + r * 0.3, y - r * 0.3, r * 0.35);
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fill();
}

/* ---------------------------------------------------------------
   Regular enemies
   --------------------------------------------------------------- */

function rat(ctx, t) {
  const fur = '#7b6a5c';
  const pink = '#e59a9a';
  const breathe = wave(t, 0.006, 1.5);
  // Tail
  smooth(ctx, [[-36, -18], [-62, -12], [-74, -28 + wave(t, 0.004, 6)], [-66, -44 + wave(t, 0.004, 6)]], false);
  line(ctx, shade(pink, -0.5), 6.5); line(ctx, pink, 4);
  // Back leg
  ellipsePath(ctx, -22, -14, 13, 12); paint(ctx, shade(fur, -0.1), -26, -2, {});
  // Body
  smooth(ctx, [[-42, -22], [-30, -50 + breathe], [0, -58 + breathe], [26, -48], [40, -30], [30, -10], [-8, -6], [-36, -8]]);
  paint(ctx, fur, -58, -6, { line: 2.6 });
  smooth(ctx, [[-30, -46 + breathe], [-6, -54 + breathe], [18, -50]], false); line(ctx, 'rgba(255,255,255,.18)', 3);
  // Belly
  smooth(ctx, [[-14, -10], [10, -12], [22, -22], [6, -26], [-12, -20]]); paint(ctx, '#b8a796', -26, -10, { line: 0 });
  // Head
  smooth(ctx, [[18, -50], [36, -54], [58, -40], [66, -32], [56, -24], [30, -20], [16, -30]]);
  paint(ctx, fur, -54, -20, { line: 2.6 });
  circlePath(ctx, 66, -32, 4); paint(ctx, pink, -36, -28, { line: 1.4 });
  // Ears
  for (const [ex, ey, s] of [[22, -54, 1], [32, -56, 1.12]]) {
    ellipsePath(ctx, ex, ey - 4, 9 * s, 11 * s, -0.4); paint(ctx, fur, ey - 16, ey + 6, { line: 2.2 });
    ellipsePath(ctx, ex + 1, ey - 4, 5 * s, 7 * s, -0.4); paint(ctx, pink, ey - 11, ey + 3, { line: 0 });
  }
  glowEye(ctx, 46, -40, 3.2, '#ff4a4a');
  // Whiskers and teeth
  for (const dy of [-4, 0, 4]) { poly(ctx, [[60, -30], [80, -32 + dy * 1.6]], false); line(ctx, 'rgba(240,230,220,.7)', 0.9); }
  fang(ctx, 56, -24, 4, 6); fang(ctx, 60, -24, 4, 6);
  // Front feet
  for (const fx of [4, 20]) { ellipsePath(ctx, fx, -4, 7, 4); paint(ctx, pink, -8, 0, { line: 1.6 }); }
}
rat.size = { x: -80, y: -76, w: 166, h: 80 };

function slime(ctx, t) {
  const c = '#6fbf4a';
  const squash = wave(t, 0.005, 0.05);
  withTransform(ctx, 0, 0, 0, [1 + squash, 1 - squash], () => {
    glow(ctx, 0, -40, 70, '#8fe06a', 0.25);
    smooth(ctx, [[-46, -2], [-50, -24], [-36, -58], [-8, -78], [18, -74], [42, -52], [50, -22], [44, -2]]);
    paint(ctx, c, -78, -2, { line: 2.8, light: 0.3, alpha: 0.88 });
    // Things floating inside
    withTransform(ctx, -12, -28, 0.6, 1, () => {
      roundRectPath(ctx, -12, -3, 24, 6, 3); paint(ctx, '#e8dfc8', -3, 3, { line: 1.2, alpha: 0.6 });
    });
    for (const [bx, by, r] of [[16, -24, 5], [-24, -50, 3.5], [26, -56, 2.5], [-30, -14, 2.5]]) {
      circlePath(ctx, bx, by + wave(t, 0.003, 2, bx), r); line(ctx, 'rgba(255,255,255,.55)', 1.2);
    }
    gloss(ctx, -10, -50, 26, 20, 0.5);
    eye(ctx, 6, -48, 7, '#1b3a12');
    eye(ctx, 26, -46, 6, '#1b3a12');
    ctx.beginPath(); ctx.moveTo(4, -30); ctx.quadraticCurveTo(16, -24, 30, -32); line(ctx, '#244a16', 2.4);
    // Drips
    for (const dx of [-36, 30]) {
      smooth(ctx, [[dx - 4, -4], [dx, 6 + wave(t, 0.004, 3, dx)], [dx + 4, -4]]); paint(ctx, c, -4, 8, { line: 1.6, alpha: 0.85 });
    }
  });
}
slime.size = { x: -58, y: -90, w: 116, h: 100 };

function bat(ctx, t) {
  const c = '#4a3a5c';
  const flap = Math.sin(t * 0.018);
  const hover = -70 + wave(t, 0.004, 6);
  withTransform(ctx, 0, hover, 0, 1, () => {
    for (const side of [-1, 1]) {
      const tipY = -26 * flap - 8;
      smooth(ctx, [[0, -6], [side * 22, -24 + flap * -10], [side * 54, tipY - 10], [side * 64, tipY + 10], [side * 46, 4], [side * 34, -2],
        [side * 24, 10], [side * 10, 6]], true, 0.35);
      paint(ctx, side < 0 ? shade(c, -0.15) : c, -40, 12, { line: 2.2 });
      for (const k of [0.45, 0.75]) {
        poly(ctx, [[side * 8, -4], [side * 60 * k, tipY * k + 2]], false); line(ctx, shade(c, -0.45), 1.4);
      }
    }
    ellipsePath(ctx, 0, 0, 18, 20); paint(ctx, c, -20, 20, { line: 2.4 });
    for (const ex of [-9, 9]) {
      poly(ctx, [[ex - 6, -14], [ex + (ex > 0 ? 8 : -8), -36], [ex + 6, -12]]); paint(ctx, c, -36, -12, { line: 2 });
    }
    glowEye(ctx, -6, -4, 3, '#ff5a3a'); glowEye(ctx, 8, -4, 3, '#ff5a3a');
    fang(ctx, -4, 8, 3.5, 6); fang(ctx, 2, 8, 3.5, 6);
  });
}
bat.size = { x: -70, y: -126, w: 140, h: 120 };

function crab(ctx, t) {
  const shell = '#b5523b';
  const metal = '#7d8590';
  const snap = Math.max(0, Math.sin(t * 0.004)) * 0.25;
  // Legs
  for (let i = 0; i < 3; i++) {
    const x = -24 + i * 14;
    limb(ctx, [[x, -22], [x - 14, -18], [x - 18, 0]], 5, shade(shell, -0.15));
    limb(ctx, [[x + 8, -22], [x + 22, -18], [x + 28, 0]], 5, shade(shell, -0.1));
  }
  // Shell
  smooth(ctx, [[-44, -22], [-38, -46], [-10, -58], [22, -56], [44, -40], [46, -20], [20, -12], [-20, -12]]);
  paint(ctx, shell, -58, -12, { line: 2.8, light: 0.25 });
  for (const [rx, ry] of [[-28, -36], [-10, -46], [10, -46], [28, -36], [0, -30]]) {
    circlePath(ctx, rx, ry, 2.6); paint(ctx, metal, ry - 3, ry + 3, { line: 1 });
  }
  smooth(ctx, [[-38, -24], [-6, -18], [36, -24]], false); line(ctx, shade(shell, -0.4), 2);
  gloss(ctx, -6, -40, 30, 14, 0.4);
  // Eye stalks
  for (const ex of [14, 26]) {
    limb(ctx, [[ex, -52], [ex + 2, -68]], 3.5, metal, { outline: 1.6 });
    eye(ctx, ex + 2, -72, 4.5, '#1b2230');
  }
  // Big claw
  limb(ctx, [[40, -30], [56, -40], [64, -54]], 9, shell);
  withTransform(ctx, 66, -60, -0.3, 1, () => {
    smooth(ctx, [[-10, 4], [-6, -14], [10, -18], [22, -10], [8, -6], [2, 6]]); paint(ctx, shell, -18, 6, { line: 2.4 });
    withTransform(ctx, 2, 6, snap, 1, () => {
      smooth(ctx, [[0, 0], [16, -2], [20, 6], [4, 8]]); paint(ctx, shade(shell, -0.1), -2, 8, { line: 2.2 });
    });
  });
  // Small claw
  limb(ctx, [[-40, -28], [-54, -32], [-60, -40]], 6, shell);
  ellipsePath(ctx, -62, -46, 8, 6, -0.6); paint(ctx, shell, -52, -40, { line: 2 });
}
crab.size = { x: -74, y: -96, w: 162, h: 100 };

function ghoul(ctx, t) {
  const skin = '#8fa38a';
  const rag = '#4a4438';
  const breathe = wave(t, 0.004, 2);
  // Back arm
  limb(ctx, [[-6, -84 + breathe], [-20, -62], [-14, -38]], 9, shade(skin, -0.15));
  // Legs
  limb(ctx, [[-6, -44], [-14, -24], [-16, -4]], 11, shade(skin, -0.1));
  limb(ctx, [[8, -44], [16, -24], [14, -4]], 11, skin);
  // Rags
  smooth(ctx, [[-20, -48], [18, -50], [24, -24], [12, -30], [4, -18], [-6, -28], [-18, -20]]);
  paint(ctx, rag, -50, -18, { line: 2.2 });
  // Hunched torso
  smooth(ctx, [[-20, -48], [-22, -78], [-6, -98 + breathe], [18, -96 + breathe], [26, -76], [20, -50]]);
  paint(ctx, skin, -98, -48, { line: 2.6 });
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.moveTo(-10, -84 + i * 8); ctx.quadraticCurveTo(2, -80 + i * 8, 14, -84 + i * 8); line(ctx, shade(skin, -0.35), 1.4);
  }
  // Head jutting forward
  withTransform(ctx, 26, -96 + breathe, 0.15, 1, () => {
    smooth(ctx, [[-12, -14], [6, -20], [22, -12], [26, 2], [18, 12], [0, 12], [-12, 2]]);
    paint(ctx, skin, -20, 12, { line: 2.4 });
    glowEye(ctx, 12, -4, 3.4, '#d6ff5a');
    poly(ctx, [[8, 6], [24, 4]], false); line(ctx, '#2a1f1f', 2);
    for (let i = 0; i < 4; i++) fang(ctx, 9 + i * 3.6, 4.5, 3, 4);
    smooth(ctx, [[-10, -12], [-2, -24], [8, -20]], false); line(ctx, '#3a3a2e', 2.4);
  });
  // Front arm with claws
  limb(ctx, [[14, -86 + breathe], [34, -68], [48, -60]], 9, skin);
  for (let i = 0; i < 3; i++) {
    poly(ctx, [[48, -60], [62, -66 + i * 7], [52, -58 + i * 3]]); paint(ctx, '#e8dfc8', -66, -52, { line: 1.2 });
  }
}
ghoul.size = { x: -40, y: -128, w: 112, h: 132 };

function fungus(ctx, t) {
  const stalk = '#d9cdb0';
  const cap = '#8a3f6b';
  const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
  glow(ctx, 0, -60, 80, '#c27ad6', 0.18 + pulse * 0.1);
  // Small caps behind
  for (const [x, h, s] of [[-34, 40, 0.7], [36, 34, 0.6]]) {
    limb(ctx, [[x, 0], [x, -h]], 8 * s, stalk);
    ellipsePath(ctx, x, -h - 4, 18 * s, 10 * s); paint(ctx, shade(cap, 0.1), -h - 14, -h + 6, { line: 2 });
  }
  // Main stalk body
  smooth(ctx, [[-18, 0], [-22, -40], [-16, -70], [16, -70], [22, -40], [18, 0]]);
  paint(ctx, stalk, -70, 0, { line: 2.6 });
  // Face in the stalk
  glowEye(ctx, -6, -46, 4, '#e7ff6a'); glowEye(ctx, 10, -48, 3.4, '#e7ff6a');
  ctx.beginPath(); ctx.moveTo(-8, -30); ctx.quadraticCurveTo(2, -24 - pulse * 3, 12, -32); line(ctx, '#3a2a2e', 2.4);
  // Gills and cap
  smooth(ctx, [[-50, -70], [-30, -100], [0, -112], [32, -102], [52, -72], [24, -66], [0, -62], [-26, -66]]);
  paint(ctx, cap, -112, -62, { line: 2.8, light: 0.25 });
  for (const [x, y, r] of [[-24, -88, 6], [4, -100, 7], [26, -86, 5], [-6, -80, 4], [38, -76, 3.5]]) {
    circlePath(ctx, x, y, r); paint(ctx, '#f0d9e6', y - r, y + r, { line: 1 });
  }
  gloss(ctx, -6, -92, 34, 18, 0.35);
  // Drifting spores
  for (let i = 0; i < 6; i++) {
    const phase = (t * 0.0004 + i / 6) % 1;
    circlePath(ctx, -40 + i * 16 + wave(t, 0.002, 6, i), -70 - phase * 70, 2.2 * (1 - phase) + 0.6);
    ctx.fillStyle = rgba('#e7ff6a', 0.7 * (1 - phase)); ctx.fill();
  }
}
fungus.size = { x: -62, y: -146, w: 124, h: 150 };

function croc(ctx, t) {
  const c = '#4f6b3a';
  const belly = '#b8b07a';
  const jaw = Math.max(0, Math.sin(t * 0.003)) * 0.18;
  // Tail
  smooth(ctx, [[-30, -22], [-64, -18], [-96, -8 + wave(t, 0.003, 4)], [-70, -10], [-32, -10]]);
  paint(ctx, c, -24, -6, { line: 2.4 });
  // Legs
  for (const [x, back] of [[-22, true], [30, true], [-12, false], [40, false]]) {
    limb(ctx, [[x, -20], [x + 6, -6], [x + 12, 0]], 9, back ? shade(c, -0.2) : c);
  }
  // Body
  smooth(ctx, [[-36, -18], [-26, -38], [10, -44], [44, -38], [60, -26], [46, -12], [-24, -8]]);
  paint(ctx, c, -44, -8, { line: 2.6 });
  for (let i = 0; i < 6; i++) {
    poly(ctx, [[-24 + i * 12, -40], [-19 + i * 12, -48], [-14 + i * 12, -40]]); paint(ctx, shade(c, -0.15), -48, -40, { line: 1.4 });
  }
  smooth(ctx, [[-20, -12], [20, -14], [46, -16]], false); line(ctx, belly, 4, 0.8);
  // Head and jaws
  withTransform(ctx, 56, -28, 0, 1, () => {
    smooth(ctx, [[-8, -12], [20, -16], [52, -12], [58, -6], [30, -4], [-6, 0]]); paint(ctx, c, -16, 0, { line: 2.4 });
    for (let i = 0; i < 6; i++) fang(ctx, 8 + i * 7, -5, 4, 5);
    withTransform(ctx, -6, 0, jaw, 1, () => {
      smooth(ctx, [[0, 0], [30, 2], [58, 4], [54, 10], [24, 10], [2, 8]]); paint(ctx, shade(c, -0.1), 0, 10, { line: 2.2 });
      for (let i = 0; i < 6; i++) fang(ctx, 14 + i * 7, 3, 4, -5);
    });
    ellipsePath(ctx, 8, -16, 6, 5); paint(ctx, c, -21, -11, { line: 2 });
    glowEye(ctx, 9, -16, 2.8, '#f0d23a');
  });
}
croc.size = { x: -100, y: -64, w: 220, h: 68 };

function cultist(ctx, t) {
  const robe = '#6b2430';
  const breathe = wave(t, 0.003, 1.5);
  const sway = wave(t, 0.002, 3);
  // Robe
  smooth(ctx, [[-22, -100 + breathe], [18, -102 + breathe], [26, -60], [32 + sway, 0], [-30 + sway, 0], [-26, -60]]);
  paint(ctx, robe, -102, 0, { line: 2.6 });
  for (const x of [-12, 4, 16]) { smooth(ctx, [[x, -80], [x + sway * 0.3, -10]], false); line(ctx, shade(robe, -0.3), 1.6); }
  poly(ctx, [[-30 + sway, -4], [32 + sway, -4]], false); line(ctx, '#c9a227', 2.6);
  // Sigil on chest
  glow(ctx, 2, -66, 16, '#ff6b3a', 0.35 + 0.2 * Math.sin(t * 0.005));
  ctx.beginPath(); ctx.arc(2, -66, 8, 0, Math.PI * 2); line(ctx, '#ffb36b', 1.8);
  poly(ctx, [[2, -74], [9, -62], [-5, -62]]); line(ctx, '#ffb36b', 1.6);
  // Hood
  smooth(ctx, [[-22, -96 + breathe], [-20, -122], [0, -138], [22, -126], [28, -100], [14, -94]]);
  paint(ctx, shade(robe, -0.05), -138, -94, { line: 2.6 });
  ellipsePath(ctx, 12, -112 + breathe, 11, 13); paint(ctx, '#140c10', -125, -99, { line: 0, flat: true });
  glowEye(ctx, 9, -114 + breathe, 2.4, '#ffcf3a'); glowEye(ctx, 17, -114 + breathe, 2.4, '#ffcf3a');
  // Arm with ritual dagger
  limb(ctx, [[10, -94], [26, -76], [40, -70]], 10, robe);
  circlePath(ctx, 40, -70, 5); paint(ctx, '#c9a28a', -75, -65, { line: 1.8 });
  withTransform(ctx, 42, -72, -1.1, 1, () => {
    poly(ctx, [[2, -2.5], [26, 0], [2, 2.5]]); paint(ctx, '#d8dde3', -3, 3, { line: 1.4 });
    limb(ctx, [[-8, 0], [0, 0]], 4, '#3a2a1e', { outline: 1.4 });
  });
  // Candle in the other hand
  limb(ctx, [[-14, -92], [-24, -74], [-16, -62]], 9, shade(robe, -0.15));
  roundRectPath(ctx, -20, -80, 7, 16, 2); paint(ctx, '#ece6d6', -80, -64, { line: 1.2 });
  glow(ctx, -16.5, -86, 14, '#ffcf6a', 0.6);
  ellipsePath(ctx, -16.5, -86 + wave(t, 0.02, 0.6), 2.4, 4.2); ctx.fillStyle = '#ffd88a'; ctx.fill();
}
cultist.size = { x: -40, y: -144, w: 104, h: 148 };

function sludge(ctx, t) {
  const c = '#6b5a3a';
  const pulse = 0.5 + 0.5 * Math.sin(t * 0.003);
  // Legs
  limb(ctx, [[-20, -36], [-26, 0]], 22, shade(c, -0.15));
  limb(ctx, [[16, -36], [22, 0]], 22, c);
  // Body mass
  smooth(ctx, [[-40, -40], [-48, -80], [-30, -118], [4, -128], [36, -114], [48, -80], [40, -40], [0, -30]]);
  paint(ctx, c, -128, -30, { line: 3, light: 0.2 });
  // Embedded junk
  for (const [x, y, r] of [[-26, -96, 8], [24, -56, 7]]) {
    circlePath(ctx, x, y, r); paint(ctx, '#7d8590', y - r, y + r, { line: 1.6 });
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + t * 0.001;
      poly(ctx, [[x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a) * (r + 3), y + Math.sin(a) * (r + 3)]], false); line(ctx, '#5b636b', 2.4);
    }
  }
  roundRectPath(ctx, -8, -60, 14, 6, 2); paint(ctx, '#9a8a78', -60, -54, { line: 1.2 });
  // Glowing core
  glow(ctx, 4, -84, 30, '#ffb03a', 0.35 + pulse * 0.25);
  circlePath(ctx, 4, -84, 9); paint(ctx, '#ffcf6a', -93, -75, { line: 2, ink: '#6b3a1a', light: 0.5 });
  // Arms
  limb(ctx, [[-36, -96], [-56, -70], [-54, -44]], 18, shade(c, -0.1));
  limb(ctx, [[36, -100], [58, -80], [64, -56]], 18, c);
  // Face
  glowEye(ctx, 6, -108, 3.6, '#ffcf3a'); glowEye(ctx, 22, -106, 3.2, '#ffcf3a');
  // Drips
  for (const x of [-30, 10, 34]) {
    smooth(ctx, [[x - 3, -40], [x, -24 + wave(t, 0.004, 4, x)], [x + 3, -40]]); paint(ctx, c, -40, -20, { line: 1.4 });
  }
}
sludge.size = { x: -76, y: -136, w: 156, h: 140 };

function wraith(ctx, t) {
  const c = '#7fa8c9';
  const hover = -26 + wave(t, 0.003, 6);
  ctx.save();
  ctx.globalAlpha *= 0.86;
  withTransform(ctx, 0, hover, 0, 1, () => {
    glow(ctx, 0, -60, 80, '#6fb4ff', 0.28);
    // Tattered cloak
    const tail = (i) => wave(t, 0.005, 5, i);
    smooth(ctx, [[-20, -110], [20, -112], [34, -70], [40, -20], [28, 4 + tail(1)], [18, -10], [8, 8 + tail(2)], [-4, -8], [-16, 6 + tail(3)],
      [-24, -14], [-38, 0 + tail(4)], [-34, -60]]);
    paint(ctx, c, -112, 8, { line: 2.4, light: 0.3, dark: 0.35 });
    // Hood
    smooth(ctx, [[-22, -104], [-16, -132], [6, -142], [26, -128], [30, -102], [10, -96]]);
    paint(ctx, shade(c, -0.1), -142, -96, { line: 2.4 });
    ellipsePath(ctx, 12, -116, 11, 14); ctx.fillStyle = '#0b1220'; ctx.fill();
    glowEye(ctx, 8, -118, 2.6, '#bfe6ff'); glowEye(ctx, 17, -118, 2.6, '#bfe6ff');
    // Reaching arm and chain
    smooth(ctx, [[18, -92], [44, -80], [58, -84], [44, -72], [22, -74]]); paint(ctx, c, -92, -72, { line: 2 });
    for (let i = 0; i < 5; i++) {
      ellipsePath(ctx, -26 - i * 3, -70 + i * 9, 3, 4.5, 0.3 * (i % 2 ? 1 : -1)); line(ctx, '#9aa4ad', 1.6);
    }
  });
  ctx.restore();
}
wraith.size = { x: -50, y: -176, w: 114, h: 160 };

function drowned(ctx, t) {
  const metal = '#5f7a74';
  const flesh = '#7f9a8a';
  const breathe = wave(t, 0.003, 1.2);
  // Halberd behind
  withTransform(ctx, 36, -70, -1.35, 1, () => {
    limb(ctx, [[-60, 0], [80, 0]], 4.5, '#4a3324', { outline: 1.6 });
    smooth(ctx, [[66, -2], [70, -18], [86, -16], [82, -2], [90, 0], [82, 4]]); paint(ctx, '#8f969e', -18, 4, { line: 1.8 });
  });
  // Legs
  limb(ctx, [[-8, -52], [-12, -26], [-14, -6]], 13, shade(metal, -0.15));
  limb(ctx, [[10, -52], [14, -26], [14, -6]], 13, metal);
  for (const x of [-14, 14]) { roundRectPath(ctx, x - 9, -10, 20, 10, 3); paint(ctx, shade(metal, -0.25), -10, 0, { line: 2 }); }
  // Torso armour
  smooth(ctx, [[-20, -104 + breathe], [20, -104 + breathe], [24, -76], [20, -54], [-18, -54], [-22, -78]]);
  paint(ctx, metal, -104, -54, { line: 2.6, light: 0.25 });
  for (const [x, y, r] of [[-10, -90, 4], [12, -70, 3], [-4, -64, 2.6], [16, -94, 2.4]]) {
    circlePath(ctx, x, y, r); paint(ctx, '#d8d2bf', y - r, y + r, { line: 1 });
  }
  // Seaweed
  smooth(ctx, [[-16, -102], [-20, -80 + wave(t, 0.003, 3)], [-14, -60], [-18, -40 + wave(t, 0.003, 3)]], false); line(ctx, '#3f6b3a', 3.4);
  // Helm with a visor slit
  roundRectPath(ctx, -14, -134 + breathe, 32, 32, 9); paint(ctx, metal, -134, -102, { line: 2.6, light: 0.3 });
  roundRectPath(ctx, 2, -122 + breathe, 16, 5, 2.5); ctx.fillStyle = '#081014'; ctx.fill();
  glowEye(ctx, 9, -119.5 + breathe, 2, '#7fd1c7'); glowEye(ctx, 15, -119.5 + breathe, 2, '#7fd1c7');
  // Lantern arm
  limb(ctx, [[12, -98], [28, -80], [36, -70]], 10, flesh);
  poly(ctx, [[36, -70], [36, -60]], false); line(ctx, '#2a2a2a', 1.4);
  glow(ctx, 36, -50, 22, '#7fd1c7', 0.55);
  roundRectPath(ctx, 30, -60, 12, 16, 3); paint(ctx, '#7fd1c7', -60, -44, { line: 1.8, ink: '#2f3b45', light: 0.5 });
}
drowned.size = { x: -40, y: -150, w: 124, h: 154 };

function serpent(ctx, t) {
  const c = '#3f8f5a';
  const stripe = '#c8e05a';
  const sway = wave(t, 0.003, 6);
  // Coils
  for (const [x, w] of [[-30, 22], [0, 26], [28, 22]]) {
    ellipsePath(ctx, x, -14, w, 13); paint(ctx, c, -27, -1, { line: 2.4 });
    smooth(ctx, [[x - w + 6, -16], [x, -24], [x + w - 6, -16]], false); line(ctx, stripe, 2.2, 0.8);
  }
  // Rising neck
  smooth(ctx, [[14, -24], [26, -60], [20 + sway, -96], [36 + sway, -120], [52 + sway, -106], [38 + sway, -92], [42, -60], [34, -22]]);
  paint(ctx, c, -120, -22, { line: 2.6 });
  smooth(ctx, [[30, -30], [34, -60], [30 + sway, -90]], false); line(ctx, '#d8d2a0', 5, 0.7);
  // Hood
  smooth(ctx, [[24 + sway, -96], [14 + sway, -122], [30 + sway, -142], [58 + sway, -132], [60 + sway, -104], [46 + sway, -96]]);
  paint(ctx, shade(c, 0.05), -142, -96, { line: 2.4 });
  for (const [x, y] of [[30, -126], [44, -122], [36, -110]]) {
    ellipsePath(ctx, x + sway, y, 4, 3); ctx.fillStyle = stripe; ctx.fill();
  }
  // Head
  smooth(ctx, [[38 + sway, -132], [56 + sway, -136], [74 + sway, -128], [70 + sway, -118], [44 + sway, -116]]);
  paint(ctx, c, -136, -116, { line: 2.4 });
  glowEye(ctx, 56 + sway, -128, 2.8, '#ff5a3a');
  fang(ctx, 64 + sway, -119, 2.6, 7); fang(ctx, 69 + sway, -120, 2.6, 6);
  const flick = Math.sin(t * 0.012) > 0.3;
  if (flick) { poly(ctx, [[74 + sway, -122], [86 + sway, -120], [90 + sway, -124], [86 + sway, -120], [90 + sway, -116]], false); line(ctx, '#e0607e', 1.4); }
}
serpent.size = { x: -56, y: -148, w: 156, h: 152 };

/* ---------------------------------------------------------------
   Bosses
   --------------------------------------------------------------- */

function boss_ratking(ctx, t) {
  const fur = '#6b5a4c';
  const cloak = '#7a2e3a';
  const breathe = wave(t, 0.003, 2);
  // Knotted tails
  for (let i = 0; i < 4; i++) {
    smooth(ctx, [[-20, -30], [-50, -20 + i * 6], [-80 + i * 6, -40 + wave(t, 0.003, 6, i)], [-96 + i * 10, -18 + i * 4]], false);
    line(ctx, '#7a4a4a', 6); line(ctx, '#d98c8c', 3.5);
  }
  // Cloak
  smooth(ctx, [[-30, -140 + breathe], [26, -142 + breathe], [42, -60], [48, 0], [-52, 0], [-44, -70]]);
  paint(ctx, cloak, -142, 0, { line: 3 });
  smooth(ctx, [[-50, -4], [46, -4]], false); line(ctx, '#e8dfc8', 5);
  for (let x = -44; x < 44; x += 10) { circlePath(ctx, x, -4, 1.8); ctx.fillStyle = '#2a2020'; ctx.fill(); }
  // Body
  smooth(ctx, [[-22, -130 + breathe], [22, -132 + breathe], [30, -90], [24, -50], [-20, -50], [-26, -90]]);
  paint(ctx, fur, -132, -50, { line: 2.6 });
  smooth(ctx, [[-10, -110], [12, -112], [14, -70], [-8, -70]]); paint(ctx, '#b8a796', -112, -70, { line: 0 });
  // Feet
  for (const x of [-20, 16]) { ellipsePath(ctx, x, -6, 16, 7); paint(ctx, '#d98c8c', -13, 1, { line: 2 }); }
  // Head
  withTransform(ctx, 6, -146 + breathe, 0, 1, () => {
    smooth(ctx, [[-24, 6], [-20, -18], [6, -26], [30, -18], [54, -6], [60, 4], [30, 14], [-10, 16]]);
    paint(ctx, fur, -26, 16, { line: 2.6 });
    circlePath(ctx, 60, 2, 5); paint(ctx, '#d98c8c', -3, 7, { line: 1.4 });
    for (const [ex, s] of [[-14, 1], [6, 1.15]]) {
      ellipsePath(ctx, ex, -24, 11 * s, 14 * s, -0.3); paint(ctx, fur, -40, -10, { line: 2.2 });
      ellipsePath(ctx, ex + 1, -24, 6 * s, 9 * s, -0.3); paint(ctx, '#d98c8c', -34, -14, { line: 0 });
    }
    glowEye(ctx, 26, -6, 4.2, '#ff4a4a');
    fang(ctx, 46, 10, 5, 8); fang(ctx, 51, 10, 5, 8);
    // Crown
    poly(ctx, [[-12, -20], [-14, -42], [-4, -30], [4, -46], [12, -30], [22, -42], [22, -18]]);
    paint(ctx, '#d6a73a', -46, -18, { line: 2.2, light: 0.4 });
    for (const x of [-6, 4, 14]) { circlePath(ctx, x, -24, 2.6); ctx.fillStyle = '#c0392b'; ctx.fill(); }
  });
  // Sceptre arm
  limb(ctx, [[16, -124], [38, -100], [52, -96]], 12, fur);
  withTransform(ctx, 54, -96, -1.3, 1, () => {
    limb(ctx, [[-50, 0], [60, 0]], 4.5, '#5b3d26', { outline: 1.6 });
    glow(ctx, 66, 0, 18, '#ff4a4a', 0.5);
    circlePath(ctx, 66, 0, 8); paint(ctx, '#e3c25b', -8, 8, { line: 2, light: 0.4 });
    circlePath(ctx, 66, 0, 3.6); ctx.fillStyle = '#c0392b'; ctx.fill();
  });
  circlePath(ctx, 54, -96, 6); paint(ctx, '#d98c8c', -102, -90, { line: 1.8 });
}
boss_ratking.size = { x: -100, y: -200, w: 200, h: 204 };

function boss_leviathan(ctx, t) {
  const c = '#3f5a4a';
  const rise = wave(t, 0.002, 4);
  // Tentacles
  for (let i = 0; i < 4; i++) {
    const x = -70 + i * 30;
    smooth(ctx, [[x, 0], [x - 10 + wave(t, 0.003, 10, i), -40], [x + 4 + wave(t, 0.004, 14, i), -80], [x - 6 + wave(t, 0.003, 10, i * 2), -100]], false);
    line(ctx, shade(c, -0.55), 14); line(ctx, shade(c, -0.1), 10);
  }
  // Body rising from the water
  smooth(ctx, [[-60, 0], [-64, -70], [-40, -140 + rise], [0, -170 + rise], [44, -156 + rise], [70, -110], [74, -40], [64, 0]]);
  paint(ctx, c, -170, 0, { line: 3.2, light: 0.2 });
  for (let i = 0; i < 6; i++) {
    smooth(ctx, [[-40 + i * 14, -150 + rise + i * 4], [-36 + i * 14, -168 + rise + i * 4], [-30 + i * 14, -150 + rise + i * 4]]);
    paint(ctx, shade(c, -0.2), -168, -146, { line: 1.6 });
  }
  // Belly plates
  for (let i = 0; i < 5; i++) {
    roundRectPath(ctx, 28 - i * 2, -120 + i * 22, 36, 16, 6); paint(ctx, '#b8b07a', -120 + i * 22, -104 + i * 22, { line: 1.8 });
  }
  // Maw
  const open = 0.5 + 0.5 * Math.sin(t * 0.0025);
  withTransform(ctx, 40, -126 + rise, 0, 1, () => {
    smooth(ctx, [[-8, -14], [40, -26], [62, -14], [36, -2]]); paint(ctx, c, -26, -2, { line: 2.6 });
    smooth(ctx, [[-6, 4], [36, 6 + open * 10], [58, 14 + open * 12], [30, 22 + open * 8], [-4, 16]]); paint(ctx, shade(c, -0.1), 4, 30, { line: 2.4 });
    smooth(ctx, [[-2, 0], [34, 0], [56, 8], [30, 10 + open * 8]]); paint(ctx, '#3a1418', -2, 18, { line: 0 });
    for (let i = 0; i < 6; i++) { fang(ctx, 6 + i * 8, -4, 4.5, 8); fang(ctx, 6 + i * 8, 10 + open * 6, 4.5, -7); }
  });
  glowEye(ctx, 26, -150 + rise, 6, '#d6ff5a');
  glowEye(ctx, 6, -154 + rise, 4.5, '#d6ff5a');
  // Water line
  smooth(ctx, [[-100, 0], [-60, -6 + wave(t, 0.004, 2)], [-20, 2], [20, -6], [60, 2], [100, -4]], false); line(ctx, 'rgba(160,220,190,.45)', 3);
}
boss_leviathan.size = { x: -104, y: -196, w: 216, h: 200 };

function boss_plague(ctx, t) {
  const coat = '#2b2a2f';
  const breathe = wave(t, 0.003, 1.5);
  // Green smoke
  for (let i = 0; i < 6; i++) {
    const phase = (t * 0.0003 + i / 6) % 1;
    circlePath(ctx, 56 + wave(t, 0.002, 8, i), -60 - phase * 90, 8 + phase * 14);
    ctx.fillStyle = rgba('#8fd16a', 0.25 * (1 - phase)); ctx.fill();
  }
  // Staff
  limb(ctx, [[-36, 0], [-30, -170]], 5, '#4a3324', { outline: 1.8 });
  smooth(ctx, [[-30, -170], [-20, -186], [-34, -194], [-44, -180]], false); line(ctx, '#4a3324', 4);
  // Coat
  smooth(ctx, [[-28, -146 + breathe], [26, -148 + breathe], [36, -80], [46, 0], [-46, 0], [-38, -80]]);
  paint(ctx, coat, -148, 0, { line: 3, light: 0.25 });
  poly(ctx, [[4, -144], [6, -4]], false); line(ctx, shade(coat, -0.45), 2);
  for (let y = -130; y < -40; y += 18) { circlePath(ctx, 10, y, 2.2); ctx.fillStyle = '#c9a227'; ctx.fill(); }
  // Belt with vials
  roundRectPath(ctx, -36, -86, 74, 9, 3); paint(ctx, '#5b3d26', -86, -77, { line: 1.8 });
  for (const [x, col] of [[-22, '#8fd16a'], [-10, '#e0607e'], [24, '#8fd16a']]) {
    roundRectPath(ctx, x - 3, -80, 6, 12, 2); paint(ctx, col, -80, -68, { line: 1.2, light: 0.5 });
  }
  // Hat
  ellipsePath(ctx, 2, -178 + breathe, 44, 8); paint(ctx, coat, -186, -170, { line: 2.6 });
  roundRectPath(ctx, -20, -214 + breathe, 42, 38, 6); paint(ctx, coat, -214, -176, { line: 2.6 });
  poly(ctx, [[-20, -184 + breathe], [22, -184 + breathe]], false); line(ctx, '#7a2e2e', 4);
  // Beak mask
  withTransform(ctx, 0, breathe, 0, 1, () => {
    smooth(ctx, [[-18, -172], [10, -176], [20, -164], [62, -140], [58, -134], [16, -142], [-14, -144]]);
    paint(ctx, '#d8cdb0', -176, -134, { line: 2.4, light: 0.2 });
    for (let i = 0; i < 4; i++) { poly(ctx, [[24 + i * 9, -150 + i * 3.4], [26 + i * 9, -144 + i * 3.4]], false); line(ctx, '#8a7f62', 1.2); }
    circlePath(ctx, 6, -160, 7.5); paint(ctx, '#3a3a2e', -168, -152, { line: 2 });
    glowEye(ctx, 6, -160, 4, '#8fd16a');
  });
  // Lantern arm
  limb(ctx, [[18, -138], [40, -114], [54, -108]], 12, coat);
  poly(ctx, [[56, -106], [56, -92]], false); line(ctx, '#2a2a2a', 1.6);
  glow(ctx, 56, -78, 28, '#8fd16a', 0.6);
  roundRectPath(ctx, 48, -92, 16, 22, 3); paint(ctx, '#8fd16a', -92, -70, { line: 2, ink: '#2a2a2a', light: 0.5 });
}
boss_plague.size = { x: -64, y: -222, w: 140, h: 226 };

function boss_sovereign(ctx, t) {
  const armour = '#4b5a52';
  const bone = '#d8d2bf';
  const cape = '#1f4e79';
  const breathe = wave(t, 0.003, 1.5);
  const sway = wave(t, 0.002, 4);
  // Cape
  smooth(ctx, [[-26, -150 + breathe], [24, -152 + breathe], [20, -100], [-10, -40], [-40 + sway, 0], [-70 + sway, -6], [-56, -80]]);
  paint(ctx, cape, -152, 0, { line: 2.8 });
  smooth(ctx, [[-60, -6], [-30, -10]], false); line(ctx, '#d6a73a', 3);
  // Legs
  limb(ctx, [[-10, -70], [-16, -36], [-18, -8]], 15, shade(armour, -0.15));
  limb(ctx, [[14, -70], [20, -36], [20, -8]], 15, armour);
  for (const x of [-18, 20]) { roundRectPath(ctx, x - 11, -12, 24, 12, 4); paint(ctx, shade(armour, -0.25), -12, 0, { line: 2 }); }
  // Torso armour with barnacles
  smooth(ctx, [[-26, -146 + breathe], [26, -148 + breathe], [32, -110], [26, -70], [-24, -70], [-30, -110]]);
  paint(ctx, armour, -148, -70, { line: 2.8, light: 0.3 });
  for (const [x, y, r] of [[-14, -124, 5], [16, -100, 4], [-6, -88, 3.4], [20, -132, 3], [-20, -98, 3]]) {
    circlePath(ctx, x, y, r); paint(ctx, bone, y - r, y + r, { line: 1.2 });
    circlePath(ctx, x, y, r * 0.4); ctx.fillStyle = shade(armour, -0.5); ctx.fill();
  }
  ellipsePath(ctx, 18, -144 + breathe, 16, 10, 0.3); paint(ctx, armour, -154, -134, { line: 2.4, light: 0.35 });
  // Skull head with crown
  withTransform(ctx, 4, -170 + breathe, 0, 1, () => {
    smooth(ctx, [[-16, 8], [-18, -10], [-6, -22], [12, -22], [22, -10], [22, 6], [14, 18], [-4, 18]]);
    paint(ctx, bone, -22, 18, { line: 2.4, light: 0.15 });
    ellipsePath(ctx, 6, -4, 5, 6); ctx.fillStyle = '#0b1014'; ctx.fill();
    ellipsePath(ctx, 17, -4, 4, 5.5); ctx.fillStyle = '#0b1014'; ctx.fill();
    glowEye(ctx, 6, -4, 2.4, '#6fb4ff'); glowEye(ctx, 17, -4, 2, '#6fb4ff');
    for (let i = 0; i < 4; i++) { roundRectPath(ctx, 4 + i * 4, 10, 3, 5, 1); ctx.fillStyle = '#f4efe2'; ctx.fill(); }
    poly(ctx, [[-16, -16], [-18, -40], [-8, -28], [2, -44], [10, -28], [20, -40], [22, -16]]);
    paint(ctx, '#d6a73a', -44, -16, { line: 2.2, light: 0.4 });
    for (const x of [-8, 2, 12]) { circlePath(ctx, x, -21, 2.4); ctx.fillStyle = '#e0607e'; ctx.fill(); }
  });
  // Sword arm
  limb(ctx, [[18, -136], [40, -112], [54, -104]], 12, armour);
  withTransform(ctx, 56, -104, -1.0, 1, () => {
    glow(ctx, 40, 0, 40, '#ffd56b', 0.35);
    limb(ctx, [[-14, 0], [0, 0]], 6, '#8a5a12', { outline: 1.8 });
    roundRectPath(ctx, -2, -11, 5, 22, 2); paint(ctx, '#d6a73a', -11, 11, { line: 1.6 });
    poly(ctx, [[3, -5], [82, -3], [92, 0], [82, 3], [3, 5]]); paint(ctx, '#f6e7a8', -5, 5, { line: 2, light: 0.4 });
  });
  circlePath(ctx, 56, -104, 6.5); paint(ctx, bone, -110, -98, { line: 1.8 });
}
boss_sovereign.size = { x: -76, y: -222, w: 180, h: 226 };

function boss_archivist(ctx, t) {
  const robe = '#2b2450';
  const hover = -30 + wave(t, 0.002, 6);
  // Orbiting books
  for (let i = 0; i < 5; i++) {
    const a = t * 0.0008 + i * (Math.PI * 2 / 5);
    const bx = Math.cos(a) * 80;
    const by = hover - 110 + Math.sin(a) * 26;
    withTransform(ctx, bx, by, Math.sin(a) * 0.4, 1, () => {
      roundRectPath(ctx, -10, -8, 20, 16, 2);
      paint(ctx, ['#7a2e3a', '#2f5fa8', '#3f6b3a', '#c9a227', '#5a3fa8'][i], -8, 8, { line: 1.8 });
      poly(ctx, [[-8, -5], [-8, 5]], false); line(ctx, '#e8dfc8', 1.6);
    });
  }
  withTransform(ctx, 0, hover, 0, 1, () => {
    glow(ctx, 0, -100, 110, '#9a7ff0', 0.22);
    // Robe tapering into ink
    smooth(ctx, [[-32, -170], [30, -172], [44, -100], [36, -30], [14, 0 + wave(t, 0.004, 4)], [0, -18], [-16, 4 + wave(t, 0.004, 4, 1)],
      [-36, -30], [-46, -100]]);
    paint(ctx, robe, -172, 4, { line: 3, light: 0.25, dark: 0.4 });
    for (let i = 0; i < 6; i++) {
      const y = -150 + i * 22;
      ctx.font = 'bold 12px serif';
      ctx.fillStyle = rgba('#c9a2ff', 0.5 + 0.4 * Math.sin(t * 0.004 + i));
      ctx.fillText('✦ϟ∴◊'[i % 4], -20 + (i % 3) * 14, y);
    }
    // Hood with many eyes
    smooth(ctx, [[-32, -164], [-26, -200], [4, -214], [32, -200], [36, -164], [10, -156]]);
    paint(ctx, shade(robe, 0.08), -214, -156, { line: 2.8 });
    ellipsePath(ctx, 6, -182, 18, 20); ctx.fillStyle = '#0b0a14'; ctx.fill();
    const blink = (Math.sin(t * 0.0013) + 1) / 2;
    for (const [x, y, r] of [[0, -188, 3.4], [14, -186, 3], [7, -176, 2.6], [-6, -176, 2], [18, -174, 2]]) {
      glowEye(ctx, x, y, r * (0.6 + blink * 0.4), '#c9a2ff');
    }
    // Arms: quill and open book
    limb(ctx, [[22, -156], [46, -132], [60, -128]], 12, robe);
    withTransform(ctx, 62, -128, -1.0, 1, () => {
      smooth(ctx, [[0, 0], [16, -10], [46, -10], [62, 0], [40, 6], [10, 6]]); paint(ctx, '#f3ecd9', -10, 6, { line: 1.8 });
      poly(ctx, [[0, 0], [60, 0]], false); line(ctx, '#8a7f62', 1);
    });
    limb(ctx, [[-22, -154], [-44, -126], [-40, -112]], 12, robe);
    withTransform(ctx, -42, -110, -0.2, 1, () => {
      glow(ctx, 0, -6, 26, '#c9a2ff', 0.5);
      poly(ctx, [[-22, -4], [0, 0], [0, -16], [-22, -20]]); paint(ctx, '#f3ecd9', -20, 0, { line: 1.6 });
      poly(ctx, [[22, -4], [0, 0], [0, -16], [22, -20]]); paint(ctx, '#e8dfc8', -20, 0, { line: 1.6 });
      for (let i = 0; i < 3; i++) { poly(ctx, [[-18, -14 + i * 4], [-4, -11 + i * 4]], false); line(ctx, '#8a7f62', 0.9); }
    });
  });
}
boss_archivist.size = { x: -100, y: -256, w: 200, h: 236 };

export const CREATURES = {
  rat, slime, bat, crab, ghoul, fungus, croc, cultist, sludge, wraith, drowned, serpent,
  boss_ratking, boss_leviathan, boss_plague, boss_sovereign, boss_archivist,
};

export function drawCreature(ctx, name, t = 0) {
  const draw = CREATURES[name];
  if (draw) draw(ctx, t);
}

export function creatureSize(name) {
  return CREATURES[name]?.size || { x: -60, y: -120, w: 120, h: 124 };
}
