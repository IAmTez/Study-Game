/* Animation timelines for the hero.

   Every animation is a list of keyframed poses (see rig.js `sample`) plus a
   world movement curve — how far the hero has dashed toward the enemy — and
   the moments that matter to the battle: when a blow lands (`hits`), when a
   projectile leaves the hand (`release`). The battle scene plays one
   animation at a time per fighter and falls back to the idle loop.

   Poses only list what changes; anything left out comes from the idle stance
   for the hero's weapon, so a dagger, a greataxe and a shield all idle and
   recover differently with the same timelines. */

import { sample, lerp, clamp, ease } from './rig.js';
import { weaponStyle } from './gear.js';

/** How the hero holds their gear, which shapes every pose. */
export function stanceOf(gear = {}) {
  const shape = gear.main?.shape || null;
  return {
    style: shape ? weaponStyle(shape) : 'slash',
    twoHanded: !!gear.mainTwoHanded,
    shield: gear.offKind === 'shield' && !!gear.off,
    dual: gear.offKind === 'weapon' && !!gear.off,
    unarmed: !shape,
  };
}

/** The resting stance for a weapon. */
export function basePose(stance) {
  const pose = {
    x: 0, y: 0, lean: 0.03, neck: 0.03, head: 0,
    hand: [25, 9], off: [18, -2],
    footN: [-11, 0], footF: [13, 0], liftN: 0, liftF: 0,
    w: -48, wo: -28, face: 'neutral',
  };
  if (stance.twoHanded) { pose.hand = [24, 6]; pose.w = stance.style === 'thrust' ? -30 : -56; }
  else if (stance.style === 'thrust') { pose.hand = [27, 3]; pose.w = -18; }
  if (stance.shield) { pose.off = [26, -12]; pose.wo = -28; }
  if (stance.dual) { pose.off = [20, -6]; pose.wo = -62; }
  return pose;
}

/** The idle loop: breathing, a weight shift, the weapon drifting. */
export function idlePose(stance, now, seed = 0) {
  const p = basePose(stance);
  const t = now + seed;
  const breath = Math.sin(t * 0.0023);
  const sway = Math.sin(t * 0.0009);
  p.y += breath * 1.3 + 0.6;
  p.lean += sway * 0.012;
  p.neck += breath * 0.012;
  p.head = Math.sin(t * 0.0007) * 0.035;
  p.hand = [p.hand[0] + sway * 1.2, p.hand[1] + breath * 1.2];
  p.off = [p.off[0] - sway * 0.8, p.off[1] + breath * 1];
  p.w += Math.sin(t * 0.0016) * 3;
  p.wo += Math.sin(t * 0.0013 + 1) * 3;
  p.x = sway * 1.2;
  return p;
}

/** A blink every few seconds, sometimes a double blink. 0 = open, 1 = shut. */
export function blinkAt(now, seed = 0) {
  const period = 3700;
  const phase = (now + seed * 977) % period;
  const shut = (from) => (phase > from && phase < from + 120 ? 1 - Math.abs(phase - from - 60) / 60 : 0);
  const cycle = Math.floor((now + seed * 977) / period);
  return Math.max(shut(0), cycle % 3 === 1 ? shut(220) : 0);
}

/* ---------------------------------------------------------------
   Timelines
   --------------------------------------------------------------- */

/* A leaping dash pose, shared by every move that closes the distance. */
const DASH = { y: -8, lean: 0.3, footN: [-34, 0], liftN: 7, footF: [26, 0], liftF: 13, face: 'fierce' };
const LAND = { y: 6, lean: 0.2, footN: [-26, 0], footF: [28, 0], liftN: 0, liftF: 0, face: 'fierce' };

