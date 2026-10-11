/* Bosses: bigger, busier and more ornate than the regular monsters, each with
   its own signature attack. Same conventions as beasts.js — facing right,
   feet on y = 0, animated through the `a` state. */

import {
  cel, curve, poly, ellipse, circle, roundRect, capsule, stroke, fill, glow, sparkle, gem, frame, embroidery,
  shade, rgba, shadowOf,
} from './cel.js';
import { chain, ribbon, clamp } from './rig.js';
import { wave, shape, spike, monsterEye, fangs, claws } from './beasts.js';

const chainOpts = (a, extra = {}) => ({ now: a.now || a.t || 0, offset: a.offset || [0, 0], ...extra });
const GOLD = '#e3b64a';

/* ---------------------------------------------------------------
   The Rat King
   --------------------------------------------------------------- */

function ratking(ctx, a) {
  const { t } = a;
  const fur = '#7d6a5c';
  const belly = '#cbb59e';
  const pink = '#f0a3a3';
  const robe = '#9a2438';
  const ermine = '#f4efe6';
  const breath = wave(t, 0.003, 1.6);
  const raise = 2.4 * a.wind + 1.0 * a.strike;
  // Tail.
  const tail = chain(a.phys, 'rk-tail', [-30, -40], [[0, 0], [-20, 6], [-40, 4], [-58, -4], [-70, -18], [-74, -34]], chainOpts(a, { wind: 0.6, stiffness: 0.2, gravity: 0.05 }));
  cel(ctx, curve(ribbon(tail, 12, 2.5), true, 0.4), pink, { cast: 2.2 });
  // A royal cape on a spring chain.
  const cape = chain(a.phys, 'rk-cape', [-14, -150], [[0, 0], [-10, 30], [-20, 62], [-28, 96], [-34, 128], [-36, 148]], chainOpts(a, { wind: 0.4, stiffness: 0.12 }));
  const capeOutline = curve(ribbon(cape, 46, 74, false), true, 0.3);
  cel(ctx, capeOutline, robe, { cast: 5, rimWidth: 2, y0: -150, y1: 0 });
  ctx.save(); ctx.clip(capeOutline);
  for (const off of [-14, 0, 14]) stroke(ctx, curve(cape.map(([x, y], i) => [x + off * (0.3 + i / cape.length), y]), false), shadowOf(robe, 0.3), 3, 0.4);
  const hem = cape[cape.length - 1];
  stroke(ctx, curve([[hem[0] - 40, hem[1] - 4], [hem[0], hem[1]], [hem[0] + 40, hem[1] - 4]], false), ermine, 9);
  for (let i = -3; i <= 3; i++) fill(ctx, ellipse(hem[0] + i * 11, hem[1] - 3, 1.4, 2.6), '#1a1a1a');
  ctx.restore();
  // Hind legs, standing upright.
  for (const [x, col] of [[-22, shadowOf(fur, 0.2)], [6, fur]]) {
    shape(ctx, [[x - 18, -62], [x + 10, -66], [x + 14, -30], [x + 6, -6], [x - 12, -6], [x - 20, -34]], col, { cast: 3 });
    shape(ctx, [[x - 10, -8], [x + 18, -8], [x + 24, 0], [x - 12, 0]], pink, { cast: 1, line: 0.9 });
    claws(ctx, x + 23, -1, 0.1, 3, 6, '#f4ead6', 0.3);
  }
  frame(ctx, -6, -62 + breath, 0.06 - 0.12 * a.wind + 0.16 * a.strike - 0.1 * a.hurt, 1, () => {
    // Far arm with the sceptre — hauled overhead, then brought down.
    frame(ctx, 18, -76, -0.5 - raise, 1, () => {
      cel(ctx, capsule(0, 0, 0, 40, 9, 7), shadowOf(fur, 0.15), { cast: 2 });
      frame(ctx, 0, 44, -Math.PI / 2 - 0.2, 1, () => {
        cel(ctx, roundRect(-8, -3, 96, 6, 3), '#8c969e', { cast: 1.4, gloss: 1.6 });
        for (const x of [20, 46, 72]) cel(ctx, roundRect(x, -5, 6, 10, 2), shade('#8c969e', -0.1), { cast: 0.8, line: 0.7, gloss: 1 });
        glow(ctx, 96, 0, 30 + a.wind * 30, '#ff5a6a', 0.5 + a.wind * 0.3);
        cel(ctx, circle(96, 0, 9), GOLD, { cast: 2, gloss: 2 });
        gem(ctx, 96, 0, 6, '#ff3a5a', { glowAlpha: 0.4 });
      });
      cel(ctx, circle(0, 44, 7), pink, { cast: 1.2, line: 0.8 });
    });
    // Body in a regal tunic.
    const body = shape(ctx, [[-30, 2], [-38, -40], [-30, -80], [-2, -96], [28, -86], [38, -50], [30, 2]], fur, { y0: -96, y1: 2, cast: 4, rimWidth: 2 });
    ctx.save(); ctx.clip(body);
    shape(ctx, [[-10, 2], [-6, -60], [20, -70], [34, -40], [28, 2]], belly, { cast: 0, rim: false, line: 0 });
    ctx.restore();
    // Sash of medals.
    cel(ctx, poly([[-26, -78], [-16, -84], [30, -12], [20, -6]]), '#2f5aa8', { cast: 1.6, line: 0.9 });
    for (const [x, y] of [[-8, -62], [2, -48], [12, -34]]) {
      cel(ctx, circle(x, y, 4.4), GOLD, { cast: 1, line: 0.7, gloss: 1.4 });
      sparkle(ctx, x - 1, y - 1, 2.4, '#ffffff', 0.8);
    }
    // Ermine collar.
    shape(ctx, [[-34, -84], [-20, -98], [16, -100], [36, -88], [20, -78], [-20, -76]], ermine, { cast: 2.4, rimWidth: 1.4 });
    for (const [x, y] of [[-20, -88], [-4, -92], [14, -90], [26, -86]]) fill(ctx, ellipse(x, y, 1.4, 2.6), '#1a1a1a');
    // Head and crown.
    frame(ctx, 14, -106, -0.2 * a.wind + 0.15 * a.strike, 1, () => {
      shape(ctx, [[-14, -26], [-8, -50], [6, -44], [6, -24]], shadowOf(fur, 0.15), { cast: 1.6 });
      const gape = clamp(a.wind * 0.5 + a.strike * 0.8);
      frame(ctx, 14, 6, gape * 0.45, 1, () => {
        shape(ctx, [[0, 0], [32, 2], [40, 8], [30, 12], [4, 12]], shade(fur, -0.06), { cast: 1.6 });
        fill(ctx, curve([[4, 1], [32, 2], [34, 6], [8, 6]], true), '#7a2e38', gape);
      });
      shape(ctx, [[-18, -8], [-10, -24], [14, -28], [38, -18], [56, -6], [60, 2], [50, 8], [20, 10], [-10, 8]], fur, { y0: -28, y1: 10, cast: 3.4, rimWidth: 1.8 });
      cel(ctx, roundRect(46, 6, 4, 10 + gape * 3, 1), '#f7e7b0', { cast: 0.6, line: 0.6, rim: false });
      cel(ctx, roundRect(50.4, 6, 3.6, 9 + gape * 3, 1), '#efdc9c', { cast: 0.6, line: 0.6, rim: false });
      cel(ctx, ellipse(59, 0, 4.4, 3.6), pink, { cast: 1, line: 0.8, gloss: 1 });
      for (const [dy, len] of [[-3, 26], [0, 30], [3, 24]]) stroke(ctx, curve([[52, 2 + dy * 0.4], [52 + len * 0.6, dy * 2], [52 + len, dy * 3.6]], false), 'rgba(250,240,230,.75)', 0.7);
      monsterEye(ctx, 26, -12, 5, '#ffcf3a', { angry: 0.6 + a.wind * 0.4, open: 1 - a.hurt * 0.8 });
      // Monocle on a chain.
      stroke(ctx, circle(26, -12, 8), GOLD, 1.6);
      stroke(ctx, curve([[30, -5], [34, 6], [28, 14]], false), GOLD, 0.8);
      shape(ctx, [[-4, -18], [-8, -44], [10, -50], [18, -32], [12, -20]], fur, { cast: 2, rimWidth: 1.4 });
      shape(ctx, [[0, -22], [-2, -40], [8, -43], [13, -32], [9, -23]], pink, { cast: 1, line: 0, rim: false });
      // Crooked crown.
      frame(ctx, 12, -30, -0.25, 1, () => {
        const crown = poly([[-16, 0], [-18, -18], [-9, -10], [-2, -26], [5, -10], [14, -22], [16, 0]]);
        cel(ctx, crown, GOLD, { cast: 2, gloss: 2, rimWidth: 1.2 });
        stroke(ctx, poly([[-16, -3], [16, -3]], false), shade(GOLD, -0.3), 1.4);
        gem(ctx, -2, -6, 3, '#ff3a5a', { glowAlpha: 0.3 });
        gem(ctx, -11, -6, 2.2, '#3a8aff', { glowAlpha: 0.2 });
        gem(ctx, 9, -6, 2.2, '#4fbf6a', { glowAlpha: 0.2 });
        for (const [x, y] of [[-18, -18], [-2, -26], [14, -22]]) cel(ctx, circle(x, y, 2), '#fff4c0', { cast: 0.4, line: 0.5, gloss: 1 });
      });
    });
    // Near arm, pointing a clawed hand at the hero.
    frame(ctx, -16, -76, -0.6 - a.wind * 0.6 - a.strike * 0.4, 1, () => {
      cel(ctx, capsule(0, 0, 4, 42, 10, 8), fur, { cast: 2.2, rimWidth: 1.4 });
      shape(ctx, [[-10, 6], [12, 4], [14, 18], [-10, 20]], robe, { cast: 1.6, line: 0.9 });
      cel(ctx, circle(4, 46, 7), pink, { cast: 1.2, line: 0.8 });
      claws(ctx, 6, 52, 1.2, 4, 10, '#f4ead6', 0.25);
    });
  });
  // A court of little rats at his feet.
  for (const [x, s, ph] of [[-70, 0.5, 0], [56, 0.45, 2]]) {
    frame(ctx, x, 0, 0, [s, s], () => {
      const bob = wave(t, 0.008, 2, ph);
      shape(ctx, [[-30, -4], [-26, -30 + bob], [4, -40 + bob], [30, -30], [40, -14], [20, -2], [-20, -2]], shade(fur, -0.08), { cast: 3, line: 1.6 });
      monsterEye(ctx, 26, -26, 4, '#ff4a4a', { glowAlpha: 0.3 });
      shape(ctx, [[2, -36], [0, -52], [12, -54], [16, -40]], shade(fur, -0.08), { cast: 1.6, line: 1.4 });
    });
  }
}
ratking.size = { x: -120, y: -252, w: 250, h: 256 };
ratking.attack = { type: 'melee', fx: 'smash', colour: '#ff5a6a' };
ratking.reach = 120;
ratking.boss = true;

