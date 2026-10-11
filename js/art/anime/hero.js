/* The player character: an anime-style rig with adult proportions.

   Local space: feet on y = 0, facing right, about 180 units tall (roughly
   6.5 heads). The body is solved from a pose — pelvis, spine lean, head tilt,
   hand and foot targets — with two-bone IK for the limbs, then painted back
   to front with cel shading. Hair, capes, scarves, sleeves and coat tails are
   spring chains, so they lag and settle as the body moves.

   Each role has its own outfit and look; equipped gear draws over it — a
   helmet replaces the hat, armour layers over the clothes, boots, weapons,
   shields, a second weapon, rings and charms all show. */

import {
  cel, curve, poly, ellipse, circle, roundRect, capsule, stroke, fill, glow, sparkle, gem, hatch, frame,
  embroidery, shade, rgba, shadowOf, inkFor,
} from './cel.js';
import { ik, chain, ribbon, rot, lerp, angleOf, DEG } from './rig.js';
import { drawWeapon, drawShield, drawHelmet, WEAPON_REACH, STEEL, GOLD } from './gear.js';

export const PELVIS_Y = -97;
const UPPER_ARM = 26;
const FOREARM = 24;
const THIGH = 46;
const SHIN = 45;
const SPINE = 44;

/* ---------------------------------------------------------------
   Role designs
   --------------------------------------------------------------- */

export const ROLE_STYLE = {
  knight: {
    skin: '#ffe2cc', hair: '#7a4b2c', hairStyle: 'short', eye: '#2f74d6',
    cloth: '#2c5aa8', trim: '#e3b64a', under: '#9ba7b4', legs: '#2a3040', shoe: '#4a3424',
    sleeve: 'armoured', torso: 'tabard', back: { type: 'cape', colour: '#b02a3c', inner: '#6a1626' },
    accent: '#c0392b', element: '#ffd56b',
  },
  mage: {
    skin: '#ffe6d6', hair: '#e6e3f2', hairStyle: 'long', eye: '#9b5cff',
    cloth: '#4b2d8c', trim: '#e8c35a', under: '#2a1b4f', legs: '#2a1b4f', shoe: '#2a1b3f',
    sleeve: 'flared', torso: 'robe', skirt: 'robe', hat: 'witch', back: null, grimoire: true,
    accent: '#ff7ab8', element: '#b98cff',
  },
  rogue: {
    skin: '#f2cdb0', hair: '#25242e', hairStyle: 'ponytail', eye: '#e2a72e',
    cloth: '#2b4237', trim: '#a8bf86', under: '#1b1f26', legs: '#1f2329', shoe: '#2a221c',
    sleeve: 'wrapped', torso: 'jacket', hat: 'hood', hood: '#22362b', mask: '#1a2420',
    back: { type: 'scarf', colour: '#c02c40' }, accent: '#c02c40', element: '#9b7bff',
  },
  cleric: {
    skin: '#ffe8d8', hair: '#f6d77e', hairStyle: 'long', eye: '#2fa3c0',
    cloth: '#f6f1e6', trim: '#d9a83a', under: '#e6dcc6', legs: '#efe6d2', shoe: '#c9b48a',
    sleeve: 'flared', torso: 'vestment', skirt: 'robe', circlet: true, halo: true, sash: '#3d6fc0',
    back: null, accent: '#3d6fc0', element: '#ffe28a',
  },
  scholar: {
    skin: '#f6d4b8', hair: '#3a2a26', hairStyle: 'messy', eye: '#3f9a6e',
    cloth: '#7a4c2c', trim: '#e6d3a8', under: '#efe8d6', vest: '#3a3f55', legs: '#33313d', shoe: '#2e2420',
    sleeve: 'coat', torso: 'coat', skirt: 'coattails', glasses: true, scarf: '#2f8a8f',
    back: { type: 'satchel', colour: '#6b4528' }, accent: '#2f8a8f', element: '#7fc8ff',
  },
  warden: {
    skin: '#ecbe9c', hair: '#b04a2c', hairStyle: 'braid', eye: '#5fbf4a',
    cloth: '#3d6b3a', trim: '#d6c27a', under: '#e6dab8', legs: '#3b3a2c', shoe: '#4a3a26',
    sleeve: 'fitted', torso: 'tunic', skirt: 'tunic', hat: 'hood', hood: '#2f5a34', leaves: '#86c060', flowers: '#ff9ec4',
    back: { type: 'mantle', colour: '#2f5a34' }, accent: '#86c060', element: '#a6e06a',
  },
};

export const IDLE_POSE = {
  x: 0, y: 0, lean: 0.03, neck: 0.03, head: 0,
  hand: [25, 9], off: [18, -2],
  footN: [-11, 0], footF: [13, 0], liftN: 0, liftF: 0,
  w: -48, wo: -28, face: 'neutral', arms: 'ready',
};

/* ---------------------------------------------------------------
   Skeleton
   --------------------------------------------------------------- */

function solve(pose) {
  const pelvis = [pose.x, PELVIS_Y + pose.y];
  const lean = pose.lean;
  const T = (u, v) => { const [rx, ry] = rot(u, v, lean); return [pelvis[0] + rx, pelvis[1] + ry]; };
  const neckBase = T(1, -SPINE);
  const headAngle = lean + pose.neck + pose.head;
  const [hx, hy] = rot(2, -17.5, lean + pose.neck);
  const head = [neckBase[0] + hx, neckBase[1] + hy];
  const shoulderN = T(-6, -39);
  const shoulderF = T(12, -40);
  const hipN = T(-5, 1);
  const hipF = T(6, -1);
  const handTarget = [pelvis[0] + pose.hand[0], pelvis[1] + pose.hand[1]];
  const offTarget = [pelvis[0] + pose.off[0], pelvis[1] + pose.off[1]];
  const [elbowN, handN] = ik(shoulderN, handTarget, UPPER_ARM, FOREARM, -1);
  const [elbowF, handF] = ik(shoulderF, offTarget, UPPER_ARM, FOREARM, -1);
  const ankleN = [pose.footN[0], -7 - (pose.liftN || 0) + (pose.footN[1] || 0)];
  const ankleF = [pose.footF[0], -7 - (pose.liftF || 0) + (pose.footF[1] || 0)];
  const [kneeN] = ik(hipN, ankleN, THIGH, SHIN, 1);
  const [kneeF] = ik(hipF, ankleF, THIGH, SHIN, 1);
  return { pelvis, lean, T, neckBase, head, headAngle, shoulderN, shoulderF, hipN, hipF, elbowN, handN, elbowF, handF, kneeN, ankleN, kneeF, ankleF };
}

/* ---------------------------------------------------------------
   Limbs
   --------------------------------------------------------------- */

function drawLeg(ctx, s, side, style, boots) {
  const hip = side === 'near' ? s.hipN : s.hipF;
  const knee = side === 'near' ? s.kneeN : s.kneeF;
  const ankle = side === 'near' ? s.ankleN : s.ankleF;
  const legs = side === 'near' ? style.legs : shadowOf(style.legs, 0.12);
  cel(ctx, capsule(hip[0], hip[1], knee[0], knee[1], 9, 6.2), legs, { y0: hip[1], y1: knee[1], cast: 3 });
  cel(ctx, capsule(knee[0], knee[1], ankle[0], ankle[1], 6, 4), legs, { y0: knee[1], y1: ankle[1], cast: 2.4 });
  // Knee fold.
  stroke(ctx, curve([[knee[0] - 3, knee[1] - 1], [knee[0] + 1, knee[1] + 1.5], [knee[0] + 4, knee[1] - 0.5]], false), shade(legs, -0.35), 0.7, 0.7);
  if (style.sleeve === 'wrapped' && !boots) {
    // Rogue leg wraps.
    for (let i = 0; i < 4; i++) {
      const t = 0.35 + i * 0.14;
      const x = lerp(knee[0], ankle[0], t);
      const y = lerp(knee[1], ankle[1], t);
      stroke(ctx, poly([[x - 5, y - 1.6], [x + 5, y + 1.6]], false), '#cfc4a6', 1.1, 0.85);
    }
  }
  drawFoot(ctx, knee, ankle, style, boots, side);
}