function melee(style, stance) {
  if (style === 'thrust') {
    return {
      duration: 860, hits: [350], dash: [150, 300], back: [560, 800],
      keys: [
        { t: 0, pose: {} },
        { t: 150, pose: { y: 4, lean: -0.1, hand: [2, -6], w: -6, footN: [-18, 0], footF: [10, 0], face: 'focus' }, ease: 'outQuad' },
        { t: 300, pose: { ...DASH, hand: [4, -8], w: -5 }, ease: 'inOutSine' },
        { t: 360, pose: { ...LAND, y: 10, lean: 0.4, hand: [54, -12], w: -3, footN: [-36, 0], footF: [36, 0] }, ease: 'outExpo' },
        { t: 540, pose: { ...LAND, y: 9, lean: 0.36, hand: [50, -10], w: -2, footN: [-36, 0], footF: [36, 0] } },
        { t: 700, pose: { y: -6, lean: 0.05, footN: [-14, 0], footF: [8, 0], liftN: 6, liftF: 4, face: 'neutral' }, ease: 'inOutCubic' },
        { t: 860, pose: {}, ease: 'outQuad' },
      ],
    };
  }
  if (style === 'smash') {
    return {
      duration: 960, hits: [420], dash: [180, 370], back: [640, 900], shake: 1.4,
      keys: [
        { t: 0, pose: {} },
        { t: 180, pose: { y: 7, lean: -0.14, hand: [4, -52], w: -112, footN: [-18, 0], footF: [12, 0], face: 'fierce' }, ease: 'outQuad' },
        { t: 370, pose: { y: -36, lean: 0.08, hand: [-2, -60], w: -138, footN: [-18, 0], liftN: 22, footF: [16, 0], liftF: 26, face: 'shout' }, ease: 'outQuad' },
        { t: 425, pose: { ...LAND, y: 14, lean: 0.42, hand: [38, 16], w: 72, face: 'shout' }, ease: 'inCubic' },
        { t: 620, pose: { ...LAND, y: 12, lean: 0.36, hand: [36, 18], w: 76 } },
        { t: 780, pose: { y: -8, lean: 0.02, footN: [-14, 0], footF: [8, 0], liftN: 6, liftF: 4, face: 'neutral' }, ease: 'inOutCubic' },
        { t: 960, pose: {}, ease: 'outQuad' },
      ],
    };
  }
  // Slash — and a second, off-hand cut when dual-wielding.
  const dual = stance.dual;
  const keys = [
    { t: 0, pose: {} },
    { t: 150, pose: { y: 4, lean: -0.06, hand: [-4, -36], w: -152, footN: [-16, 0], footF: [14, 0], face: 'fierce' }, ease: 'outQuad' },
    { t: 320, pose: { ...DASH, hand: [-10, -28], w: -162, off: [4, 8] }, ease: 'inOutSine' },
    { t: 335, pose: { ...LAND, hand: [-6, -38], w: -148 } },
    { t: 405, pose: { ...LAND, y: 9, lean: 0.34, hand: [40, 6], w: 32, off: [0, 6] }, ease: 'outExpo' },
  ];
  if (dual) {
    keys.push(
      { t: 470, pose: { ...LAND, y: 8, lean: 0.2, hand: [30, 12], w: 52, off: [-2, -34], wo: -150 }, ease: 'outQuad' },
      { t: 540, pose: { ...LAND, y: 10, lean: 0.36, hand: [26, 14], w: 60, off: [42, 4], wo: 30 }, ease: 'outExpo' },
      { t: 640, pose: { ...LAND, y: 9, lean: 0.3, hand: [28, 14], w: 58, off: [38, 10], wo: 50 } },
    );
  } else {
    keys.push({ t: 560, pose: { ...LAND, y: 8, lean: 0.28, hand: [34, 13], w: 56 } });
  }
  const end = dual ? 640 : 560;
  keys.push(
    { t: end + 140, pose: { y: -6, lean: 0.04, footN: [-14, 0], footF: [8, 0], liftN: 6, liftF: 4, face: 'neutral' }, ease: 'inOutCubic' },
    { t: end + 300, pose: {}, ease: 'outQuad' },
  );
  return { duration: end + 300, hits: dual ? [375, 515] : [375], dash: [150, 330], back: [end, end + 240], keys };
}

function dashStrike(stance, kind) {
  // Shield bash shoves the off hand; everything else thrusts the weapon.
  const bash = kind === 'bash' && stance.shield;
  const strike = bash
    ? { hand: [10, 10], w: 10, off: [44, -16], wo: -28 }
    : { hand: [50, -6], w: -4, off: [-6, 6] };
  return {
    duration: 760, hits: [270], dash: [90, 250], back: [450, 700], afterimages: true,
    keys: [
      { t: 0, pose: {} },
      { t: 90, pose: { y: 12, lean: 0.25, hand: [-2, -4], w: -10, footN: [-22, 0], footF: [14, 0], face: 'fierce' }, ease: 'outQuad' },
      { t: 250, pose: { ...DASH, y: 4, lean: 0.5, hand: [-4, 2], w: -8, footN: [-42, 0], footF: [30, 0], liftN: 4, liftF: 6 }, ease: 'inQuad' },
      { t: 290, pose: { ...LAND, y: 12, lean: 0.42, ...strike, footN: [-38, 0], footF: [34, 0] }, ease: 'outExpo' },
      { t: 450, pose: { ...LAND, y: 11, lean: 0.36, ...strike, footN: [-38, 0], footF: [34, 0] } },
      { t: 600, pose: { y: -6, lean: 0, footN: [-14, 0], footF: [8, 0], liftN: 6, liftF: 4, face: 'neutral' }, ease: 'inOutCubic' },
      { t: 760, pose: {}, ease: 'outQuad' },
    ],
  };
}

