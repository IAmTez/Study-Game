/* Shared helpers for the code-drawn vector art.

   Everything is drawn with paths in a local unit space and scaled by the
   caller, so the same drawing is crisp at any size. The house style: each
   shape gets a soft top-to-bottom gradient of its base colour, a darker
   outline in a shade of that same colour (never flat black), and a few
   white highlight strokes where light from the upper left would catch. */

const DARK = [11, 14, 20];
const LIGHT = [255, 252, 240];

export function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0');
  return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16) || 0);
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`;
}

/** Blend two colours; t = 0 gives a, t = 1 gives b. */
export function mix(a, b, t) {
  const ca = Array.isArray(a) ? a : hexToRgb(a);
  const cb = Array.isArray(b) ? b : hexToRgb(b);
  return toHex(ca.map((v, i) => v + (cb[i] - v) * t));
}

/** Lighten (amount > 0) toward warm white or darken (< 0) toward ink. */
export function shade(hex, amount) {
  return amount >= 0 ? mix(hex, LIGHT, amount) : mix(hex, DARK, -amount);
}

export function rgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** The outline used around a fill of this colour. */
export function inkOf(hex) {
  return shade(hex, -0.62);
}

/* ---------------------------------------------------------------
   Paths
   --------------------------------------------------------------- */

export function poly(ctx, points, closed = true) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  if (closed) ctx.closePath();
}

/** A smooth closed (or open) curve through the points (Catmull-Rom). */
export function smooth(ctx, points, closed = true, tension = 0.5) {
  const n = points.length;
  if (n < 3) { poly(ctx, points, closed); return; }
  const at = (i) => points[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  const segments = closed ? n : n - 1;
  for (let i = 0; i < segments; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const k = tension / 3;
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k,
      p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k,
      p2[0], p2[1]);
  }
  if (closed) ctx.closePath();
}

export function ellipsePath(ctx, x, y, rx, ry, rotation = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rotation, 0, Math.PI * 2);
}

export function circlePath(ctx, x, y, r) {
  ellipsePath(ctx, x, y, r, r);
}

export function roundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/* ---------------------------------------------------------------
   Painting
   --------------------------------------------------------------- */

/**
 * Fill the current path with a soft vertical gradient of `colour` between
 * y0 and y1, then outline it. Options:
 *   line   — outline width (0 for none)
 *   ink    — outline colour (defaults to a dark shade of the fill)
 *   light  — how much brighter the top is (default .16)
 *   dark   — how much darker the bottom is (default .18)
 *   flat   — fill with the plain colour
 */
export function paint(ctx, colour, y0, y1, opts = {}) {
  const { line = 2.4, ink = null, light = 0.16, dark = 0.18, flat = false, alpha = 1 } = opts;
  ctx.save();
  if (alpha !== 1) ctx.globalAlpha *= alpha;
  if (flat || y0 === y1) {
    ctx.fillStyle = colour;
  } else {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, shade(colour, light));
    g.addColorStop(1, shade(colour, -dark));
    ctx.fillStyle = g;
  }
  ctx.fill();
  if (line > 0) {
    ctx.lineWidth = line;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = ink || inkOf(colour);
    ctx.stroke();
  }
  ctx.restore();
}

/** Stroke the current path as a highlight or detail line. */
export function line(ctx, colour, width = 1.6, alpha = 1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = colour;
  ctx.stroke();
  ctx.restore();
}

/** A thick rounded limb through the points: outline first, then the fill. */
export function limb(ctx, points, width, colour, opts = {}) {
  const { ink = inkOf(colour), outline = 2.4 } = opts;
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  poly(ctx, points, false);
  if (outline > 0) {
    ctx.lineWidth = width + outline * 2;
    ctx.strokeStyle = ink;
    ctx.stroke();
  }
  ctx.lineWidth = width;
  const ys = points.map(p => p[1]);
  const g = ctx.createLinearGradient(0, Math.min(...ys) - width / 2, 0, Math.max(...ys) + width / 2);
  g.addColorStop(0, shade(colour, 0.12));
  g.addColorStop(1, shade(colour, -0.14));
  ctx.strokeStyle = g;
  ctx.stroke();
  ctx.restore();
}

/** A soft radial glow, for magic, lamps and legendary gear. */
export function glow(ctx, x, y, radius, colour, alpha = 0.55) {
  ctx.save();
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, rgba(colour, alpha));
  g.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
}

/** A glossy highlight arc, the light catching a curved surface. */
export function gloss(ctx, x, y, rx, ry, alpha = 0.35, from = Math.PI * 1.1, to = Math.PI * 1.55) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, from, to);
  ctx.lineWidth = Math.max(1, Math.min(rx, ry) * 0.18);
  ctx.lineCap = 'round';
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.stroke();
  ctx.restore();
}

/** Run `draw` with the context translated, rotated and scaled. */
export function withTransform(ctx, x, y, rotation, scale, draw) {
  ctx.save();
  ctx.translate(x, y);
  if (rotation) ctx.rotate(rotation);
  if (scale && scale !== 1) {
    if (Array.isArray(scale)) ctx.scale(scale[0], scale[1]);
    else ctx.scale(scale, scale);
  }
  draw();
  ctx.restore();
}

/** An eye with a pupil and a catch-light, looking right. */
export function eye(ctx, x, y, r, iris = '#1b2230', opts = {}) {
  const { white = true, glowColour = null } = opts;
  if (glowColour) glow(ctx, x, y, r * 3.2, glowColour, 0.5);
  if (white) {
    ellipsePath(ctx, x, y, r, r * 1.1);
    paint(ctx, '#fbf7ee', y - r, y + r, { line: Math.max(0.8, r * 0.35), ink: '#2a2230', light: 0, dark: 0.08 });
  }
  circlePath(ctx, x + r * 0.25, y + r * 0.05, r * (white ? 0.62 : 1));
  paint(ctx, iris, y - r, y + r, { line: 0, light: 0.25 });
  circlePath(ctx, x + r * 0.05, y - r * 0.3, r * 0.24);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();
}