function drawFoot(ctx, knee, ankle, style, boots, side) {
  const [ax, ay] = ankle;
  const dim = side === 'far' ? -0.08 : 0;
  if (!boots) {
    const shoe = shade(style.shoe, dim);
    const path = curve([[ax - 6, ay - 3], [ax + 1, ay - 6], [ax + 9, ay - 2], [ax + 15, ay + 3], [ax + 14, ay + 7], [ax - 6, ay + 7]], true, 0.35);
    cel(ctx, path, shoe, { y0: ay - 6, y1: ay + 7, cast: 1.8, gloss: 1 });
    stroke(ctx, poly([[ax - 6, ay + 6], [ax + 14.5, ay + 6]], false), shade(shoe, -0.5), 1.4);
    return;
  }
  const c = shade(boots.colour || '#3d4a3a', dim);
  const trim = boots.trim || shade(c, -0.3);
  if (boots.glow) glow(ctx, ax + 2, ay - 10, 22, boots.glow, 0.3);
  if (boots.shape === 'wraps') {
    const top = [lerp(knee[0], ax, 0.45), lerp(knee[1], ay, 0.45)];
    cel(ctx, capsule(top[0], top[1], ax, ay - 1, 6, 5), c, { y0: top[1], y1: ay, cast: 2 });
    for (let i = 0; i < 5; i++) {
      const t = i / 5;
      const x = lerp(top[0], ax, t);
      const y = lerp(top[1], ay, t);
      stroke(ctx, poly([[x - 6, y - 1.4], [x + 6, y + 2]], false), shade(c, -0.3), 0.9);
    }
    const path = curve([[ax - 6, ay - 3], [ax + 2, ay - 5], [ax + 10, ay - 1], [ax + 14, ay + 4], [ax + 13, ay + 7], [ax - 6, ay + 7]], true, 0.35);
    cel(ctx, path, shade(c, -0.15), { cast: 1.6 });
    return;
  }
  // Tall boots up to just under the knee.
  const top = [lerp(knee[0], ax, 0.18), lerp(knee[1], ay, 0.18)];
  cel(ctx, capsule(top[0], top[1], ax, ay - 1, 6.6, 5.2), c, { y0: top[1], y1: ay, cast: 2.4, gloss: 1.2 });
  const foot = curve([[ax - 7, ay - 4], [ax + 1, ay - 7], [ax + 10, ay - 2.5], [ax + 16, ay + 3], [ax + 15, ay + 7], [ax - 7, ay + 7]], true, 0.35);
  cel(ctx, foot, c, { y0: ay - 7, y1: ay + 7, cast: 2, gloss: 1.2 });
  stroke(ctx, poly([[ax - 7, ay + 6], [ax + 15.5, ay + 6]], false), shade(c, -0.55), 1.8);
  const cuffAngle = angleOf(knee, ankle) + Math.PI / 2;
  const cx = Math.cos(cuffAngle) * 7.6;
  const cy = Math.sin(cuffAngle) * 7.6;
  cel(ctx, capsule(top[0] - cx, top[1] - cy, top[0] + cx, top[1] + cy, 2, 2), trim, { cast: 0.8, line: 0.8 });
  if (boots.shape === 'striders') {
    const mid = [lerp(top[0], ax, 0.5), lerp(top[1], ay, 0.5)];
    const plate = curve([[top[0] + 4, top[1] + 2], [mid[0] + 6.5, mid[1]], [ax + 5, ay - 6], [ax + 1, ay - 5], [mid[0] + 3, mid[1] + 1], [top[0] + 1, top[1] + 4]], true, 0.4);
    cel(ctx, plate, trim, { cast: 1.2, line: 0.8, gloss: 1 });
    if (boots.glow) stroke(ctx, curve([[top[0] + 4, top[1] + 4], [mid[0] + 5, mid[1]], [ax + 3, ay - 6]], false), boots.glow, 0.8, 0.9);
  } else {
    for (let i = 0; i < 3; i++) {
      const y = lerp(top[1], ay, 0.3 + i * 0.2);
      const x = lerp(top[0], ax, 0.3 + i * 0.2);
      cel(ctx, circle(x + 5, y, 0.9), GOLD, { cast: 0, line: 0.4 });
    }
  }
}

function drawFist(ctx, hand, elbow, colour, ring) {
  const a = angleOf(elbow, hand);
  frame(ctx, hand[0], hand[1], a, 1, () => {
    const fist = curve([[-2.5, -4], [3, -4.6], [6, -2.4], [6.2, 2.6], [2.5, 4.6], [-2.5, 4]], true, 0.4);
    cel(ctx, fist, colour, { cast: 1.4, line: 0.9 });
    stroke(ctx, curve([[3.2, -3.6], [4, 0], [3.2, 3.6]], false), shade(colour, -0.3), 0.6, 0.8);
    cel(ctx, ellipse(1.5, -4.4, 3, 1.8, -0.3), colour, { cast: 0.8, line: 0.7 });
    if (ring) {
      cel(ctx, roundRect(2.4, -4.2, 1.6, 8.4, 0.7), ring.colour || GOLD, { cast: 0.3, line: 0.4, gloss: 0.5 });
      if (ring.gem) gem(ctx, 3.2, -1.5, 1.1, ring.gem, { glowAlpha: 0.4 });
    }
  });
}

function drawArm(ctx, s, side, style, armour, ring) {
  const shoulder = side === 'near' ? s.shoulderN : s.shoulderF;
  const elbow = side === 'near' ? s.elbowN : s.elbowF;
  const hand = side === 'near' ? s.handN : s.handF;
  const dim = side === 'far' ? -0.1 : 0;
  const cloth = shade(style.cloth, dim);
  const heavy = armour && ['plate', 'scale', 'mail'].includes(armour.shape);
  const sleeveColour = heavy ? shade(armour.colour, dim) : style.sleeve === 'armoured' ? shade(style.under, dim) : cloth;

  cel(ctx, capsule(shoulder[0], shoulder[1], elbow[0], elbow[1], 6.6, 5.2), sleeveColour, { y0: shoulder[1], y1: elbow[1], cast: 2.2, gloss: heavy ? 1.2 : false });

  let glove = style.skin;
  if (style.sleeve === 'flared') {
    // Bell sleeve: narrow at the elbow, opening wide past the wrist.
    const a = angleOf(elbow, hand);
    const wx = hand[0] + Math.cos(a) * 1.5;
    const wy = hand[1] + Math.sin(a) * 1.5;
    const nx = Math.cos(a + Math.PI / 2);
    const ny = Math.sin(a + Math.PI / 2);
    const droop = 4;
    const bell = curve([
      [elbow[0] - nx * 4.8, elbow[1] - ny * 4.8],
      [wx - nx * 8.5, wy - ny * 8.5 + droop * 0.3],
      [wx - nx * 6, wy - ny * 6 + droop + 4],
      [wx + nx * 9, wy + ny * 9 + droop],
      [elbow[0] + nx * 4.8, elbow[1] + ny * 4.8],
    ], true, 0.35);
    cel(ctx, bell, cloth, { y0: elbow[1], y1: wy + 12, cast: 2.6 });
    stroke(ctx, curve([[wx - nx * 8.5, wy - ny * 8.5 + 1], [wx + nx * 2, wy + ny * 2 + droop + 3], [wx + nx * 9, wy + ny * 9 + droop]], false), style.trim, 1.4);
  } else {
    const fore = capsule(elbow[0], elbow[1], hand[0], hand[1], 5.2, 4)
    cel(ctx, fore, sleeveColour, { y0: elbow[1], y1: hand[1], cast: 1.8 });
    if (style.sleeve === 'wrapped') {
      for (let i = 0; i < 4; i++) {
        const t = 0.45 + i * 0.13;
        const x = lerp(elbow[0], hand[0], t);
        const y = lerp(elbow[1], hand[1], t);
        stroke(ctx, poly([[x - 1.6, y - 4.2], [x + 1.6, y + 4.2]], false), '#cfc4a6', 1.1, 0.9);
      }
      glove = '#3a2e26';
    } else if (style.sleeve === 'armoured' || heavy) {
      // Gauntlet: a steel cuff over the forearm.
      const g = capsule(lerp(elbow[0], hand[0], 0.4), lerp(elbow[1], hand[1], 0.4), hand[0], hand[1], 5.2, 4.4);
      cel(ctx, g, STEEL, { cast: 1.8, gloss: 1.4 });
      glove = shade(STEEL, -0.18);
    } else if (style.sleeve === 'coat') {
      const cx = lerp(elbow[0], hand[0], 0.78);
      const cy = lerp(elbow[1], hand[1], 0.78);
      cel(ctx, capsule(cx, cy, lerp(elbow[0], hand[0], 0.95), lerp(elbow[1], hand[1], 0.95), 5.4, 5.4), shade(cloth, 0.12), { cast: 1, line: 0.8 });
    } else {
      const cx = lerp(elbow[0], hand[0], 0.85);
      const cy = lerp(elbow[1], hand[1], 0.85);
      cel(ctx, circle(cx, cy, 4.6), style.trim, { cast: 1, line: 0.8 });
    }
  }
  return { glove, ring, hand, elbow };
}

/* ---------------------------------------------------------------
   Torso and outfits (drawn in the torso's frame: u forward, v up)
   --------------------------------------------------------------- */

const UPPER_BODY = [
  [-12, 4], [-11, -10], [-13, -22], [-15.5, -33], [-15, -41], [-9, -45.5], [-2, -47],
  [6, -47.5], [13, -46], [18, -41], [19, -32], [16.5, -21], [12.5, -12], [13.5, -3], [12.5, 4],
];