const CAST = {
  duration: 820, release: 270, hits: [520],
  keys: [
    { t: 0, pose: {} },
    { t: 200, pose: { lean: -0.06, y: 3, off: [30, -30], wo: -70, hand: [2, -34], w: -96, face: 'focus', footN: [-16, 0], footF: [16, 0] }, ease: 'outQuad' },
    { t: 280, pose: { lean: 0.16, y: 5, off: [46, -22], wo: -20, hand: [8, -30], w: -86, face: 'shout', footN: [-18, 0], footF: [22, 0] }, ease: 'outExpo' },
    { t: 560, pose: { lean: 0.12, y: 4, off: [42, -20], wo: -20, hand: [8, -26], w: -80, face: 'fierce', footN: [-18, 0], footF: [22, 0] } },
    { t: 820, pose: {}, ease: 'inOutSine' },
  ],
};

const CHANNEL = {
  duration: 1150, release: 560, hits: [640], charge: [0, 560],
  keys: [
    { t: 0, pose: {} },
    { t: 360, pose: { y: -10, lean: -0.05, neck: -0.08, hand: [12, -84], w: -90, off: [30, -48], wo: -60, footN: [-12, 0], footF: [12, 0], liftN: 6, liftF: 8, face: 'closed' }, ease: 'outCubic' },
    { t: 540, pose: { y: -14, lean: -0.08, neck: -0.1, hand: [12, -88], w: -92, off: [32, -52], wo: -62, footN: [-12, 0], footF: [12, 0], liftN: 9, liftF: 11, face: 'closed' } },
    { t: 600, pose: { y: 6, lean: 0.24, hand: [36, -30], w: -40, off: [44, -26], wo: -24, footN: [-22, 0], footF: [24, 0], liftN: 0, liftF: 0, face: 'shout' }, ease: 'outExpo' },
    { t: 900, pose: { y: 5, lean: 0.2, hand: [34, -26], w: -36, off: [40, -22], wo: -24, footN: [-22, 0], footF: [24, 0], face: 'fierce' } },
    { t: 1150, pose: {}, ease: 'inOutSine' },
  ],
};

const THROW = {
  duration: 760, release: 250, hits: [560],
  keys: [
    { t: 0, pose: {} },
    { t: 170, pose: { lean: -0.12, y: 3, off: [-20, -34], wo: -120, face: 'focus', footN: [-18, 0], footF: [14, 0] }, ease: 'outQuad' },
    { t: 260, pose: { lean: 0.2, y: 5, off: [44, -20], wo: -10, face: 'fierce', footN: [-18, 0], footF: [22, 0] }, ease: 'outExpo' },
    { t: 520, pose: { lean: 0.14, y: 4, off: [40, -14], wo: -10, footN: [-18, 0], footF: [22, 0] } },
    { t: 760, pose: {}, ease: 'inOutSine' },
  ],
};

const REST = {
  duration: 1250,
  keys: [
    { t: 0, pose: {} },
    { t: 280, pose: { y: 26, lean: 0.12, neck: 0.12, footN: [-26, 0], footF: [18, 0], hand: [20, 8], w: 70, off: [22, 6], face: 'closed' }, ease: 'outCubic' },
    { t: 950, pose: { y: 27, lean: 0.14, neck: 0.16, footN: [-26, 0], footF: [18, 0], hand: [20, 8], w: 71, off: [22, 7], face: 'closed' } },
    { t: 1250, pose: {}, ease: 'inOutCubic' },
  ],
};

const HURT = {
  duration: 420, move: [[0, 0], [80, -14], [420, 0]],
  keys: [
    { t: 0, pose: {} },
    { t: 70, pose: { lean: -0.24, neck: -0.18, y: 5, hand: [16, 12], off: [10, 8], w: 10, footN: [-16, 0], footF: [12, 0], face: 'hurt' }, ease: 'outExpo' },
    { t: 220, pose: { lean: -0.1, neck: -0.06, y: 3, face: 'hurt' } },
    { t: 420, pose: {}, ease: 'inOutSine' },
  ],
};

