/* Battle effects: slash trails, impact bursts, elemental projectiles, magic
   circles, light pillars, vines, status auras and particles.

   Effects live in world space and run on the scene's clock (which pauses
   during hit-stop). The scene adds them as the battle plays out and draws
   them in two layers: 'back' (behind the fighters — circles, shadows) and
   'front' (everything else). */

import { rgba, shade, mix } from './cel.js';

export const ELEMENTS = {
  steel: { main: '#cfe6ff', core: '#ffffff', dark: '#5a7aa8' },
  blood: { main: '#ff4a5a', core: '#ffd0d4', dark: '#6a0f1e' },
  gold: { main: '#ffd56b', core: '#fff6d0', dark: '#8a5a10' },
  fire: { main: '#ff8a3a', core: '#ffe9a0', dark: '#8a1e0a' },
  frost: { main: '#8ae0ff', core: '#f0fcff', dark: '#2a6a9a' },
  arcane: { main: '#b98cff', core: '#f4ebff', dark: '#3a1a7a' },
  shadow: { main: '#9b7bff', core: '#e6dcff', dark: '#1a0f2e' },
  holy: { main: '#ffe28a', core: '#fffbe8', dark: '#a8771a' },
  ink: { main: '#6a8aff', core: '#e6ecff', dark: '#141a3a' },
  nature: { main: '#86d860', core: '#efffd8', dark: '#2a5a1a' },
  poison: { main: '#a6ff5a', core: '#f0ffd8', dark: '#3a6a10' },
  water: { main: '#7fd1ff', core: '#effaff', dark: '#1f4e79' },
};