/* ---------------------------------------------------------------
   Sludge Leviathan
   --------------------------------------------------------------- */

function leviathan(ctx, a) {
  const { t } = a;
  const hide = '#3d5a58';
  const belly = '#b8c48a';
  const lights = '#7dfff0';
  const rear = clamp(a.wind) * 24 - a.strike * 30 - a.hurt * 12;
  // Neck rising out of a sludge pool.
  const spine = [];
  for (let i = 0; i <= 12; i++) {
    const f = i / 12;
    spine.push([-30 + f * 50 + Math.sin(f * 3 + t * 0.0012) * 14 * (1 - f) - rear * f * 0.6, -10 - f * (200 + rear * 0.6)]);
  }
  glow(ctx, 0, -120, 150, lights, 0.12);
  const neck = curve(ribbon(spine, 86, 44, false), true, 0.4);
  cel(ctx, neck, hide, { cast: 5, rimWidth: 2.2, gloss: 1.6 });
  ctx.save(); ctx.clip(neck);
  stroke(ctx, curve(spine.map(([x, y]) => [x + 22, y]), false), belly, 22, 0.85);
  for (let i = 1; i < spine.length; i++) stroke(ctx, poly([[spine[i][0] + 12, spine[i][1]], [spine[i][0] + 34, spine[i][1] + 2]], false), shade(belly, -0.3), 1, 0.7);
  // Bioluminescent spots that pulse.
  for (let i = 1; i < spine.length - 1; i++) {
    const [x, y] = spine[i];
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.004 - i * 0.6);
    glow(ctx, x - 18, y, 10, lights, 0.5 * pulse);
    fill(ctx, circle(x - 18, y, 2.6), lights, 0.6 + 0.4 * pulse);
  }
  ctx.restore();
  // Fins along the back.
  for (let i = 2; i < spine.length - 1; i += 2) {
    const [x, y] = spine[i];
    cel(ctx, spike(x - 34, y, 30 - i, Math.PI + 0.4, 18, 4), '#2f6a8a', { cast: 2, alpha: 0.95, rim: lights, rimAlpha: 0.5 });
  }
  // Head with jaws.
  const [hx, hy] = spine[spine.length - 1];
  frame(ctx, hx, hy, -0.25 * a.wind + 0.3 * a.strike - 0.1 * a.hurt, 1, () => {
    for (let i = 0; i < 4; i++) cel(ctx, spike(-14, -10, 44 - i * 6, Math.PI + 0.6 + i * 0.3, 16), i % 2 ? '#2f6a8a' : '#3f80a0', { cast: 1.6, rim: lights, rimAlpha: 0.5 });
    const gape = clamp(a.wind * 0.7 + a.strike);
    frame(ctx, 4, 10, gape * 0.5, 1, () => {
      shape(ctx, [[-10, -2], [50, 0], [74, 6], [56, 16], [0, 14]], shade(hide, -0.05), { cast: 2.4 });
      fill(ctx, curve([[0, 0], [70, 4], [60, 8], [4, 6]], true), '#3a1a2a', gape > 0.1 ? 1 : 0);
      fangs(ctx, 10, 0, 68, 4, 7, -8, '#eaf4e6', -1);
    });
    const head = shape(ctx, [[-22, 10], [-20, -18], [10, -32], [50, -26], [80, -10], [84, 4], [60, 10], [10, 14]], hide, { y0: -32, y1: 14, cast: 3.6, gloss: 1.6, rimWidth: 1.8 });
    ctx.save(); ctx.clip(head);
    for (let i = 0; i < 6; i++) fill(ctx, circle(20 + i * 10, -18 + (i % 2) * 4, 2), lights, 0.7);
    ctx.restore();
    fangs(ctx, 8, 10, 78, 6, 8, 9, '#eaf4e6', 1);
    if (gape > 0.3) { glow(ctx, 60, 10, 40 * gape, lights, 0.5); }
    // Barbels.
    for (const [x, len] of [[70, 40], [60, 30]]) {
      const pts = chain(a.phys, `lev-barbel-${x}`, [x, 8], [[0, 0], [4, len * 0.33], [2, len * 0.66], [-2, len]], chainOpts(a, { wind: 0.6, gravity: 0.15 }));
      cel(ctx, curve(ribbon(pts, 4, 1), true, 0.4), shade(hide, 0.1), { cast: 0.8, line: 0.6 });
    }
    monsterEye(ctx, 30, -16, 7, '#ff6a3a', { slit: true, angry: 0.7, open: 1 - a.hurt * 0.8 });
    monsterEye(ctx, 46, -18, 4, '#ff6a3a', { slit: true, angry: 0.7, glowAlpha: 0.3, open: 1 - a.hurt * 0.8 });
  });
  // The sludge pool it rises from.
  const pool = curve([[-120, 2], [-100, -14], [-50, -22], [0, -26], [60, -20], [110, -12], [124, 2]], true, 0.4);
  cel(ctx, pool, '#4a5a2a', { cast: 3, rim: '#c6ff4a', rimAlpha: 0.4, gloss: 2 });
  for (let i = 0; i < 6; i++) {
    const phase = (t * 0.0008 + i * 0.17) % 1;
    stroke(ctx, circle(-90 + i * 36, -14 - phase * 8, 2 + phase * 4), '#c6ff4a', 1, 0.7 * (1 - phase));
  }
}
leviathan.size = { x: -130, y: -262, w: 260, h: 266 };
leviathan.attack = { type: 'ranged', fx: 'wave', colour: '#7dfff0', muzzle: [90, -200] };
leviathan.boss = true;

