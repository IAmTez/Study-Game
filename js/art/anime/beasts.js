/* The sewer's regular monsters, cel-shaded.

   Each creature faces right with its feet on y = 0 (the scene mirrors it to
   face the player). Its draw function takes an animation state `a`:
     t       — clock in ms, for idle motion
     wind    — 0..1 anticipation before an attack (rearing back, drawing breath)
     strike  — 0..1 the attack itself (jaws snap, claws swing, mouth opens)
     hurt    — 0..1 flinch from a hit
     phys, now, offset — spring-chain state for tails, cloaks and tentacles
   so every creature idles, winds up, strikes and flinches in its own way. */

import {
  cel, curve, poly, ellipse, circle, roundRect, capsule, stroke, fill, glow, sparkle, frame, shade, rgba,
  shadowOf, inkFor,
} from './cel.js';
import { chain, ribbon, lerp, clamp } from './rig.js';

export const wave = (t, speed, amount, phase = 0) => Math.sin(t * speed + phase) * amount;

/** Shorthand: a smooth closed shape through `pts`, cel-shaded. */
export function shape(ctx, pts, colour, opts = {}) {
  const path = curve(pts, true, opts.tension ?? 0.4);
  cel(ctx, path, colour, opts);
  return path;
}

/** A pointed spike/tuft from (x, y), `len` long at `angle`, `w` wide at the base. */
export function spike(x, y, len, angle, w, bend = 0) {
  const nx = Math.cos(angle + Math.PI / 2) * w / 2;
  const ny = Math.sin(angle + Math.PI / 2) * w / 2;
  const tx = x + Math.cos(angle) * len;
  const ty = y + Math.sin(angle) * len;
  const mx = x + Math.cos(angle) * len * 0.5 + Math.cos(angle + Math.PI / 2) * bend;
  const my = y + Math.sin(angle) * len * 0.5 + Math.sin(angle + Math.PI / 2) * bend;
  return curve([[x - nx, y - ny], [mx - nx * 0.4, my - ny * 0.4], [tx, ty], [mx + nx * 0.5, my + ny * 0.5], [x + nx, y + ny]], true, 0.35);
}

/** A glowing monster eye with a slit or round pupil. */
export function monsterEye(ctx, x, y, r, colour, opts = {}) {
  const { slit = false, angry = 0, glowAlpha = 0.55, open = 1 } = opts;
  if (glowAlpha) glow(ctx, x, y, r * 4.5, colour, glowAlpha);
  if (open < 0.25) { stroke(ctx, poly([[x - r, y], [x + r, y + 0.4]], false), inkFor(colour), r * 0.35); return; }
  const top = -r * open + angry * r * 0.5;
  const eye = curve([[x - r * 1.15, y + angry * r * 0.15], [x - r * 0.2, y + top], [x + r * 1.1, y + top * 0.6], [x + r * 0.9, y + r * 0.7], [x - r * 0.3, y + r * 0.9]], true, 0.4);
  ctx.save();
  ctx.clip(eye);
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 1.3);
  g.addColorStop(0, shade(colour, 0.6));
  g.addColorStop(0.55, colour);
  g.addColorStop(1, shade(colour, -0.35));
  ctx.fillStyle = g;
  ctx.fill(eye);
  fill(ctx, slit ? ellipse(x + r * 0.1, y, r * 0.22, r * 0.9) : circle(x + r * 0.1, y + r * 0.05, r * 0.42), shade(colour, -0.75));
  ctx.restore();
  stroke(ctx, eye, inkFor(colour), Math.max(0.6, r * 0.22));
  sparkle(ctx, x - r * 0.35, y - r * 0.35, r * 0.45, '#ffffff', 0.95);
}

/** A row of fangs between two points, pointing along `dir` (1 down, -1 up). */
export function fangs(ctx, x0, y0, x1, y1, n, h, colour = '#f6efdc', dir = 1) {
  for (let i = 0; i < n; i++) {
    const f = (i + 0.5) / n;
    const x = lerp(x0, x1, f);
    const y = lerp(y0, y1, f);
    const w = Math.abs(x1 - x0) / n * 0.9;
    const len = h * (i === 0 || i === n - 1 ? 1.25 : 0.8 + 0.3 * ((i * 7) % 3) / 2);
    cel(ctx, poly([[x - w / 2, y], [x + w / 2, y], [x + w * 0.1, y + len * dir]]), colour, { cast: 0.6, line: 0.6, rim: false });
  }
}

/** Curved claws fanning from (x, y) along `angle`. */
export function claws(ctx, x, y, angle, n, len, colour = '#efe6d2', spread = 0.32) {
  for (let i = 0; i < n; i++) {
    const a = angle + (i - (n - 1) / 2) * spread;
    cel(ctx, spike(x, y, len, a, len * 0.36, len * 0.25), colour, { cast: 0.8, line: 0.7, rim: false, gloss: 0.6 });
  }
}

/** A sludge drip hanging from (x, y). */
export function drip(ctx, x, y, len, colour, t = 0, phase = 0) {
  const l = len * (0.7 + 0.3 * Math.sin(t * 0.002 + phase));
  const path = curve([[x - 2.6, y], [x - 1.6, y + l * 0.6], [x, y + l], [x + 1.6, y + l * 0.6], [x + 2.6, y]], true, 0.5);
  cel(ctx, path, colour, { cast: 0.8, line: 0.6, gloss: 0.8 });
}

const chainOpts = (a, extra = {}) => ({ now: a.now || a.t || 0, offset: a.offset || [0, 0], ...extra });

/* ---------------------------------------------------------------
   Sewer Rat
   --------------------------------------------------------------- */