function drawTorso(ctx, s, style, armour, t) {
  frame(ctx, s.pelvis[0], s.pelvis[1], s.lean, 1, () => {
    const body = curve(UPPER_BODY, true, 0.4);
    const heavy = armour && ['plate', 'scale', 'mail'].includes(armour.shape);
    switch (style.torso) {
      case 'tabard': {
        cel(ctx, body, style.under, { y0: -46, y1: 4, cast: 3, gloss: 1.4 });
        ctx.save(); ctx.clip(body);
        for (let row = 0; row < 14; row++) {
          for (let col = 0; col < 9; col++) {
            ctx.beginPath();
            ctx.arc(-13 + col * 3.6 + (row % 2) * 1.8, -45 + row * 3.6, 1.6, 0, Math.PI);
            ctx.strokeStyle = rgba('#4a5260', 0.55); ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        ctx.restore();
        if (!heavy) {
          const tabard = curve([[-2, -45], [10, -45.5], [14.5, -37], [13, -14], [11.5, 4], [12.5, 30], [3, 34], [-6, 30], [-6, 4], [-8, -20], [-7.5, -37]], true, 0.3);
          cel(ctx, tabard, style.cloth, { y0: -46, y1: 34, cast: 3 });
          stroke(ctx, curve([[-4.5, -42], [-6.5, -20], [-4.6, 4], [-4.2, 28], [3, 31.5], [10.8, 28.5], [10, 4], [11.4, -14], [12.6, -36]], false), style.trim, 1.3);
          // Crest: a gold shield with a star.
          const crest = curve([[1, -33], [8, -34], [9, -26], [5, -20.5], [1, -26]], true, 0.3);
          cel(ctx, crest, style.trim, { cast: 1.4, line: 0.8, gloss: 1 });
          sparkle(ctx, 5, -28, 2.6, '#fff8e0', 1);
        }
        break;
      }
      case 'robe': {
        cel(ctx, body, style.cloth, { y0: -46, y1: 4, cast: 3 });
        // Embroidered neckline and front lacing.
        embroidery(ctx, [[-3, -44], [4, -36], [11, -43.5]], style.trim, 1.3, 0.8);
        stroke(ctx, curve([[4, -36], [5, -20], [5.5, -6]], false), style.trim, 1.1);
        for (let v = -30; v < -8; v += 5) stroke(ctx, poly([[2.5, v], [7.5, v + 2]], false), style.trim, 0.7, 0.9);
        cel(ctx, roundRect(-11, -14, 24, 8, 3), shade(style.cloth, -0.2), { cast: 1.4, line: 0.9 });
        gem(ctx, 5, -10, 2.2, style.accent, { glowAlpha: 0.4 });
        break;
      }
      case 'jacket': {
        cel(ctx, body, style.cloth, { y0: -46, y1: 4, cast: 3 });
        stroke(ctx, curve([[3, -44], [6, -24], [7, 2]], false), shade(style.cloth, -0.35), 1);
        // Diagonal strap with pouches.
        const strap = poly([[-10, -40], [-6.5, -42], [14, -6], [10.5, -4]]);
        cel(ctx, strap, '#5a4030', { cast: 1, line: 0.8 });
        for (const [u, v] of [[-1, -30], [5, -19]]) cel(ctx, roundRect(u - 3, v - 3, 6, 6, 1.4), '#6b4a34', { cast: 1, line: 0.8 });
        cel(ctx, circle(2.5, -23.5, 1.4), GOLD, { cast: 0, line: 0.5 });
        break;
      }
      case 'vestment': {
        cel(ctx, body, style.cloth, { y0: -46, y1: 4, cast: 3 });
        const panel = curve([[1, -44], [9, -44.5], [10, -10], [9, 4], [1, 4], [0, -10]], true, 0.3);
        cel(ctx, panel, shade(style.cloth, -0.03), { cast: 1.4 });
        stroke(ctx, panel, style.trim, 1.3);
        // Sun emblem.
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4;
          stroke(ctx, poly([[5 + Math.cos(a) * 2.5, -28 + Math.sin(a) * 2.5], [5 + Math.cos(a) * 4.6, -28 + Math.sin(a) * 4.6]], false), style.trim, 0.9);
        }
        cel(ctx, circle(5, -28, 2), style.trim, { cast: 0.6, line: 0.6, gloss: 1 });
        // Sash.
        const sash = poly([[-12, -36], [-8, -40], [14, -8], [12, -2]]);
        cel(ctx, sash, style.sash, { cast: 1.6, line: 0.9 });
        break;
      }
      case 'coat': {
        // Shirt and waistcoat show between open lapels.
        cel(ctx, body, style.under, { y0: -46, y1: 4, cast: 2.6 });
        const vest = curve([[-6, -36], [10, -38], [14, -26], [12, -6], [11, 4], [-4, 4], [-6, -14]], true, 0.3);
        cel(ctx, vest, style.vest, { cast: 2 });
        for (let v = -32; v < 0; v += 6) cel(ctx, circle(6, v, 0.9), GOLD, { cast: 0, line: 0.3 });
        const lapelBack = curve([[-12.5, -42], [-4, -45], [-2, -30], [-5, -6], [-11, 4], [-12.5, -24]], true, 0.3);
        cel(ctx, lapelBack, style.cloth, { cast: 2.4 });
        const lapelFront = curve([[10, -44.5], [16, -38], [16.5, -28], [13, -14], [12.5, 4], [10, 4], [9, -14], [6, -34]], true, 0.3);
        cel(ctx, lapelFront, style.cloth, { cast: 1.6 });
        stroke(ctx, curve([[6, -34], [9, -14], [10, 4]], false), style.trim, 0.9, 0.9);
        break;
      }
      case 'tunic':
      default: {
        cel(ctx, body, style.cloth, { y0: -46, y1: 4, cast: 3 });
        embroidery(ctx, [[-2, -44], [5, -38], [12, -44]], style.trim, 1.2, 0.8);
        // Leaf embroidery down the front.
        for (let v = -34; v < -6; v += 7) {
          frame(ctx, 6, v, 0.6, 1, () => cel(ctx, curve([[0, 0], [2, -2], [0, -4.5], [-2, -2]], true), style.leaves || style.trim, { cast: 0.5, line: 0.5 }));
        }
        break;
      }
    }
    if (armour) drawChestArmour(ctx, armour, style, t);
    // Belt.
    if (!armour || !['robe', 'coat'].includes(armour.shape)) {
      const beltColour = style.torso === 'robe' ? null : (armour?.shape === 'tunic' ? '#8a6a3c' : '#4a3426');
      if (beltColour) {
        cel(ctx, curve([[-11.5, -3], [12, -4.5], [12.5, 2.5], [-11.5, 3.5]], true, 0.2), beltColour, { cast: 1.2, line: 0.9 });
        cel(ctx, roundRect(5, -5.2, 6.4, 8.6, 1.4), GOLD, { cast: 1, line: 0.8, gloss: 1 });
      }
    }
  });
}

function drawChestArmour(ctx, armour, style, t) {
  const c = armour.colour || '#8f969e';
  const trim = armour.trim || shade(c, -0.3);
  if (armour.glow) glow(ctx, 2, -26, 40, armour.glow, 0.28);
  switch (armour.shape) {
    case 'tunic': {
      // A patched leather jerkin over the chest; the outfit shows around it.
      const jerkin = curve([[-3, -44], [9, -45], [16, -38], [16.5, -26], [14, -15], [-1, -14], [-4, -28]], true, 0.35);
      cel(ctx, jerkin, '#8a6a4a', { y0: -45, y1: -14, cast: 2.6, gloss: 1 });
      ctx.save(); ctx.setLineDash([1.2, 1.2]);
      stroke(ctx, curve([[-1.5, -41], [-2.5, -28], [0.5, -16]], false), '#e8dcc0', 0.5, 0.9);
      ctx.restore();
      for (const [u, v, w, h, col] of [[5, -38, 7, 6, c], [1, -25, 6, 6, shade(c, 0.15)], [9, -22, 5, 5, shade(c, -0.1)]]) {
        const patch = roundRect(u, v, w, h, 1.2);
        cel(ctx, patch, col, { cast: 0.8, line: 0.6 });
        ctx.save(); ctx.setLineDash([1, 1]); stroke(ctx, roundRect(u + 0.8, v + 0.8, w - 1.6, h - 1.6, 1), '#e8dcc0', 0.5, 0.9); ctx.restore();
      }
      // Shoulder strap with a buckle.
      cel(ctx, poly([[-10, -44], [-5, -46], [3, -30], [-1, -29]]), trim, { cast: 0.8, line: 0.7 });
      cel(ctx, roundRect(-4.5, -38, 4, 4, 0.8), '#c9a227', { cast: 0.4, line: 0.5, gloss: 0.8 });
      break;
    }
    case 'vest': {
      const vest = curve([[-11, -40], [-2, -44], [10, -43.5], [15, -34], [13.5, -16], [12, 1], [-10.5, 1], [-12, -20]], true, 0.35);
      cel(ctx, vest, trim, { y0: -44, y1: 1, cast: 2.6 });
      cel(ctx, roundRect(-1, -40, 15, 15, 3), c, { cast: 2, line: 0.9, gloss: 1.6 });
      cel(ctx, roundRect(-1, -23, 14, 14, 3), c, { cast: 2, line: 0.9, gloss: 1.6 });
      for (const [u, v] of [[1, -38], [12, -38], [1, -11], [11, -11]]) cel(ctx, circle(u, v, 0.9), shade(c, -0.5), { cast: 0, line: 0 });
      break;
    }
    case 'coat': {
      // An open long coat: back panel and front lapel, the outfit between.
      const back = curve([[-15.5, -42], [-8, -46.5], [-3, -44], [-4, -24], [-6, 6], [-13, 6], [-15, -20]], true, 0.35);
      cel(ctx, back, c, { y0: -46, y1: 6, cast: 3, gloss: 1.2 });
      const front = curve([[12, -46], [18.5, -41], [19.5, -30], [17, -16], [15, 6], [11, 6], [10.5, -14], [8, -36]], true, 0.35);
      cel(ctx, front, c, { y0: -46, y1: 6, cast: 2.4, gloss: 1.2 });
      cel(ctx, curve([[8, -36], [12, -46], [14, -44], [11.5, -32]], true, 0.3), shade(c, -0.15), { cast: 0.8, line: 0.7 });
      cel(ctx, curve([[-3, -44], [-8, -46.5], [-10, -44], [-5, -30]], true, 0.3), shade(c, -0.15), { cast: 0.8, line: 0.7 });
      for (let v = -30; v < 2; v += 8) cel(ctx, circle(13, v, 1), trim, { cast: 0, line: 0.4, gloss: 0.6 });
      break;
    }
    case 'robe': {
      const robe = curve([[-13, -42], [-4, -46], [11, -45], [17, -37], [15, -16], [13, 4], [-11, 4], [-12.5, -20]], true, 0.35);
      cel(ctx, robe, c, { y0: -46, y1: 4, cast: 3 });
      embroidery(ctx, [[-4, -45], [5, -35], [12, -44]], trim, 1.4, 0.9);
      stroke(ctx, curve([[5, -35], [6, -14], [6.5, 3]], false), trim, 1.3);
      for (let v = -28; v < 0; v += 7) sparkle(ctx, 6, v, 1.3, trim, 0.9);
      break;
    }
    case 'mail':
    case 'scale': {
      const shirt = curve([[-12.5, -42], [-4, -46], [11, -45], [16.5, -37], [16, -16], [13.5, 4], [-11.5, 4], [-12.5, -20]], true, 0.35);
      cel(ctx, shirt, c, { y0: -46, y1: 4, cast: 3, gloss: 1.4 });
      ctx.save(); ctx.clip(shirt);
      for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 10; col++) {
          const u = -14 + col * 3.4 + (row % 2) * 1.7;
          const v = -46 + row * 3.2;
          ctx.beginPath();
          if (armour.shape === 'scale') {
            ctx.moveTo(u - 1.9, v); ctx.quadraticCurveTo(u, v + 4, u + 1.9, v);
            ctx.strokeStyle = rgba(shade(c, 0.35), 0.8); ctx.lineWidth = 0.7;
          } else {
            ctx.arc(u, v, 1.5, 0, Math.PI);
            ctx.strokeStyle = rgba(shade(c, -0.45), 0.7); ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        }
      }
      ctx.restore();
      cel(ctx, curve([[-11.5, -6], [13.5, -7], [13.5, -2], [-11.5, -1]], true, 0.2), trim, { cast: 0.8, line: 0.8, gloss: 1 });
      if (armour.shape === 'scale') stroke(ctx, curve([[-4, -45], [5, -37], [12, -44]], false), trim, 1.6);
      break;
    }
    case 'plate': {
      const plate = curve([[-12, -41], [-3, -45.5], [11, -44.5], [17, -36], [16.5, -24], [13, -10], [-10.5, -10], [-12.5, -24]], true, 0.35);
      cel(ctx, plate, c, { y0: -46, y1: -10, cast: 3.4, gloss: 2.4 });
      stroke(ctx, curve([[6, -44], [8, -30], [7, -12]], false), shade(c, 0.45), 1.1, 0.8);
      stroke(ctx, curve([[-3, -44], [3, -40], [11, -44]], false), trim, 1.6);
      for (let i = 0; i < 3; i++) {
        const v = -10 + i * 4.6;
        cel(ctx, curve([[-11.5, v], [14 - i * 0.5, v - 0.6], [14.5 - i * 0.5, v + 4], [-11.5, v + 4.4]], true, 0.2), shade(c, -0.05 * i), { cast: 1.2, line: 0.8, gloss: 1 });
      }
      sparkle(ctx, 3, -34, 3, '#ffffff', 0.8);
      break;
    }
    default:
      break;
  }
}

