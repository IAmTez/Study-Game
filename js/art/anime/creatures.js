/* Every monster in one registry, plus the timelines that drive them.

   A creature's drawing reads three numbers from its animation state — wind
   (anticipation), strike and hurt — and this module turns "attack", "hurt"
   and "death" into those numbers over time, along with how far a melee
   attacker lunges across the arena. */

import { BEASTS } from './beasts.js';
import { BOSSES } from './bosses.js';
import { ease, clamp, lerp } from './rig.js';

export const CREATURE_ART = { ...BEASTS, ...BOSSES };

export function creatureInfo(name) {
  const draw = CREATURE_ART[name];
  if (!draw) return null;
  return {
    size: draw.size,
    attack: draw.attack || { type: 'melee', fx: 'claw', colour: '#ffffff' },
    reach: draw.reach || 100,
    hover: !!draw.hover,
    boss: !!draw.boss,
  };
}

const ramp = (ms, a, b, curve = 'outQuad') => (ease[curve] || ease.outQuad)(clamp((ms - a) / (b - a)));

/* Timings in ms. Melee attackers lunge; ranged ones release a projectile. */
const TIMELINES = {
  melee: { duration: 880, wind: [0, 300], strike: [300, 370], hold: 520, recover: 820, hits: [355], dash: [290, 370], back: [560, 820] },
  ranged: { duration: 900, wind: [0, 340], strike: [340, 420], hold: 580, recover: 860, release: 360, hits: [620] },
  hurt: { duration: 440 },
  death: { duration: 1100, hold: true },
};

export function creatureTimeline(anim) {
  return TIMELINES[anim] || null;
}

/** Animation state for a creature `ms` into `anim`. */
export function creatureFrame(name, anim, ms, now, opts = {}) {
  const a = { t: now, now, wind: 0, strike: 0, hurt: 0 };
  const move = [0, 0];
  const timeline = anim ? TIMELINES[anim] : null;
  if (!timeline) return { a, move, done: true, timeline: null };
  if (!timeline.hold && ms >= timeline.duration) return { a, move, done: true, timeline };

  if (anim === 'melee' || anim === 'ranged') {
    const [w0, w1] = timeline.wind;
    const [s0, s1] = timeline.strike;
    const windIn = ramp(ms, w0, w1, 'outQuad');
    const strikeIn = ramp(ms, s0, s1, 'outExpo');
    const relax = ramp(ms, timeline.hold, timeline.recover, 'inOutSine');
    a.wind = windIn * (1 - strikeIn);
    a.strike = strikeIn * (1 - relax);
    if (timeline.dash) {
      const out = ramp(ms, timeline.dash[0], timeline.dash[1], 'inQuad');
      const back = ramp(ms, timeline.back[0], timeline.back[1], 'inOutCubic');
      // A small step back on the wind-up, then the lunge.
      move[0] = -10 * windIn * (1 - out) + (opts.dist || 0) * out * (1 - back);
      if (ms > timeline.back[0]) move[1] = -Math.sin(Math.PI * back) * 10;
    }
  } else if (anim === 'hurt') {
    const hit = ramp(ms, 0, 50, 'outExpo');
    const fade = ramp(ms, 90, timeline.duration, 'inOutSine');
    a.hurt = hit * (1 - fade);
    move[0] = -16 * a.hurt;
  } else if (anim === 'death') {
    a.hurt = 1 - ramp(ms, 500, 900) * 0.4;
    move[0] = -20 * ramp(ms, 0, 200, 'outExpo');
    move[1] = lerp(0, 8, ramp(ms, 200, 1100));
  }
  return { a, move, done: false, timeline };
}

/** Draw a creature with an animation state (or at rest). */
export function drawCreatureAnime(ctx, name, a = null) {
  const draw = CREATURE_ART[name];
  if (!draw) return false;
  draw(ctx, a || { t: 0, now: 0, wind: 0, strike: 0, hurt: 0, phys: null });
  return true;
}