const DODGE = {
  duration: 520, move: [[0, 0], [170, -48], [300, -48], [520, 0]], afterimages: true,
  keys: [
    { t: 0, pose: {} },
    { t: 120, pose: { y: -16, lean: -0.24, liftN: 14, liftF: 10, footN: [-18, 0], footF: [6, 0], face: 'focus' }, ease: 'outQuad' },
    { t: 200, pose: { y: 6, lean: -0.12, footN: [-20, 0], footF: [12, 0], face: 'focus' }, ease: 'inQuad' },
    { t: 320, pose: { y: 4, lean: -0.08, face: 'smile' } },
    { t: 520, pose: {}, ease: 'inOutSine' },
  ],
};

function block(stance) {
  const guard = stance.shield
    ? { off: [32, -24], wo: -28 }
    : { hand: [24, -30], w: -100 };
  return {
    duration: 560, move: [[0, 0], [90, -8], [560, 0]],
    keys: [
      { t: 0, pose: {} },
      { t: 80, pose: { ...guard, lean: -0.1, y: 6, footN: [-20, 0], footF: [16, 0], face: 'fierce' }, ease: 'outExpo' },
      { t: 340, pose: { ...guard, lean: -0.06, y: 5, footN: [-20, 0], footF: [16, 0], face: 'fierce' } },
      { t: 560, pose: {}, ease: 'inOutSine' },
    ],
  };
}

const VICTORY = {
  duration: 900, hold: true,
  keys: [
    { t: 0, pose: {} },
    { t: 180, pose: { y: -16, lean: -0.04, liftN: 10, liftF: 12, hand: [14, -40], w: -80, face: 'smile' }, ease: 'outQuad' },
    { t: 360, pose: { y: 2, lean: -0.04, hand: [10, -62], w: -84, off: [24, -6], face: 'smile' }, ease: 'inOutSine' },
    { t: 900, pose: { y: 0, lean: -0.03, hand: [10, -62], w: -86, off: [24, -6], face: 'smile' } },
  ],
};

const DEFEAT = {
  duration: 900, hold: true,
  keys: [
    { t: 0, pose: {} },
    { t: 160, pose: { lean: -0.28, neck: -0.2, y: 6, face: 'hurt' }, ease: 'outExpo' },
    { t: 700, pose: { y: 36, lean: 0.55, neck: 0.5, hand: [34, 28], w: 18, off: [26, 26], footN: [-26, 0], footF: [20, 0], face: 'closed' }, ease: 'inOutCubic' },
    { t: 900, pose: { y: 37, lean: 0.56, neck: 0.52, hand: [34, 29], w: 20, off: [26, 27], footN: [-26, 0], footF: [20, 0], face: 'closed' } },
  ],
};

/* Which body motion each ability uses, and its elemental look. */
export const ABILITY_MOTION = {
  strike: { anim: 'melee', element: 'steel' },
  shield_bash: { anim: 'dash', kind: 'bash', element: 'steel' },
  cleave: { anim: 'melee', element: 'blood' },
  ironclad_charge: { anim: 'dash', kind: 'bash', element: 'gold', ultimate: true },
  ember: { anim: 'cast', element: 'fire' },
  frost_lance: { anim: 'cast', element: 'frost' },
  arcane_nova: { anim: 'channel', element: 'arcane', ultimate: true },
  backstab: { anim: 'dash', element: 'shadow' },
  twin_fang: { anim: 'melee', element: 'shadow', dual: true },
  shadow_execution: { anim: 'dash', element: 'shadow', ultimate: true },
  smite: { anim: 'melee', element: 'holy' },
  consecrate: { anim: 'channel', element: 'holy' },
  judgement: { anim: 'channel', element: 'holy', ultimate: true },
  rebuttal: { anim: 'cast', element: 'ink' },
  thesis_strike: { anim: 'cast', element: 'ink' },
  peer_review: { anim: 'channel', element: 'ink', ultimate: true },
  vine_lash: { anim: 'cast', element: 'nature' },
  toxic_bloom: { anim: 'channel', element: 'poison' },
  verdant_wrath: { anim: 'channel', element: 'nature', ultimate: true },
};