export function elementOf(name) {
  return ELEMENTS[name] || ELEMENTS.steel;
}

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export class Effects {
  constructor() {
    this.items = [];
    this.particles = [];
  }

  clear() {
    this.items.length = 0;
    this.particles.length = 0;
  }

  add(kind, now, props) {
    const item = { kind, start: now, dur: 600, layer: 'front', ...props };
    this.items.push(item);
    return item;
  }

  /* ---------------- particles ---------------- */

  emit(x, y, opts = {}) {
    const {
      count = 10, speed = [60, 220], angle = 0, spread = TAU, life = [300, 700], size = [1.5, 4],
      colour = '#ffffff', kind = 'spark', gravity = 0, drag = 0.9, up = 0,
    } = opts;
    for (let i = 0; i < count; i++) {
      if (this.particles.length > 420) this.particles.shift();
      const a = angle + (Math.random() - 0.5) * spread;
      const v = rand(speed[0], speed[1]);
      this.particles.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - up,
        life: rand(life[0], life[1]), age: 0, size: rand(size[0], size[1]),
        colour: Array.isArray(colour) ? colour[Math.floor(Math.random() * colour.length)] : colour,
        kind, gravity, drag, spin: rand(-6, 6), rot: rand(0, TAU),
        ch: 'ᚠᚢᚦᚨᚱᚲΣΔΨΩ§¶'[Math.floor(Math.random() * 12)],
      });
    }
  }

  update(dt) {
    const s = dt / 1000;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) { this.particles.splice(i, 1); continue; }
      const d = Math.pow(p.drag, dt / 16);
      p.vx *= d;
      p.vy = p.vy * d + p.gravity * s;
      p.x += p.vx * s;
      p.y += p.vy * s;
      p.rot += p.spin * s;
    }
  }

  drawParticles(ctx) {
    ctx.save();
    for (const p of this.particles) {
      const f = p.age / p.life;
      const alpha = f < 0.15 ? f / 0.15 : 1 - (f - 0.15) / 0.85;
      ctx.globalAlpha = Math.max(0, alpha);
      switch (p.kind) {
        case 'spark': {
          // A streak along the velocity.
          ctx.globalCompositeOperation = 'lighter';
          const len = Math.min(18, Math.hypot(p.vx, p.vy) * 0.05 + 2);
          const a = Math.atan2(p.vy, p.vx);
          ctx.strokeStyle = p.colour;
          ctx.lineWidth = p.size * (1 - f * 0.6);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - Math.cos(a) * len, p.y - Math.sin(a) * len);
          ctx.stroke();
          break;
        }
        case 'glow': {
          ctx.globalCompositeOperation = 'lighter';
          const r = p.size * 3 * (1 - f * 0.5);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          g.addColorStop(0, rgba(p.colour, 0.9));
          g.addColorStop(1, rgba(p.colour, 0));
          ctx.fillStyle = g;
          ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
          break;
        }
        case 'smoke': {
          ctx.globalCompositeOperation = 'source-over';
          const r = p.size * (1 + f * 2.5);
          ctx.fillStyle = rgba(p.colour, 0.35);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, TAU);
          ctx.fill();
          break;
        }
        case 'shard': {
          ctx.globalCompositeOperation = 'source-over';
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.colour;
          ctx.strokeStyle = 'rgba(255,255,255,.8)';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.8);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size * 1.8);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
          break;
        }
        case 'petal':
        case 'leaf': {
          ctx.globalCompositeOperation = 'source-over';
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.colour;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.7, 0, 0, TAU);
          ctx.fill();
          ctx.restore();
          break;
        }
        case 'glyph': {
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = p.colour;
          ctx.font = `${Math.round(p.size * 4)}px serif`;
          ctx.textAlign = 'center';
          ctx.fillText(p.ch, p.x, p.y);
          break;
        }
        case 'drop':
        default: {
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = p.colour;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - f * 0.5), 0, TAU);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  /* ---------------- composite effects ---------------- */

  /** Sparks, a flash and a ring where a blow lands. */
  impact(now, x, y, element = 'steel', power = 1, dir = 1) {
    const e = elementOf(element);
    this.add('flash', now, { x, y, colour: e.core, r: 46 * power, dur: 160 });
    this.add('ring', now, { x, y, colour: e.main, r0: 6, r1: 70 * power, dur: 340, width: 5 * power });
    this.add('streaks', now, { x, y, colour: e.main, core: e.core, r: 64 * power, dur: 220, count: 9, seed: Math.random() * 10 });
    this.emit(x, y, { count: Math.round(16 * power), speed: [120, 420], angle: dir > 0 ? 0 : Math.PI, spread: 2.6, colour: [e.main, e.core], kind: 'spark', life: [180, 420], size: [1.4, 3.2], drag: 0.86 });
    this.emit(x, y, { count: Math.round(6 * power), speed: [20, 90], colour: e.main, kind: 'glow', life: [300, 600], size: [2, 5], up: 40 });
    switch (element) {
      case 'fire':
        this.emit(x, y, { count: 18, speed: [40, 200], colour: ['#ffb04a', '#ff6a2a', '#ffe08a'], kind: 'glow', life: [400, 900], size: [2, 5], up: 120, gravity: -80 });
        this.emit(x, y, { count: 6, speed: [10, 50], colour: '#3a2a2a', kind: 'smoke', life: [500, 900], size: [5, 9], up: 60 });
        break;
      case 'frost':
        this.emit(x, y, { count: 14, speed: [80, 260], colour: ['#c8f4ff', '#8ae0ff', '#ffffff'], kind: 'shard', life: [400, 800], size: [2, 4.5], gravity: 400 });
        break;
      case 'blood':
        this.emit(x, y, { count: 12, speed: [80, 240], angle: dir > 0 ? -0.4 : Math.PI + 0.4, spread: 1.6, colour: ['#ff4a5a', '#b0182a'], kind: 'drop', life: [300, 700], size: [1.6, 3.4], gravity: 600 });
        break;
      case 'nature':
        this.emit(x, y, { count: 12, speed: [60, 200], colour: ['#86d860', '#c6f08a', '#ff9ec4'], kind: 'leaf', life: [500, 1000], size: [2, 3.5], gravity: 90, up: 80 });
        break;
      case 'poison':
        this.emit(x, y, { count: 12, speed: [20, 90], colour: ['#a6ff5a', '#6ad020'], kind: 'glow', life: [600, 1100], size: [2, 4], up: 60, gravity: -40 });
        this.emit(x, y, { count: 6, speed: [10, 40], colour: '#5a8a2a', kind: 'smoke', life: [700, 1200], size: [6, 10], up: 30 });
        break;
      case 'ink':
      case 'arcane':
        this.emit(x, y, { count: 8, speed: [40, 140], colour: e.core, kind: 'glyph', life: [500, 900], size: [2.6, 4], up: 70 });
        break;
      case 'holy':
        this.emit(x, y, { count: 12, speed: [30, 120], colour: ['#fff6c0', '#ffe28a'], kind: 'glow', life: [500, 1000], size: [1.5, 3.5], up: 140, gravity: -60 });
        break;
      case 'shadow':
        this.emit(x, y, { count: 10, speed: [30, 140], colour: '#2a1840', kind: 'smoke', life: [400, 900], size: [5, 9], up: 30 });
        break;
      default:
        break;
    }
  }

  /** A crescent slash flash drawn across the victim. */
  slash(now, x, y, element = 'steel', angle = -0.6, size = 1, delay = 0) {
    const e = elementOf(element);
    this.add('slash', now + delay, { x, y, colour: e.main, core: e.core, angle, size, dur: 260 });
  }

  /** Claw rakes: three parallel slashes. */
  claws(now, x, y, colour, dir = -1) {
    for (let i = 0; i < 3; i++) {
      this.add('slash', now + i * 30, { x: x + (i - 1) * 12 * dir, y: y + (i - 1) * 6, colour, core: '#ffffff', angle: dir > 0 ? -1.1 : 1.1 + Math.PI, size: 0.7, dur: 240, thin: true });
    }
  }

  projectile(now, props) {
    return this.add('projectile', now, { layer: 'front', ...props });
  }

  magicCircle(now, x, y, element, dur = 700, r = 52) {
    const e = elementOf(element);
    this.add('circle', now, { x, y, colour: e.main, core: e.core, r, dur, layer: 'back' });
  }

  pillar(now, x, floorY, element, dur = 700, width = 70) {
    const e = elementOf(element);
    this.add('pillar', now, { x, y: floorY, colour: e.main, core: e.core, width, dur });
    this.emit(x, floorY - 40, { count: 24, speed: [40, 160], colour: [e.main, e.core], kind: 'glow', life: [500, 1000], size: [2, 4], up: 260, gravity: -120 });
  }

  vines(now, x, floorY, colour = '#5aa83a', count = 5) {
    for (let i = 0; i < count; i++) {
      this.add('vine', now + i * 40, { x: x + (i - (count - 1) / 2) * 22, y: floorY, colour, h: rand(90, 150), lean: rand(-0.4, 0.4), dur: 800, seed: Math.random() * 10 });
    }
    this.emit(x, floorY - 10, { count: 10, speed: [40, 140], colour: ['#a0784a', '#6a4a2a'], kind: 'drop', life: [300, 700], size: [1.6, 3], gravity: 500, up: 160 });
  }

  wave(now, fromX, toX, floorY, colour = '#7fd1ff', dur = 600) {
    this.add('wave', now, { fromX, toX, y: floorY, colour, dur });
  }

  cloud(now, x, y, colour = '#a6ff5a', dur = 900) {
    for (let i = 0; i < 7; i++) {
      this.add('puff', now + i * 40, { x: x + rand(-40, 40), y: y + rand(-50, 10), colour, r: rand(18, 30), dur });
    }
  }

  shockwave(now, x, floorY, colour = '#e8dcc0', power = 1) {
    this.add('ground', now, { x, y: floorY, colour, r: 120 * power, dur: 420 });
    this.emit(x, floorY - 4, { count: 16, speed: [60, 220], angle: -Math.PI / 2, spread: 2.8, colour: ['#8a7a6a', '#b8a890'], kind: 'smoke', life: [400, 800], size: [4, 8], gravity: 120 });
    this.emit(x, floorY - 4, { count: 10, speed: [80, 260], angle: -Math.PI / 2, spread: 2.2, colour: '#6a5a4a', kind: 'drop', life: [300, 600], size: [1.6, 3], gravity: 700 });
  }

  /* ---------------- drawing ---------------- */

  draw(ctx, now, layer = 'front') {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      if (now - it.start > it.dur) { if (it.onEnd) it.onEnd(); this.items.splice(i, 1); }
    }
    for (const it of this.items) {
      if (it.layer !== layer) continue;
      const age = now - it.start;
      if (age < 0) continue;
      const f = clamp01(age / it.dur);
      const draw = DRAW[it.kind];
      if (draw) {
        ctx.save();
        draw(ctx, it, f, now, this);
        ctx.restore();
      }
    }
    if (layer === 'front') this.drawParticles(ctx);
  }
}