/** Shoulder guard over the near arm (knights, plate and scale armour). */
function drawPauldron(ctx, s, colour, trim) {
  frame(ctx, s.shoulderN[0], s.shoulderN[1], s.lean - 0.2, 1, () => {
    for (let i = 2; i >= 0; i--) {
      const p = curve([[-8.5 + i, -3 + i * 3.5], [0, -7 + i * 3.6], [8.5 - i, -2 + i * 3.4], [7 - i, 3 + i * 3.4], [-7 + i, 3 + i * 3.5]], true, 0.4);
      cel(ctx, p, shade(colour, -0.04 * i), { cast: 1.8, line: 0.9, gloss: 1.4 });
    }
    stroke(ctx, curve([[-8, -1], [0, -5], [8, -0.5]], false), trim, 1.2);
  });
}

/* ---------------------------------------------------------------
   Skirts, coat tails and capes (rig space, with physics)
   --------------------------------------------------------------- */

function hemSway(phys, key, anchor, opts) {
  const pts = chain(phys, key, anchor, [[0, 0], [0, 14], [0, 28], [0, 40]], { ...opts, stiffness: 0.12, gravity: 0.15 });
  const last = pts[pts.length - 1];
  return last[0] - anchor[0];
}

function drawSkirt(ctx, s, style, armour, layer, phys, opts) {
  const kind = armour && ['robe', 'coat'].includes(armour.shape) ? armour.shape : style.skirt;
  if (!kind) return;
  const colour = armour && ['robe', 'coat'].includes(armour.shape) ? armour.colour : style.cloth;
  const trim = armour && ['robe', 'coat'].includes(armour.shape) ? (armour.trim || style.trim) : style.trim;
  const waistBack = s.T(-11, -2);
  const waistFront = s.T(12, -3);
  const sway = hemSway(phys, `hem-${layer}`, s.T(0, 0), opts);
  const t = opts.now || 0;
  const flutter = Math.sin(t * 0.004) * 1.2;
  if (kind === 'robe') {
    // A full A-line robe: the hem spans both feet wherever they are.
    const lo = Math.min(s.ankleN[0], s.ankleF[0]);
    const hi = Math.max(s.ankleN[0], s.ankleF[0]);
    const hemY = Math.min(-5, Math.max(s.ankleN[1], s.ankleF[1]) + 2);
    const left = lo - 13 + sway * 1.2;
    const right = hi + 17 + sway;
    if (layer === 'back') {
      const back = curve([waistBack, s.T(2, -4), [right - 6, hemY - 3], [left - 4, hemY + flutter]], true, 0.25);
      cel(ctx, back, shadowOf(colour, 0.14), { y0: waistBack[1], y1: hemY, cast: 3 });
      return;
    }
    const mid = (left + right) / 2;
    const front = curve([
      s.T(-12, -3), waistFront, s.T(13, 6),
      [right, hemY - 3 - flutter], [mid + 6, hemY + 1], [mid - 6, hemY - 1 + flutter * 0.5], [left, hemY],
      s.T(-14, 10),
    ], true, 0.25);
    cel(ctx, front, colour, { y0: waistFront[1], y1: hemY, cast: 3.8 });
    ctx.save();
    ctx.clip(front);
    // Fabric folds falling from the waist.
    const [wx, wy] = s.T(0, 2);
    for (const [k, a] of [[0.22, 0.5], [0.5, 0.35], [0.76, 0.5]]) {
      const fx = lerp(left, right, k);
      const path = curve([[lerp(wx - 6, wx + 8, k), wy + 6], [lerp(wx - 6, wx + 8, k) + (fx - wx) * 0.4, (wy + hemY) / 2], [fx, hemY]], false);
      stroke(ctx, path, shadowOf(colour, 0.25), 2.2, a);
      ctx.save(); ctx.translate(-2.2, 0); stroke(ctx, path, shade(colour, 0.25), 0.8, a * 0.7); ctx.restore();
    }
    // Hem band with embroidery.
    stroke(ctx, curve([[left - 2, hemY - 4], [mid - 6, hemY - 5 + flutter * 0.5], [mid + 6, hemY - 3], [right + 2, hemY - 7 - flutter]], false), trim, 3.2);
    ctx.restore();
    embroidery(ctx, [[left + 2, hemY - 9], [mid, hemY - 9 + flutter * 0.3], [right - 3, hemY - 12 - flutter]], trim, 1.2, 0.7);
    return;
  }
  if (kind === 'coattails' || kind === 'coat') {
    const kneeY = PELVIS_Y + 50;
    if (layer === 'back') {
      const back = curve([waistBack, s.T(-2, -3), [s.pelvis[0] - 6 + sway, kneeY], [s.pelvis[0] - 22 + sway * 1.3, kneeY - 4 + flutter]], true, 0.3);
      cel(ctx, back, shadowOf(colour, 0.1), { y0: waistBack[1], y1: kneeY, cast: 3 });
      return;
    }
    const front = curve([s.T(9, -3), waistFront, [s.pelvis[0] + 20 + sway, kneeY - 6], [s.pelvis[0] + 12 + sway, kneeY - 2]], true, 0.3);
    cel(ctx, front, colour, { y0: waistFront[1], y1: kneeY, cast: 2.6 });
    stroke(ctx, curve([[s.pelvis[0] + 12 + sway, kneeY - 2], [s.pelvis[0] + 20 + sway, kneeY - 6]], false), trim, 1.2);
    return;
  }
  if (kind === 'tunic') {
    const y = PELVIS_Y + 24;
    if (layer === 'back') {
      cel(ctx, curve([waistBack, s.T(-1, -3), [s.pelvis[0] - 2 + sway, y], [s.pelvis[0] - 16 + sway, y - 3]], true, 0.3), shadowOf(colour, 0.1), { cast: 2.4 });
      return;
    }
    const front = curve([s.T(-4, -3), waistFront, [s.pelvis[0] + 17 + sway, y - 4 - flutter], [s.pelvis[0] + 4 + sway, y + 1], [s.pelvis[0] - 6 + sway, y - 2]], true, 0.3);
    cel(ctx, front, colour, { cast: 2.6 });
    embroidery(ctx, [[s.pelvis[0] - 5 + sway, y - 3], [s.pelvis[0] + 4 + sway, y], [s.pelvis[0] + 16 + sway, y - 4]], trim, 1.2, 0.8);
  }
}

