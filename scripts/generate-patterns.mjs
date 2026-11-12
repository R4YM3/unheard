// Generates the homepage chapter patterns exactly as drawn on the design canvas
// (Home-Verhaal-Desktop / Home-Verhaal-Mobiel), as light and dark SVG files.
// Usage: node patterns.mjs <outdir>
import { writeFileSync, mkdirSync } from 'node:fs';

const ring = (cx, cy, r, k, rx, ry, steps) => {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * Math.PI * 2;
    const w = 1 + 0.14 * Math.sin(3 * a + k) + 0.07 * Math.sin(5 * a - k * 1.7);
    pts.push(
      `${(cx + Math.cos(a) * r * w * rx).toFixed(1)} ${(cy + Math.sin(a) * r * w * ry).toFixed(1)}`,
    );
  }
  return 'M' + pts.join(' ') + 'Z';
};
const wave = (y, amp, f, ph, x0, x1, step) => {
  const pts = [];
  for (let x = x0; x <= x1; x += step) {
    const yy = y + amp * Math.sin(x / f + ph) + amp * 0.45 * Math.sin(x / (f * 0.43) - ph * 1.3);
    pts.push(`${x} ${yy.toFixed(1)}`);
  }
  return 'M' + pts.join(' ');
};

const desktop = {
  hero: () => {
    const d = [];
    [
      [260, 160, 0.4],
      [1180, 470, 2.1],
      [760, 40, 4],
    ].forEach(([cx, cy, k]) => {
      for (let i = 1; i <= 9; i += 1) d.push(ring(cx, cy, i * 34, k + i * 0.18, 1.4, 0.85, 56));
    });
    return d;
  },
  roads: () => [
    'M-20 200 C 240 160, 420 60, 720 90 S 1180 40, 1460 20',
    'M-20 60 C 220 90, 460 200, 760 170 S 1200 220, 1460 150',
    'M980 -20 C 990 60, 1040 120, 1100 140 S 1260 220, 1300 260',
  ],
  strata: () => {
    const d = [];
    for (let i = 0; i < 18; i += 1)
      d.push(wave(20 + i * 34, 5 + (i % 3) * 3, 40 + i * 2, i * 0.7, -10, 410, 10));
    return d;
  },
  ridge: () => {
    const d = [];
    for (let i = 0; i < 6; i += 1)
      d.push(wave(70 + i * 32, 30 - i * 3, 160 - i * 10, i * 1.1, -20, 1460, 20));
    return d;
  },
  ripples: () => {
    const d = [];
    [
      [1150, 160],
      [260, 420],
    ].forEach(([cx, cy], j) => {
      for (let i = 1; i <= 7; i += 1) d.push(ring(cx, cy, i * 34, j, 1.7, 0.5, 56));
    });
    return d;
  },
};

const mobile = {
  hero: () => {
    const d = [];
    for (let i = 1; i <= 8; i += 1) d.push(ring(320, 40, i * 22, 0.6 + i * 0.18, 1.4, 0.85, 48));
    return d;
  },
  roads: () => [
    'M-10 120 C 80 100, 140 40, 220 50 S 330 20, 400 10',
    'M-10 30 C 70 50, 150 110, 230 100 S 340 130, 400 120',
    'M260 -10 C 266 30, 280 70, 300 90',
  ],
  strata: () => {
    const d = [];
    for (let i = 0; i < 6; i += 1)
      d.push(wave(14 + i * 22, 3 + (i % 3) * 2, 36 + i * 3, i * 0.7, -10, 400, 10));
    return d;
  },
  ridge: () => {
    const d = [];
    for (let i = 0; i < 5; i += 1)
      d.push(wave(36 + i * 22, 14 - i * 2, 60 - i * 4, i * 1.1, -10, 400, 10));
    return d;
  },
  ripples: () => {
    const d = [];
    for (let i = 1; i <= 6; i += 1) d.push(ring(300, 40, i * 18, 1, 1.7, 0.5, 48));
    return d;
  },
};

// [viewBox w, h, preserveAspectRatio, light stroke, light opacity, width, dashed]
const spec = {
  desktop: {
    hero: [1440, 640, 'xMidYMid slice', '#33433a', 0.12, 1.1],
    roads: [1440, 240, 'xMidYMin slice', '#3a342b', 0.28, 1.4, true],
    strata: [400, 640, 'xMaxYMid slice', '#3a2c2a', 0.16, 1.1],
    ridge: [1440, 260, 'none', '#3a342b', 0.16, 1.2],
    ripples: [1440, 520, 'xMidYMid slice', '#33433a', 0.12, 1.1],
  },
  mobile: {
    hero: [390, 300, 'xMidYMin slice', '#33433a', 0.14, 1],
    roads: [390, 140, 'xMidYMin slice', '#3a342b', 0.35, 1.3, true],
    strata: [390, 140, 'xMidYMin slice', '#3a2c2a', 0.16, 1.1],
    ridge: [390, 140, 'none', '#3a342b', 0.16, 1.2],
    ripples: [390, 140, 'xMidYMin slice', '#33433a', 0.12, 1.1],
  },
};

const out = process.argv[2];
mkdirSync(out, { recursive: true });
for (const [size, set] of Object.entries({ desktop, mobile })) {
  for (const [name, draw] of Object.entries(set)) {
    const [w, h, par, stroke, opacity, width, dashed] = spec[size][name];
    const d = draw().join('');
    for (const dark of [false, true]) {
      const colour = dark ? '#e6ece7' : stroke;
      const op = dark ? +(opacity * 0.6).toFixed(3) : opacity;
      const dash = dashed
        ? ` stroke-dasharray="${size === 'mobile' ? '2 7' : '2 8'}" stroke-linecap="round"`
        : '';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="${par}"><path d="${d}" fill="none" stroke="${colour}" stroke-opacity="${op}" stroke-width="${width}"${dash}/></svg>\n`;
      const file = `${out}/${name}${size === 'mobile' ? '-mobile' : ''}${dark ? '-dark' : ''}.svg`;
      writeFileSync(file, svg);
    }
  }
}