function rat(ctx, a) {
  const { t } = a;
  const fur = '#8d7867';
  const dark = '#5e4b40';
  const belly = '#cdb8a2';
  const pink = '#f2a7a4';
  const breath = wave(t, 0.006, 1.4);
  const sniff = wave(t, 0.03, 0.8) * (0.5 + 0.5 * Math.sin(t * 0.0011));
  const tilt = -0.2 * a.wind + 0.16 * a.strike - 0.14 * a.hurt;
  const open = clamp(a.wind * 0.4 + a.strike);

  // Tail on a spring chain, behind everything.
  const tail = chain(a.phys, 'rat-tail', [-56, -26], [[0, 0], [-16, 4], [-31, 2], [-44, -6], [-52, -19], [-54, -33]],
    chainOpts(a, { wind: 0.7, gravity: 0.04, stiffness: 0.22 }));
  const tailPath = curve(ribbon(tail, 9, 2), true, 0.4);
  cel(ctx, tailPath, pink, { cast: 2, rimWidth: 1 });
  for (let i = 1; i < tail.length - 1; i++) stroke(ctx, circle(tail[i][0], tail[i][1], 3.4 - i * 0.4), shade(pink, -0.25), 0.6, 0.6);

  frame(ctx, -24, -6, tilt, 1, () => {
    ctx.translate(24, 6);
    // Far legs.
    shape(ctx, [[-42, -24], [-28, -34], [-18, -18], [-22, -2], [-36, -2], [-44, -12]], shadowOf(fur, 0.2), { cast: 2 });
    shape(ctx, [[24, -30], [34, -30], [38, -6], [30, -2], [24, -8]], shadowOf(fur, 0.2), { cast: 1.6 });
    // Body.
    const body = shape(ctx, [[-60, -28], [-54, -56 + breath], [-30, -76 + breath], [4, -80 + breath], [32, -70], [50, -50], [52, -30], [38, -12], [8, -6], [-30, -6], [-56, -12]],
      fur, { y0: -80, y1: -6, cast: 4.2, rimWidth: 1.8, rimAlpha: 0.7 });
    ctx.save();
    ctx.clip(body);
    shape(ctx, [[-30, -6], [-10, -26], [20, -30], [44, -20], [40, -4]], belly, { cast: 0, rim: false, line: 0 });
    // Fur strokes.
    for (let i = 0; i < 9; i++) {
      const x = -48 + i * 10;
      const y = -66 + Math.abs(i - 4) * 2.6 + breath;
      stroke(ctx, curve([[x, y], [x - 4, y + 6], [x - 9, y + 9]], false), shade(fur, -0.3), 0.8, 0.55);
    }
    ctx.restore();
    // Spiky fur along the spine.
    for (let i = 0; i < 7; i++) {
      const x = -54 + i * 11;
      const y = -58 - Math.sin((i / 6) * Math.PI) * 22 + breath;
      cel(ctx, spike(x, y, 12 - Math.abs(i - 3), -2.1 + i * 0.12, 8), i % 2 ? fur : shade(fur, -0.08), { cast: 1.4, line: 0.8, rimWidth: 1 });
    }
    // Haunch and near legs.
    shape(ctx, [[-50, -40], [-30, -48], [-16, -34], [-16, -14], [-30, -4], [-48, -10], [-56, -24]], fur, { cast: 3, rimWidth: 1.4 });
    stroke(ctx, curve([[-48, -36], [-34, -42], [-22, -32]], false), shade(fur, 0.25), 1.2, 0.5);
    shape(ctx, [[-34, -8], [-20, -10], [-12, -2], [-14, 2], [-36, 2]], pink, { cast: 1, line: 0.8 });
    claws(ctx, -13, -1, 0.1, 3, 5, '#f4ead6', 0.3);
    cel(ctx, capsule(32, -30, 36, -6, 7, 5), fur, { cast: 2 });
    shape(ctx, [[30, -6], [44, -8], [48, -1], [30, 2]], pink, { cast: 1, line: 0.8 });
    claws(ctx, 47, -2, 0.2, 3, 5, '#f4ead6', 0.3);

    // Head: rears back on the wind-up, snaps forward on the bite.
    frame(ctx, 40, -56, -0.25 * a.wind + 0.2 * a.strike + 0.08 * sniff * 0.1, 1, () => {
      // Far ear.
      shape(ctx, [[4, -14], [6, -32], [18, -36], [22, -22], [14, -10]], shadowOf(fur, 0.15), { cast: 1.6 });
      // Lower jaw opens.
      frame(ctx, 14, 6, open * 0.5, 1, () => {
        shape(ctx, [[0, 0], [30, 2], [40, 6], [32, 12], [6, 12]], shade(fur, -0.06), { cast: 1.6 });
        fill(ctx, curve([[4, 1], [30, 2], [36, 5], [10, 6]], true), '#7a2e38', open);
        fangs(ctx, 22, 2, 34, 3, 3, -4, '#f6efdc', -1);
      });
      const head = shape(ctx, [[-12, -8], [-4, -22], [16, -26], [36, -18], [52, -8], [58, 0], [52, 6], [30, 8], [8, 10], [-8, 4]],
        fur, { y0: -26, y1: 10, cast: 3.4, rimWidth: 1.6, rimAlpha: 0.7 });
      ctx.save(); ctx.clip(head);
      shape(ctx, [[20, 2], [40, -2], [58, 0], [52, 8], [24, 10]], belly, { cast: 0, rim: false, line: 0 });
      ctx.restore();
      // Incisors.
      cel(ctx, roundRect(46, 4, 3.4, 8 + open * 2, 1), '#f7e7b0', { cast: 0.6, line: 0.6, rim: false });
      cel(ctx, roundRect(49.6, 4, 3.2, 7 + open * 2, 1), '#efdc9c', { cast: 0.6, line: 0.6, rim: false });
      // Nose and whiskers.
      cel(ctx, ellipse(57 + sniff, -1, 4, 3.4), pink, { cast: 1, line: 0.8, gloss: 1 });
      for (const [dy, len] of [[-3, 22], [0, 26], [3, 20]]) {
        stroke(ctx, curve([[50, 1 + dy * 0.4], [50 + len * 0.6, dy * 2 - 1 + sniff], [50 + len, dy * 3.6 + sniff]], false), 'rgba(250,240,230,.75)', 0.6);
      }
      // Scar and glowing eye.
      monsterEye(ctx, 26, -10, 4.4, '#ff4a4a', { angry: 0.5 + a.wind * 0.5, open: 1 - a.hurt * 0.8 });
      stroke(ctx, poly([[18, -20], [30, -2]], false), shade(fur, 0.45), 1.4, 0.8);
      stroke(ctx, curve([[18, -16], [26, -18], [34, -14]], false), dark, 1.3);
      // Near ear.
      shape(ctx, [[-4, -16], [-6, -36], [8, -42], [16, -28], [10, -16]], fur, { cast: 2, rimWidth: 1.2 });
      shape(ctx, [[-1, -20], [-1, -33], [7, -36], [11, -27], [7, -19]], pink, { cast: 1, line: 0, rim: false });
      stroke(ctx, poly([[0, -36], [4, -32], [2, -30]], false), dark, 1, 0.8);
    });
  });
}
rat.size = { x: -116, y: -122, w: 236, h: 126 };
rat.attack = { type: 'melee', fx: 'bite', colour: '#ff4a4a' };
rat.reach = 104;

/* ---------------------------------------------------------------
   Effluent Slime
   --------------------------------------------------------------- */

function slime(ctx, a) {
  const { t } = a;
  const c = '#7ccf4f';
  const squash = wave(t, 0.005, 0.05) + a.wind * 0.22 - a.strike * 0.24 + a.hurt * 0.12;
  const hop = -Math.sin(a.strike * Math.PI) * 26;
  // Puddle.
  cel(ctx, ellipse(0, -1, 56 + squash * 30, 7), shade(c, -0.2), { cast: 0, rim: false, line: 0.8, alpha: 0.7 });
  frame(ctx, 0, hop, 0, [1 + squash, 1 - squash], () => {
    glow(ctx, 0, -42, 80, '#a6f06a', 0.28);
    const body = curve([[-50, 0], [-56, -26], [-42, -62], [-12, -84], [18, -82], [46, -60], [56, -26], [50, 0]], true, 0.42);
    // Translucent body: base, inner light, then the cel shadow and rim.
    ctx.save();
    ctx.clip(body);
    const g = ctx.createRadialGradient(-10, -56, 4, 0, -36, 70);
    g.addColorStop(0, '#dcffb0');
    g.addColorStop(0.45, c);
    g.addColorStop(1, shade(c, -0.3));
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = g;
    ctx.fill(body);
    ctx.globalAlpha = 1;
    // Things suspended inside.
    frame(ctx, -18, -24 + wave(t, 0.002, 2), 0.6, 1, () => cel(ctx, capsule(-12, 0, 12, 0, 3, 3), '#efe6cf', { cast: 1, line: 0.7, alpha: 0.65 }));
    cel(ctx, circle(22, -18 + wave(t, 0.0024, 2), 5), '#e3b64a', { cast: 1, line: 0.7, alpha: 0.6, gloss: 1 });
    for (const [bx, by, r, s] of [[14, -30, 4, 1], [-26, -52, 3, 1.4], [28, -58, 2.4, 0.8], [-34, -16, 2.6, 1.2], [4, -12, 2, 1.6]]) {
      const yy = by - ((t * 0.01 * s) % 30);
      stroke(ctx, circle(bx + wave(t, 0.004, 1.5, bx), yy, r), 'rgba(255,255,255,.6)', 1);
    }
    fill(ctx, curve([[-56, -10], [-30, -2], [10, 0], [56, -12], [56, 6], [-56, 6]], true), shadowOf(c, 0.25), 0.55);
    ctx.restore();
    stroke(ctx, body, '#e8ffd0', 2.4, 0.35);
    stroke(ctx, body, inkFor(c), 1.4);
    // Glossy highlights.
    fill(ctx, ellipse(-24, -60, 13, 7, -0.6), '#ffffff', 0.6);
    fill(ctx, circle(-8, -72, 3), '#ffffff', 0.8);
    sparkle(ctx, 30, -64, 5, '#ffffff', 0.7 + 0.3 * Math.sin(t * 0.004));
    // A sprouting leaf on top.
    const sway = wave(t, 0.003, 0.15);
    frame(ctx, 2, -83, -0.2 + sway, 1, () => {
      stroke(ctx, curve([[0, 0], [2, -8], [6, -14]], false), '#4f8f2f', 1.6);
      cel(ctx, curve([[6, -14], [16, -22], [22, -16], [12, -10]], true), '#9be05a', { cast: 1, line: 0.8 });
      cel(ctx, curve([[3, -10], [-8, -16], [-10, -10], [-2, -6]], true), '#8bd04c', { cast: 1, line: 0.8 });
    });
    // Face.
    const angry = a.wind > 0.2 || a.strike > 0.1;
    for (const [ex, sx] of [[4, 1], [26, 0.8]]) {
      frame(ctx, ex, -42, 0, [sx, 1], () => {
        if (a.hurt > 0.4) { stroke(ctx, poly([[-4, -4], [3, 0], [-4, 4]], false), '#16300c', 1.8); return; }
        cel(ctx, ellipse(0, 0, 5, 7.4), '#1a3510', { cast: 0, rim: false, line: 0 });
        fill(ctx, ellipse(-1.4, -2.6, 2, 2.6), '#ffffff');
        fill(ctx, circle(1.6, 2.6, 1), '#ffffff');
        if (angry) stroke(ctx, poly([[-6, -11], [5, -7]], false), '#1a3510', 1.8);
      });
    }
    if (angry) {
      cel(ctx, curve([[10, -28], [22, -28], [18, -20], [13, -20]], true), '#5a1f2c', { cast: 0, rim: false, line: 0.8 });
    } else {
      stroke(ctx, curve([[11, -29], [14, -26], [17, -29], [20, -26], [23, -29]], false), '#1a3510', 1.2);
    }
    fill(ctx, ellipse(-2, -32, 4, 2), '#ff7a9a', 0.35);
    fill(ctx, ellipse(32, -33, 3, 1.8), '#ff7a9a', 0.35);
  });
  drip(ctx, -36, -10 + hop, 9, c, t, 1);
  drip(ctx, 40, -12 + hop, 7, c, t, 2.3);
}
slime.size = { x: -72, y: -150, w: 144, h: 154 };
slime.attack = { type: 'melee', fx: 'slam', colour: '#9be05a' };
slime.reach = 58;