function drawBack(ctx, s, style, phys, opts, layer) {
  const back = style.back;
  if (!back) return;
  if (back.type === 'cape' && layer === 'back') {
    const anchor = s.T(-6, -40);
    const rest = [[0, 0], [-4, 16], [-7, 34], [-9, 52], [-10, 70], [-10, 86]].map(([x, y]) => rot(x, y, s.lean * 0.5));
    const pts = chain(phys, 'cape', anchor, rest, { ...opts, wind: 0.25 });
    const outline = curve(ribbon(pts, 20, 36, false), true, 0.3);
    // Lining glimpsed along the trailing edge.
    ctx.save(); ctx.translate(-3, 2); cel(ctx, outline, back.inner, { cast: 0, rim: false, line: 0.8 }); ctx.restore();
    cel(ctx, outline, back.colour, { y0: anchor[1], y1: pts[pts.length - 1][1], cast: 4.4, rimWidth: 1.6 });
    ctx.save();
    ctx.clip(outline);
    for (const [off, a] of [[-6, 0.45], [2, 0.35], [9, 0.45]]) {
      const fold = pts.slice(1).map(([x, y], i) => [x + off * (0.4 + 0.6 * i / pts.length), y]);
      stroke(ctx, curve(fold, false), shadowOf(back.colour, 0.3), 2.6, a);
      stroke(ctx, curve(fold.map(([x, y]) => [x - 2.4, y]), false), shade(back.colour, 0.3), 0.9, a * 0.8);
    }
    const hem = pts[pts.length - 1];
    stroke(ctx, curve([[hem[0] - 20, hem[1] - 1], [hem[0], hem[1] + 1], [hem[0] + 20, hem[1] - 1]], false), GOLD, 2.4, 0.9);
    ctx.restore();
    // Gold clasp at the shoulder.
    gem(ctx, ...s.T(9, -42), 2.4, GOLD, { glowAlpha: 0.2 });
  }
  if (back.type === 'scarf' && layer === 'back') {
    const anchor = s.T(-4, -43);
    for (const [key, spread, w] of [['scarf1', 0, 7], ['scarf2', 6, 6]]) {
      const rest = [[0, 0], [-9, 3 + spread * 0.3], [-18, 7 + spread * 0.6], [-27, 12 + spread], [-35, 18 + spread]];
      const pts = chain(phys, key, anchor, rest, { ...opts, wind: 0.6, gravity: 0.12 });
      cel(ctx, curve(ribbon(pts, w, w * 0.6, false), true, 0.3), key === 'scarf2' ? shade(back.colour, -0.12) : back.colour, { cast: 1.8 });
      stroke(ctx, curve(pts.slice(-2).map(([x, y]) => [x, y]), false), shade(back.colour, 0.3), 0.8, 0.5);
    }
  }
  if (back.type === 'mantle' && layer === 'back') {
    const anchor = s.T(-6, -42);
    const rest = [[0, 0], [-4, 12], [-7, 24], [-8, 36]].map(([x, y]) => rot(x, y, s.lean * 0.5));
    const pts = chain(phys, 'mantle', anchor, rest, { ...opts, wind: 0.3 });
    cel(ctx, curve(ribbon(pts, 22, 28, false), true, 0.3), back.colour, { cast: 3 });
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i];
      frame(ctx, x - 4, y + 4, -0.6 + i * 0.3, 1, () => cel(ctx, curve([[0, 0], [3, -3], [0, -7], [-3, -3]], true), style.leaves, { cast: 0.6, line: 0.5 }));
    }
  }
  if (back.type === 'satchel' && layer === 'back') {
    const [x, y] = s.T(-14, -4);
    cel(ctx, roundRect(x - 8, y - 6, 16, 18, 3), back.colour, { cast: 2.4, gloss: 1 });
    cel(ctx, roundRect(x - 8.5, y - 7, 17, 7, 2.5), shade(back.colour, 0.08), { cast: 1, line: 0.9 });
    // Papers poking out.
    fill(ctx, poly([[x - 5, y - 7], [x - 3, y - 12], [x + 1, y - 11], [x, y - 7]]), '#f3ecd9');
    fill(ctx, poly([[x + 1, y - 7], [x + 4, y - 13], [x + 7, y - 11.5], [x + 5, y - 7]]), '#e8dfc8');
    cel(ctx, circle(x, y - 3, 1.4), GOLD, { cast: 0, line: 0.5 });
  }
}

/* ---------------------------------------------------------------
   Head, face and hair (head frame: origin head centre, face toward +x)
   --------------------------------------------------------------- */

const FACE = [[-12.5, -2], [-11.5, -10], [-6, -15], [3, -15.5], [10, -11.5], [13, -4], [13.3, 2], [11, 7.5], [7, 12.5], [3, 13], [-3, 9.5], [-8.5, 5], [-12, 1.5]];

function drawEye(ctx, x, y, sx, colour, face, blink) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx, 1);
  const lash = '#2a1a24';
  const closed = blink > 0.6 || face === 'closed';
  if (face === 'hurt') {
    stroke(ctx, poly([[-2.6, -2.5], [2, 0], [-2.6, 2.5]], false), lash, 1.2);
    ctx.restore();
    return;
  }
  if (closed || face === 'smile') {
    const arc = face === 'smile' ? curve([[-2.8, 1], [0, -2], [2.8, 1]], false) : curve([[-2.8, -0.5], [0, 1.4], [2.8, -0.2]], false);
    stroke(ctx, arc, lash, 1.2);
    ctx.restore();
    return;
  }
  const narrow = face === 'fierce' ? 1.2 : 0;
  const white = curve([[-2.8, -1.4 + narrow], [0, -3.8 + narrow], [3, -2.2 + narrow * 0.6], [3.1, 1.8], [0.4, 3.8], [-2.6, 2.2]], true, 0.4);
  fill(ctx, white, '#fffaf4');
  ctx.save();
  ctx.clip(white);
  const g = ctx.createLinearGradient(0, -3.5, 0, 3.8);
  g.addColorStop(0, shade(colour, -0.6));
  g.addColorStop(0.45, colour);
  g.addColorStop(1, shade(colour, 0.45));
  ctx.fillStyle = g;
  ctx.fill(ellipse(0.4, 0.4, 2.4, 3.3));
  fill(ctx, ellipse(0.5, 0.6, 1.05, 1.6), shade(colour, -0.7));
  fill(ctx, ellipse(0.4, 2.2, 1.7, 0.9), rgba(shade(colour, 0.6), 0.6));
  fill(ctx, ellipse(-0.5, -0.9, 0.95, 1.2), '#ffffff');
  fill(ctx, circle(1.5, 1.9, 0.45), '#ffffff');
  // Upper-lid shadow on the white.
  fill(ctx, curve([[-3, -1.6 + narrow], [0, -4 + narrow], [3.2, -2.4], [3.2, -0.8], [0, -2.2 + narrow], [-3, 0]], true), rgba('#7a5a8a', 0.35));
  ctx.restore();
  // Lashes.
  const upper = curve([[-3.2, -0.8 + narrow], [-1.4, -3.4 + narrow], [1.4, -4 + narrow], [3.6, -2.6 + narrow * 0.6]], false);
  stroke(ctx, upper, lash, 1.45);
  stroke(ctx, poly([[-3.2, -0.8 + narrow], [-4.3, 0.1 + narrow]], false), lash, 1);
  stroke(ctx, curve([[-1.6, 3.6], [0.6, 4.1], [2.6, 3.2]], false), lash, 0.5, 0.8);
  ctx.restore();
}

function drawMouth(ctx, face) {
  if (face === 'fierce' || face === 'hurt' || face === 'shout') {
    const m = curve([[6.4, 8.4], [9.6, 8], [10.2, 10.4], [8.4, 12], [6.6, 10.6]], true, 0.4);
    cel(ctx, m, '#7a2a36', { cast: 0, rim: false, line: 0.6, ink: '#4a1a24' });
    fill(ctx, ellipse(8.4, 11, 1.4, 0.7), '#e07a8a');
    fill(ctx, poly([[6.8, 8.6], [9.4, 8.3], [9.2, 9.2], [7, 9.3]]), '#ffffff', 0.9);
  } else if (face === 'smile') {
    const m = curve([[6.2, 8.6], [8.4, 11.2], [10.4, 8.4], [8.4, 9.4]], true, 0.4);
    cel(ctx, m, '#8a3040', { cast: 0, rim: false, line: 0.5, ink: '#4a1a24' });
  } else {
    stroke(ctx, curve([[6.6, 9.4], [8.2, 9.9], [9.6, 9.2]], false), '#9a5a5a', 0.75);
  }
}

function drawBrows(ctx, colour, face) {
  const fierce = face === 'fierce' || face === 'shout';
  const worried = face === 'hurt';
  const near = fierce ? [[0, -7.6], [3.5, -6.6], [6.2, -5.2]] : worried ? [[0, -5.6], [3.5, -7], [6, -7.6]] : [[0.4, -6.4], [3.5, -7.4], [6, -6.6]];
  const far = fierce ? [[10.4, -5.2], [12.5, -6.4], [13.8, -6.8]] : worried ? [[10.4, -7.6], [12.4, -7], [13.6, -6]] : [[10.2, -6.8], [12.4, -7.2], [13.8, -6.4]];
  stroke(ctx, curve(near, false), shade(colour, -0.35), 1);
  stroke(ctx, curve(far, false), shade(colour, -0.35), 0.8);
}