/* ---------------------------------------------------------------
   Plague Warden
   --------------------------------------------------------------- */

function plague(ctx, a) {
  const { t } = a;
  const coat = '#2c2a34';
  const leather = '#6b4a30';
  const mask = '#e8dcc0';
  const toxin = '#a6ff5a';
  const breath = wave(t, 0.0026, 1.4);
  const swing = 2.2 * a.wind + 1.4 * a.strike;
  // Long coat with split tails on chains.
  for (const [key, x, w, col] of [['pw-tail1', -20, 26, shadowOf(coat, 0.1)], ['pw-tail2', 6, 30, coat]]) {
    const pts = chain(a.phys, key, [x, -96], [[0, 0], [-4, 30], [-8, 60], [-10, 88]], chainOpts(a, { wind: 0.4, stiffness: 0.12 }));
    cel(ctx, curve(ribbon(pts, w, w * 1.3, false), true, 0.3), col, { cast: 3.6, rimWidth: 1.6 });
  }
  // Legs and tall boots.
  for (const [x, col] of [[-10, shadowOf(leather, 0.2)], [10, leather]]) {
    cel(ctx, capsule(x, -96, x + 2, -10, 7, 6), col, { cast: 2.4, gloss: 1 });
    shape(ctx, [[x - 6, -10], [x + 16, -10], [x + 20, 0], [x - 6, 0]], col, { cast: 1.2, gloss: 1 });
  }
  frame(ctx, 0, -96 + breath, -0.08 * a.wind + 0.1 * a.strike - 0.12 * a.hurt, 1, () => {
    // Far arm swinging the censer.
    frame(ctx, 16, -60, -0.4 - swing, 1, () => {
      cel(ctx, capsule(0, 0, 0, 40, 7, 6), shadowOf(coat, 0.1), { cast: 2 });
      cel(ctx, circle(0, 42, 5), '#1a1a1a', { cast: 1, line: 0.7 });
      // Censer on a chain.
      const cx = 0;
      const cy = 42 + 34;
      for (let i = 0; i < 6; i++) stroke(ctx, ellipse(0, 46 + i * 5, 1.6, 2.6), '#8a8a8a', 0.8);
      glow(ctx, cx, cy, 34 + a.wind * 24, toxin, 0.5 + a.wind * 0.3);
      cel(ctx, curve([[cx - 10, cy - 6], [cx + 10, cy - 6], [cx + 12, cy + 4], [cx, cy + 14], [cx - 12, cy + 4]], true), '#a8823a', { cast: 2, gloss: 1.6 });
      for (let i = -1; i <= 1; i++) fill(ctx, circle(cx + i * 5, cy + 2, 1.8), toxin);
    });
    // Coat body with buttons and a belt of vials.
    const body = shape(ctx, [[-24, 4], [-28, -40], [-20, -78], [14, -84], [30, -64], [28, -20], [24, 4]], coat, { y0: -84, y1: 4, cast: 4, rimWidth: 1.8 });
    ctx.save(); ctx.clip(body);
    stroke(ctx, curve([[10, -82], [12, -40], [10, 4]], false), shade(coat, 0.15), 1.4);
    for (let y = -70; y < 0; y += 12) cel(ctx, circle(16, y, 1.8), GOLD, { cast: 0.4, line: 0.5, gloss: 1 });
    ctx.restore();
    cel(ctx, curve([[-26, -16], [26, -20], [26, -12], [-26, -8]], true, 0.2), leather, { cast: 1.2, line: 0.9 });
    for (const [x, c] of [[-16, '#a6ff5a'], [-6, '#ff5a8a'], [4, '#5ab0ff']]) {
      cel(ctx, roundRect(x - 3, -12, 6, 12, 2), c, { cast: 1, line: 0.7, gloss: 1, alpha: 0.9 });
      fill(ctx, roundRect(x - 2, -15, 4, 3, 1), '#6b4a30');
    }
    // Shoulder cape.
    shape(ctx, [[-30, -62], [-22, -86], [16, -90], [34, -70], [20, -58], [-4, -60], [-20, -54]], shade(coat, 0.08), { cast: 2.6, rimWidth: 1.6 });
    // Head: wide-brimmed hat and beaked mask.
    frame(ctx, 6, -96, -0.1 * a.wind + 0.08 * a.strike, 1, () => {
      shape(ctx, [[-14, 10], [-16, -10], [0, -18], [14, -12], [16, 6], [6, 14]], coat, { cast: 2.6 });
      const beak = shape(ctx, [[2, -8], [16, -10], [46, 4 + a.strike * 4], [16, 10], [4, 8]], mask, { cast: 2.4, gloss: 1.4, rimWidth: 1.4 });
      ctx.save(); ctx.clip(beak);
      stroke(ctx, curve([[16, -10], [30, -2], [46, 4]], false), shade(mask, -0.2), 0.8);
      ctx.restore();
      stroke(ctx, poly([[14, -10], [14, 10]], false), leather, 2.4);
      // Glass eyes glowing green.
      for (const [x, r] of [[8, 5], [16, 3.6]]) {
        cel(ctx, circle(x, -4, r), '#3a3a3a', { cast: 0.6, line: 0.8 });
        glow(ctx, x, -4, r * 3, toxin, 0.6);
        fill(ctx, circle(x, -4, r - 1.4), toxin, 0.9 - a.hurt * 0.5);
        sparkle(ctx, x - 1.4, -5.4, 1.8, '#ffffff', 0.9);
      }
      // Hat.
      cel(ctx, ellipse(2, -16, 30, 6, -0.06), '#1e1c24', { cast: 2.4, rimWidth: 1.2 });
      shape(ctx, [[-14, -18], [-12, -40], [14, -42], [16, -18]], '#24222c', { cast: 2.6, rimWidth: 1.4 });
      cel(ctx, roundRect(-14, -24, 30, 5, 1), leather, { cast: 0.8, line: 0.7 });
      cel(ctx, roundRect(10, -25, 5, 7, 1), GOLD, { cast: 0.6, line: 0.6, gloss: 1 });
    });
    // Near arm with a gloved, pointing hand.
    frame(ctx, -16, -60, -0.5 - a.wind * 0.4 - a.strike * 0.5, 1, () => {
      cel(ctx, capsule(0, 0, 4, 42, 8, 6.4), coat, { cast: 2, rimWidth: 1.4 });
      cel(ctx, capsule(4, 34, 4, 42, 8, 8), leather, { cast: 1.2, line: 0.8 });
      cel(ctx, circle(5, 47, 5.6), leather, { cast: 1.2, line: 0.8 });
    });
  });
  // A haze of toxic smoke curling around its feet.
  for (let i = 0; i < 7; i++) {
    const phase = (t * 0.0003 + i / 7) % 1;
    const x = -60 + i * 20 + Math.sin(t * 0.001 + i) * 8;
    glow(ctx, x, -10 - phase * 30, 22, toxin, 0.18 * (1 - phase));
  }
}
plague.size = { x: -90, y: -244, w: 190, h: 248 };
plague.attack = { type: 'ranged', fx: 'toxic', colour: '#a6ff5a', muzzle: [60, -150] };
plague.boss = true;