/* ---------------------------------------------------------------
   Grotto Bat
   --------------------------------------------------------------- */

function batWing(ctx, colour, membrane, flap, scale) {
  frame(ctx, 0, 0, -0.35 + flap, [scale, scale * (0.7 + 0.3 * Math.cos(flap * 2))], () => {
    const wrist = [-34, -34];
    const tips = [[-86, -58], [-96, -20], [-74, 8], [-44, 18]];
    const edge = [[-2, 6], [-44, 18], [-54, 4], [-74, 8], [-80, -8], [-96, -20], [-88, -38], [-86, -58], [-60, -50], [-34, -34], [-6, -12]];
    const wing = curve(edge, true, 0.25);
    cel(ctx, wing, membrane, { y0: -58, y1: 18, cast: 3.6, rim: shade(membrane, 0.6), rimWidth: 1.4, alpha: 0.96 });
    ctx.save(); ctx.clip(wing);
    for (const tip of tips) stroke(ctx, curve([wrist, [(wrist[0] + tip[0]) / 2 + 3, (wrist[1] + tip[1]) / 2 + 2], tip], false), shade(membrane, 0.25), 1.2, 0.5);
    ctx.restore();
    // Arm and finger bones.
    stroke(ctx, poly([[0, 0], wrist], false), colour, 4.6);
    for (const tip of tips) stroke(ctx, curve([wrist, [(wrist[0] + tip[0]) / 2 + 3, (wrist[1] + tip[1]) / 2 + 2], tip], false), colour, 2.2);
    cel(ctx, spike(wrist[0], wrist[1], 9, -2.2, 4), '#efe6d2', { cast: 0.6, line: 0.6, rim: false });
  });
}

function bat(ctx, a) {
  const { t } = a;
  const fur = '#5b4a6e';
  const membrane = '#7a5a8e';
  const hover = -118 + wave(t, 0.004, 7) - a.wind * 10;
  const speed = a.wind > 0 ? 0.012 : 0.018;
  const flap = Math.sin(t * speed) * 0.55 - a.wind * 0.6 + a.strike * 0.5;
  const scream = clamp(a.strike * 1.2);
  frame(ctx, 0, hover, -0.12 * a.wind + 0.1 * a.strike - 0.25 * a.hurt, 1, () => {
    glow(ctx, 0, 0, 70, '#a47cff', 0.16);
    // Far wing, behind.
    frame(ctx, 6, -8, 0, 1, () => batWing(ctx, shade(fur, -0.25), shadowOf(membrane, 0.3), flap * 0.9 + 0.2, 0.82));
    // Feet dangling.
    claws(ctx, -8, 26, 1.7, 3, 7, '#d8ccb8', 0.35);
    claws(ctx, 4, 27, 1.5, 3, 7, '#d8ccb8', 0.35);
    // Fluffy body.
    const body = shape(ctx, [[-22, -10], [-14, -26], [6, -30], [22, -18], [24, 4], [14, 24], [-6, 28], [-20, 16]], fur, { y0: -30, y1: 28, cast: 3.4, rimWidth: 1.6, rimAlpha: 0.7 });
    ctx.save(); ctx.clip(body);
    shape(ctx, [[0, -6], [18, -8], [20, 10], [8, 24], [-4, 16]], shade(fur, 0.22), { cast: 0, rim: false, line: 0 });
    ctx.restore();
    for (let i = 0; i < 6; i++) cel(ctx, spike(-20 + i * 7, -22 - Math.sin(i / 5 * Math.PI) * 6, 8, -1.9 + i * 0.12, 6), fur, { cast: 1, line: 0.7, rimWidth: 0.8 });
    // Head with big ears.
    frame(ctx, 14, -30, -0.2 * a.wind + 0.15 * a.strike, 1, () => {
      shape(ctx, [[-12, -8], [-18, -40], [-4, -30], [0, -12]], shadowOf(fur, 0.15), { cast: 1.6 });
      shape(ctx, [[-10, 0], [-6, -14], [10, -18], [24, -8], [26, 4], [16, 12], [0, 12]], fur, { y0: -18, y1: 12, cast: 2.6, rimWidth: 1.4 });
      shape(ctx, [[2, -12], [6, -46], [18, -38], [14, -14]], fur, { cast: 2.2, rimWidth: 1.2 });
      shape(ctx, [[5, -15], [8, -38], [14, -34], [12, -16]], '#d98ab0', { cast: 0.8, line: 0, rim: false });
      // Snout and screaming mouth.
      shape(ctx, [[16, -2], [28, -4], [32, 2], [24, 6]], shade(fur, 0.1), { cast: 1, line: 0.8 });
      fill(ctx, ellipse(30, -1, 1.4, 1), '#2a1830');
      const m = curve([[14, 4], [26, 4 + scream * 2], [24, 8 + scream * 9], [16, 10 + scream * 6]], true);
      cel(ctx, m, '#6a1f34', { cast: 0, rim: false, line: 0.8 });
      fangs(ctx, 16, 4.5, 25, 4.5, 2, 5 + scream * 2, '#f6efdc', 1);
      monsterEye(ctx, 12, -4, 3.6, '#ffd84a', { angry: 0.6, open: 1 - a.hurt });
    });
    // Near wing, in front.
    frame(ctx, -6, -6, 0, 1, () => batWing(ctx, fur, membrane, flap, 1));
  });
}
bat.size = { x: -110, y: -220, w: 200, h: 210 };
bat.attack = { type: 'ranged', fx: 'sonic', colour: '#c9a2ff', muzzle: [40, -148] };
bat.hover = true;

/* ---------------------------------------------------------------
   Iron Crab
   --------------------------------------------------------------- */

function crabLeg(ctx, x, y, reach, colour, t, phase) {
  // Legs splay outward and arch up at the knee before stepping down.
  const lift = wave(t, 0.006, 2, phase);
  const knee = [x + reach, y - 12 + lift];
  const foot = [knee[0] + reach * 0.45, 0];
  cel(ctx, capsule(x, y, knee[0], knee[1], 5, 4), colour, { cast: 1.6, gloss: 1 });
  cel(ctx, capsule(knee[0], knee[1], foot[0], foot[1] - 1, 4, 1.4), colour, { cast: 1.4, gloss: 1 });
  cel(ctx, circle(knee[0], knee[1], 3.4), shade(colour, -0.15), { cast: 0.8, line: 0.6 });
}