function hairStrand(x0, y0, x1, y1, w, bend = 2) {
  const mx = (x0 + x1) / 2 + bend;
  const my = (y0 + y1) / 2;
  return curve([[x0 - w / 2, y0], [mx - w * 0.32, my], [x1, y1], [mx + w * 0.38, my + 0.5], [x0 + w / 2, y0]], true, 0.42);
}

const HAIR_CAP = {
  smooth: [[-14.5, 8], [-17.5, -2], [-16.5, -11.5], [-11, -18.5], [-2, -21.5], [7, -20.5], [13.5, -15.5], [16.2, -8], [15.6, -3],
    [12.5, -5.5], [5, -7], [-2, -6.5], [-8, -4], [-11, 1], [-11.5, 8]],
  spiky: [[-14.5, 8], [-18, 0], [-21, -4], [-17.5, -8], [-21, -14], [-14, -16.5], [-14, -22.5], [-6, -20.5], [-2, -26], [3, -21.5],
    [9.5, -23], [11, -18], [16.5, -16], [16.2, -8], [15.6, -3], [12.5, -5.5], [5, -7], [-2, -6.5], [-8, -4], [-11, 1], [-11.5, 8]],
};

function drawHairCap(ctx, style) {
  const hair = style.hair;
  const spiky = style.hairStyle === 'messy' || style.hairStyle === 'short';
  const cap = curve(spiky ? HAIR_CAP.spiky : HAIR_CAP.smooth, true, 0.38);
  cel(ctx, cap, hair, { y0: -24, y1: 8, cast: 3.4, rimWidth: 1.5, rimAlpha: 0.65, ink: inkFor(hair), line: 0.9 });
  ctx.save();
  ctx.clip(cap);
  // Strand flow lines from the crown.
  for (const [x0, y0, x1, y1] of [[-2, -20, -13, -8], [3, -20, -9, -3], [-6, -19, -15, 2], [6, -19, 13, -12]]) {
    stroke(ctx, curve([[x0, y0], [(x0 + x1) / 2 - 1, (y0 + y1) / 2 - 1], [x1, y1]], false), shade(hair, -0.28), 0.7, 0.55);
  }
  // The anime "angel ring" sheen.
  ctx.globalAlpha = 0.6;
  for (const [x, y, w] of [[-12, -10, 2.4], [-7, -15, 2.8], [-1, -17, 3], [5, -16.5, 2.8], [10.5, -13.5, 2.2]]) {
    fill(ctx, ellipse(x, y, w, 1.1, Math.atan2(y + 8, x) + Math.PI / 2), shade(hair, 0.62));
  }
  ctx.restore();
}

const BANGS = [
  // [rootX, rootY, tipX, tipY, width, bend]
  [-5, -15, -7.5, -3, 7, -1.6],
  [-0.5, -17, -1.5, -2, 7.4, -0.6],
  [4, -17.5, 4.6, -4.5, 6.4, 0.8],
  [8, -16, 7.8, -1.5, 6, 1.2],
  [12, -13.5, 13.4, -4.5, 5.4, 1.4],
  [14.6, -10, 16, -1, 3.6, 1],
];

function drawBangs(ctx, style, t) {
  const hair = style.hair;
  const sway = Math.sin(t * 0.0025) * 0.5;
  const ink = inkFor(hair);
  const strands = style.hairStyle === 'messy' || style.hairStyle === 'short'
    ? BANGS.map(([a, b, c, d, w, k], i) => [a, b, c + (i % 2 ? 1.5 : -1), d - (i % 2 ? 1.5 : 0), w, k * 1.6])
    : BANGS;
  strands.forEach(([x0, y0, x1, y1, w, bend], i) => {
    const sx = sway * (0.4 + i * 0.15);
    const lock = hairStrand(x0, y0, x1 + sx, y1, w, bend);
    cel(ctx, lock, i % 2 ? shade(hair, -0.04) : hair, { y0, y1, cast: 1.6, rimWidth: 0.9, rimAlpha: 0.55, line: 0.7, ink });
    stroke(ctx, curve([[x0 + 0.5, y0 + 2], [(x0 + x1) / 2 + bend * 0.6, (y0 + y1) / 2], [x1 + sx * 0.8, y1 - 2]], false), shade(hair, 0.4), 0.6, 0.5);
  });
  if (style.hairStyle === 'long') {
    // A long fringe lock beside the near eye.
    cel(ctx, hairStrand(-7, -10, -9.5 + sway, 9, 5, -1.2), hair, { cast: 1.2, line: 0.7, ink });
  }
}

function drawSideLock(ctx, style, phys, opts, s, side) {
  const hair = side === 'far' ? shadowOf(style.hair, 0.1) : style.hair;
  const long = style.hairStyle === 'long';
  const local = side === 'near' ? [-7, -5] : [11, -6];
  const [lx, ly] = rot(local[0], local[1], s.headAngle);
  const anchor = [s.head[0] + lx, s.head[1] + ly];
  const n = long ? 6 : 3;
  const step = long ? 7 : 6;
  const rest = Array.from({ length: n }, (_, i) => [i * (side === 'near' ? 0.4 : -0.3), i * step]);
  const pts = chain(phys, `lock-${side}`, anchor, rest, { ...opts, stiffness: 0.22, gravity: 0.2 });
  cel(ctx, curve(ribbon(pts, long ? 6.5 : 5, 1), true, 0.35), hair, { cast: 1.4, rimWidth: 0.8, line: 0.8 });
}

function drawBackHair(ctx, style, phys, opts, s) {
  const hair = shadowOf(style.hair, 0.08);
  const ink = inkFor(style.hair);
  const local = style.hairStyle === 'ponytail' ? [-13, -11] : [-9, -4];
  const [lx, ly] = rot(local[0], local[1], s.headAngle);
  const anchor = [s.head[0] + lx, s.head[1] + ly];
  if (style.hairStyle === 'long') {
    const rest = [[0, 0], [-4, 14], [-6.5, 28], [-8, 42], [-8.5, 56], [-8, 70], [-7, 82]];
    const pts = chain(phys, 'hair', anchor, rest, { ...opts, wind: 0.35 });
    // Layered locks fanned along the chain, outer ones darker and shorter.
    const locks = [[-9, 0.8, -0.1], [9, 0.85, -0.06], [-3, 1, 0], [4, 0.95, 0.02]];
    for (const [spread, length, tint] of locks) {
      const n = Math.max(3, Math.round(pts.length * length));
      const lockPts = pts.slice(0, n).map(([x, y], i) => {
        const a = angleOf(pts[Math.max(0, i - 1)], pts[Math.min(pts.length - 1, i + 1)]) + Math.PI / 2;
        const f = spread * (0.55 + 0.45 * i / n);
        return [x + Math.cos(a) * f, y + Math.sin(a) * f];
      });
      const path = curve(ribbon(lockPts, 13, 1.5), true, 0.4);
      cel(ctx, path, shade(hair, tint), { y0: anchor[1], y1: lockPts[lockPts.length - 1][1], cast: 2.6, ink, line: 0.8 });
      ctx.save(); ctx.clip(path);
      stroke(ctx, curve(lockPts.map(([x, y], i) => [x + 1.5 - i * 0.2, y]), false), shade(style.hair, -0.15), 0.6, 0.6);
      stroke(ctx, curve(lockPts.slice(0, 3).map(([x, y]) => [x + 3, y + 2]), false), shade(style.hair, 0.45), 1.6, 0.45);
      ctx.restore();
    }
  } else if (style.hairStyle === 'ponytail') {
    const rest = [[0, 0], [-9, 3], [-15, 12], [-18, 24], [-18, 36], [-16, 46]];
    const pts = chain(phys, 'tail', anchor, rest, { ...opts, wind: 0.45, stiffness: 0.12 });
    for (const [spread, w, tint] of [[-2.5, 11, -0.08], [2.5, 10, 0]]) {
      const lockPts = pts.map(([x, y], i) => [x + spread * (i / pts.length), y]);
      cel(ctx, curve(ribbon(lockPts, w, 1.4), true, 0.4), shade(hair, tint), { cast: 2.2, ink, line: 0.8 });
    }
    stroke(ctx, curve(pts.slice(1, 4).map(([x, y]) => [x + 1.5, y]), false), shade(style.hair, 0.5), 1.2, 0.4);
    cel(ctx, ellipse(anchor[0] - 1, anchor[1] + 1, 3.2, 2.4, 0.4), style.accent, { cast: 0.8, line: 0.7 });
  } else {
    // Short hair: tufts at the nape.
    for (const [dx, dy, len, a] of [[-3, -6, 11, 2.2], [0, 0, 12, 1.9], [2, 5, 9, 1.6]]) {
      const tip = [anchor[0] + dx + Math.cos(a) * len, anchor[1] + dy + Math.sin(a) * len];
      cel(ctx, hairStrand(anchor[0] + dx + 3, anchor[1] + dy - 3, tip[0], tip[1], 9, -1.5), hair, { cast: 1.6, ink, line: 0.8 });
    }
  }
}

