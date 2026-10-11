/* Cel-shading toolkit for the anime art.

   Every shape is a Path2D in local units. `cel()` paints it the way anime
   key art is painted:
     - a base colour, with a soft top-to-bottom gradient for volume
     - a hard-edged shadow on the side away from the light, in a cooler,
       slightly violet shade of the base (never just "darker")
     - a thin rim light on the far edge, the back-light that gives
       Genshin-style characters their glow
     - line art in a deep shade of the fill colour, not black

   The shadow and rim are found automatically: the part of the shape not
   covered by a copy of itself nudged toward the light is the shadow side.
   So any shape — a sleeve, a lock of hair, a boss's jaw — shades itself. */

import { shade, mix, rgba, hexToRgb } from '../vector.js';

export { shade, mix, rgba };

/* Detail level, lowered automatically on slow devices: 1 = full cel shading,
   0 = flat colour and line art. */
export const QUALITY = { level: 1 };

/* Key light from the upper left; rim light from behind on the right. */
const LIGHT = { x: -0.55, y: -0.84 };
const SHADOW_TINT = '#4b3a7a';
const RIM_DEFAULT = '#fff4dc';
const INK_TINT = '#2a1830';

export function shadowOf(colour, depth = 0.2) {
  return mix(shade(colour, -depth), SHADOW_TINT, 0.16);
}

export function inkFor(colour) {
  return mix(shade(colour, -0.6), INK_TINT, 0.35);
}

function luminance(colour) {
  const [r, g, b] = hexToRgb(colour);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/* ---------------------------------------------------------------
   Paths
   --------------------------------------------------------------- */

/** A smooth closed (or open) Path2D through the points (Catmull-Rom). */
export function curve(points, closed = true, tension = 0.5) {
  const path = new Path2D();
  const n = points.length;
  if (n < 3) {
    points.forEach(([x, y], i) => (i ? path.lineTo(x, y) : path.moveTo(x, y)));
    if (closed) path.closePath();
    return path;
  }
  const at = (i) => points[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  path.moveTo(points[0][0], points[0][1]);
  const segments = closed ? n : n - 1;
  const k = tension / 3;
  for (let i = 0; i < segments; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    path.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k,
      p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k,
      p2[0], p2[1]);
  }
  if (closed) path.closePath();
  return path;
}

/** Straight-edged polygon. */
export function poly(points, closed = true) {
  const path = new Path2D();
  points.forEach(([x, y], i) => (i ? path.lineTo(x, y) : path.moveTo(x, y)));
  if (closed) path.closePath();
  return path;
}

export function ellipse(x, y, rx, ry, rotation = 0) {
  const path = new Path2D();
  path.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rotation, 0, Math.PI * 2);
  return path;
}

export function circle(x, y, r) {
  return ellipse(x, y, r, r);
}

export function roundRect(x, y, w, h, r) {
  const path = new Path2D();
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  path.moveTo(x + rr, y);
  path.arcTo(x + w, y, x + w, y + h, rr);
  path.arcTo(x + w, y + h, x, y + h, rr);
  path.arcTo(x, y + h, x, y, rr);
  path.arcTo(x, y, x + w, y, rr);
  path.closePath();
  return path;
}

/**
 * A tapered capsule from a to b: radius ra at a, rb at b. The basic shape
 * of every limb, sleeve and tail.
 */
export function capsule(ax, ay, bx, by, ra, rb = ra) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 0.001;
  const angle = Math.atan2(dy, dx);
  // Tangent angle offset for circles of different radii.
  const off = Math.asin(Math.max(-1, Math.min(1, (ra - rb) / len)));
  const path = new Path2D();
  path.arc(ax, ay, ra, angle + Math.PI / 2 + off, angle - Math.PI / 2 - off, false);
  path.arc(bx, by, rb, angle - Math.PI / 2 - off, angle + Math.PI / 2 + off, false);
  path.closePath();
  return path;
}