function crab(ctx, a) {
  const { t } = a;
  const shell = '#8b5a46';
  const plate = '#a9b5c2';
  const rust = '#c0703f';
  const bob = wave(t, 0.004, 1.2) + a.wind * 4 - a.hurt * 3;
  const snap = clamp(a.strike);
  // Far legs.
  for (let i = 0; i < 3; i++) crabLeg(ctx, -20 + i * 14, -30 + bob, -34 + i * 8, shadowOf(shell, 0.25), t, i);
  // Far claw.
  frame(ctx, 40, -48 + bob, -0.3 - a.wind * 0.3 + snap * 0.2, 0.7, () => {
    cel(ctx, capsule(0, 0, 26, -6, 6, 5), shadowOf(shell, 0.2), { cast: 1.6 });
    shape(ctx, [[22, -12], [44, -18], [50, -6], [40, 4], [24, 4]], shadowOf(shell, 0.2), { cast: 2 });
  });
  // Shell.
  frame(ctx, 0, bob, 0, 1, () => {
    const body = shape(ctx, [[-56, -36], [-48, -60], [-20, -76], [16, -76], [46, -62], [58, -40], [48, -24], [10, -18], [-30, -18], [-52, -24]], shell,
      { y0: -76, y1: -18, cast: 4, rimWidth: 1.8, gloss: 2 });
    ctx.save(); ctx.clip(body);
    // Riveted iron plates bolted across the shell.
    for (const [px, py, w, h, r] of [[-40, -70, 30, 22, 5], [-8, -78, 30, 24, 5], [24, -70, 26, 22, 5]]) {
      const p = roundRect(px, py, w, h, r);
      cel(ctx, p, plate, { cast: 2, gloss: 1.8, line: 0.9 });
      for (const [rx, ry] of [[px + 4, py + 4], [px + w - 4, py + 4], [px + 4, py + h - 4], [px + w - 4, py + h - 4]]) {
        cel(ctx, circle(rx, ry, 1.5), shade(plate, -0.2), { cast: 0.5, line: 0.4, gloss: 1 });
      }
    }
    // Rust streaks.
    for (const [x, y] of [[-30, -48], [0, -52], [30, -48]]) fill(ctx, curve([[x, y], [x + 3, y + 10], [x - 1, y + 22], [x - 3, y + 8]], true), rust, 0.6);
    fill(ctx, curve([[-56, -30], [56, -36], [58, -18], [-56, -16]], true), shadowOf(shell, 0.3), 0.5);
    ctx.restore();
    // Spikes around the rim.
    for (let i = 0; i < 6; i++) {
      const ang = Math.PI + 0.35 + i * 0.48;
      const r = 54;
      cel(ctx, spike(Math.cos(ang) * r * 1.02, -46 + Math.sin(ang) * 30, 9, ang, 7), '#e2d6c0', { cast: 0.8, line: 0.7 });
    }
    // Eye stalks.
    for (const [x, h, s] of [[28, 26, 1], [40, 22, 0.85]]) {
      const sway = wave(t, 0.005, 3, x);
      stroke(ctx, curve([[x, -66], [x + sway * 0.5, -66 - h / 2], [x + sway, -66 - h]], false), shade(shell, -0.2), 4 * s);
      monsterEye(ctx, x + sway, -66 - h, 4.6 * s, '#ffcc33', { slit: true, open: 1 - a.hurt * 0.7, angry: a.wind });
    }
    // Mouth parts.
    fangs(ctx, 46, -36, 56, -34, 3, 5, '#e2d6c0', 1);
  });
  // Near legs.
  for (let i = 0; i < 3; i++) crabLeg(ctx, -34 + i * 16, -26 + bob, -40 + i * 10, shell, t, i + 2);
  // The big near claw: opens on the wind-up, snaps shut on the strike.
  frame(ctx, 46, -36 + bob, -0.5 * a.wind + 0.35 * snap, 1, () => {
    cel(ctx, capsule(-6, 0, 24, -6, 8, 7), shell, { cast: 2, gloss: 1.4 });
    cel(ctx, circle(24, -6, 7.5), plate, { cast: 1.4, gloss: 1.6, line: 0.8 });
    const gape = 0.15 + a.wind * 0.55 - snap * 0.6;
    frame(ctx, 26, -6, -Math.max(0, gape), 1, () => {
      shape(ctx, [[0, -6], [22, -18], [46, -16], [52, -8], [36, -6], [18, 2]], shell, { cast: 2.6, gloss: 1.6, rimWidth: 1.4 });
      fangs(ctx, 24, -6, 46, -8, 4, 4, '#e2d6c0', 1);
    });
    frame(ctx, 26, -6, Math.max(0, gape) * 0.6, 1, () => {
      shape(ctx, [[0, 4], [20, 10], [40, 8], [44, 2], [24, 0]], shade(shell, -0.08), { cast: 2, gloss: 1 });
      fangs(ctx, 22, 2, 40, 3, 3, 3.6, '#e2d6c0', -1);
    });
  });
}
crab.size = { x: -90, y: -128, w: 200, h: 132 };
crab.attack = { type: 'melee', fx: 'snap', colour: '#ffcc33' };
crab.reach = 120;

/* ---------------------------------------------------------------
   Tunnel Ghoul
   --------------------------------------------------------------- */

function ghoul(ctx, a) {
  const { t } = a;
  const skin = '#8da38f';
  const cloth = '#4a4058';
  const breath = wave(t, 0.004, 1.6);
  const sway = wave(t, 0.0018, 0.05);
  const lean = 0.35 + sway - a.wind * 0.25 + a.strike * 0.25 - a.hurt * 0.2;
  // Legs, bent and bony.
  for (const [hx, kx, fx, col] of [[-10, 8, -6, shadowOf(skin, 0.2)], [4, 24, 14, skin]]) {
    cel(ctx, capsule(hx, -70, kx, -36, 7, 5), col, { cast: 2 });
    cel(ctx, capsule(kx, -36, fx, -4, 5, 3.6), col, { cast: 1.8 });
    shape(ctx, [[fx - 6, -6], [fx + 10, -6], [fx + 16, 0], [fx - 6, 0]], col, { cast: 1 });
    claws(ctx, fx + 15, -1, 0.15, 3, 6, '#d8ccb8', 0.3);
  }
  frame(ctx, -2, -70, lean, 1, () => {
    // Far arm.
    const swing = -2.3 * a.wind - 1.0 * a.strike;
    frame(ctx, 10, -54, -0.15 + swing * 0.8 + sway, 1, () => {
      cel(ctx, capsule(0, 0, 0, 34, 5.4, 4.2), shadowOf(skin, 0.2), { cast: 1.8 });
      cel(ctx, capsule(0, 34, 6, 62, 4.2, 3.4), shadowOf(skin, 0.2), { cast: 1.6 });
      claws(ctx, 7, 64, 1.4, 4, 12, '#d8ccb8', 0.22);
    });
    // Ragged torso with exposed ribs.
    const torso = shape(ctx, [[-14, 6], [-18, -24], [-12, -54], [6, -64], [22, -56], [24, -30], [16, 0], [0, 8]], skin, { y0: -64, y1: 8, cast: 3.4, rimWidth: 1.6 });
    ctx.save(); ctx.clip(torso);
    for (let i = 0; i < 4; i++) stroke(ctx, curve([[0, -44 + i * 8], [12, -46 + i * 8 + breath * 0.3], [22, -42 + i * 8]], false), shade(skin, -0.3), 1.2, 0.7);
    stroke(ctx, curve([[-8, -50], [-10, -20], [-4, 0]], false), shade(skin, 0.3), 1.4, 0.4);
    ctx.restore();
    // Tattered cloth wrap.
    shape(ctx, [[-18, -4], [20, -8], [24, 10], [16, 22], [10, 12], [2, 24], [-6, 12], [-14, 22], [-20, 8]], cloth, { cast: 2.4 });
    stroke(ctx, curve([[-18, -2], [0, -4], [20, -6]], false), '#7a6a52', 2);
    // Head jutting forward.
    frame(ctx, 14, -66, -0.3 - lean * 0.5 + a.strike * 0.2, 1, () => {
      shape(ctx, [[-10, -10], [-4, -22], [12, -24], [24, -14], [28, -2], [22, 10], [6, 12], [-8, 4]], skin, { y0: -24, y1: 12, cast: 2.8, rimWidth: 1.4 });
      // Stringy hair.
      for (let i = 0; i < 5; i++) {
        const sx = -8 + i * 6;
        const s = wave(t, 0.003, 2, i);
        cel(ctx, spike(sx, -18 - (i % 2) * 3, 20 + (i % 3) * 5, 1.9 + s * 0.03, 4.5, s), '#3c3a40', { cast: 1, line: 0.6 });
      }
      // Jaw with jagged teeth.
      const gape = clamp(a.wind * 0.6 + a.strike * 0.4);
      fill(ctx, curve([[10, 2], [26, 0], [24, 6 + gape * 6], [12, 6 + gape * 4]], true), '#3a1420');
      fangs(ctx, 12, 1.5, 25, 0.5, 4, 3.4, '#e8dfc8', 1);
      fangs(ctx, 12, 6 + gape * 4, 24, 6 + gape * 6, 3, 3, '#e8dfc8', -1);
      monsterEye(ctx, 18, -10, 3.6, '#5fffe0', { angry: 0.8, open: 1 - a.hurt });
      monsterEye(ctx, 26, -10, 2.4, '#5fffe0', { angry: 0.8, glowAlpha: 0.3, open: 1 - a.hurt });
      stroke(ctx, poly([[22, -2], [26, 0]], false), shade(skin, -0.4), 1);
    });
    // Near arm, long and clawed: raised on the wind-up, raked down on the strike.
    frame(ctx, -6, -54, -0.35 + swing + sway, 1, () => {
      cel(ctx, capsule(0, 0, 2, 36, 6, 4.6), skin, { cast: 2, rimWidth: 1.2 });
      cel(ctx, capsule(2, 36, 10, 66, 4.6, 3.6), skin, { cast: 1.8, rimWidth: 1.2 });
      stroke(ctx, curve([[0, 10], [3, 26]], false), shade(skin, -0.3), 0.8, 0.7);
      claws(ctx, 11, 68, 1.35, 4, 15, '#efe6d2', 0.22);
    });
  });
}
ghoul.size = { x: -70, y: -196, w: 190, h: 200 };
ghoul.attack = { type: 'melee', fx: 'claw', colour: '#5fffe0' };
ghoul.reach = 112;

/* ---------------------------------------------------------------
   Fungal Horror
   --------------------------------------------------------------- */