/* ---------------------------------------------------------------
   Effect drawers
   --------------------------------------------------------------- */

function radial(ctx, x, y, r, colour, alpha) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(colour, alpha));
  g.addColorStop(0.4, rgba(colour, alpha * 0.45));
  g.addColorStop(1, rgba(colour, 0));
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

const DRAW = {
  flash(ctx, it, f) {
    ctx.globalCompositeOperation = 'lighter';
    radial(ctx, it.x, it.y, it.r * (0.6 + f * 0.6), it.colour, 1 - f);
  },

  ring(ctx, it, f) {
    ctx.globalCompositeOperation = 'lighter';
    const r = it.r0 + (it.r1 - it.r0) * easeOut(f);
    ctx.strokeStyle = rgba(it.colour, 1 - f);
    ctx.lineWidth = it.width * (1 - f) + 0.5;
    ctx.beginPath();
    ctx.ellipse(it.x, it.y, r, r * (it.flat || 1), 0, 0, TAU);
    ctx.stroke();
  },

  streaks(ctx, it, f) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (let i = 0; i < it.count; i++) {
      const a = it.seed * 3 + i * (TAU / it.count) + Math.sin(i * 7.3) * 0.3;
      const r0 = it.r * 0.25 + it.r * 0.5 * easeOut(f);
      const r1 = r0 + it.r * 0.5 * (1 - f);
      ctx.strokeStyle = rgba(i % 2 ? it.core : it.colour, 1 - f);
      ctx.lineWidth = 3 * (1 - f) + 0.5;
      ctx.beginPath();
      ctx.moveTo(it.x + Math.cos(a) * r0, it.y + Math.sin(a) * r0);
      ctx.lineTo(it.x + Math.cos(a) * r1, it.y + Math.sin(a) * r1);
      ctx.stroke();
    }
  },

  slash(ctx, it, f) {
    // A crescent that sweeps open then thins out.
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(it.x, it.y);
    ctx.rotate(it.angle);
    const s = it.size * 80;
    const open = easeOut(Math.min(1, f * 2.2));
    const thick = (it.thin ? 5 : 12) * (1 - f);
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.quadraticCurveTo(0, -thick * 2 - s * 0.18, s * (open * 2 - 1), 0);
    ctx.quadraticCurveTo(0, -s * 0.18 + thick * 0.4, -s, 0);
    ctx.fillStyle = rgba(it.colour, 0.9 * (1 - f));
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-s * 0.9, 0);
    ctx.quadraticCurveTo(0, -thick - s * 0.17, s * (open * 2 - 1) * 0.95, 0);
    ctx.strokeStyle = rgba(it.core, 1 - f);
    ctx.lineWidth = 1.6;
    ctx.stroke();
  },

  circle(ctx, it, f, now) {
    // A rotating rune circle on the floor, seen in perspective.
    const fadeIn = clamp01(f * 5);
    const fadeOut = clamp01((1 - f) * 4);
    const alpha = Math.min(fadeIn, fadeOut);
    ctx.translate(it.x, it.y);
    ctx.scale(1, 0.32);
    ctx.globalCompositeOperation = 'lighter';
    radial(ctx, 0, 0, it.r * 1.4, it.colour, 0.4 * alpha);
    ctx.rotate(now * 0.0016);
    ctx.strokeStyle = rgba(it.colour, alpha);
    ctx.lineWidth = 2.2;
    for (const r of [it.r, it.r * 0.78, it.r * 0.42]) {
      ctx.beginPath();
      ctx.arc(0, 0, r * (0.85 + 0.15 * fadeIn), 0, TAU);
      ctx.stroke();
    }
    // A hexagram between the rings.
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const a = i * (TAU / 3) * 2 / 2;
      const p = [Math.cos(a) * it.r * 0.78, Math.sin(a) * it.r * 0.78];
      i ? ctx.lineTo(...p) : ctx.moveTo(...p);
    }
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i <= 3; i++) {
      const a = i * (TAU / 3) + Math.PI;
      const p = [Math.cos(a) * it.r * 0.78, Math.sin(a) * it.r * 0.78];
      i ? ctx.lineTo(...p) : ctx.moveTo(...p);
    }
    ctx.stroke();
    ctx.fillStyle = rgba(it.core, alpha);
    ctx.font = '13px serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < 12; i++) {
      const a = i * (TAU / 12);
      ctx.save();
      ctx.translate(Math.cos(a) * it.r * 0.9, Math.sin(a) * it.r * 0.9);
      ctx.rotate(a + Math.PI / 2);
      ctx.fillText('ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'[i], 0, 4);
      ctx.restore();
    }
  },

  pillar(ctx, it, f) {
    ctx.globalCompositeOperation = 'lighter';
    const grow = easeOut(Math.min(1, f * 4));
    const fade = 1 - clamp01((f - 0.5) * 2);
    const w = it.width * (0.4 + 0.6 * grow) * (0.6 + 0.4 * fade);
    const g = ctx.createLinearGradient(it.x - w, 0, it.x + w, 0);
    g.addColorStop(0, rgba(it.colour, 0));
    g.addColorStop(0.35, rgba(it.colour, 0.55 * fade));
    g.addColorStop(0.5, rgba(it.core, 0.95 * fade));
    g.addColorStop(0.65, rgba(it.colour, 0.55 * fade));
    g.addColorStop(1, rgba(it.colour, 0));
    ctx.fillStyle = g;
    ctx.fillRect(it.x - w, it.y - 600, w * 2, 600);
    radial(ctx, it.x, it.y, w * 2, it.colour, 0.6 * fade);
    ctx.strokeStyle = rgba(it.core, fade);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(it.x, it.y, w * 1.4 * grow, w * 0.35 * grow, 0, 0, TAU);
    ctx.stroke();
  },

  vine(ctx, it, f) {
    const grow = easeOut(Math.min(1, f * 3));
    const sink = clamp01((f - 0.7) / 0.3);
    const h = it.h * grow * (1 - sink);
    if (h < 2) return;
    ctx.translate(it.x, it.y);
    ctx.rotate(it.lean);
    ctx.lineCap = 'round';
    const pts = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      pts.push([Math.sin(t * 5 + it.seed) * 8 * t, -h * t]);
    }
    for (const [w, c] of [[11, shade(it.colour, -0.4)], [8, it.colour], [2.4, shade(it.colour, 0.4)]]) {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }
    // Thorns and leaves along it.
    for (let i = 2; i < pts.length; i += 2) {
      const [x, y] = pts[i];
      ctx.fillStyle = '#86d860';
      ctx.beginPath();
      ctx.ellipse(x + (i % 4 ? 8 : -8), y, 6, 2.6, i % 4 ? -0.5 : 0.5, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#e8dcc0';
      ctx.beginPath();
      ctx.moveTo(x + 3, y + 2);
      ctx.lineTo(x + 8, y - 1);
      ctx.lineTo(x + 3, y - 2);
      ctx.fill();
    }
  },

  wave(ctx, it, f) {
    const x = it.fromX + (it.toX - it.fromX) * easeOut(f);
    const h = 70 * Math.sin(Math.PI * Math.min(1, f * 1.2));
    const dir = Math.sign(it.toX - it.fromX) || 1;
    ctx.translate(x, it.y);
    ctx.scale(dir, 1);
    const g = ctx.createLinearGradient(0, -h, 0, 10);
    g.addColorStop(0, rgba('#ffffff', 0.9));
    g.addColorStop(0.3, rgba(it.colour, 0.85));
    g.addColorStop(1, rgba(shade(it.colour, -0.4), 0.7));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-160, 10);
    ctx.quadraticCurveTo(-60, -h * 0.3, -10, -h);
    ctx.quadraticCurveTo(20, -h * 1.05, 26, -h * 0.7);
    ctx.quadraticCurveTo(10, -h * 0.75, 14, -h * 0.45);
    ctx.quadraticCurveTo(30, -h * 0.2, 40, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = rgba('#ffffff', 0.8);
    ctx.lineWidth = 2;
    ctx.stroke();
  },

  puff(ctx, it, f) {
    const r = it.r * (0.5 + f);
    ctx.globalAlpha = Math.sin(Math.PI * f) * 0.75;
    const g = ctx.createRadialGradient(it.x, it.y - f * 20, 0, it.x, it.y - f * 20, r);
    g.addColorStop(0, rgba(mix(it.colour, '#ffffff', 0.3), 0.8));
    g.addColorStop(0.6, rgba(it.colour, 0.5));
    g.addColorStop(1, rgba(it.colour, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(it.x, it.y - f * 20, r, 0, TAU);
    ctx.fill();
  },

  ground(ctx, it, f) {
    ctx.translate(it.x, it.y);
    ctx.scale(1, 0.25);
    ctx.strokeStyle = rgba(it.colour, 1 - f);
    ctx.lineWidth = 8 * (1 - f) + 1;
    ctx.beginPath();
    ctx.arc(0, 0, it.r * easeOut(f), 0, TAU);
    ctx.stroke();
    // Cracks.
    ctx.strokeStyle = rgba('#1a1410', 0.8 * (1 - f));
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const a = i * 1.05 + 0.3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * it.r * 0.4, Math.sin(a) * it.r * 0.4);
      ctx.lineTo(Math.cos(a + 0.2) * it.r * 0.6, Math.sin(a + 0.2) * it.r * 0.6);
      ctx.stroke();
    }
  },

  projectile(ctx, it, f, now, fx) {
    const t = f;
    const arc = it.arc || 0;
    const x = it.from[0] + (it.to[0] - it.from[0]) * t;
    const y = it.from[1] + (it.to[1] - it.from[1]) * t - Math.sin(Math.PI * t) * arc;
    const dx = it.to[0] - it.from[0];
    const dy = it.to[1] - it.from[1] - Math.cos(Math.PI * t) * arc * Math.PI;
    const ang = Math.atan2(dy, dx);
    const e = { main: it.colour, core: it.core || '#ffffff' };
    const k = it.scale || 1;
    // Trail particles.
    if (Math.random() < 0.9) {
      fx.emit(x, y, { count: 1, speed: [5, 30], colour: [e.main, e.core], kind: it.trail || 'glow', life: [200, 500], size: [1.5, 3.5] });
    }
    ctx.globalCompositeOperation = 'lighter';
    switch (it.look) {
      case 'fireball': {
        radial(ctx, x, y, 34 * k, e.main, 0.8);
        radial(ctx, x, y, 14 * k, e.core, 1);
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.scale(k, k);
        ctx.fillStyle = rgba(e.main, 0.7);
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.quadraticCurveTo(-10, -14, -46, Math.sin(now * 0.05) * 4);
        ctx.quadraticCurveTo(-10, 14, 10, 0);
        ctx.fill();
        break;
      }
      case 'ice': {
        radial(ctx, x, y, 26 * k, e.main, 0.6);
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.scale(k, k);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#dff8ff';
        ctx.strokeStyle = '#4aa8d8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(26, 0); ctx.lineTo(-6, -6); ctx.lineTo(-22, 0); ctx.lineTo(-6, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.9)';
        ctx.beginPath();
        ctx.moveTo(24, -1); ctx.lineTo(-6, -4); ctx.lineTo(-4, -1);
        ctx.fill();
        break;
      }
      case 'book': {
        ctx.globalCompositeOperation = 'source-over';
        ctx.translate(x, y);
        ctx.rotate(now * 0.02);
        ctx.fillStyle = it.core || '#8a2a3a';
        ctx.fillRect(-11, -8, 22, 16);
        ctx.fillStyle = '#f3ecd9';
        ctx.fillRect(-9, -6, 18, 12);
        ctx.strokeStyle = '#2a1830';
        ctx.lineWidth = 1;
        ctx.strokeRect(-11, -8, 22, 16);
        break;
      }
      case 'sonic': {
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.strokeStyle = rgba(e.main, 0.9);
        for (let i = 0; i < 3; i++) {
          const r = 10 + i * 9 + (now * 0.06) % 9;
          ctx.lineWidth = 3 - i * 0.7;
          ctx.beginPath();
          ctx.arc(-i * 12, 0, r, -0.9, 0.9);
          ctx.stroke();
        }
        break;
      }
      case 'glob': {
        radial(ctx, x, y, 22, e.main, 0.7);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = e.main;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, TAU);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.8)';
        ctx.beginPath();
        ctx.arc(x - 2, y - 2, 2.2, 0, TAU);
        ctx.fill();
        break;
      }
      case 'bomb': {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#2a2a33';
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, TAU);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 3, 0, TAU);
        ctx.fill();
        ctx.globalCompositeOperation = 'lighter';
        radial(ctx, x + 6, y - 9, 12, '#ffcf5a', 0.9);
        break;
      }
      case 'orb':
      default: {
        radial(ctx, x, y, 30 * k, e.main, 0.8);
        radial(ctx, x, y, 10 * k, e.core, 1);
        ctx.strokeStyle = rgba(e.core, 0.8);
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.ellipse(x, y, 14 * k, 6 * k, now * 0.01, 0, TAU);
        ctx.stroke();
        if (k > 1.2) {
          ctx.beginPath();
          ctx.ellipse(x, y, 6 * k, 15 * k, -now * 0.012, 0, TAU);
          ctx.stroke();
        }
      }
    }
  },

};