function drawBraid(ctx, style, phys, opts, s) {
  const [lx, ly] = rot(-8, 6, s.headAngle);
  const anchor = [s.head[0] + lx, s.head[1] + ly];
  const rest = [[0, 0], [1.5, 10], [3, 21], [4, 32], [4.5, 42], [4.5, 50]];
  const pts = chain(phys, 'braid', anchor, rest, { ...opts, stiffness: 0.2, gravity: 0.25 });
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const w = lerp(7, 4.4, i / pts.length);
    cel(ctx, ellipse((ax + bx) / 2 - 1, (ay + by) / 2, w * 0.55, 5.6, angleOf(pts[i], pts[i + 1]) - Math.PI / 2 + 0.3), style.hair, { cast: 1.4, line: 0.7 });
    cel(ctx, ellipse((ax + bx) / 2 + 1, (ay + by) / 2 + 2.5, w * 0.55, 5.2, angleOf(pts[i], pts[i + 1]) - Math.PI / 2 - 0.3), shade(style.hair, -0.06), { cast: 1.2, line: 0.7 });
  }
  const tip = pts[pts.length - 1];
  cel(ctx, circle(tip[0], tip[1] - 2, 2.2), style.accent, { cast: 0.6, line: 0.6 });
  cel(ctx, curve([[tip[0] - 3, tip[1]], [tip[0] + 3, tip[1]], [tip[0] + 2, tip[1] + 8], [tip[0] - 2, tip[1] + 8]], true), style.hair, { cast: 1, line: 0.7 });
}

function drawRoleHat(ctx, style, t) {
  if (style.hat === 'witch') {
    const sway = Math.sin(t * 0.0021) * 2;
    const brim = ellipse(-1, -13, 26, 6, -0.08);
    cel(ctx, brim, shade(style.cloth, -0.06), { y0: -19, y1: -7, cast: 2.4 });
    const cone = curve([[-13, -15], [-10, -26], [-9, -38], [-16 + sway, -50], [-27 + sway * 1.4, -54], [-14 + sway, -44], [-2, -32], [5, -20], [11, -15]], true, 0.35);
    cel(ctx, cone, style.cloth, { y0: -54, y1: -14, cast: 3.2, rimWidth: 1.4 });
    // Ribbon band with a bow and a jewelled pin.
    const band = curve([[-12, -15.5], [0, -19], [11, -16], [10.5, -13.5], [0, -16], [-12, -13]], true, 0.3);
    cel(ctx, band, style.accent, { cast: 1, line: 0.8 });
    cel(ctx, curve([[-12, -15], [-19, -19], [-20, -12], [-13, -13]], true), style.accent, { cast: 1, line: 0.7 });
    cel(ctx, curve([[-12, -14], [-17, -8], [-14, -6]], true), shade(style.accent, -0.1), { cast: 0.8, line: 0.7 });
    gem(ctx, 2, -17.6, 2.2, style.trim, { glowAlpha: 0.3 });
    for (const [x, y, r] of [[-8, -32, 1.8], [-3, -24, 1.3], [-14, -43, 1.2]]) sparkle(ctx, x, y, r, style.trim, 0.95);
    return true;
  }
  if (style.hat === 'hood') {
    const hood = curve([[-19, 18], [-21.5, -2], [-15, -20], [0, -26], [14, -22], [20, -9], [19.5, 7], [14.5, 3], [12.5, -10],
      [3, -14], [-5, -10], [-8, 5], [-6, 22], [-16, 25]], true, 0.4);
    cel(ctx, hood, style.hood, { y0: -26, y1: 25, cast: 3.6, rimWidth: 1.5 });
    stroke(ctx, curve([[12.5, -10], [3, -14], [-5, -10], [-8, 5]], false), shade(style.hood, -0.4), 1.4);
    stroke(ctx, curve([[-14, -15], [-17, 2], [-14, 17]], false), shade(style.hood, -0.3), 0.9, 0.8);
    if (style.leaves) {
      // Twig antlers, leaves and blossoms.
      stroke(ctx, curve([[-4, -24], [-9, -32], [-14, -36]], false), '#6b4a30', 1.6);
      stroke(ctx, curve([[-9, -32], [-6, -38]], false), '#6b4a30', 1.2);
      stroke(ctx, curve([[4, -24], [6, -33], [11, -37]], false), '#6b4a30', 1.6);
      for (const [x, y, a] of [[-14, -36, -0.6], [-6, -38, 0.2], [11, -37, 0.6], [-16, -18, -1.4], [12, -20, 1]]) {
        frame(ctx, x, y, a, 1, () => cel(ctx, curve([[0, 0], [3.2, -3.6], [0, -8], [-3.2, -3.6]], true), style.leaves, { cast: 1, line: 0.6 }));
      }
      for (const [x, y] of [[-10, -22], [7, -24], [15, -12]]) {
        for (let i = 0; i < 5; i++) {
          const a = i * (Math.PI * 2 / 5);
          fill(ctx, circle(x + Math.cos(a) * 1.6, y + Math.sin(a) * 1.6, 1.3), style.flowers);
        }
        fill(ctx, circle(x, y, 0.9), '#ffe680');
      }
    }
    return true;
  }
  return false;
}

function drawHead(ctx, s, style, gear, phys, opts) {
  const t = opts.now || 0;
  const face = opts.face || 'neutral';
  const blink = opts.blink || 0;
  const helmet = gear.head;

  // The far side lock sits behind the face.
  if (!helmet || helmet.shape === 'crown') drawSideLock(ctx, style, phys, opts, s, 'far');

  frame(ctx, s.head[0], s.head[1], s.headAngle, 1, () => {
    const skin = style.skin;
    cel(ctx, curve(FACE, true, 0.4), skin, { y0: -16, y1: 13, cast: 2.6, shadow: '#f0b4a6', rim: '#ffffff', rimAlpha: 0.5, ink: '#a8695e' });
    cel(ctx, ellipse(-6.5, 2, 2.6, 4), skin, { cast: 1, shadow: '#f0b4a6', ink: '#a8695e', line: 0.8 });
    const covered = helmet ? { hair: 'all', face: false } : null;
    let hide = { hair: 'all', face: false };
    if (helmet) {
      // Peek at what the helmet hides without drawing it yet.
      hide = HELMET_HIDES[helmet.shape] || hide;
    }
    if (!hide.face) {
      // Blush, then eyes, brows, nose and mouth.
      fill(ctx, ellipse(3.5, 6.2, 3.2, 1.5), rgba('#ff7a8a', 0.22));
      hatch(ctx, 3.5, 6.2, 3, 1.4, 2.2, '#ff7a8a', 0.45, 0.5);
      drawEye(ctx, 3, 0.4, 1, style.eye, face, blink);
      drawEye(ctx, 11.2, 0.1, 0.62, style.eye, face, blink);
      drawBrows(ctx, style.hair, face);
      stroke(ctx, curve([[12.6, 3.2], [13.7, 5], [12.4, 5.8]], false), '#d0897a', 0.6);
      drawMouth(ctx, face);
      if (style.glasses) {
        stroke(ctx, ellipse(3.2, 0.6, 4.4, 4.2), '#4a3a2c', 0.9);
        stroke(ctx, ellipse(11.4, 0.4, 2.8, 4), '#4a3a2c', 0.8);
        stroke(ctx, poly([[7.6, -0.2], [8.8, -0.4]], false), '#4a3a2c', 0.8);
        fill(ctx, ellipse(3.2, 0.6, 4.4, 4.2), 'rgba(200,230,255,.12)');
        stroke(ctx, poly([[1, -2], [3, -3.4]], false), '#ffffff', 0.6, 0.7);
      }
      if (style.mask) {
        const mask = curve([[-6, 3], [4, 2.5], [13.6, 2.2], [13, 7], [8, 12.6], [2, 13.4], [-5, 9]], true, 0.35);
        cel(ctx, mask, style.mask, { cast: 1.6, line: 0.9 });
        stroke(ctx, curve([[0, 6], [6, 6.5], [12, 5]], false), shade(style.mask, 0.2), 0.6, 0.7);
      }
    }
    if (hide.hair !== 'none') {
      if (hide.hair === 'all') drawHairCap(ctx, style);
      if (!(style.hat === 'hood' && !helmet)) drawBangs(ctx, style, t);
    }
    if (helmet) {
      const result = drawHelmet(ctx, helmet, t);
      if (result.porthole) {
        const [px, py, pr] = result.porthole;
        ctx.save();
        ctx.clip(circle(px, py, pr));
        fill(ctx, circle(px, py, pr), shade(skin, -0.05));
        drawEye(ctx, px - 3, py, 0.9, style.eye, face, blink);
        drawEye(ctx, px + 4, py, 0.55, style.eye, face, blink);
        fill(ctx, circle(px, py, pr), rgba(result.glass, 0.28));
        ctx.restore();
        sparkle(ctx, px - 4, py - 4, 2.6, '#ffffff', 0.9);
      }
    } else {
      drawRoleHat(ctx, style, t);
      if (style.circlet) {
        const band = curve([[-12, -8], [0, -12.5], [13, -9.5], [12.8, -7.5], [0, -10.5], [-12, -6]], true, 0.3);
        cel(ctx, band, GOLD, { cast: 0.8, line: 0.7, gloss: 1 });
        gem(ctx, 6, -11, 1.8, style.accent, { glowAlpha: 0.4 });
      }
    }
    void covered;
  });

  if (!helmet || helmet.shape === 'crown' || HELMET_HIDES[helmet.shape]?.hair === 'bangs') {
    if (style.hat !== 'hood' || helmet) drawSideLock(ctx, style, phys, opts, s, 'near');
  }
}

const HELMET_HIDES = {
  cap: { hair: 'bangs', face: false },
  hood: { hair: 'bangs', face: false },
  helm: { hair: 'bangs', face: false },
  greathelm: { hair: 'none', face: true },
  crown: { hair: 'all', face: false },
  diving: { hair: 'none', face: true },
};

/* ---------------------------------------------------------------
   Extras: halo, grimoire, charms
   --------------------------------------------------------------- */