function fungus(ctx, a) {
  const { t } = a;
  const cap = '#b64a5e';
  const stalk = '#e9dcc0';
  const glowC = '#6ff5d6';
  const puff = a.wind * 0.12 - a.strike * 0.16 + wave(t, 0.003, 0.025);
  // Roots.
  for (const [x, ang] of [[-20, 2.6], [-6, 2.0], [10, 1.2], [24, 0.6]]) {
    cel(ctx, spike(x, -10, 26, ang, 9, 3), shade(stalk, -0.2), { cast: 1.4, line: 0.8 });
  }
  // Stalk body with a face.
  const lean = wave(t, 0.0015, 0.04) - a.hurt * 0.15 + a.strike * 0.08;
  frame(ctx, 0, -8, lean, 1, () => {
    const body = shape(ctx, [[-26, 0], [-30, -40], [-22, -84], [24, -86], [30, -40], [26, 0]], stalk, { y0: -86, y1: 0, cast: 3.6, rimWidth: 1.6 });
    ctx.save(); ctx.clip(body);
    for (let i = 0; i < 5; i++) stroke(ctx, curve([[-20 + i * 10, -84], [-22 + i * 11, -40], [-20 + i * 10, 0]], false), shade(stalk, -0.12), 1, 0.6);
    ctx.restore();
    // Hollow, glowing face.
    for (const x of [-6, 14]) {
      cel(ctx, ellipse(x, -56, 6, 7.5), '#2a1a2a', { cast: 0, rim: false, line: 0.8 });
      glow(ctx, x, -55, 12, glowC, 0.7);
      fill(ctx, circle(x + 1, -55, 2.2), glowC);
    }
    const gape = clamp(0.2 + a.strike * 0.8);
    cel(ctx, curve([[-4, -36], [16, -36], [12, -36 + 12 * gape], [0, -36 + 10 * gape]], true), '#2a1a2a', { cast: 0, rim: false, line: 0.8 });
    // Little mushrooms sprouting from it.
    for (const [x, y, r, ang] of [[-26, -24, 6, -2.4], [24, -60, 5, -0.6], [-24, -66, 4, -2.6]]) {
      frame(ctx, x, y, ang + Math.PI / 2, 1, () => {
        cel(ctx, capsule(0, 0, 0, -r * 1.2, r * 0.3, r * 0.25), stalk, { cast: 0.6, line: 0.6 });
        cel(ctx, curve([[-r, -r], [0, -r * 2], [r, -r]], true), cap, { cast: 1, line: 0.6 });
        fill(ctx, circle(0, -r * 1.5, r * 0.25), '#ffffff', 0.8);
      });
    }
  });
  // The cap: puffs up on the wind-up and spews spores on the strike.
  frame(ctx, lean * 60, -96, lean, [1 + puff, 1 - puff * 0.6], () => {
    glow(ctx, 0, 6, 70, glowC, 0.22 + a.wind * 0.3);
    // Glowing gills underneath.
    const gills = shape(ctx, [[-62, 4], [-30, 14], [30, 14], [62, 4], [40, 0], [-40, 0]], '#5a3a5a', { cast: 0, rim: false, line: 0.8 });
    ctx.save(); ctx.clip(gills);
    for (let i = -10; i <= 10; i++) stroke(ctx, poly([[i * 2, 0], [i * 6, 14]], false), glowC, 0.9, 0.7);
    ctx.restore();
    const capPath = shape(ctx, [[-66, 6], [-60, -20], [-34, -46], [0, -54], [34, -46], [60, -20], [66, 6], [30, 2], [-30, 2]], cap,
      { y0: -54, y1: 6, cast: 4.4, rimWidth: 2, rimAlpha: 0.6, gloss: 2.4 });
    ctx.save(); ctx.clip(capPath);
    for (const [x, y, r] of [[-36, -22, 7], [-8, -40, 8], [22, -30, 6], [44, -12, 5], [-50, -4, 4], [6, -16, 5]]) {
      glow(ctx, x, y, r * 2.4, glowC, 0.35);
      cel(ctx, circle(x, y, r), '#f6efd8', { cast: 1, line: 0.6, rim: false });
    }
    ctx.restore();
  });
  // Drifting spores.
  for (let i = 0; i < 9; i++) {
    const phase = (t * 0.00025 + i * 0.137) % 1;
    const x = -50 + ((i * 37) % 100) + Math.sin(t * 0.002 + i) * 8;
    const y = -110 - phase * 90;
    glow(ctx, x, y, 7, glowC, 0.5 * (1 - phase));
    fill(ctx, circle(x, y, 1.4), '#d8fff4', 1 - phase);
  }
}
fungus.size = { x: -80, y: -220, w: 160, h: 224 };
fungus.attack = { type: 'ranged', fx: 'spores', colour: '#6ff5d6', muzzle: [10, -130] };

/* ---------------------------------------------------------------
   Sewer Croc
   --------------------------------------------------------------- */

function croc(ctx, a) {
  const { t } = a;
  const hide = '#58784e';
  const belly = '#d0c58f';
  const breath = wave(t, 0.003, 1.2);
  const gape = clamp(a.wind * 0.9 + 0.08 - a.strike * 0.2 + (a.strike > 0.5 ? 0 : a.strike * 0.4));
  const tail = chain(a.phys, 'croc-tail', [-60, -26], [[0, 0], [-22, 4], [-44, 8], [-64, 12], [-82, 14], [-98, 14]],
    chainOpts(a, { wind: 0.5, gravity: 0.1, stiffness: 0.18 }));
  const tailPath = curve(ribbon(tail, 34, 4), true, 0.4);
  cel(ctx, tailPath, hide, { cast: 3, rimWidth: 1.4 });
  for (let i = 1; i < tail.length - 1; i++) cel(ctx, spike(tail[i][0], tail[i][1] - 12 + i * 2, 9 - i, -1.6, 7), shade(hide, -0.12), { cast: 1, line: 0.7 });
  // Far legs.
  cel(ctx, capsule(-40, -24, -48, -4, 7, 5), shadowOf(hide, 0.2), { cast: 1.6 });
  cel(ctx, capsule(30, -24, 36, -4, 7, 5), shadowOf(hide, 0.2), { cast: 1.6 });
  // Body.
  frame(ctx, 0, breath * 0.5 + a.wind * 3, -0.04 * a.wind + 0.04 * a.strike, 1, () => {
    const body = shape(ctx, [[-66, -16], [-60, -40], [-20, -50], [30, -48], [60, -38], [64, -20], [40, -8], [-30, -8]], hide,
      { y0: -50, y1: -8, cast: 3.8, rimWidth: 1.8, gloss: 1 });
    ctx.save(); ctx.clip(body);
    shape(ctx, [[-60, -16], [-20, -18], [40, -18], [64, -16], [40, -6], [-40, -6]], belly, { cast: 0, rim: false, line: 0 });
    for (let i = 0; i < 9; i++) stroke(ctx, poly([[-50 + i * 12, -18], [-48 + i * 12, -8]], false), shade(belly, -0.3), 0.8, 0.7);
    // Scale plates.
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 9; i++) {
        const x = -56 + i * 13 + row * 6;
        const y = -44 + row * 10 + Math.abs(i - 4) * 0.6;
        cel(ctx, roundRect(x, y, 10, 7, 2.4), shade(hide, row ? -0.05 : 0.06), { cast: 1, line: 0.6, rim: false });
      }
    }
    ctx.restore();
    for (let i = 0; i < 8; i++) cel(ctx, spike(-56 + i * 14, -44 - Math.sin(i / 7 * Math.PI) * 5, 8, -1.62, 7), shade(hide, -0.15), { cast: 1, line: 0.7 });
    // Head with long jaws.
    frame(ctx, 58, -32, -0.08 * a.wind + 0.06 * a.strike, 1, () => {
      // Lower jaw hinges open.
      frame(ctx, 0, 4, gape * 0.5, 1, () => {
        shape(ctx, [[-4, -2], [40, 0], [70, 2], [72, 8], [40, 10], [0, 8]], shade(hide, -0.05), { cast: 2, rimWidth: 1 });
        fill(ctx, curve([[0, 0], [66, 2], [60, 4], [4, 4]], true), '#8a3040', gape > 0.1 ? 1 : 0);
        fangs(ctx, 8, 0, 66, 2, 9, -5, '#f6efdc', -1);
      });
      const head = shape(ctx, [[-10, -10], [10, -20], [40, -16], [74, -8], [80, -2], [72, 4], [30, 4], [-6, 6]], hide,
        { y0: -20, y1: 6, cast: 3, rimWidth: 1.6, gloss: 1 });
      ctx.save(); ctx.clip(head);
      for (let i = 0; i < 7; i++) fill(ctx, circle(20 + i * 8, -10 + (i % 2) * 2, 1.4), shade(hide, -0.3), 0.7);
      ctx.restore();
      fangs(ctx, 10, 4, 74, 2, 10, 5, '#f6efdc', 1);
      fill(ctx, ellipse(76, -6, 2, 1.2), '#1a2018');
      // Raised eye ridge with a slit eye.
      shape(ctx, [[6, -16], [14, -26], [26, -24], [28, -16]], hide, { cast: 1.4, rimWidth: 1 });
      monsterEye(ctx, 18, -18, 4.2, '#ffd23a', { slit: true, angry: 0.6, open: 1 - a.hurt * 0.8 });
    });
  });
  // Near legs.
  for (const [x, ph] of [[-36, 0], [36, 1]]) {
    cel(ctx, capsule(x, -22, x + 6, -4, 8, 6), hide, { cast: 2, rimWidth: 1.2 });
    shape(ctx, [[x - 2, -6], [x + 16, -6], [x + 20, 0], [x - 4, 0]], hide, { cast: 1, line: 0.8 });
    claws(ctx, x + 19, -1, 0.1 + ph * 0.05, 3, 6, '#e8dfc8', 0.32);
  }
}
croc.size = { x: -170, y: -96, w: 320, h: 100 };
croc.attack = { type: 'melee', fx: 'bite', colour: '#ffd23a' };
croc.reach = 150;

