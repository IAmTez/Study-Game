/* Skeleton maths for the animated characters.

   - Two-bone inverse kinematics, so an animation moves a hand or a foot to a
     target and the elbow or knee works itself out. Feet stay planted while
     the body bobs, crouches and lunges.
   - Keyframed poses blended with easing curves.
   - Spring chains for secondary motion: hair, capes, scarves and coat tails
     lag behind the body and settle, so every movement has follow-through. */

export const TAU = Math.PI * 2;
export const DEG = Math.PI / 180;

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export const ease = {
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => 1 - (1 - t) * (1 - t),
  inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inCubic: t => t * t * t,
  inOutCubic: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: t => { const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  outExpo: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  outElastic: t => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (TAU / 3)) + 1),
};

/** Rotate (x, y) by angle a. */
export function rot(x, y, a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c - y * s, x * s + y * c];
}

export function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
export function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
export function scale(a, k) { return [a[0] * k, a[1] * k]; }
export function len(a) { return Math.hypot(a[0], a[1]); }
export function mixPt(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]; }
export function angleOf(a, b) { return Math.atan2(b[1] - a[1], b[0] - a[0]); }

/**
 * Two-bone IK. From root `a` toward target `t`, with bone lengths l1 and l2.
 * `bend` = +1 or −1 picks which way the middle joint bends. Returns
 * [joint, end]; the end is pulled short if the target is out of reach.
 */
export function ik(a, t, l1, l2, bend = 1) {
  let dx = t[0] - a[0];
  let dy = t[1] - a[1];
  let d = Math.hypot(dx, dy) || 0.0001;
  const reach = l1 + l2 - 0.001;
  if (d > reach) { dx *= reach / d; dy *= reach / d; d = reach; }
  const minReach = Math.abs(l1 - l2) + 0.001;
  if (d < minReach) { dx *= minReach / d; dy *= minReach / d; d = minReach; }
  const base = Math.atan2(dy, dx);
  const cos = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const angle = base - bend * Math.acos(cos);
  const joint = [a[0] + Math.cos(angle) * l1, a[1] + Math.sin(angle) * l1];
  return [joint, [a[0] + dx, a[1] + dy]];
}

/* ---------------------------------------------------------------
   Pose blending
   --------------------------------------------------------------- */

/** Blend two poses field by field: numbers and [x, y] pairs interpolate. */
export function blend(p, q, t) {
  const out = {};
  for (const key of new Set([...Object.keys(p), ...Object.keys(q)])) {
    const a = p[key];
    const b = q[key];
    if (a === undefined) { out[key] = b; continue; }
    if (b === undefined) { out[key] = a; continue; }
    if (typeof a === 'number' && typeof b === 'number') out[key] = lerp(a, b, t);
    else if (Array.isArray(a) && Array.isArray(b)) out[key] = mixPt(a, b, t);
    else out[key] = t < 0.5 ? a : b;
  }
  return out;
}

/**
 * Evaluate a timeline of keyframes at time `ms`. Each key is
 * { t, pose, ease } — `ease` shapes the motion INTO that key.
 */
export function sample(keys, ms) {
  if (ms <= keys[0].t) return { ...keys[0].pose };
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (ms <= k.t) {
      const prev = keys[i - 1];
      const span = k.t - prev.t || 1;
      const f = (ease[k.ease] || ease.inOutSine)(clamp((ms - prev.t) / span));
      return blend(prev.pose, k.pose, f);
    }
  }
  return { ...keys[keys.length - 1].pose };
}

/* ---------------------------------------------------------------
   Spring chains (hair, capes, scarves, tails)
   --------------------------------------------------------------- */

/**
 * Simulate a chain hanging from `anchor`. `rest` is the chain's resting
 * shape as points relative to the anchor (already rotated into place).
 * `state` is a per-character object that keeps the chain between frames;
 * pass null for a still image and the rest shape is returned as is.
 *
 * Options: stiffness (pull back to rest), damping, gravity, and `offset` —
 * the character's movement through the world, so a dash makes the chain
 * trail behind.
 */
export function chain(state, key, anchor, rest, opts = {}) {
  const target = rest.map(([x, y]) => [anchor[0] + x, anchor[1] + y]);
  if (!state) return target;
  const { stiffness = 0.16, damping = 0.86, gravity = 0.25, offset = [0, 0], now = 0, wind = 0 } = opts;
  const world = target.map(([x, y]) => [x + offset[0], y + offset[1]]);
  let s = state[key];
  if (!s || s.pts.length !== world.length) {
    s = state[key] = { pts: world.map(p => [...p]), prev: world.map(p => [...p]), t: now };
  }
  const lengths = world.map((p, i) => (i ? Math.hypot(p[0] - world[i - 1][0], p[1] - world[i - 1][1]) : 0));
  let steps = Math.floor((now - s.t) / 16);
  if (steps > 8 || steps < 0) {
    // Long gap (tab hidden, first frame): snap to rest rather than explode.
    s.pts = world.map(p => [...p]);
    s.prev = world.map(p => [...p]);
    s.t = now;
    steps = 0;
  }
  for (let n = 0; n < steps; n++) {
    s.pts[0] = [...world[0]];
    s.prev[0] = [...world[0]];
    for (let i = 1; i < s.pts.length; i++) {
      const p = s.pts[i];
      const q = s.prev[i];
      const vx = (p[0] - q[0]) * damping;
      const vy = (p[1] - q[1]) * damping;
      const k = stiffness * (0.6 + 0.4 * (1 - i / s.pts.length));
      const breeze = wind ? Math.sin(now * 0.002 + i * 0.7) * wind * (i / s.pts.length) : 0;
      s.prev[i] = [p[0], p[1]];
      p[0] += vx + (world[i][0] - p[0]) * k + breeze;
      p[1] += vy + (world[i][1] - p[1]) * k + gravity;
    }
    // Keep segment lengths so the chain stretches no further than it is long.
    for (let i = 1; i < s.pts.length; i++) {
      const a = s.pts[i - 1];
      const b = s.pts[i];
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const d = Math.hypot(dx, dy) || 0.0001;
      const want = lengths[i];
      b[0] = a[0] + (dx / d) * want;
      b[1] = a[1] + (dy / d) * want;
    }
  }
  s.t += steps * 16;
  return s.pts.map(([x, y]) => [x - offset[0], y - offset[1]]);
}

/**
 * Build a ribbon outline along a chain of points: width w0 at the root
 * tapering to w1 at the tip. Returns the outline as a point list.
 */
export function ribbon(points, w0, w1, tipPoint = true) {
  const left = [];
  const right = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const t = i / (points.length - 1 || 1);
    const w = lerp(w0, w1, t) / 2;
    left.push([p[0] + Math.cos(ang + Math.PI / 2) * w, p[1] + Math.sin(ang + Math.PI / 2) * w]);
    right.push([p[0] + Math.cos(ang - Math.PI / 2) * w, p[1] + Math.sin(ang - Math.PI / 2) * w]);
  }
  const tip = tipPoint ? [points[points.length - 1]] : [];
  return [...left, ...tip, ...right.reverse()];
}