function drawHalo(ctx, s, t) {
  const bob = Math.sin(t * 0.002) * 1.5;
  const [x, y] = [s.head[0] - 6, s.head[1] - 21 + bob];
  glow(ctx, x, y, 26, '#ffe28a', 0.45);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.25);
  stroke(ctx, ellipse(0, 0, 14, 4.2), '#a8771a', 3.4);
  stroke(ctx, ellipse(0, 0, 14, 4.2), '#ffe28a', 1.8);
  ctx.restore();
  sparkle(ctx, x + 10, y - 3, 2.2, '#ffffff', 0.8 + 0.2 * Math.sin(t * 0.005));
}

function drawGrimoire(ctx, s, t, style) {
  const bob = Math.sin(t * 0.0024) * 3;
  const x = s.pelvis[0] - 32;
  const y = s.pelvis[1] - 62 + bob;
  glow(ctx, x, y, 22, style.element, 0.4);
  frame(ctx, x, y, -0.25 + Math.sin(t * 0.0017) * 0.06, 1, () => {
    cel(ctx, poly([[-11, -2], [0, 1], [0, -10], [-11, -13]]), '#f3ecd9', { cast: 1.2, line: 0.8 });
    cel(ctx, poly([[11, -2], [0, 1], [0, -10], [11, -13]]), '#ece2c8', { cast: 1.2, line: 0.8 });
    cel(ctx, poly([[-12, -1], [0, 2.5], [12, -1], [12, 1], [0, 4.2], [-12, 1]]), style.cloth, { cast: 0.8, line: 0.8 });
    for (let i = 0; i < 3; i++) {
      stroke(ctx, poly([[-9, -10 + i * 3], [-2, -8 + i * 3]], false), shade(style.element, -0.2), 0.6);
      stroke(ctx, poly([[2, -8 + i * 3], [9, -10 + i * 3]], false), shade(style.element, -0.2), 0.6);
    }
  });
  for (let i = 0; i < 3; i++) {
    const a = t * 0.0015 + i * 2.1;
    sparkle(ctx, x + Math.cos(a) * 15, y - 5 + Math.sin(a) * 6, 1.6, style.element, 0.9);
  }
}

function drawCharms(ctx, s, charms, t) {
  if (!charms?.length) return;
  const [first, second] = charms;
  if (first) {
    const top = s.T(4, -43);
    const pend = s.T(5, -33);
    stroke(ctx, curve([s.T(-2, -43), [pend[0] - 1, pend[1] - 2], s.T(10, -44)], false), GOLD, 0.6);
    glow(ctx, pend[0], pend[1], 9, first.colour, 0.5);
    gem(ctx, pend[0], pend[1] + 1, 2.4, first.colour, { glowAlpha: 0 });
    void top;
  }
  if (second) {
    const [x, y] = s.T(-8, 2);
    stroke(ctx, poly([[x, y], [x - 1, y + 6]], false), GOLD, 0.6);
    gem(ctx, x - 1, y + 8, 2, second.colour, { shape: 'round', glowAlpha: 0.4 });
  }
  void t;
}

/* ---------------------------------------------------------------
   The whole character
   --------------------------------------------------------------- */

/**
 * Draw the hero.
 *   gear  — looks: { head, chest, feet, main, mainTwoHanded, off, offKind, rings, charms }
 *   pose  — see IDLE_POSE
 *   opts  — { now, phys (spring state or null), offset (world motion in units),
 *             face, blink, trail }
 */
export function drawAnimeHero(ctx, roleId, gear = {}, pose = IDLE_POSE, opts = {}) {
  const style = ROLE_STYLE[roleId] || ROLE_STYLE.knight;
  const p = { ...IDLE_POSE, ...pose };
  const now = opts.now || 0;
  const phys = opts.phys || null;
  const chainOpts = { now, offset: opts.offset || [0, 0] };
  const s = solve(p);
  const face = opts.face || p.face;
  const armour = gear.chest || null;
  const heavy = armour && ['plate', 'scale', 'mail'].includes(armour.shape);
  const twoHanded = !!gear.mainTwoHanded;
  const rings = gear.rings || [];

  // Two-handed weapons: the far hand grips the haft behind the near hand.
  if (twoHanded && gear.main) {
    const a = p.w * DEG;
    const grip = [s.handN[0] - Math.cos(a) * 10, s.handN[1] - Math.sin(a) * 10];
    const [elbowF, handF] = ik(s.shoulderF, grip, UPPER_ARM, FOREARM, -1);
    s.elbowF = elbowF;
    s.handF = handF;
  }

  // 1. Behind everything.
  if (style.halo && !gear.head) drawHalo(ctx, s, now);
  if (style.grimoire) drawGrimoire(ctx, s, now, style);
  drawBackHair(ctx, style, phys, chainOpts, s);
  drawBack(ctx, s, style, phys, chainOpts, 'back');

  // 2. Far arm with the off-hand item.
  const far = drawArm(ctx, s, 'far', style, armour, rings[1]);
  if (gear.off && !twoHanded) {
    if (gear.offKind === 'shield') {
      drawFist(ctx, s.handF, s.elbowF, far.glove, rings[1]);
      frame(ctx, s.handF[0] + 5, s.handF[1] - 2, (p.wo + 28) * DEG * 0.3, 1, () => drawShield(ctx, gear.off));
    } else {
      frame(ctx, s.handF[0], s.handF[1], p.wo * DEG, 1, () => drawWeapon(ctx, gear.off));
      drawFist(ctx, s.handF, s.elbowF, far.glove, rings[1]);
    }
  } else if (!twoHanded) {
    drawFist(ctx, s.handF, s.elbowF, far.glove, rings[1]);
  }

  // 3. Legs and skirts.
  drawSkirt(ctx, s, style, armour, 'back', phys, chainOpts);
  drawLeg(ctx, s, 'far', style, gear.feet);
  drawLeg(ctx, s, 'near', style, gear.feet);

  // 4. Body: hips bridge the legs, then the torso and outfit.
  frame(ctx, s.pelvis[0], s.pelvis[1], s.lean, 1, () => {
    cel(ctx, curve([[-13, -6], [13.5, -7], [15, 5], [9, 12], [-3, 13], [-13, 8]], true, 0.4), style.legs, { y0: -7, y1: 13, cast: 2.6 });
  });
  drawTorso(ctx, s, style, armour, now);
  drawSkirt(ctx, s, style, armour, 'front', phys, chainOpts);
  if (style.scarf && style.torso === 'coat') {
    const [x, y] = s.T(4, -43);
    cel(ctx, curve([[x - 7, y - 2], [x + 8, y - 3], [x + 9, y + 3], [x - 6, y + 4]], true, 0.3), style.scarf, { cast: 1.4, line: 0.8 });
    cel(ctx, curve([[x + 2, y + 2], [x + 7, y + 2], [x + 9, y + 18], [x + 4, y + 19]], true, 0.3), shade(style.scarf, -0.05), { cast: 1.2, line: 0.8 });
  }
  if (style.back?.type === 'satchel') stroke(ctx, poly([s.T(12, -42), s.T(-12, -2)], false), shade(style.back.colour, -0.1), 3.2);
  if (style.back?.type === 'scarf') {
    const [x, y] = s.T(3, -44);
    cel(ctx, curve([[x - 8, y - 1], [x + 9, y - 3], [x + 10, y + 4], [x - 7, y + 5]], true, 0.3), style.back.colour, { cast: 1.6, line: 0.8 });
    cel(ctx, circle(x + 6, y + 4, 2.4), shade(style.back.colour, -0.1), { cast: 0.8, line: 0.7 });
  }
  drawCharms(ctx, s, gear.charms, now);
  if (style.hairStyle === 'braid') drawBraid(ctx, style, phys, chainOpts, s);

  // 5. Neck and head.
  cel(ctx, capsule(s.neckBase[0], s.neckBase[1] + 2, s.head[0] - 1.5, s.head[1] + 7, 5.6, 5), style.skin, { cast: 2, shadow: '#f0b4a6', ink: '#a8695e' });
  drawHead(ctx, s, style, gear, phys, { ...chainOpts, face, blink: opts.blink || 0 });

  // 6. Main weapon, near arm and hand on top.
  const near = drawArm(ctx, s, 'near', style, armour, rings[0]);
  if (heavy || style.sleeve === 'armoured') drawPauldron(ctx, s, heavy ? armour.colour : STEEL, heavy ? (armour.trim || GOLD) : style.trim);
  if (gear.main) {
    frame(ctx, s.handN[0], s.handN[1], p.w * DEG, 1, () => drawWeapon(ctx, gear.main));
  }
  drawFist(ctx, s.handN, s.elbowN, near.glove, rings[0]);
  if (twoHanded && gear.main) drawFist(ctx, s.handF, s.elbowF, far.glove, rings[1]);

  // Weapon tips, for slash trails.
  const tipOf = (hand, look, angle) => {
    const reach = look ? (WEAPON_REACH[look.shape] || 60) : 12;
    return [hand[0] + Math.cos(angle * DEG) * reach, hand[1] + Math.sin(angle * DEG) * reach];
  };
  s.tip = tipOf(s.handN, gear.main, p.w);
  s.tipOff = gear.offKind === 'weapon' && !twoHanded ? tipOf(s.handF, gear.off, p.wo) : null;
  return s;
}

/** Bounds of the rig in local units, for fitting into a box. */
export const ANIME_HERO_BOUNDS = { x: -72, y: -222, w: 182, h: 230 };