/* ---------------------------------------------------------------
   Drain Cultist
   --------------------------------------------------------------- */

function cultist(ctx, a) {
  const { t } = a;
  const robe = '#2f3a5a';
  const trim = '#c9a227';
  const magic = '#7dff9a';
  const breath = wave(t, 0.003, 1.2);
  const raise = clamp(a.wind) - a.strike * 0.4;
  // Robe skirt with physics hem.
  const hem = chain(a.phys, 'cult-hem', [0, -70], [[0, 0], [0, 24], [0, 48], [0, 66]], chainOpts(a, { wind: 0.4, stiffness: 0.1, gravity: 0.1 }));
  const sway = hem[3][0];
  shape(ctx, [[-22, -76], [24, -78], [36 + sway, -4], [14 + sway, 2], [-6 + sway, -2], [-34 + sway, 2]], shadowOf(robe, 0.1), { cast: 3, rimWidth: 1.4 });
  shape(ctx, [[-14, -76], [26, -78], [40 + sway, -2], [20 + sway, 0], [2 + sway, -4], [-18 + sway, 0]], robe, { y0: -78, y1: 0, cast: 3.6, rimWidth: 1.6 });
  stroke(ctx, curve([[-18 + sway, -2], [2 + sway, -6], [20 + sway, -2], [40 + sway, -4]], false), trim, 2.2);
  // Torso and mantle.
  frame(ctx, 4, -76 + breath, -0.06 * a.wind + 0.08 * a.strike - 0.15 * a.hurt, 1, () => {
    // Far arm holding the lantern staff.
    const staffAngle = -1.75 - raise * 0.5 + a.strike * 0.6;
    frame(ctx, 14, -40, 0, 1, () => {
      cel(ctx, capsule(0, 0, 16, 18 - raise * 30, 5, 4), shadowOf(robe, 0.15), { cast: 1.6 });
      frame(ctx, 16, 18 - raise * 30, staffAngle + Math.PI / 2, 1, () => {
        cel(ctx, roundRect(-2, -86, 4, 150, 2), '#4a3a2c', { cast: 1, line: 0.8 });
        // Lantern on a hook at the top.
        stroke(ctx, curve([[0, -86], [8, -94], [12, -86]], false), '#2a2a2a', 1.6);
        const lx = 12;
        const ly = -78 + wave(t, 0.003, 1.5);
        glow(ctx, lx, ly, 36 + a.wind * 30, magic, 0.55 + a.wind * 0.3);
        cel(ctx, roundRect(lx - 6, ly - 8, 12, 16, 3), '#3a3d40', { cast: 1, line: 0.8 });
        fill(ctx, roundRect(lx - 4, ly - 6, 8, 12, 2), magic);
        fill(ctx, ellipse(lx, ly, 2, 4 + Math.sin(t * 0.02) * 0.8), '#ffffff', 0.9);
      });
      cel(ctx, circle(16, 18 - raise * 30, 4.4), '#c8b8a8', { cast: 1, line: 0.7 });
    });
    const torso = shape(ctx, [[-16, 0], [-18, -30], [-10, -46], [14, -48], [24, -32], [22, 0]], robe, { y0: -48, y1: 0, cast: 3, rimWidth: 1.4 });
    ctx.save(); ctx.clip(torso);
    stroke(ctx, curve([[4, -48], [6, -20], [4, 0]], false), trim, 1.6);
    ctx.restore();
    // Mantle with sigils.
    shape(ctx, [[-20, -30], [-14, -48], [16, -50], [28, -34], [18, -22], [4, -26], [-10, -20]], '#4a2a4a', { cast: 2.4, rimWidth: 1.4 });
    stroke(ctx, curve([[-18, -30], [-10, -22], [4, -26], [18, -22], [28, -34]], false), trim, 1.4);
    // Hood and mask.
    frame(ctx, 6, -54, -0.06 * a.strike, 1, () => {
      shape(ctx, [[-16, 8], [-18, -14], [-8, -28], [8, -30], [20, -18], [22, 2], [14, 10]], shadowOf(robe, 0.05), { cast: 3, rimWidth: 1.6 });
      fill(ctx, curve([[-4, 8], [-2, -18], [10, -22], [18, -10], [18, 6]], true), '#120e18');
      shape(ctx, [[0, -16], [12, -18], [16, -6], [12, 6], [4, 6], [0, -4]], '#efe6d6', { cast: 1.6, line: 0.8, gloss: 1 });
      // Sigil painted on the mask.
      stroke(ctx, poly([[8, -14], [8, 2]], false), '#8a1f2c', 1);
      stroke(ctx, circle(8, -6, 3), '#8a1f2c', 0.8);
      for (const x of [5, 12]) { glow(ctx, x, -9, 6, magic, 0.6); fill(ctx, ellipse(x, -9, 1.5, 1), magic); }
    });
    // Near arm, casting: palm thrust forward on the strike.
    frame(ctx, -8, -40, 0, 1, () => {
      const hand = [22 + a.strike * 20 + raise * 6, 16 - raise * 18 - a.strike * 12];
      cel(ctx, capsule(0, 0, hand[0], hand[1], 6, 5), robe, { cast: 1.8, rimWidth: 1.2 });
      stroke(ctx, curve([[hand[0] - 6, hand[1] - 4], [hand[0] - 3, hand[1] + 4]], false), trim, 1.6);
      cel(ctx, circle(hand[0] + 4, hand[1], 4.4), '#c8b8a8', { cast: 1, line: 0.7 });
      if (a.wind > 0 || a.strike > 0) {
        glow(ctx, hand[0] + 8, hand[1], 16 + a.wind * 18, magic, 0.7);
        sparkle(ctx, hand[0] + 8, hand[1], 4 + a.wind * 5, '#ffffff', 0.9, t * 0.01);
      }
    });
  });
  // Floating sigils orbiting.
  for (let i = 0; i < 3; i++) {
    const ang = t * 0.0012 + i * 2.1;
    const x = Math.cos(ang) * 46;
    const y = -96 + Math.sin(ang) * 14;
    ctx.save();
    ctx.globalAlpha = 0.5 + 0.3 * Math.sin(ang);
    glow(ctx, x, y, 12, magic, 0.5);
    stroke(ctx, circle(x, y, 4), magic, 1);
    stroke(ctx, poly([[x - 3, y], [x + 3, y], [x, y - 4], [x - 3, y]]), magic, 0.8);
    ctx.restore();
  }
}
cultist.size = { x: -70, y: -230, w: 150, h: 234 };
cultist.attack = { type: 'ranged', fx: 'darkbolt', colour: '#7dff9a', muzzle: [44, -130] };

/* ---------------------------------------------------------------
   Sludge Golem
   --------------------------------------------------------------- */

