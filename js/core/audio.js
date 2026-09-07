/* Procedural chiptune-ish SFX via WebAudio. No asset files, no dependencies.
   The context is created lazily on first user gesture so autoplay policies
   never leave us with a permanently suspended context. */

let ctx = null;
let master = null;
let sfxVolume = 0.5;
let musicVolume = 0.25;
let musicTimer = null;
let musicStep = 0;

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);
  return ctx;
}

export function unlock() {
  const c = ensureCtx();
  if (c && c.state === 'suspended') c.resume().catch(() => {});
}

export function setVolumes({ sfx, music }) {
  if (typeof sfx === 'number') sfxVolume = Math.max(0, Math.min(1, sfx));
  if (typeof music === 'number') musicVolume = Math.max(0, Math.min(1, music));
}

function tone({ freq = 440, dur = 0.12, type = 'square', vol = 0.25, slide = 0, delay = 0 }) {
  const c = ensureCtx();
  if (!c || sfxVolume <= 0) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol * sfxVolume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function noise({ dur = 0.18, vol = 0.2, delay = 0, filterFreq = 1200 }) {
  const c = ensureCtx();
  if (!c || sfxVolume <= 0) return;
  const t0 = c.currentTime + delay;
  const frames = Math.floor(c.sampleRate * dur);
  const buffer = c.createBuffer(1, frames, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = filterFreq;
  const gain = c.createGain();
  gain.gain.value = vol * sfxVolume;
  src.connect(filter).connect(gain).connect(master);
  src.start(t0);
}

export const sfx = {
  select:  () => tone({ freq: 520, dur: 0.06, vol: 0.15 }),
  confirm: () => { tone({ freq: 660, dur: 0.07, vol: 0.2 }); tone({ freq: 880, dur: 0.09, vol: 0.18, delay: 0.06 }); },
  back:    () => tone({ freq: 300, dur: 0.09, vol: 0.16, slide: -120 }),
  correct: () => { [660, 880, 1180].forEach((f, i) => tone({ freq: f, dur: 0.12, vol: 0.2, delay: i * 0.07 })); },
  wrong:   () => { tone({ freq: 220, dur: 0.2, vol: 0.22, type: 'sawtooth', slide: -90 }); noise({ dur: 0.14, vol: 0.1 }); },
  hit:     () => { noise({ dur: 0.16, vol: 0.28, filterFreq: 900 }); tone({ freq: 180, dur: 0.1, vol: 0.16, type: 'sawtooth', slide: -80 }); },
  crit:    () => { noise({ dur: 0.22, vol: 0.32, filterFreq: 2200 }); tone({ freq: 320, dur: 0.16, vol: 0.22, type: 'square', slide: -180 }); },
  hurt:    () => { tone({ freq: 160, dur: 0.22, vol: 0.24, type: 'sawtooth', slide: -70 }); },
  heal:    () => { [520, 700, 900].forEach((f, i) => tone({ freq: f, dur: 0.16, vol: 0.14, type: 'triangle', delay: i * 0.06 })); },
  loot:    () => { [700, 900, 1100, 1400].forEach((f, i) => tone({ freq: f, dur: 0.1, vol: 0.16, type: 'triangle', delay: i * 0.05 })); },
  levelUp: () => { [523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.18, vol: 0.2, delay: i * 0.1 })); },
  step:    () => tone({ freq: 130, dur: 0.04, vol: 0.06, type: 'triangle' }),
  descend: () => { [400, 330, 260, 200].forEach((f, i) => tone({ freq: f, dur: 0.18, vol: 0.18, type: 'triangle', delay: i * 0.09 })); },
  boss:    () => { [110, 110, 146, 110].forEach((f, i) => tone({ freq: f, dur: 0.3, vol: 0.26, type: 'sawtooth', delay: i * 0.22 })); },
  death:   () => { [330, 262, 196, 131, 98].forEach((f, i) => tone({ freq: f, dur: 0.34, vol: 0.22, type: 'square', delay: i * 0.18 })); },
  craft:   () => { noise({ dur: 0.1, vol: 0.16, filterFreq: 3000 }); tone({ freq: 880, dur: 0.14, vol: 0.16, delay: 0.08 }); }
};

/* --- Ambient loop: a slow minor arpeggio, deliberately sparse. --- */
const MUSIC_PATTERN = [
  110, 0, 164, 0, 130, 0, 164, 0,
  98,  0, 146, 0, 123, 0, 146, 0,
];

export function startMusic() {
  const c = ensureCtx();
  if (!c || musicTimer || musicVolume <= 0) return;
  musicTimer = setInterval(() => {
    const freq = MUSIC_PATTERN[musicStep % MUSIC_PATTERN.length];
    musicStep++;
    if (!freq || musicVolume <= 0) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.12 * musicVolume, t0 + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + 1);
  }, 460);
}

export function stopMusic() {
  if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
}