/** A shape built in a local frame, moved to (x, y) and rotated by `a`. */
export function placed(path, x, y, a = 0, sx = 1, sy = sx) {
  const out = new Path2D();
  const m = new DOMMatrix().translateSelf(x, y).rotateSelf((a * 180) / Math.PI).scaleSelf(sx, sy);
  out.addPath(path, m);
  return out;
}

/* ---------------------------------------------------------------
   Painting
   --------------------------------------------------------------- */

function crescent(path, dx, dy) {
  const c = new Path2D();
  c.rect(-1e4, -1e4, 2e4, 2e4);
  c.addPath(path, new DOMMatrix([1, 0, 0, 1, dx, dy]));
  return c;
}

/**
 * Paint `path` cel-shaded. Options:
 *   y0, y1      — vertical extent, for the volume gradient
 *   depth       — how dark the shadow tone is (default .2)
 *   shadow      — explicit shadow colour
 *   cast        — shadow width in units (default 2.6)
 *   rim         — rim-light colour, or false
 *   rimWidth    — rim width (default 1.3)
 *   rimAlpha    — rim opacity (default .55)
 *   line        — line-art width (0 for none, default 1.1)
 *   ink         — line colour
 *   gloss       — add a soft specular sheen (metal, gems, glossy hair)
 *   alpha       — overall opacity
 */
export function cel(ctx, path, base, opts = {}) {
  const {
    y0 = null, y1 = null, depth = 0.2, shadow = null, cast = 2.6,
    rim = RIM_DEFAULT, rimWidth = 1.3, rimAlpha = 0.55,
    line = 1.1, ink = null, gloss = false, alpha = 1, flat = false,
  } = opts;
  if (QUALITY.level === 0) {
    // Low detail: flat colour and line art only — no clipping.
    ctx.save();
    if (alpha !== 1) ctx.globalAlpha *= alpha;
    ctx.fillStyle = base;
    ctx.fill(path);
    if (line > 0) {
      ctx.lineWidth = line;
      ctx.lineJoin = 'round';
      ctx.strokeStyle = ink || inkFor(base);
      ctx.stroke(path);
    }
    ctx.restore();
    return;
  }
  ctx.save();
  if (alpha !== 1) ctx.globalAlpha *= alpha;
  ctx.save();
  ctx.clip(path);
  if (!flat && y0 != null && y1 != null) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, shade(base, 0.1));
    g.addColorStop(0.55, base);
    g.addColorStop(1, shade(base, -0.06));
    ctx.fillStyle = g;
  } else {
    ctx.fillStyle = base;
  }
  ctx.fill(path);

  if (cast > 0) {
    ctx.fillStyle = shadow || shadowOf(base, depth);
    ctx.fill(crescent(path, LIGHT.x * cast, LIGHT.y * cast), 'evenodd');
  }
  if (gloss) {
    // The edge facing the key light catches a band of specular light.
    const band = typeof gloss === 'number' ? gloss : 1.8;
    ctx.globalAlpha *= 0.55;
    ctx.fillStyle = shade(base, luminance(base) > 0.6 ? 0.6 : 0.45);
    ctx.fill(crescent(path, -LIGHT.x * band, -LIGHT.y * band), 'evenodd');
    ctx.globalAlpha /= 0.55;
  }
  if (rim) {
    ctx.globalAlpha *= rimAlpha;
    ctx.fillStyle = rim;
    ctx.fill(crescent(path, -rimWidth, rimWidth * 0.25), 'evenodd');
  }
  ctx.restore();

  if (line > 0) {
    ctx.lineWidth = line;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = ink || inkFor(base);
    ctx.stroke(path);
  }
  ctx.restore();
}

/** Stroke a path as a detail line (folds, seams, strands). */
export function stroke(ctx, path, colour, width = 0.9, alpha = 1) {
  ctx.save();
  if (alpha !== 1) ctx.globalAlpha *= alpha;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = colour;
  ctx.stroke(path);
  ctx.restore();
}