function sludge(ctx, a) {
  const { t } = a;
  const muck = '#5d6a3a';
  const core = '#c6ff4a';
  const brick = '#8a5a44';
  const pipe = '#8c969e';
  const breath = wave(t, 0.003, 2);
  const lift = 2.5 * a.wind + 0.9 * a.strike;
  // Legs: stumpy pillars of muck.
  for (const [x, col] of [[-26, shadowOf(muck, 0.2)], [22, muck]]) {
    shape(ctx, [[x - 16, -50], [x + 16, -52], [x + 20, -2], [x - 20, -2]], col, { cast: 2.6, rimWidth: 1.4 });
    drip(ctx, x + 10, -10, 8, muck, t, x);
  }
  frame(ctx, 0, -48 + breath + a.wind * 4, -0.08 * a.wind + 0.12 * a.strike - 0.1 * a.hurt, 1, () => {
    // Far arm.
    frame(ctx, 40, -84, -0.2 - lift * 0.8, 1, () => {
      cel(ctx, capsule(0, 0, 10, 50, 13, 11), shadowOf(muck, 0.2), { cast: 2.4 });
      shape(ctx, [[-4, 46], [22, 44], [28, 64], [8, 72], [-6, 62]], shadowOf(muck, 0.25), { cast: 2.4 });
    });
    const body = shape(ctx, [[-56, 0], [-66, -40], [-58, -90], [-24, -116], [24, -118], [58, -96], [66, -50], [56, 0]], muck,
      { y0: -118, y1: 0, cast: 4.6, rimWidth: 2, rimAlpha: 0.6, gloss: 2.4 });
    ctx.save(); ctx.clip(body);
    // Embedded bricks and a pipe.
    for (const [x, y, ang] of [[-40, -70, 0.3], [-30, -20, -0.2], [36, -30, 0.4]]) {
      frame(ctx, x, y, ang, 1, () => {
        cel(ctx, roundRect(-10, -6, 20, 12, 2), brick, { cast: 1.4, line: 0.8 });
        stroke(ctx, poly([[0, -6], [0, 6]], false), shade(brick, -0.3), 0.8);
      });
    }
    frame(ctx, 24, -96, 0.6, 1, () => {
      cel(ctx, roundRect(-30, -6, 60, 12, 3), pipe, { cast: 1.6, gloss: 1.6, line: 0.9 });
      cel(ctx, roundRect(-34, -8, 8, 16, 2), shade(pipe, -0.1), { cast: 1, gloss: 1, line: 0.8 });
    });
    // Ooze highlights.
    for (const [x, y] of [[-48, -60], [-20, -100], [44, -66]]) fill(ctx, ellipse(x, y, 7, 3, -0.4), '#d6e8a0', 0.35);
    ctx.restore();
    // Glowing core in the chest.
    const pulse = 0.7 + 0.3 * Math.sin(t * 0.004) + a.wind * 0.4;
    glow(ctx, 0, -60, 46 * pulse, core, 0.5);
    cel(ctx, curve([[-12, -60], [0, -76], [12, -60], [0, -46]], true), core, { cast: 1.4, line: 0.9, gloss: true, ink: '#3a5a10' });
    sparkle(ctx, -3, -64, 6, '#ffffff', 0.9);
    // Face: two glowing slots and a dripping maw.
    for (const x of [-14, 18]) { glow(ctx, x, -98, 12, core, 0.7); fill(ctx, ellipse(x, -98, 6, 2.6, x > 0 ? 0.2 : -0.2), core); }
    fill(ctx, curve([[-16, -84], [20, -84], [14, -78 + a.strike * 6], [-10, -78 + a.strike * 6]], true), '#1e2410');
    drip(ctx, 4, -80, 9, muck, t, 0.4);
    for (let i = 0; i < 5; i++) drip(ctx, -46 + i * 22, -6, 6 + (i % 3) * 3, muck, t, i);
    // Near fist: hauled up on the wind-up, slammed down on the strike.
    frame(ctx, -38, -84, -0.3 - lift, 1, () => {
      cel(ctx, capsule(0, 0, 14, 54, 15, 13), muck, { cast: 2.8, rimWidth: 1.6 });
      const fist = shape(ctx, [[-4, 48], [30, 44], [38, 66], [24, 80], [0, 78], [-10, 62]], muck, { cast: 3, rimWidth: 1.6, gloss: 1.4 });
      ctx.save(); ctx.clip(fist);
      cel(ctx, roundRect(4, 58, 28, 10, 3), pipe, { cast: 1, line: 0.7, gloss: 1 });
      ctx.restore();
    });
  });
}
sludge.size = { x: -110, y: -236, w: 220, h: 240 };
sludge.attack = { type: 'melee', fx: 'smash', colour: '#c6ff4a' };
sludge.reach = 120;

/* ---------------------------------------------------------------
   Pipe Wraith
   --------------------------------------------------------------- */

function wraith(ctx, a) {
  const { t } = a;
  const cloak = '#3a4a6a';
  const spirit = '#8ad8ff';
  const hover = -38 + wave(t, 0.0025, 8);
  const wail = clamp(a.strike * 1.2 + a.wind * 0.3);
  ctx.save();
  ctx.globalAlpha *= 0.94;
  glow(ctx, 0, hover - 90, 110, spirit, 0.22 + a.wind * 0.2);
  // Tattered cloak trailing below on spring chains.
  for (const [x, len, key] of [[-26, 70, 'w1'], [-6, 84, 'w2'], [14, 74, 'w3'], [30, 60, 'w4']]) {
    const anchor = [x, hover - 70];
    const rest = [[0, 0], [-4, len * 0.33], [-10, len * 0.66], [-18, len]];
    const pts = chain(a.phys, `wraith-${key}`, anchor, rest, chainOpts(a, { wind: 1.2, gravity: 0.05, stiffness: 0.08 }));
    cel(ctx, curve(ribbon(pts, 26, 2), true, 0.4), key === 'w2' ? cloak : shade(cloak, -0.08), { cast: 2.4, rim: spirit, rimAlpha: 0.7, rimWidth: 1.6, alpha: 0.9 });
  }
  frame(ctx, 0, hover, -0.1 * a.wind + 0.1 * a.strike - 0.2 * a.hurt, 1, () => {
    // Body of the cloak.
    const body = shape(ctx, [[-34, -60], [-30, -110], [-14, -140], [14, -142], [32, -118], [38, -64], [10, -52], [-14, -54]], cloak,
      { y0: -142, y1: -52, cast: 4, rim: spirit, rimAlpha: 0.8, rimWidth: 2 });
    ctx.save(); ctx.clip(body);
    for (const x of [-20, -2, 18]) stroke(ctx, curve([[x, -130], [x - 4, -90], [x + 2, -54]], false), shadowOf(cloak, 0.3), 2, 0.5);
    ctx.restore();
    // Rusted chains wrapped around it.
    for (let i = 0; i < 8; i++) {
      const x = -30 + i * 9;
      const y = -84 + Math.sin(i * 0.8) * 4;
      stroke(ctx, ellipse(x, y, 4, 2.4, i % 2 ? 0 : Math.PI / 2), '#8a6a4a', 1.4);
    }
    // Hood with a void face.
    frame(ctx, 10, -140, -0.15 * wail, 1, () => {
      shape(ctx, [[-22, 14], [-24, -12], [-8, -32], [14, -30], [26, -12], [26, 12], [10, 18]], shade(cloak, 0.05), { cast: 3, rim: spirit, rimAlpha: 0.8, rimWidth: 1.8 });
      fill(ctx, curve([[-10, 14], [-8, -12], [8, -20], [20, -6], [20, 14]], true), '#05070d');
      for (const x of [0, 13]) {
        glow(ctx, x, -4, 14, spirit, 0.8);
        fill(ctx, ellipse(x, -4, 3.2, 2 - a.hurt), '#e8fbff');
      }
      // Wailing mouth.
      if (wail > 0.05) fill(ctx, ellipse(7, 8, 3 + wail * 3, 2 + wail * 7), '#0a1a2a');
    });
    // Skeletal hands reaching out.
    const reach = a.strike * 20 + a.wind * -8;
    for (const [y, x, s] of [[-96, 34, 1], [-86, 26, 0.85]]) {
      frame(ctx, x + reach, y, 0.2, s, () => {
        cel(ctx, capsule(-20, 0, 0, 0, 5, 3), cloak, { cast: 1.4, rim: spirit });
        for (let i = 0; i < 4; i++) stroke(ctx, curve([[0, -2 + i * 1.5], [8, -6 + i * 3], [14, -4 + i * 4]], false), '#d6e8f0', 1.4);
      });
    }
  });
  ctx.restore();
  // Floating wisps.
  for (let i = 0; i < 5; i++) {
    const ang = t * 0.0016 + i * 1.26;
    const x = Math.cos(ang) * 50;
    const y = hover - 90 + Math.sin(ang * 1.3) * 40;
    glow(ctx, x, y, 10, spirit, 0.5);
    fill(ctx, circle(x, y, 1.6), '#e8fbff', 0.9);
  }
}
wraith.size = { x: -80, y: -230, w: 160, h: 230 };
wraith.attack = { type: 'ranged', fx: 'wail', colour: '#8ad8ff', muzzle: [30, -170] };
wraith.hover = true;

/* ---------------------------------------------------------------
   Drowned Watchman
   --------------------------------------------------------------- */