/* ---------------------------------------------------------------
   The Drowned Sovereign
   --------------------------------------------------------------- */

function sovereign(ctx, a) {
  const { t } = a;
  const robe = '#1f4e79';
  const robeDark = '#16385a';
  const skin = '#9ab8b8';
  const coral = '#ff7a8a';
  const water = '#7fd1ff';
  const breath = wave(t, 0.0022, 1.6);
  const thrust = a.strike * 46 - a.wind * 22;
  glow(ctx, 0, -130, 140, water, 0.14);
  // Flowing robes, with hems that drift as if underwater.
  for (const [key, x, w, col] of [['sv-1', -24, 40, robeDark], ['sv-2', 0, 46, robe], ['sv-3', 22, 30, shade(robe, 0.08)]]) {
    const pts = chain(a.phys, key, [x, -120], [[0, 0], [-2, 40], [-6, 80], [-10, 118]], chainOpts(a, { wind: 1, stiffness: 0.08, gravity: 0.06 }));
    const path = curve(ribbon(pts, w * 0.7, w * 1.2, false), true, 0.3);
    cel(ctx, path, col, { cast: 4, rim: water, rimAlpha: 0.5, rimWidth: 1.8 });
    embroidery(ctx, [[pts[3][0] - w * 0.5, pts[3][1] - 4], [pts[3][0] + w * 0.5, pts[3][1] - 4]], GOLD, 1.6, 0.9);
  }
  frame(ctx, 0, -120 + breath, -0.08 * a.wind + 0.1 * a.strike - 0.12 * a.hurt, 1, () => {
    // Trident in the near hand, thrust on the strike.
    frame(ctx, 12 + thrust, -46, -0.2 - a.wind * 0.2, 1, () => {
      cel(ctx, roundRect(-80, -3, 170, 6, 3), '#c9a227', { cast: 1.4, gloss: 1.8 });
      const fork = poly([[86, -3], [92, -16], [118, -16], [104, -10], [122, 0], [104, 10], [118, 16], [92, 16], [86, 3]]);
      glow(ctx, 110, 0, 30 + a.wind * 30, water, 0.5 + a.wind * 0.3);
      cel(ctx, fork, '#e8f4ff', { cast: 2, gloss: 2.2, rim: water });
      gem(ctx, 88, 0, 4, water, { glowAlpha: 0.4 });
    });
    // Torso: ornate breastplate over robes.
    const torso = shape(ctx, [[-24, 4], [-30, -36], [-22, -70], [16, -76], [32, -56], [30, -20], [24, 4]], robe, { y0: -76, y1: 4, cast: 4, rimWidth: 1.8, rim: water });
    ctx.save(); ctx.clip(torso);
    shape(ctx, [[-16, -10], [-18, -50], [0, -66], [24, -56], [26, -16], [6, -4]], '#2a6a8a', { cast: 2.4, gloss: 2.4, line: 1 });
    embroidery(ctx, [[-16, -50], [0, -64], [24, -54]], GOLD, 1.8, 1);
    ctx.restore();
    gem(ctx, 4, -44, 5, water, { glowAlpha: 0.5 });
    // Barnacled pauldrons with coral.
    shape(ctx, [[-36, -60], [-26, -80], [-2, -80], [2, -64], [-14, -56], [-34, -52]], '#c9a227', { cast: 2.6, gloss: 2.2 });
    for (const [x, y] of [[-24, -70], [-12, -72]]) cel(ctx, spike(x, y, 14, -1.8 + x * 0.02, 6, 2), coral, { cast: 1, line: 0.7 });
    // Head: a gaunt drowned king with a coral crown and flowing hair.
    frame(ctx, 6, -84, -0.08 * a.wind + 0.06 * a.strike, 1, () => {
      const hair = chain(a.phys, 'sv-hair', [-8, -10], [[0, 0], [-10, 16], [-20, 34], [-26, 52]], chainOpts(a, { wind: 1.2, stiffness: 0.08, gravity: 0.04 }));
      cel(ctx, curve(ribbon(hair, 22, 4), true, 0.4), '#d8e8f0', { cast: 2.4, rim: water });
      shape(ctx, [[-12, 6], [-14, -14], [-4, -24], [12, -24], [20, -12], [20, 4], [12, 14], [0, 14]], skin, { y0: -24, y1: 14, cast: 3, rimWidth: 1.4, rim: water });
      stroke(ctx, curve([[8, 4], [14, 6], [18, 4]], false), shade(skin, -0.4), 1);
      for (const x of [6, 15]) { glow(ctx, x, -8, 12, water, 0.8); fill(ctx, ellipse(x, -8, 2.6, 1.6 - a.hurt), '#e8ffff'); }
      // Beard of kelp.
      for (let i = 0; i < 4; i++) cel(ctx, spike(4 + i * 4, 10, 16 + i * 3, 1.7 - i * 0.08, 5, 2), '#4f8a5a', { cast: 1, line: 0.6 });
      // Coral crown.
      for (const [x, h, ang] of [[-10, 20, -1.9], [-2, 26, -1.65], [6, 30, -1.5], [14, 24, -1.3]]) {
        cel(ctx, spike(x, -20, h, ang, 6, 3), coral, { cast: 1.2, gloss: 1, line: 0.7 });
        cel(ctx, spike(x + Math.cos(ang) * h * 0.5, -20 + Math.sin(ang) * h * 0.5, h * 0.4, ang + 0.7, 4), coral, { cast: 0.8, line: 0.6 });
      }
      cel(ctx, curve([[-14, -18], [20, -20], [20, -14], [-14, -12]], true, 0.2), GOLD, { cast: 1, gloss: 1.4, line: 0.8 });
      gem(ctx, 4, -16, 3, '#ff3a6a', { glowAlpha: 0.4 });
    });
    // Near hand gripping the trident.
    cel(ctx, capsule(-18, -58, 12 + thrust, -46, 8, 6), robe, { cast: 2, rim: water });
    cel(ctx, circle(12 + thrust, -46, 6), skin, { cast: 1.2, line: 0.8 });
  });
  // Rising bubbles and a swirl of water.
  for (let i = 0; i < 8; i++) {
    const phase = (t * 0.0004 + i * 0.125) % 1;
    const x = -70 + ((i * 53) % 140) + Math.sin(t * 0.002 + i) * 6;
    stroke(ctx, circle(x, -10 - phase * 220, 2 + (i % 3)), water, 1, 0.7 * (1 - phase));
  }
}
sovereign.size = { x: -100, y: -258, w: 240, h: 262 };
sovereign.attack = { type: 'melee', fx: 'thrust', colour: '#7fd1ff' };
sovereign.reach = 160;
sovereign.boss = true;