/** Build the timeline for an animation name. */
export function heroTimeline(name, stance, opts = {}) {
  switch (name) {
    case 'melee': return melee(stance.style, { ...stance, dual: stance.dual || opts.dual });
    case 'dash': return dashStrike(stance, opts.kind);
    case 'cast': return CAST;
    case 'channel': return CHANNEL;
    case 'throw': return THROW;
    case 'rest': return REST;
    case 'hurt': return HURT;
    case 'dodge': return DODGE;
    case 'block': return block(stance);
    case 'victory': return VICTORY;
    case 'defeat': return DEFEAT;
    default: return null;
  }
}

/* Cache the timelines with the stance's base pose merged into every key. */
const cache = new Map();

function resolved(name, stance, opts) {
  const key = `${name}|${stance.style}|${stance.twoHanded}|${stance.shield}|${stance.dual}|${opts.kind || ''}|${opts.dual || ''}`;
  if (cache.has(key)) return cache.get(key);
  const timeline = heroTimeline(name, stance, opts);
  if (!timeline) return null;
  const base = basePose(stance);
  const out = { ...timeline, keys: timeline.keys.map(k => ({ ...k, pose: { ...base, ...k.pose } })) };
  cache.set(key, out);
  return out;
}

/**
 * Evaluate an animation `ms` after it started. `dist` is how far a dash
 * travels (art units). Returns { pose, move: [dx, dy], done }.
 * Past its end an animation hands back to the idle loop, blended in.
 */
export function heroFrame(name, ms, stance, now, opts = {}) {
  const idle = idlePose(stance, now, opts.seed || 0);
  const timeline = name && name !== 'idle' ? resolved(name, stance, opts) : null;
  if (!timeline) return { pose: idle, move: [0, 0], done: true, timeline: null };
  const done = ms >= timeline.duration && !timeline.hold;
  if (done) return { pose: idle, move: [0, 0], done: true, timeline };

  let pose = sample(timeline.keys, ms);
  // Ease out of the keyed pose into the living idle near the end.
  if (!timeline.hold) {
    const tail = clamp((ms - (timeline.duration - 160)) / 160);
    if (tail > 0) pose = { ...pose, y: lerp(pose.y, idle.y, tail), lean: lerp(pose.lean, idle.lean, tail) };
  }
  const move = [0, 0];
  const dist = opts.dist || 0;
  if (timeline.dash) {
    const [a, b] = timeline.dash;
    const [c, d] = timeline.back;
    const out = ease.inOutSine(clamp((ms - a) / (b - a)));
    const back = ease.inOutCubic(clamp((ms - c) / (d - c)));
    move[0] = dist * out * (1 - back);
    // A little hop on the way home.
    if (ms > c && ms < d) move[1] = -Math.sin(Math.PI * back) * 14;
  }
  if (timeline.move) {
    const pts = timeline.move;
    for (let i = 1; i < pts.length; i++) {
      if (ms <= pts[i][0]) {
        const f = ease.inOutSine(clamp((ms - pts[i - 1][0]) / (pts[i][0] - pts[i - 1][0])));
        move[0] = lerp(pts[i - 1][1], pts[i][1], f);
        break;
      }
    }
  }
  return { pose, move, done: false, timeline };
}

/** A running cycle, for moving between stages. */
export function runPose(stance, now) {
  const p = basePose(stance);
  const phase = now * 0.013;
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  p.lean = 0.2;
  p.neck = -0.06;
  p.y = -Math.abs(Math.sin(phase)) * 4 + 2;
  p.footN = [s * 24 - 2, 0];
  p.liftN = Math.max(0, c) * 14;
  p.footF = [-s * 24 + 4, 0];
  p.liftF = Math.max(0, -c) * 14;
  p.hand = [12 - s * 12, 4 + Math.abs(s) * 2];
  p.off = [14 + s * 12, -2];
  p.w = stance.twoHanded ? -120 : -28;
  p.face = 'focus';
  return p;
}

/** Hauling up a ladder, hand over hand. */
export function climbPose(stance, now) {
  const p = basePose(stance);
  const phase = now * 0.009;
  const s = Math.sin(phase);
  p.lean = -0.02;
  p.y = -4 + s * 3;
  p.hand = [16, -74 + s * 12];
  p.off = [20, -66 - s * 12];
  p.footN = [6, 0];
  p.liftN = 10 + s * 8;
  p.footF = [10, 0];
  p.liftF = 10 - s * 8;
  p.w = -100;
  p.wo = -100;
  p.face = 'focus';
  return p;
}