function drowned(ctx, a) {
  const { t } = a;
  const armour = '#6f7a78';
  const rust = '#a65a34';
  const cloth = '#2f4a5a';
  const weed = '#4f8a5a';
  const eyes = '#58f0ff';
  const breath = wave(t, 0.0026, 1.4);
  const thrust = a.strike * 34 - a.wind * 16;
  // Legs in greaves.
  for (const [x, col] of [[-12, shadowOf(armour, 0.2)], [10, armour]]) {
    cel(ctx, capsule(x, -84, x + 4, -46, 8, 7), cloth, { cast: 2 });
    cel(ctx, capsule(x + 4, -46, x + 2, -6, 7, 6), col, { cast: 2, gloss: 1.2 });
    shape(ctx, [[x - 6, -8], [x + 14, -8], [x + 18, 0], [x - 6, 0]], col, { cast: 1.2, gloss: 1 });
  }
  frame(ctx, 0, -84 + breath, -0.08 * a.wind + 0.1 * a.strike - 0.12 * a.hurt, 1, () => {
    // Halberd held in both hands, thrust forward on the strike.
    frame(ctx, 10 + thrust, -40, -0.12 + a.wind * -0.25, 1, () => {
      cel(ctx, roundRect(-70, -2.5, 150, 5, 2), '#5a4430', { cast: 1, line: 0.8 });
      // Axe blade and spike.
      const head = shape(ctx, [[66, -3], [70, -24], [84, -30], [90, -16], [84, -4], [100, 0], [84, 4], [70, 3]], '#a8b2b8', { cast: 2, gloss: 2, rimWidth: 1.4 });
      ctx.save(); ctx.clip(head);
      for (const [x, y] of [[76, -18], [82, -10]]) fill(ctx, circle(x, y, 3), rust, 0.7);
      ctx.restore();
      stroke(ctx, poly([[56, -2], [56, 2]], false), rust, 3);
    });
    // Torso: rusted breastplate with barnacles and seaweed.
    const torso = shape(ctx, [[-20, 4], [-24, -30], [-18, -56], [12, -60], [26, -42], [24, -10], [18, 4]], armour, { y0: -60, y1: 4, cast: 3.6, gloss: 2, rimWidth: 1.6 });
    ctx.save(); ctx.clip(torso);
    for (const [x, y, r] of [[-12, -40, 7], [8, -20, 9], [16, -48, 5]]) fill(ctx, circle(x, y, r), rust, 0.55);
    for (const [x, y] of [[-14, -18], [-8, -46], [14, -34], [2, -10]]) {
      cel(ctx, circle(x, y, 3), '#d8d0b8', { cast: 0.8, line: 0.6, rim: false });
      fill(ctx, circle(x, y - 0.6, 1), '#4a4030');
    }
    ctx.restore();
    // Tattered tabard.
    shape(ctx, [[-14, -6], [16, -8], [18, 30], [10, 22], [4, 36], [-4, 24], [-12, 32]], cloth, { cast: 2.4 });
    // Seaweed draped over the shoulder.
    const weedPts = chain(a.phys, 'weed', [-16, -56], [[0, 0], [-2, 14], [-6, 28], [-4, 40]], chainOpts(a, { wind: 0.6, gravity: 0.15 }));
    cel(ctx, curve(ribbon(weedPts, 7, 2), true, 0.4), weed, { cast: 1.4, line: 0.7 });
    // Pauldron.
    shape(ctx, [[-26, -50], [-18, -64], [2, -64], [6, -52], [-8, -44], [-24, -42]], shade(armour, 0.06), { cast: 2.4, gloss: 2, rimWidth: 1.4 });
    // Helmet: a rusted bascinet with a visor slit full of light.
    frame(ctx, 4, -74, -0.05 * a.wind + 0.05 * a.strike, 1, () => {
      const helm = shape(ctx, [[-16, 12], [-18, -6], [-10, -20], [8, -22], [20, -10], [22, 6], [14, 14]], armour, { y0: -22, y1: 14, cast: 3, gloss: 2.2, rimWidth: 1.4 });
      ctx.save(); ctx.clip(helm);
      fill(ctx, circle(-8, -8, 6), rust, 0.5);
      ctx.restore();
      fill(ctx, curve([[2, -4], [22, -4], [22, 0], [2, 1]], true), '#081014');
      for (const x of [8, 16]) { glow(ctx, x, -2, 12, eyes, 0.8); fill(ctx, ellipse(x, -2, 2.4, 1.2 - a.hurt * 0.6), '#e8ffff'); }
      cel(ctx, spike(-4, -20, 12, -2.2, 6), weed, { cast: 1, line: 0.6 });
      for (let i = 0; i < 4; i++) fill(ctx, circle(10 + i * 3, 6, 0.7), '#081014');
    });
    // Arms gripping the haft.
    for (const [sx, s] of [[-14, 1], [12, 0.9]]) {
      cel(ctx, capsule(sx, -50, 10 + thrust + (sx > 0 ? 24 : 0), -40, 6 * s, 5 * s), sx > 0 ? shadowOf(armour, 0.15) : armour, { cast: 1.8, gloss: 1 });
      cel(ctx, circle(10 + thrust + (sx > 0 ? 24 : 0), -40, 5.4), shade(armour, -0.1), { cast: 1, gloss: 1, line: 0.8 });
    }
  });
  // Water dripping off.
  for (let i = 0; i < 3; i++) {
    const phase = (t * 0.0012 + i * 0.33) % 1;
    fill(ctx, ellipse(-18 + i * 18, -60 + phase * 60, 1.2, 2.4), '#9fd8f0', 1 - phase);
  }
}
drowned.size = { x: -90, y: -210, w: 230, h: 214 };
drowned.attack = { type: 'melee', fx: 'thrust', colour: '#58f0ff' };
drowned.reach = 150;

/* ---------------------------------------------------------------
   Effluvium Serpent
   --------------------------------------------------------------- */

function serpent(ctx, a) {
  const { t } = a;
  const scales = '#3a7a6a';
  const belly = '#e0d6a0';
  const venom = '#b6ff4a';
  const rear = clamp(a.wind) * 18 - a.strike * 14 - a.hurt * 8;
  // The body as a thick S-curve rising from coils.
  const spine = [];
  for (let i = 0; i <= 14; i++) {
    const f = i / 14;
    const x = -60 + Math.sin(f * Math.PI * 1.6 + 0.6) * 36 + f * 70 + wave(t, 0.002, 4, f * 4) * f;
    const y = -8 - f * (150 + rear) + Math.sin(f * Math.PI) * 10;
    spine.push([x, y]);
  }
  // Coils on the ground.
  shape(ctx, [[-90, -2], [-80, -26], [-30, -34], [40, -28], [70, -12], [60, 0], [-80, 2]], shadowOf(scales, 0.15), { cast: 3, rimWidth: 1.4 });
  const outline = ribbon(spine, 40, 22, false);
  const body = curve(outline, true, 0.4);
  cel(ctx, body, scales, { cast: 4.2, rimWidth: 1.8, gloss: 1.6 });
  ctx.save(); ctx.clip(body);
  // Belly band down the front side and scale arcs.
  const bellyPts = spine.map(([x, y], i) => [x + 12 - i * 0.3, y]);
  stroke(ctx, curve(bellyPts, false), belly, 14, 0.9);
  for (let i = 1; i < spine.length; i++) {
    const [x, y] = spine[i];
    stroke(ctx, poly([[x + 6, y], [x + 18, y + 1]], false), shade(belly, -0.3), 0.8, 0.8);
    for (const off of [-12, -4]) stroke(ctx, curve([[x + off - 4, y], [x + off, y + 4], [x + off + 4, y]], false), shade(scales, 0.25), 0.8, 0.6);
  }
  ctx.restore();
  // Dorsal fin along the back.
  for (let i = 2; i < spine.length - 1; i += 2) {
    const [x, y] = spine[i];
    cel(ctx, spike(x - 18, y, 16, Math.PI + 0.5, 10, 2), '#8a5ac0', { cast: 1.2, line: 0.7, alpha: 0.9 });
  }
  // Head with a frill, rearing back to spit.
  const [hx, hy] = spine[spine.length - 1];
  frame(ctx, hx, hy, -0.2 * a.wind + 0.25 * a.strike, 1, () => {
    for (let i = 0; i < 5; i++) cel(ctx, spike(-8, -4, 26, Math.PI + 0.9 + i * 0.32, 10), i % 2 ? '#8a5ac0' : '#a978de', { cast: 1, line: 0.7 });
    const gape = clamp(a.wind * 0.5 + a.strike);
    frame(ctx, 4, 6, gape * 0.45, 1, () => {
      shape(ctx, [[-6, -2], [30, 0], [36, 4], [6, 8]], shade(scales, -0.05), { cast: 1.6 });
      fangs(ctx, 22, 1, 32, 2, 2, -4, '#f6efdc', -1);
    });
    shape(ctx, [[-14, 6], [-12, -12], [8, -18], [30, -10], [40, 0], [30, 6], [4, 8]], scales, { y0: -18, y1: 8, cast: 2.6, gloss: 1.4, rimWidth: 1.4 });
    fangs(ctx, 26, 5, 36, 3, 2, 7, '#f6efdc', 1);
    if (gape > 0.2) { glow(ctx, 34, 4, 16, venom, 0.7 * gape); fill(ctx, circle(34, 6, 2.4), venom); }
    monsterEye(ctx, 12, -8, 4.2, '#ff5a8a', { slit: true, angry: 0.7, open: 1 - a.hurt * 0.8 });
  });
}
serpent.size = { x: -110, y: -230, w: 220, h: 234 };
serpent.attack = { type: 'ranged', fx: 'venom', colour: '#b6ff4a', muzzle: [40, -170] };

export const BEASTS = { rat, slime, bat, crab, ghoul, fungus, croc, cultist, sludge, wraith, drowned, serpent };
