import * as THREE from 'three';
import { createSeededRandom } from './textureUtils';

type Ctx = CanvasRenderingContext2D;

function createCanvas(width: number, height: number): [HTMLCanvasElement, Ctx | null] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d')];
}

function toColorTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * Aged walnut planking: seamless grain, knots, pores, polished wear,
 * scratches and dents, with a matching bump map for physical relief.
 */
export function createWalnutWoodTextures(): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const size = 1024;
  const [canvas, ctx] = createCanvas(size, size);
  const [bumpCanvas, bCtx] = createCanvas(size, size);

  if (ctx && bCtx) {
    const rand = createSeededRandom(1847);
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, size, size);

    const plankCount = 4;
    const plankH = size / plankCount;
    const plankTones = ['#4E3221', '#432A1B', '#55392A', '#3F2819'];

    for (let p = 0; p < plankCount; p++) {
      const y0 = p * plankH;
      ctx.fillStyle = plankTones[p];
      ctx.fillRect(0, y0, size, plankH);

      // Soft tonal streaks across each plank
      for (let s = 0; s < 6; s++) {
        const sy = y0 + rand() * plankH;
        const sh = 8 + rand() * 30;
        const tone = rand() > 0.5 ? '104, 68, 42' : '22, 12, 6';
        const grad = ctx.createLinearGradient(0, sy, 0, sy + sh);
        grad.addColorStop(0, `rgba(${tone}, 0)`);
        grad.addColorStop(0.5, `rgba(${tone}, ${0.12 + rand() * 0.12})`);
        grad.addColorStop(1, `rgba(${tone}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, sy, size, sh);
      }

      // Seamless (horizontally periodic) wavy grain lines
      const phase = rand() * Math.PI * 2;
      for (let g = 0; g < 70; g++) {
        const gy = y0 + ((g + rand() * 0.6) / 70) * plankH;
        const amp = 2 + rand() * 6;
        const k = 1 + Math.floor(rand() * 3);
        const freq = (Math.PI * 2 * k) / size;
        const dark = rand() > 0.35;
        const alpha = dark ? 0.16 + rand() * 0.3 : 0.08 + rand() * 0.16;
        ctx.strokeStyle = dark ? `rgba(22, 12, 6, ${alpha})` : `rgba(128, 88, 56, ${alpha})`;
        ctx.lineWidth = 0.6 + rand() * 1.6;
        const shade = dark ? 96 + Math.floor(rand() * 20) : 136;
        bCtx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, 0.55)`;
        bCtx.lineWidth = ctx.lineWidth;

        ctx.beginPath();
        bCtx.beginPath();
        for (let x = 0; x <= size; x += 16) {
          const yy =
            gy +
            Math.sin(x * freq + phase + g * 0.3) * amp +
            Math.sin(x * freq * 3 + g) * amp * 0.25;
          if (x === 0) {
            ctx.moveTo(x, yy);
            bCtx.moveTo(x, yy);
          } else {
            ctx.lineTo(x, yy);
            bCtx.lineTo(x, yy);
          }
        }
        ctx.stroke();
        bCtx.stroke();
      }

      // Occasional knot
      if (rand() < 0.65) {
        const kx = 120 + rand() * (size - 240);
        const ky = y0 + plankH * (0.3 + rand() * 0.4);
        for (let r = 3; r < 30; r += 4) {
          ctx.strokeStyle = `rgba(24, 12, 6, ${0.42 - r * 0.009})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(kx, ky, r * 1.9, r * 0.7, 0, 0, Math.PI * 2);
          ctx.stroke();
          bCtx.strokeStyle = 'rgba(90, 90, 90, 0.5)';
          bCtx.beginPath();
          bCtx.ellipse(kx, ky, r * 1.9, r * 0.7, 0, 0, Math.PI * 2);
          bCtx.stroke();
        }
        ctx.fillStyle = 'rgba(18, 9, 4, 0.75)';
        ctx.beginPath();
        ctx.ellipse(kx, ky, 5, 2.4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Plank seams with tiny bevel highlight (also at the tile edges so repeats connect)
    for (let p = 0; p <= plankCount; p++) {
      const sy = p * plankH;
      ctx.fillStyle = 'rgba(10, 5, 2, 0.85)';
      ctx.fillRect(0, sy - 1.5, size, 3);
      ctx.fillStyle = 'rgba(150, 108, 72, 0.22)';
      ctx.fillRect(0, sy + 1.5, size, 1.5);
      bCtx.fillStyle = '#2E2E2E';
      bCtx.fillRect(0, sy - 2, size, 4);
    }

    // Open pores
    ctx.fillStyle = 'rgba(16, 8, 4, 0.32)';
    for (let i = 0; i < 2600; i++) {
      ctx.fillRect(rand() * size, rand() * size, 2 + rand() * 5, 1);
    }

    // Polished wear patches where hands rest on the table
    for (let i = 0; i < 7; i++) {
      const wx = rand() * size;
      const wy = rand() * size;
      const wr = 60 + rand() * 140;
      const wear = ctx.createRadialGradient(wx, wy, 0, wx, wy, wr);
      wear.addColorStop(0, 'rgba(156, 114, 74, 0.13)');
      wear.addColorStop(1, 'rgba(156, 114, 74, 0)');
      ctx.fillStyle = wear;
      ctx.fillRect(wx - wr, wy - wr, wr * 2, wr * 2);
    }

    // Fine scratches
    for (let i = 0; i < 120; i++) {
      const sx = rand() * size;
      const sy = rand() * size;
      const len = 10 + rand() * 90;
      const a = (rand() - 0.5) * Math.PI * 0.9;
      const ex = sx + Math.cos(a) * len;
      const ey = sy + Math.sin(a) * len;
      ctx.strokeStyle = `rgba(176, 136, 96, ${0.06 + rand() * 0.16})`;
      ctx.lineWidth = 0.6 + rand() * 0.7;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      bCtx.strokeStyle = 'rgba(70, 70, 70, 0.6)';
      bCtx.lineWidth = 1;
      bCtx.beginPath();
      bCtx.moveTo(sx, sy);
      bCtx.lineTo(ex, ey);
      bCtx.stroke();
    }

    // Small dents with a faint light rim
    for (let i = 0; i < 40; i++) {
      const dx = rand() * size;
      const dy = rand() * size;
      const dr = 1.5 + rand() * 3.5;
      ctx.fillStyle = 'rgba(14, 7, 3, 0.34)';
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150, 110, 70, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(dx + 0.6, dy + 0.6, dr + 0.8, 0, Math.PI * 2);
      ctx.stroke();
      bCtx.fillStyle = '#5A5A5A';
      bCtx.beginPath();
      bCtx.arc(dx, dy, dr, 0, Math.PI * 2);
      bCtx.fill();
    }
  }

  const map = toColorTexture(canvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  [map, bumpMap].forEach((tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 2);
  });
  return { map, bumpMap };
}

/**
 * Carved rail-top engraving: bevelled edges, incised double rules, a navigator's
 * degree scale, a running Greek-key band, and compass-star medallions.
 * The pattern is symmetric across the rail width so face UV orientation never matters.
 */
export function createEngravedRailTextures(
  lengthUnits: number,
  widthUnits: number,
  vertical: boolean
): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture } {
  const pxPerUnit = 46;
  const lenPx = Math.round(lengthUnits * pxPerUnit);
  const widPx = Math.round(widthUnits * pxPerUnit);
  const cw = vertical ? widPx : lenPx;
  const ch = vertical ? lenPx : widPx;
  const [canvas, ctx] = createCanvas(cw, ch);
  const [bumpCanvas, bCtx] = createCanvas(cw, ch);

  if (ctx && bCtx) {
    const rand = createSeededRandom(vertical ? 2207 : 3319);
    const toLocal = (c: Ctx) => {
      if (vertical) {
        c.translate(widPx, 0);
        c.rotate(Math.PI / 2);
      }
    };
    ctx.save();
    bCtx.save();
    toLocal(ctx);
    toLocal(bCtx);

    // Wood base with longitudinal grain
    ctx.fillStyle = '#4A2F1F';
    ctx.fillRect(0, 0, lenPx, widPx);
    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, lenPx, widPx);
    for (let g = 0; g < 18; g++) {
      const gy = (g / 18) * widPx + rand() * 3;
      ctx.strokeStyle = `rgba(22, 12, 6, ${0.15 + rand() * 0.25})`;
      ctx.lineWidth = 0.6 + rand() * 1.2;
      ctx.beginPath();
      for (let x = 0; x <= lenPx; x += 24) {
        const yy = gy + Math.sin(x * 0.01 + g) * 1.6;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }

    // Rounded bevel shading (ambient occlusion toward both edges)
    const bevel = ctx.createLinearGradient(0, 0, 0, widPx);
    bevel.addColorStop(0, 'rgba(8, 4, 2, 0.6)');
    bevel.addColorStop(0.09, 'rgba(8, 4, 2, 0)');
    bevel.addColorStop(0.91, 'rgba(8, 4, 2, 0)');
    bevel.addColorStop(1, 'rgba(8, 4, 2, 0.6)');
    ctx.fillStyle = bevel;
    ctx.fillRect(0, 0, lenPx, widPx);
    ctx.fillStyle = 'rgba(176, 132, 86, 0.22)';
    ctx.fillRect(0, 7, lenPx, 1.2);
    ctx.fillRect(0, widPx - 8.2, lenPx, 1.2);

    const bevelBump = bCtx.createLinearGradient(0, 0, 0, widPx);
    bevelBump.addColorStop(0, '#404040');
    bevelBump.addColorStop(0.1, '#808080');
    bevelBump.addColorStop(0.9, '#808080');
    bevelBump.addColorStop(1, '#404040');
    bCtx.fillStyle = bevelBump;
    bCtx.fillRect(0, 0, lenPx, widPx);

    const groove = (draw: (c: Ctx) => void, lineWidth: number) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(10, 5, 2, 0.78)';
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      draw(ctx);
      ctx.stroke();
      ctx.translate(0.8, 0.8);
      ctx.strokeStyle = 'rgba(184, 140, 92, 0.26)';
      ctx.lineWidth = lineWidth * 0.55;
      ctx.beginPath();
      draw(ctx);
      ctx.stroke();
      ctx.restore();

      bCtx.save();
      bCtx.lineCap = 'round';
      bCtx.lineJoin = 'round';
      bCtx.strokeStyle = '#2A2A2A';
      bCtx.lineWidth = lineWidth + 0.4;
      bCtx.beginPath();
      draw(bCtx);
      bCtx.stroke();
      bCtx.restore();
    };

    const endInset = 140; // ends sit under the brass corner brackets
    const medallionX = lenPx / 2;
    const medallionR = widPx / 2 - 6;
    const starXs = [lenPx * 0.25, lenPx * 0.75];

    // Incised double rules along both edges
    [12, 16, widPx - 12, widPx - 16].forEach((ly) => {
      groove((c) => {
        c.moveTo(endInset * 0.6, ly);
        c.lineTo(lenPx - endInset * 0.6, ly);
      }, 1.4);
    });

    // Navigator's degree scale ticks on both edges
    const isReserved = (x: number, pad: number) =>
      x < endInset ||
      x > lenPx - endInset ||
      Math.abs(x - medallionX) < medallionR + pad ||
      starXs.some((sx) => Math.abs(x - sx) < 16 + pad);

    for (let x = endInset, i = 0; x <= lenPx - endInset; x += 9, i++) {
      if (Math.abs(x - medallionX) < medallionR + 4) continue;
      const len = i % 5 === 0 ? 7 : 4;
      groove((c) => {
        c.moveTo(x, 17);
        c.lineTo(x, 17 + len);
        c.moveTo(x, widPx - 17);
        c.lineTo(x, widPx - 17 - len);
      }, 1);
    }

    // Running Greek-key band down the centre
    const bandTop = 29;
    const bandH = widPx - bandTop * 2;
    const unitW = bandH;
    for (let x = endInset; x + unitW <= lenPx - endInset; x += unitW) {
      if (isReserved(x, 2) || isReserved(x + unitW, 2)) continue;
      groove((c) => {
        const bx = x;
        const by = bandTop;
        c.moveTo(bx, by + bandH);
        c.lineTo(bx + unitW, by + bandH);
        c.moveTo(bx + unitW * 0.15, by + bandH);
        c.lineTo(bx + unitW * 0.15, by);
        c.lineTo(bx + unitW * 0.85, by);
        c.lineTo(bx + unitW * 0.85, by + bandH * 0.7);
        c.lineTo(bx + unitW * 0.4, by + bandH * 0.7);
        c.lineTo(bx + unitW * 0.4, by + bandH * 0.35);
        c.lineTo(bx + unitW * 0.62, by + bandH * 0.35);
      }, 1.3);
    }

    // Compass-star medallion at the centre of the rail
    groove((c) => {
      c.arc(medallionX, widPx / 2, medallionR, 0, Math.PI * 2);
      c.moveTo(medallionX + medallionR - 5, widPx / 2);
      c.arc(medallionX, widPx / 2, medallionR - 5, 0, Math.PI * 2);
    }, 1.4);
    groove((c) => {
      for (let p = 0; p < 8; p++) {
        const a = (p / 8) * Math.PI * 2;
        const len = p % 2 === 0 ? medallionR - 7 : (medallionR - 7) * 0.58;
        const side = 4;
        const tipX = medallionX + Math.cos(a) * len;
        const tipY = widPx / 2 + Math.sin(a) * len;
        const lx = medallionX + Math.cos(a - Math.PI / 2) * side;
        const ly = widPx / 2 + Math.sin(a - Math.PI / 2) * side;
        const rx = medallionX + Math.cos(a + Math.PI / 2) * side;
        const ry = widPx / 2 + Math.sin(a + Math.PI / 2) * side;
        c.moveTo(lx, ly);
        c.lineTo(tipX, tipY);
        c.lineTo(rx, ry);
      }
    }, 1.2);

    // Small four-point navigation stars at the quarter points
    starXs.forEach((sx) => {
      groove((c) => {
        const cy = widPx / 2;
        const r = 12;
        c.moveTo(sx, cy - r);
        c.lineTo(sx + 3, cy - 3);
        c.lineTo(sx + r, cy);
        c.lineTo(sx + 3, cy + 3);
        c.lineTo(sx, cy + r);
        c.lineTo(sx - 3, cy + 3);
        c.lineTo(sx - r, cy);
        c.lineTo(sx - 3, cy - 3);
        c.closePath();
      }, 1.1);
    });

    // Worn scuffs along the edges
    for (let i = 0; i < Math.round(lenPx / 40); i++) {
      const sx = rand() * lenPx;
      const sy = rand() > 0.5 ? 2 + rand() * 6 : widPx - 2 - rand() * 6;
      ctx.fillStyle = `rgba(160, 118, 76, ${0.08 + rand() * 0.12})`;
      ctx.fillRect(sx, sy, 6 + rand() * 22, 1.5);
    }

    ctx.restore();
    bCtx.restore();
  }

  return { map: toColorTexture(canvas), bumpMap: new THREE.CanvasTexture(bumpCanvas) };
}

/**
 * Worn tooled-leather writing bed with gilt double rules, dotted roll,
 * corner fleurons and darkened edges where it meets the walnut rails.
 */
export function createTooledLeatherTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 678;
  const [canvas, ctx] = createCanvas(w, h);
  if (ctx) {
    const rand = createSeededRandom(911);
    ctx.fillStyle = '#3A2418';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 260; i++) {
      const bx = rand() * w;
      const by = rand() * h;
      const br = 10 + rand() * 60;
      const tone = rand() > 0.5 ? '20, 10, 5' : '92, 60, 38';
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
      g.addColorStop(0, `rgba(${tone}, ${0.06 + rand() * 0.08})`);
      g.addColorStop(1, `rgba(${tone}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(bx - br, by - br, br * 2, br * 2);
    }
    for (let i = 0; i < 9000; i++) {
      ctx.fillStyle = rand() > 0.5 ? 'rgba(12, 6, 3, 0.22)' : 'rgba(110, 76, 50, 0.14)';
      ctx.fillRect(rand() * w, rand() * h, 1.2, 1.2);
    }

    // Gilt tooling (segmented for worn, uneven gold)
    const giltLine = (x0: number, y0: number, x1: number, y1: number, lw: number) => {
      const segs = 24;
      for (let s = 0; s < segs; s++) {
        const t0 = s / segs;
        const t1 = (s + 1) / segs;
        ctx.strokeStyle = `rgba(200, 160, 88, ${0.4 + rand() * 0.42})`;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(x0 + (x1 - x0) * t0, y0 + (y1 - y0) * t0);
        ctx.lineTo(x0 + (x1 - x0) * t1, y0 + (y1 - y0) * t1);
        ctx.stroke();
      }
    };
    const giltRect = (inset: number, lw: number) => {
      giltLine(inset, inset, w - inset, inset, lw);
      giltLine(w - inset, inset, w - inset, h - inset, lw);
      giltLine(w - inset, h - inset, inset, h - inset, lw);
      giltLine(inset, h - inset, inset, inset, lw);
    };
    giltRect(30, 2.2);
    giltRect(44, 1.2);

    ctx.fillStyle = 'rgba(200, 160, 88, 0.55)';
    for (let x = 48; x < w - 48; x += 11) {
      ctx.fillRect(x, 36.5, 1.6, 1.6);
      ctx.fillRect(x, h - 38, 1.6, 1.6);
    }
    for (let y = 48; y < h - 48; y += 11) {
      ctx.fillRect(36.5, y, 1.6, 1.6);
      ctx.fillRect(w - 38, y, 1.6, 1.6);
    }

    // Corner fleurons
    [
      [44, 44],
      [w - 44, 44],
      [44, h - 44],
      [w - 44, h - 44],
    ].forEach(([fx, fy]) => {
      ctx.strokeStyle = 'rgba(206, 166, 92, 0.75)';
      ctx.lineWidth = 1.4;
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.arc(fx + Math.cos(a) * 7, fy + Math.sin(a) * 7, 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(206, 166, 92, 0.8)';
      ctx.beginPath();
      ctx.arc(fx, fy, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Edge occlusion where the leather meets the rails
    const edges: [number, number, number, number][] = [
      [0, 0, 0, 34],
      [0, h, 0, h - 34],
      [0, 0, 34, 0],
      [w, 0, w - 34, 0],
    ];
    edges.forEach(([x0, y0, x1, y1]) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
  }
  return toColorTexture(canvas);
}

/**
 * Etched brass compass-rose medallion for the corner reinforcement caps.
 */
export function createEngravedBrassMedallionTexture(): THREE.CanvasTexture {
  const s = 256;
  const [canvas, ctx] = createCanvas(s, s);
  if (ctx) {
    const c = s / 2;
    const base = ctx.createRadialGradient(c * 0.8, c * 0.8, 10, c, c, c);
    base.addColorStop(0, '#D6B26A');
    base.addColorStop(0.7, '#B48E4C');
    base.addColorStop(1, '#7E5F2C');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, s, s);

    ctx.strokeStyle = 'rgba(58, 38, 14, 0.75)';
    [118, 108, 70].forEach((r, i) => {
      ctx.lineWidth = i === 0 ? 3 : 1.6;
      ctx.beginPath();
      ctx.arc(c, c, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    for (let t = 0; t < 32; t++) {
      const a = (t / 32) * Math.PI * 2;
      const r0 = t % 4 === 0 ? 92 : 100;
      ctx.lineWidth = t % 4 === 0 ? 2 : 1.2;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
      ctx.lineTo(c + Math.cos(a) * 108, c + Math.sin(a) * 108);
      ctx.stroke();
    }
    for (let p = 0; p < 8; p++) {
      const a = (p / 8) * Math.PI * 2 - Math.PI / 2;
      const len = p % 2 === 0 ? 86 : 52;
      const tipX = c + Math.cos(a) * len;
      const tipY = c + Math.sin(a) * len;
      const lx = c + Math.cos(a - Math.PI / 2) * 13;
      const ly = c + Math.sin(a - Math.PI / 2) * 13;
      const rx = c + Math.cos(a + Math.PI / 2) * 13;
      const ry = c + Math.sin(a + Math.PI / 2) * 13;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.lineTo(lx, ly);
      ctx.lineTo(tipX, tipY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(70, 46, 16, 0.55)';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(rx, ry);
      ctx.strokeStyle = 'rgba(58, 38, 14, 0.8)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }
  return toColorTexture(canvas);
}

/**
 * Small warm equirectangular environment used only by the table's brass fittings
 * to pick up candle and lantern highlights (not applied scene-wide).
 */
export function createWarmCabinEnvironmentTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const [canvas, ctx] = createCanvas(w, h);
  if (ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#24160E');
    sky.addColorStop(0.35, '#6B4524');
    sky.addColorStop(0.5, '#C08A48');
    sky.addColorStop(0.62, '#5A3A20');
    sky.addColorStop(1, '#1A100A');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const glow = (x: number, y: number, r: number, color: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(255, 220, 160, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    glow(w * 0.2, h * 0.42, 34, 'rgba(255, 236, 184, 1)');
    glow(w * 0.62, h * 0.12, 60, 'rgba(246, 213, 142, 0.85)');
    glow(w * 0.85, h * 0.4, 40, 'rgba(217, 167, 96, 0.6)');
  }
  const tex = toColorTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  return tex;
}

/**
 * Soft contact-shadow decal placed under the parchment so it reads as a raised sheet.
 * Inner rectangle corresponds to the 34 x 22 parchment on a 36.5 x 24.5 plane.
 */
export function createSoftContactShadowTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 352;
  const [canvas, ctx] = createCanvas(w, h);
  if (ctx) {
    const rw = Math.round((34 / 36.5) * w);
    const rh = Math.round((22 / 24.5) * h);
    const x0 = (w - rw) / 2;
    const y0 = (h - rh) / 2;
    const offset = 2000;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#000000';
    ctx.fillRect(x0 - offset, y0, rw, rh);
  }
  return new THREE.CanvasTexture(canvas);
}

/**
 * Warm radial halo sprite around the candle flame.
 */
export function createCandleHaloTexture(): THREE.CanvasTexture {
  const s = 128;
  const [canvas, ctx] = createCanvas(s, s);
  if (ctx) {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255, 240, 196, 0.85)');
    g.addColorStop(0.22, 'rgba(243, 200, 121, 0.35)');
    g.addColorStop(0.6, 'rgba(217, 140, 60, 0.08)');
    g.addColorStop(1, 'rgba(217, 140, 60, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  }
  return toColorTexture(canvas);
}