/* ---------------------------------------------------------------
   Archivist of the Deep
   --------------------------------------------------------------- */

function book(ctx, x, y, ang, colour, open = 0.3) {
  frame(ctx, x, y, ang, 1, () => {
    cel(ctx, poly([[-12, -2], [0, 2 - open * 4], [0, -12], [-12, -15]]), '#f3ecd9', { cast: 1, line: 0.7 });
    cel(ctx, poly([[12, -2], [0, 2 - open * 4], [0, -12], [12, -15]]), '#e8dfc8', { cast: 1, line: 0.7 });
    cel(ctx, poly([[-13, -1], [0, 3.5 - open * 4], [13, -1], [13, 1.5], [0, 6 - open * 4], [-13, 1.5]]), colour, { cast: 0.8, line: 0.7 });
    for (let i = 0; i < 3; i++) stroke(ctx, poly([[-10, -11 + i * 3], [-2, -9 + i * 3]], false), '#7a6a8a', 0.5);
  });
}

function archivist(ctx, a) {
  const { t } = a;
  const robe = '#2a2148';
  const ink = '#140f24';
  const eyeC = '#ffd56b';
  const arcane = '#c9a2ff';
  const hover = -60 + wave(t, 0.002, 8);
  glow(ctx, 0, hover - 100, 160, arcane, 0.16 + a.wind * 0.2);
  // Ink tentacles trailing beneath.
  for (let i = 0; i < 5; i++) {
    const x = -30 + i * 15;
    const pts = chain(a.phys, `arch-t${i}`, [x, hover - 40], [[0, 0], [-2, 22], [-6, 44], [-4 + i * 2, 66]], chainOpts(a, { wind: 1.4, stiffness: 0.08, gravity: 0.04 }));
    cel(ctx, curve(ribbon(pts, 12, 1.5), true, 0.4), ink, { cast: 1.6, rim: arcane, rimAlpha: 0.6 });
  }
  frame(ctx, 0, hover, -0.08 * a.wind + 0.1 * a.strike - 0.12 * a.hurt, 1, () => {
    // Orbiting books, behind.
    const orbit = (front) => {
      for (let i = 0; i < 6; i++) {
        const ang = t * 0.0011 + i * (Math.PI / 3) + a.wind * 1.2;
        const inFront = Math.sin(ang) > 0;
        if (inFront !== front) continue;
        const rx = 92 + a.wind * 14;
        book(ctx, Math.cos(ang) * rx, -110 + Math.sin(ang) * 28, Math.cos(ang) * 0.3, ['#8a2a3a', '#2a5a8a', '#3a7a4a', '#8a6a2a', '#5a3a8a', '#2a6a6a'][i], 0.3 + 0.3 * Math.sin(t * 0.003 + i));
      }
    };
    orbit(false);
    // Robed body tapering into ink.
    const body = shape(ctx, [[-36, -40], [-44, -100], [-30, -160], [0, -182], [32, -160], [46, -100], [38, -40], [0, -30]], robe,
      { y0: -182, y1: -30, cast: 5, rim: arcane, rimAlpha: 0.7, rimWidth: 2.2 });
    ctx.save(); ctx.clip(body);
    for (let i = 0; i < 7; i++) {
      const y = -150 + i * 16;
      stroke(ctx, curve([[-40, y], [-10, y + 4], [20, y - 2], [44, y + 2]], false), arcane, 0.6, 0.35);
    }
    // Glyphs drifting across the robe.
    for (let i = 0; i < 8; i++) {
      const x = -30 + ((i * 23) % 60);
      const y = -60 - ((t * 0.02 + i * 17) % 110);
      stroke(ctx, poly([[x, y], [x + 4, y - 5], [x + 8, y]], false), arcane, 0.8, 0.6);
    }
    ctx.restore();
    embroidery(ctx, [[-38, -42], [0, -32], [38, -42]], GOLD, 2, 1);
    // Hood with a single great eye.
    frame(ctx, 4, -170, -0.06 * a.wind, 1, () => {
      shape(ctx, [[-30, 16], [-32, -14], [-14, -40], [16, -40], [32, -14], [32, 16], [0, 22]], shade(robe, 0.06), { cast: 3.6, rim: arcane, rimAlpha: 0.8 });
      fill(ctx, curve([[-20, 16], [-20, -14], [0, -28], [22, -14], [22, 16]], true), '#05040a');
      const open = clamp(1 - a.hurt * 0.9);
      const r = 13 + a.wind * 3;
      glow(ctx, 0, 0, r * 3, eyeC, 0.7);
      ctx.save();
      const lid = ellipse(0, 0, r * 1.25, r * open);
      ctx.clip(lid);
      fill(ctx, lid, '#fff8e0');
      const g = ctx.createRadialGradient(2, 0, 0, 2, 0, r);
      g.addColorStop(0, '#fff2b0');
      g.addColorStop(0.5, eyeC);
      g.addColorStop(1, '#a8601a');
      ctx.fillStyle = g;
      ctx.fill(circle(3 + a.strike * 3, 0, r * 0.75));
      fill(ctx, ellipse(4 + a.strike * 3, 0, r * 0.18, r * 0.62), '#1a0a00');
      ctx.restore();
      stroke(ctx, lid, '#3a2a10', 1.2);
      sparkle(ctx, -3, -5, 4, '#ffffff', 0.9);
    });
    // Many thin arms holding open books and quills.
    for (const [x, y, ang, s] of [[-36, -120, 2.6, 0.9], [38, -130, 0.3 - a.strike * 0.4, 1], [40, -96, 0.6, 0.85]]) {
      frame(ctx, x, y, ang, s, () => {
        cel(ctx, capsule(0, 0, 32, 0, 5, 3.6), robe, { cast: 1.4, rim: arcane });
        cel(ctx, circle(34, 0, 4.4), '#8a7ab0', { cast: 1, line: 0.7 });
      });
    }
    book(ctx, 74 - a.strike * -10, -138 - a.strike * 6, -0.2, '#8a2a3a', 0.9);
    orbit(true);
  });
}
archivist.size = { x: -120, y: -272, w: 240, h: 272 };
archivist.attack = { type: 'ranged', fx: 'books', colour: '#c9a2ff', muzzle: [80, -200] };
archivist.hover = true;
archivist.boss = true;

export const BOSSES = {
  boss_ratking: ratking,
  boss_leviathan: leviathan,
  boss_plague: plague,
  boss_sovereign: sovereign,
  boss_archivist: archivist,
};