/** Fill a path flat. */
export function fill(ctx, path, colour, alpha = 1) {
  ctx.save();
  if (alpha !== 1) ctx.globalAlpha *= alpha;
  ctx.fillStyle = colour;
  ctx.fill(path);
  ctx.restore();
}

/** A soft additive glow. */
export function glow(ctx, x, y, radius, colour, alpha = 0.6) {
  if (radius <= 0) return;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, rgba(colour, alpha));
  g.addColorStop(0.4, rgba(colour, alpha * 0.4));
  g.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
}

/** A four-pointed sparkle, the anime "shine". */
export function sparkle(ctx, x, y, r, colour = '#ffffff', alpha = 1, rotation = 0) {
  if (r <= 0 || alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(r * 0.12, -r * 0.12, r, 0);
  ctx.quadraticCurveTo(r * 0.12, r * 0.12, 0, r);
  ctx.quadraticCurveTo(-r * 0.12, r * 0.12, -r, 0);
  ctx.quadraticCurveTo(-r * 0.12, -r * 0.12, 0, -r);
  ctx.fill();
  ctx.restore();
}

/** A faceted gem with an inner glint. */
export function gem(ctx, x, y, r, colour, opts = {}) {
  const { glowAlpha = 0.45, shape = 'diamond' } = opts;
  if (glowAlpha) glow(ctx, x, y, r * 3, colour, glowAlpha);
  const path = shape === 'round'
    ? circle(x, y, r)
    : poly([[x, y - r * 1.15], [x + r, y], [x, y + r * 1.15], [x - r, y]]);
  cel(ctx, path, colour, { cast: r * 0.6, rimWidth: r * 0.25, line: Math.max(0.4, r * 0.25), gloss: true });
  sparkle(ctx, x - r * 0.3, y - r * 0.35, r * 0.55, '#ffffff', 0.9);
}

/** Small diagonal hatch lines — anime blush, or engraving on metal. */
export function hatch(ctx, x, y, count, gap, len, colour, width = 0.6, alpha = 0.7, angle = -1.1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  const dx = Math.cos(angle) * len / 2;
  const dy = Math.sin(angle) * len / 2;
  for (let i = 0; i < count; i++) {
    const cx = x + (i - (count - 1) / 2) * gap;
    ctx.beginPath();
    ctx.moveTo(cx - dx, y - dy);
    ctx.lineTo(cx + dx, y + dy);
    ctx.stroke();
  }
  ctx.restore();
}

/** Run `draw` in a translated / rotated / scaled frame. */
export function frame(ctx, x, y, a, s, draw) {
  ctx.save();
  ctx.translate(x, y);
  if (a) ctx.rotate(a);
  if (s && s !== 1) {
    if (Array.isArray(s)) ctx.scale(s[0], s[1]);
    else ctx.scale(s, s);
  }
  draw();
  ctx.restore();
}

/** Wavy decorative trim along a polyline: little scallops, like embroidery. */
export function embroidery(ctx, points, colour, size = 1.6, width = 0.7) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[i + 1];
    const len = Math.hypot(bx - ax, by - ay);
    const steps = Math.max(1, Math.floor(len / (size * 2)));
    const nx = -(by - ay) / (len || 1);
    const ny = (bx - ax) / (len || 1);
    for (let s = 0; s < steps; s++) {
      const t0 = s / steps;
      const t1 = (s + 1) / steps;
      const mx = ax + (bx - ax) * (t0 + t1) / 2 + nx * size;
      const my = ay + (by - ay) * (t0 + t1) / 2 + ny * size;
      ctx.beginPath();
      ctx.moveTo(ax + (bx - ax) * t0, ay + (by - ay) * t0);
      ctx.quadraticCurveTo(mx, my, ax + (bx - ax) * t1, ay + (by - ay) * t1);
      ctx.stroke();
    }
  }
  ctx.restore();
}