/* ---------------------------------------------------------------
   Status auras on a fighter
   --------------------------------------------------------------- */

/**
 * Small looping visuals for status effects. (x, y) is the fighter's feet,
 * `top` how tall it is, all in world units.
 */
export function drawStatusAuras(ctx, statuses, x, y, top, now, fx) {
  const has = (id) => statuses && statuses[id] > 0;
  if (has('burn') && Math.random() < 0.35) {
    fx.emit(x + rand(-30, 30), y - rand(10, top * 0.6), { count: 1, speed: [10, 40], colour: ['#ff8a3a', '#ffd06a'], kind: 'glow', life: [400, 700], size: [2, 4], up: 70, gravity: -60 });
  }
  if (has('poison') && Math.random() < 0.25) {
    fx.emit(x + rand(-30, 30), y - rand(0, top * 0.5), { count: 1, speed: [5, 20], colour: '#a6ff5a', kind: 'glow', life: [600, 1000], size: [1.6, 3], up: 40, gravity: -30 });
  }
  if (has('bleed') && Math.random() < 0.15) {
    fx.emit(x + rand(-20, 20), y - rand(top * 0.3, top * 0.7), { count: 1, speed: [5, 20], colour: '#d0283a', kind: 'drop', life: [400, 700], size: [1.4, 2.4], gravity: 400 });
  }
  ctx.save();
  if (has('stun')) {
    for (let i = 0; i < 3; i++) {
      const a = now * 0.005 + i * (TAU / 3);
      const sx = x + Math.cos(a) * 22;
      const sy = y - top - 8 + Math.sin(a) * 6;
      ctx.fillStyle = '#ffe680';
      ctx.strokeStyle = '#8a6a10';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k < 10; k++) {
        const r = k % 2 ? 2.6 : 6;
        const ang = k * (TAU / 10) - Math.PI / 2;
        k ? ctx.lineTo(sx + Math.cos(ang) * r, sy + Math.sin(ang) * r) : ctx.moveTo(sx + Math.cos(ang) * r, sy + Math.sin(ang) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  if (has('mark')) {
    const pulse = 1 + 0.1 * Math.sin(now * 0.008);
    ctx.translate(x, y - top * 0.55);
    ctx.rotate(now * 0.0015);
    ctx.scale(pulse, pulse);
    ctx.strokeStyle = 'rgba(122,170,255,.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, TAU);
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(34, 0);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** The guard barrier around the player (Ironclad Charge's ward). */
export function drawBarrier(ctx, x, y, h, stacks, now) {
  if (!stacks) return;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const r = h * 0.62;
  const cy = y - h * 0.5;
  const pulse = 0.85 + 0.15 * Math.sin(now * 0.004);
  ctx.strokeStyle = `rgba(120,190,255,${0.55 * pulse})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x, cy, r * 0.62, r, 0, 0, TAU);
  ctx.stroke();
  // Hex pattern shimmer.
  ctx.globalAlpha = 0.25 * pulse;
  for (let i = 0; i < 8; i++) {
    const a = now * 0.001 + i * (TAU / 8);
    const px = x + Math.cos(a) * r * 0.5;
    const py = cy + Math.sin(a) * r * 0.85;
    ctx.beginPath();
    for (let k = 0; k <= 6; k++) {
      const ang = k * (TAU / 6);
      const p = [px + Math.cos(ang) * 7, py + Math.sin(ang) * 7];
      k ? ctx.lineTo(...p) : ctx.moveTo(...p);
    }
    ctx.stroke();
  }
  ctx.restore();
}
