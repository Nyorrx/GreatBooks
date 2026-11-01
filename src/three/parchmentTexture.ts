import * as THREE from 'three';
import { LITERARY_REALMS } from '../data/realms';
import { createSeededRandom } from './textureUtils';

type Point = [number, number];

function isPointInPolygon(x: number, y: number, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Maps 3D world coordinates on the parchment plane (width 34, depth 22)
 * to 2D canvas coordinates (2048 x 1320).
 */
function worldToCanvas(wx: number, wz: number, width: number, height: number): [number, number] {
  const u = (wx + 17) / 34;
  const v = (wz + 11) / 22;
  return [u * width, v * height];
}

export function createParchmentChartTextures(): {
  mapTexture: THREE.CanvasTexture;
  bumpTexture: THREE.CanvasTexture;
  alphaTexture: THREE.CanvasTexture | null;
} {
  const width = 2048;
  const height = 1320;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 660;
  const bCtx = bumpCanvas.getContext('2d');

  if (!ctx || !bCtx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return { mapTexture: fallback, bumpTexture: fallback, alphaTexture: null };
  }

  // 1. Aged Vellum Base & Warm Candlelit Vignette
  const baseGrad = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    width * 0.08,
    width * 0.5,
    height * 0.5,
    width * 0.68
  );
  baseGrad.addColorStop(0, '#F7EFE0');
  baseGrad.addColorStop(0.55, '#F0E2C4');
  baseGrad.addColorStop(0.85, '#DFCCA5');
  baseGrad.addColorStop(1, '#C5AB7C');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // 1b. Placement guards: every added decoration stays clear of the seven islands,
  // their 3D nameplates and hit areas, the title banner, and the 3D table props.
  const rand = createSeededRandom(1454);
  const islandZones = LITERARY_REALMS.map((realm) => {
    const [x, y] = worldToCanvas(realm.coordinates[0], realm.coordinates[2], width, height);
    return { x, y, r: realm.isFavoriteMasterpiece ? 280 : 240 };
  });
  const NAMEPLATE_HALF_W = 160;
  const NAMEPLATE_TOP = 90;
  const NAMEPLATE_BOTTOM = 255;
  const BANNER = { x0: width * 0.5 - 400, x1: width * 0.5 + 400, y1: 132 };
  const propZones = (
    [
      [-16.2, -9.2, 110], // candlestick
      [15.8, -9.8, 60], // map weight
      [-15.8, 9.8, 60], // map weight
      [16.2, -8.4, 70], // inkwell
      [-15.4, 8.6, 130], // dividers
      [15.6, 8.2, 110], // pocket compass
    ] as const
  ).map(([wx, wz, r]) => {
    const [x, y] = worldToCanvas(wx, wz, width, height);
    return { x, y, r };
  });
  const SAFE_MARGIN = 72;
  const occupied: { x: number; y: number; r: number }[] = [];

  const isClear = (x: number, y: number, radius: number, allowMargin = false): boolean => {
    if (
      !allowMargin &&
      (x - radius < SAFE_MARGIN ||
        x + radius > width - SAFE_MARGIN ||
        y - radius < SAFE_MARGIN ||
        y + radius > height - SAFE_MARGIN)
    ) {
      return false;
    }
    if (x + radius > BANNER.x0 && x - radius < BANNER.x1 && y - radius < BANNER.y1) return false;
    for (const z of islandZones) {
      if (Math.hypot(x - z.x, y - z.y) < z.r + radius) return false;
      if (
        x + radius > z.x - NAMEPLATE_HALF_W &&
        x - radius < z.x + NAMEPLATE_HALF_W &&
        y + radius > z.y + NAMEPLATE_TOP &&
        y - radius < z.y + NAMEPLATE_BOTTOM
      ) {
        return false;
      }
    }
    for (const p of propZones) {
      if (Math.hypot(x - p.x, y - p.y) < p.r + radius) return false;
    }
    return true;
  };
  const isFree = (x: number, y: number, radius: number) =>
    isClear(x, y, radius) && !occupied.some((o) => Math.hypot(x - o.x, y - o.y) < o.r + radius);
  const reserve = (x: number, y: number, r: number) => occupied.push({ x, y, r });

  // Draws on a temporary layer, then erases (feathered) every island footprint, nameplate
  // area and the title banner before compositing, so no decoration can overlap an island.
  const compositeMaskedLayer = (draw: (layer: CanvasRenderingContext2D) => void) => {
    const layerCanvas = document.createElement('canvas');
    layerCanvas.width = width;
    layerCanvas.height = height;
    const layer = layerCanvas.getContext('2d');
    if (!layer) return;
    draw(layer);
    layer.globalCompositeOperation = 'destination-out';
    islandZones.forEach((z) => {
      const feather = layer.createRadialGradient(z.x, z.y, z.r * 0.82, z.x, z.y, z.r);
      feather.addColorStop(0, 'rgba(0, 0, 0, 1)');
      feather.addColorStop(1, 'rgba(0, 0, 0, 0)');
      layer.fillStyle = feather;
      layer.fillRect(z.x - z.r, z.y - z.r, z.r * 2, z.r * 2);
      layer.fillStyle = '#000000';
      layer.fillRect(
        z.x - NAMEPLATE_HALF_W,
        z.y + NAMEPLATE_TOP,
        NAMEPLATE_HALF_W * 2,
        NAMEPLATE_BOTTOM - NAMEPLATE_TOP
      );
    });
    layer.fillStyle = '#000000';
    layer.fillRect(BANNER.x0, 0, BANNER.x1 - BANNER.x0, BANNER.y1);
    ctx.drawImage(layerCanvas, 0, 0);
  };

  const ink = (alpha: number) => `rgba(89, 67, 46, ${alpha})`;

  // Paper fibres
  ctx.save();
  ctx.lineCap = 'round';
  for (let i = 0; i < 9000; i++) {
    const fx = rand() * width;
    const fy = rand() * height;
    const len = 4 + rand() * 16;
    const a = rand() * Math.PI * 2;
    const bend = (rand() - 0.5) * 6;
    const ex = fx + Math.cos(a) * len;
    const ey = fy + Math.sin(a) * len;
    ctx.strokeStyle =
      rand() > 0.5
        ? `rgba(255, 250, 236, ${0.05 + rand() * 0.08})`
        : `rgba(110, 82, 50, ${0.04 + rand() * 0.07})`;
    ctx.lineWidth = 0.5 + rand() * 0.9;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.quadraticCurveTo((fx + ex) / 2 + bend, (fy + ey) / 2 - bend, ex, ey);
    ctx.stroke();
  }

  // Age-related mottled discoloration
  for (let i = 0; i < 46; i++) {
    const bx = rand() * width;
    const by = rand() * height;
    const br = 60 + rand() * 220;
    const tone = rand() > 0.4 ? '150, 112, 62' : '250, 244, 228';
    const blot = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    blot.addColorStop(0, `rgba(${tone}, ${0.03 + rand() * 0.05})`);
    blot.addColorStop(1, `rgba(${tone}, 0)`);
    ctx.fillStyle = blot;
    ctx.fillRect(bx - br, by - br, br * 2, br * 2);
  }

  // Subtle wrinkles (shared with the bump map for physical relief)
  const wrinkles = Array.from({ length: 26 }, () => {
    const x0 = rand() * width;
    const y0 = rand() * height;
    const a = rand() * Math.PI * 2;
    const len = 120 + rand() * 380;
    const x3 = x0 + Math.cos(a) * len;
    const y3 = y0 + Math.sin(a) * len;
    const bend = (rand() - 0.5) * len * 0.35;
    return [
      x0,
      y0,
      x0 + (x3 - x0) / 3 - Math.sin(a) * bend,
      y0 + (y3 - y0) / 3 + Math.cos(a) * bend,
      x0 + ((x3 - x0) * 2) / 3 + Math.sin(a) * bend * 0.6,
      y0 + ((y3 - y0) * 2) / 3 - Math.cos(a) * bend * 0.6,
      x3,
      y3,
    ];
  });
  wrinkles.forEach(([x0, y0, c1x, c1y, c2x, c2y, x3, y3]) => {
    ctx.strokeStyle = 'rgba(96, 70, 42, 0.07)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, x3, y3);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 250, 238, 0.12)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x0 + 1.5, y0 + 1.5);
    ctx.bezierCurveTo(c1x + 1.5, c1y + 1.5, c2x + 1.5, c2y + 1.5, x3 + 1.5, y3 + 1.5);
    ctx.stroke();
  });
  ctx.restore();

  // Faint latitude & longitude graticule
  const GRID_COLS = 16;
  const GRID_ROWS = 10;
  const gridStepX = (width - 96) / GRID_COLS;
  const gridStepY = (height - 96) / GRID_ROWS;
  compositeMaskedLayer((layer) => {
    layer.strokeStyle = ink(0.13);
    layer.lineWidth = 1;
    for (let i = 1; i < GRID_COLS; i++) {
      const x = 48 + i * gridStepX;
      layer.beginPath();
      layer.moveTo(x, 48);
      layer.lineTo(x, height - 48);
      layer.stroke();
    }
    for (let j = 1; j < GRID_ROWS; j++) {
      const y = 48 + j * gridStepY;
      layer.beginPath();
      layer.moveTo(48, y);
      layer.lineTo(width - 48, y);
      layer.stroke();
    }
    // Tropic lines
    layer.setLineDash([14, 8]);
    layer.strokeStyle = 'rgba(135, 59, 53, 0.15)';
    layer.lineWidth = 1.5;
    [3, 7].forEach((j) => {
      const y = 48 + j * gridStepY;
      layer.beginPath();
      layer.moveTo(48, y);
      layer.lineTo(width - 48, y);
      layer.stroke();
    });
    layer.setLineDash([]);
  });

  // Hand-drawn coastlines in the empty corners (land lies on the corner side)
  const coastNorthWest: Point[] = [
    [48, 395], [130, 380], [190, 392], [250, 372], [310, 385], [370, 362],
    [425, 338], [455, 300], [485, 240], [520, 190], [560, 130], [590, 48],
  ];
  const coastSouthWest: Point[] = [
    [48, 965], [110, 955], [170, 975], [230, 962], [300, 985], [360, 1000],
    [410, 1020], [440, 1060], [452, 1110], [470, 1170], [500, 1215], [540, 1245], [600, 1272],
  ];
  const coastSouthEast: Point[] = [
    [1560, 1272], [1590, 1190], [1640, 1150], [1700, 1120], [1770, 1080],
    [1840, 1040], [1900, 990], [2000, 960],
  ];
  const landPolygons: Point[][] = [
    [...coastNorthWest, [48, 48]],
    [...coastSouthWest, [48, 1272]],
    [...coastSouthEast, [2000, 1272]],
  ];
  const isOnLand = (x: number, y: number) => landPolygons.some((poly) => isPointInPolygon(x, y, poly));

  compositeMaskedLayer((layer) => {
    const drawCoast = (pts: Point[], poly: Point[], ripple: Point) => {
      const coast = pts.map(([x, y], idx) =>
        idx === 0 || idx === pts.length - 1
          ? ([x, y] as Point)
          : ([x + (rand() - 0.5) * 8, y + (rand() - 0.5) * 8] as Point)
      );
      layer.beginPath();
      poly.forEach(([x, y], idx) => (idx === 0 ? layer.moveTo(x, y) : layer.lineTo(x, y)));
      layer.closePath();
      layer.fillStyle = 'rgba(176, 146, 100, 0.17)';
      layer.fill();

      const strokeCoast = (dx: number, dy: number, alpha: number, lw: number) => {
        layer.beginPath();
        layer.moveTo(coast[0][0] + dx, coast[0][1] + dy);
        for (let i = 1; i < coast.length - 1; i++) {
          const mx = (coast[i][0] + coast[i + 1][0]) / 2 + dx;
          const my = (coast[i][1] + coast[i + 1][1]) / 2 + dy;
          layer.quadraticCurveTo(coast[i][0] + dx, coast[i][1] + dy, mx, my);
        }
        const last = coast[coast.length - 1];
        layer.lineTo(last[0] + dx, last[1] + dy);
        layer.strokeStyle = ink(alpha);
        layer.lineWidth = lw;
        layer.stroke();
      };
      strokeCoast(0, 0, 0.62, 2.2);
      for (let k = 1; k <= 4; k++) strokeCoast(ripple[0] * k, ripple[1] * k, 0.3 - k * 0.06, 1);
    };
    drawCoast(coastNorthWest, landPolygons[0], [5, 7]);
    drawCoast(coastSouthWest, landPolygons[1], [5, -6]);
    drawCoast(coastSouthEast, landPolygons[2], [-5, -7]);

    // Topographic elevation contours with spot heights
    const drawContours = (cx: number, cy: number, rings: number, step: number, label: string) => {
      const seed = rand() * 10;
      for (let k = 1; k <= rings; k++) {
        const r = k * step;
        layer.beginPath();
        for (let s = 0; s <= 48; s++) {
          const a = (s / 48) * Math.PI * 2;
          const rr = r * (1 + 0.13 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 2));
          const x = cx + Math.cos(a) * rr * 1.25;
          const y = cy + Math.sin(a) * rr * 0.85;
          if (s === 0) layer.moveTo(x, y);
          else layer.lineTo(x, y);
        }
        layer.closePath();
        layer.strokeStyle = ink(k === rings ? 0.2 : 0.3);
        layer.lineWidth = k === 1 ? 1.3 : 0.9;
        layer.stroke();
      }
      layer.fillStyle = ink(0.62);
      layer.beginPath();
      layer.moveTo(cx, cy - 5);
      layer.lineTo(cx + 4.5, cy + 3);
      layer.lineTo(cx - 4.5, cy + 3);
      layer.closePath();
      layer.fill();
      layer.font = 'italic 11px "Cormorant Garamond", Georgia, serif';
      layer.textAlign = 'left';
      layer.fillText(label, cx + 8, cy + 4);
      reserve(cx, cy, rings * step * 1.5);
    };
    if (isFree(300, 175, 65)) drawContours(300, 175, 3, 14, 'alt. 980');
    if (isFree(300, 1130, 68)) drawContours(300, 1130, 3, 15, 'alt. 1240');
  });

  // 2. Portolan Rhumb Lines (Navigational Windrose Network)
  const [ithacaX, ithacaY] = worldToCanvas(0, 0, width, height);
  ctx.save();
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    ctx.strokeStyle =
      i % 4 === 0
        ? 'rgba(135, 59, 53, 0.26)'
        : i % 2 === 0
          ? 'rgba(89, 67, 46, 0.22)'
          : 'rgba(89, 67, 46, 0.11)';
    ctx.lineWidth = i % 4 === 0 ? 1.6 : 1.0;
    ctx.beginPath();
    ctx.moveTo(ithacaX, ithacaY);
    ctx.lineTo(ithacaX + Math.cos(angle) * width, ithacaY + Math.sin(angle) * width);
    ctx.stroke();
  }
  ctx.restore();

  // Secondary Windroses in Western, Eastern, and Southern Seas
  const drawCompassRose = (cx: number, cy: number, radius: number, primary: boolean) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#59432E';
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.08, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.78, 0, Math.PI * 2);
    ctx.stroke();

    // Degree tick ring on outer bezel
    for (let t = 0; t < 32; t++) {
      const ta = (t / 32) * Math.PI * 2;
      const r0 = t % 4 === 0 ? radius * 0.92 : radius * 0.98;
      ctx.beginPath();
      ctx.moveTo(Math.cos(ta) * r0, Math.sin(ta) * r0);
      ctx.lineTo(Math.cos(ta) * radius * 1.08, Math.sin(ta) * radius * 1.08);
      ctx.stroke();
    }

    const points = 16;
    for (let p = 0; p < points; p++) {
      const a = (p / points) * Math.PI * 2;
      const len = p % 4 === 0 ? radius * 1.28 : p % 2 === 0 ? radius * 0.95 : radius * 0.68;
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-radius * 0.11, -len * 0.28);
      ctx.lineTo(0, -len);
      ctx.closePath();
      ctx.fillStyle = p === 0 && primary ? '#873B35' : p % 2 === 0 ? '#59432E' : '#A98545';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 0.11, -len * 0.28);
      ctx.lineTo(0, -len);
      ctx.closePath();
      ctx.fillStyle = '#DFC9A0';
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // North fleur-de-lis pointer
    ctx.fillStyle = '#873B35';
    ctx.beginPath();
    ctx.moveTo(0, -radius * 1.42);
    ctx.lineTo(-radius * 0.1, -radius * 1.18);
    ctx.lineTo(0, -radius * 1.24);
    ctx.lineTo(radius * 0.1, -radius * 1.18);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  drawCompassRose(ithacaX, ithacaY, 115, true);
  drawCompassRose(width * 0.16, height * 0.48, 58, false);
  drawCompassRose(width * 0.86, height * 0.24, 58, false);
  if (isFree(width * 0.84, height * 0.72, 68)) {
    drawCompassRose(width * 0.84, height * 0.72, 50, false);
    reserve(width * 0.84, height * 0.72, 68);
  }

  // 3. Bathymetric Depth Contour Lines, Shallow-Water Shoals & Coastal Reefs
  LITERARY_REALMS.forEach((realm) => {
    const [cx, cy] = worldToCanvas(realm.coordinates[0], realm.coordinates[2], width, height);

    // Shallow-water shoal gradient (aquamarine-sepia watercolor wash)
    const shoalGrad = ctx.createRadialGradient(cx, cy, 28, cx, cy, 145);
    shoalGrad.addColorStop(0, 'rgba(92, 132, 142, 0.24)');
    shoalGrad.addColorStop(0.55, 'rgba(125, 155, 158, 0.14)');
    shoalGrad.addColorStop(0.85, 'rgba(185, 165, 130, 0.12)');
    shoalGrad.addColorStop(1, 'rgba(185, 165, 130, 0)');
    ctx.fillStyle = shoalGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 145, 0, Math.PI * 2);
    ctx.fill();

    // Bathymetric Depth Contour Rings around each island realm
    ctx.save();
    const contourRadii = [65, 95, 128, 160];
    contourRadii.forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = idx === 0 ? 'rgba(74, 102, 108, 0.38)' : 'rgba(115, 88, 62, 0.26)';
      ctx.lineWidth = idx === 0 ? 1.4 : 0.9;
      ctx.setLineDash(idx % 2 === 0 ? [5, 4] : [2, 3]);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.restore();

    // Coastal sandbank stippling around perimeter
    ctx.fillStyle = 'rgba(89, 67, 46, 0.32)';
    for (let dot = 0; dot < 24; dot++) {
      const dotAngle = (dot / 24) * Math.PI * 2;
      const dotDist = 68 + (dot % 5) * 8;
      const dx = cx + Math.cos(dotAngle) * dotDist;
      const dy = cy + Math.sin(dotAngle) * dotDist;
      ctx.beginPath();
      ctx.arc(dx, dy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Dangerous Rocky Reef Clusters & Nautical Hazard Cross-Hatching
  const reefClusters: [number, number, string][] = [
    [width * 0.34, height * 0.38, 'Scopuli Periculosi'],
    [width * 0.68, height * 0.62, 'Syrtes Arenosae'],
    [width * 0.42, height * 0.74, 'Vada et Brevia'],
  ];

  reefClusters.forEach(([rx, ry, reefName]) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(135, 59, 53, 0.45)';
    ctx.lineWidth = 1.4;
    // Draw cross markers for underwater reefs
    for (let i = -2; i <= 2; i++) {
      for (let j = -1; j <= 1; j++) {
        const kx = rx + i * 16 + (j % 2) * 8;
        const ky = ry + j * 14;
        ctx.beginPath();
        ctx.moveTo(kx - 4, ky);
        ctx.lineTo(kx + 4, ky);
        ctx.moveTo(kx, ky - 4);
        ctx.lineTo(kx, ky + 4);
        ctx.stroke();
      }
    }
    ctx.font = 'italic 11px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = 'rgba(135, 59, 53, 0.65)';
    ctx.textAlign = 'center';
    ctx.fillText(reefName, rx, ry + 28);
    ctx.restore();
  });

  // 4. Hand-Drawn Mountain Ranges, Forests, Rivers, Waves, Annotations & Stains (Strictly Masked from Islands)
  compositeMaskedLayer((layer) => {
    const drawMountainChain = (points: [number, number][], scale = 1) => {
      layer.save();
      layer.strokeStyle = '#59432E';
      layer.lineWidth = 2.0;
      points.forEach(([px, py]) => {
        const w = 28 * scale;
        const h = 22 * scale;
        layer.beginPath();
        layer.moveTo(px - w, py);
        layer.lineTo(px, py - h);
        layer.lineTo(px + w, py);
        layer.fillStyle = 'rgba(142, 133, 117, 0.32)';
        layer.fill();
        layer.stroke();

        // East-side hachure shading
        for (let k = 1; k <= 3; k++) {
          const t = k / 4;
          layer.beginPath();
          layer.moveTo(px + w * t * 0.4, py - h * (1 - t * 0.5));
          layer.lineTo(px + w * (0.3 + t * 0.45), py);
          layer.strokeStyle = 'rgba(89, 67, 46, 0.42)';
          layer.lineWidth = 1.1;
          layer.stroke();
        }
      });
      layer.restore();
    };

    // Pyrenean Mountains around Roncevaux (Northwest)
    drawMountainChain(
      [
        [160, 220],
        [205, 200],
        [250, 225],
        [295, 205],
        [340, 230],
        [185, 265],
        [235, 280],
      ],
      1.1
    );

    // Rugged Sandstone Crags of Uz (Southwest)
    drawMountainChain(
      [
        [150, 1040],
        [200, 1020],
        [250, 1050],
        [305, 1035],
        [180, 1095],
        [235, 1110],
      ],
      1.05
    );

    // Northern Ridges above India / Kurukshetra (Northeast)
    drawMountainChain(
      [
        [1480, 195],
        [1535, 175],
        [1590, 190],
        [1645, 170],
        [1700, 195],
      ],
      1.1
    );

    // Hand-drawn miniature forest groves in empty coastal / land pockets
    const drawForestGrove = (cx: number, cy: number, treeCount: number) => {
      if (!isFree(cx, cy, 42)) return;
      layer.save();
      for (let t = 0; t < treeCount; t++) {
        const tx = cx + (rand() - 0.5) * 58;
        const ty = cy + (rand() - 0.5) * 34;
        const r = 5.5 + rand() * 3.5;
        layer.fillStyle = 'rgba(104, 112, 74, 0.28)';
        layer.strokeStyle = 'rgba(89, 67, 46, 0.58)';
        layer.lineWidth = 1.1;
        layer.beginPath();
        layer.arc(tx, ty - r * 0.4, r, 0, Math.PI * 2);
        layer.fill();
        layer.stroke();
        layer.beginPath();
        layer.moveTo(tx, ty + r * 0.5);
        layer.lineTo(tx, ty + r * 1.15);
        layer.stroke();
      }
      layer.restore();
      reserve(cx, cy, 42);
    };

    drawForestGrove(140, 325, 11);
    drawForestGrove(430, 190, 9);
    drawForestGrove(150, 1175, 10);
    drawForestGrove(1775, 1150, 11);
    drawForestGrove(1885, 1065, 9);

    // Winding Rivers with estuaries in Sepia-Teal Ink
    layer.save();
    layer.strokeStyle = 'rgba(74, 102, 108, 0.52)';
    layer.lineWidth = 2.6;
    layer.beginPath();
    layer.moveTo(185, 120);
    layer.bezierCurveTo(260, 185, 310, 260, 370, 362);
    layer.stroke();

    layer.beginPath();
    layer.moveTo(140, 1160);
    layer.bezierCurveTo(230, 1100, 285, 1040, 360, 1000);
    layer.stroke();

    layer.beginPath();
    layer.moveTo(1890, 1180);
    layer.bezierCurveTo(1820, 1130, 1765, 1100, 1700, 1120);
    layer.stroke();
    layer.restore();

    // Hand-drawn Decorative Waves in Open Sea
    const drawWaveCluster = (wx: number, wy: number) => {
      if (!isFree(wx + 30, wy, 44) || isOnLand(wx, wy)) return;
      layer.save();
      layer.strokeStyle = 'rgba(89, 67, 46, 0.46)';
      layer.lineWidth = 1.5;
      for (let row = 0; row < 2; row++) {
        layer.beginPath();
        for (let i = 0; i < 4; i++) {
          const sx = wx + i * 18 + row * 9;
          const sy = wy + row * 8;
          layer.moveTo(sx, sy);
          layer.quadraticCurveTo(sx + 9, sy - 6, sx + 18, sy);
        }
        layer.stroke();
      }
      layer.restore();
      reserve(wx + 30, wy, 44);
    };

    drawWaveCluster(790, 480);
    drawWaveCluster(1220, 500);
    drawWaveCluster(830, 820);
    drawWaveCluster(1220, 820);
    drawWaveCluster(1510, 960);
    drawWaveCluster(560, 1080);

    // Sea Serpent / Leviathan Coils in Southern Ocean
    layer.save();
    layer.strokeStyle = '#59432E';
    layer.lineWidth = 2.4;
    for (let c = 0; c < 3; c++) {
      layer.beginPath();
      layer.arc(980 + c * 32, 1135, 14, Math.PI, 0, false);
      layer.stroke();
    }
    layer.font = 'italic 17px "Cormorant Garamond", Georgia, serif';
    layer.fillStyle = 'rgba(89, 67, 46, 0.78)';
    layer.textAlign = 'center';
    layer.fillText('Hic sunt dracones marini & Leviathan', 1012, 1168);
    layer.restore();

    // Tiny Cartographic Symbols: Anchors, Soundings, & Caravel Silhouette in Open Waters
    const drawAnchorSymbol = (ax: number, ay: number) => {
      if (!isFree(ax, ay, 28)) return;
      layer.save();
      layer.strokeStyle = ink(0.55);
      layer.lineWidth = 1.4;
      layer.beginPath();
      layer.arc(ax, ay - 7, 3, 0, Math.PI * 2);
      layer.moveTo(ax, ay - 4);
      layer.lineTo(ax, ay + 8);
      layer.moveTo(ax - 5, ay - 1);
      layer.lineTo(ax + 5, ay - 1);
      layer.moveTo(ax - 7, ay + 4);
      layer.quadraticCurveTo(ax, ay + 11, ax + 7, ay + 4);
      layer.stroke();
      layer.restore();
      reserve(ax, ay, 28);
    };
    drawAnchorSymbol(885, 310);
    drawAnchorSymbol(1165, 310);
    drawAnchorSymbol(1460, 660);
    drawAnchorSymbol(590, 660);

    // Hydrographic depth soundings (fathom numerals in open channels)
    const soundings: [number, number, string][] = [
      [960, 420, '14'],
      [1080, 435, '19'],
      [940, 880, '22'],
      [1110, 870, '17'],
      [1480, 460, '26'],
      [610, 470, '18'],
    ];
    layer.save();
    layer.font = 'italic 11px "Cormorant Garamond", Georgia, serif';
    layer.fillStyle = ink(0.48);
    soundings.forEach(([sx, sy, depth]) => {
      if (isFree(sx, sy, 16)) {
        layer.fillText(depth, sx, sy);
      }
    });
    layer.restore();

    // Ancient handwritten cartographic annotations in empty sea & margin expanses
    const annotations: [number, number, string, number][] = [
      [1024, 240, 'Mare Internum Antiquorum', 0],
      [1520, 885, 'Oceanus Orientalis • Cursus Antiquus', -0.04],
      [620, 1145, 'Sinus Hesperius • Navigatio Litterarum', 0.03],
      [255, 140, 'Montes Pyrenaei', -0.05],
      [1820, 1215, 'Terra Australis Incognita', 0],
    ];
    layer.save();
    layer.font = 'italic 15px "Cormorant Garamond", Georgia, serif';
    layer.fillStyle = 'rgba(89, 67, 46, 0.64)';
    layer.textAlign = 'center';
    annotations.forEach(([ax, ay, text, rot]) => {
      if (!isFree(ax, ay, 48)) return;
      layer.save();
      layer.translate(ax, ay);
      layer.rotate(rot);
      layer.fillText(text, 0, 0);
      layer.restore();
      reserve(ax, ay, 48);
    });
    layer.restore();

    // Cartographer's Scale Bar (Scala Milliarium) in bottom-left sea margin
    const sbX = 720;
    const sbY = 1210;
    if (isFree(sbX, sbY, 60)) {
      layer.save();
      layer.strokeStyle = '#59432E';
      layer.lineWidth = 1.5;
      const barW = 160;
      const seg = barW / 4;
      layer.strokeRect(sbX - barW / 2, sbY, barW, 8);
      for (let i = 0; i < 4; i++) {
        if (i % 2 === 0) {
          layer.fillStyle = '#59432E';
          layer.fillRect(sbX - barW / 2 + i * seg, sbY, seg, 8);
        }
      }
      layer.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
      layer.fillStyle = '#59432E';
      layer.textAlign = 'center';
      layer.fillText('Scala Leucarum Nauticarum', sbX, sbY - 6);
      layer.restore();
      reserve(sbX, sbY, 60);
    }

    // Subtle sepia ink stains & age spots in outer corners/empty waters
    const stainSpots: [number, number, number][] = [
      [1840, 490, 26],
      [195, 825, 22],
      [1340, 1165, 28],
      [1690, 280, 18],
    ];
    stainSpots.forEach(([sx, sy, sr]) => {
      if (!isFree(sx, sy, sr + 14)) return;
      const g = layer.createRadialGradient(sx, sy, sr * 0.15, sx, sy, sr);
      g.addColorStop(0, 'rgba(72, 46, 26, 0.16)');
      g.addColorStop(0.7, 'rgba(89, 60, 34, 0.11)');
      g.addColorStop(0.88, 'rgba(72, 46, 26, 0.18)');
      g.addColorStop(1, 'rgba(72, 46, 26, 0)');
      layer.fillStyle = g;
      layer.beginPath();
      layer.arc(sx, sy, sr, 0, Math.PI * 2);
      layer.fill();
    });
  });

  // 5. Dotted Sea & Land Routes Connecting the Seven Literary Landmarks
  ctx.save();
  ctx.strokeStyle = '#873B35';
  ctx.lineWidth = 3.2;
  ctx.setLineDash([10, 9]);

  const routeOrder = [
    LITERARY_REALMS[0], // 1. Odyssey
    LITERARY_REALMS[1], // 2. Job
    LITERARY_REALMS[2], // 3. Panchatantra
    LITERARY_REALMS[3], // 4. Ramayana
    LITERARY_REALMS[4], // 5. Mahabharata
    LITERARY_REALMS[5], // 6. Iliad
    LITERARY_REALMS[6], // 7. Roland
    LITERARY_REALMS[0], // Back to Odyssey
  ];

  ctx.beginPath();
  routeOrder.forEach((realm, idx) => {
    const [cx, cy] = worldToCanvas(realm.coordinates[0], realm.coordinates[2], width, height);
    if (idx === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // 6. Regional Cartographic Socket Emblem & Coordinates on the Parchment Surface
  // (Each island's title cartouche is a physical 3D vellum-and-brass plaque attached to its diorama root so it lifts with the island)
  LITERARY_REALMS.forEach((realm) => {
    const [cx, cy] = worldToCanvas(realm.coordinates[0], realm.coordinates[2], width, height);
    ctx.save();

    // Subtle inlaid brass/sepia cartographic socket emblem revealed when the island lifts off the parchment
    ctx.strokeStyle = realm.isFavoriteMasterpiece
      ? 'rgba(135, 59, 53, 0.55)'
      : 'rgba(89, 67, 46, 0.45)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, cy, 42, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 52, cy);
    ctx.lineTo(cx + 52, cy);
    ctx.moveTo(cx, cy - 52);
    ctx.lineTo(cx, cy + 52);
    ctx.stroke();

    ctx.font = 'bold 15px "Cinzel", Georgia, serif';
    ctx.fillStyle = realm.isFavoriteMasterpiece
      ? 'rgba(135, 59, 53, 0.72)'
      : 'rgba(89, 67, 46, 0.68)';
    ctx.textAlign = 'center';
    ctx.fillText(`SECTOR ${realm.romanNumeral}`, cx, cy - 8);

    ctx.font = 'italic 13px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(realm.properTitle, cx, cy + 14);
    ctx.restore();
  });

  // 7. Fold Creases & Ornate Renaissance Cartographic Border
  ctx.save();
  // Vertical & Horizontal Folio Crease Lines
  ctx.strokeStyle = 'rgba(89, 67, 46, 0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.5, 40);
  ctx.lineTo(width * 0.5, height - 40);
  ctx.moveTo(40, height * 0.5);
  ctx.lineTo(width - 40, height * 0.5);
  ctx.stroke();

  // Outer Double Border Frame & Fine Inner Filigree Rule
  const m = 34;
  ctx.strokeStyle = '#3B261A';
  ctx.lineWidth = 5;
  ctx.strokeRect(m, m, width - m * 2, height - m * 2);

  ctx.strokeStyle = '#59432E';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(m + 14, m + 14, width - (m + 14) * 2, height - (m + 14) * 2);

  ctx.strokeStyle = 'rgba(135, 59, 53, 0.42)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(m + 20, m + 20, width - (m + 20) * 2, height - (m + 20) * 2);

  // Alternating Degree Blocks along Border
  const segW = 48;
  for (let x = m + 14; x < width - m - 14; x += segW) {
    if (Math.floor(x / segW) % 2 === 0) {
      ctx.fillStyle = '#59432E';
      ctx.fillRect(x, m, Math.min(segW, width - m - 14 - x), 14);
      ctx.fillRect(x, height - m - 14, Math.min(segW, width - m - 14 - x), 14);
    }
  }
  for (let y = m + 14; y < height - m - 14; y += segW) {
    if (Math.floor(y / segW) % 2 === 0) {
      ctx.fillStyle = '#59432E';
      ctx.fillRect(m, y, 14, Math.min(segW, height - m - 14 - y));
      ctx.fillRect(width - m - 14, y, 14, Math.min(segW, height - m - 14 - y));
    }
  }

  // Corner Rosette Ornaments on the Map Frame
  [
    [m + 7, m + 7],
    [width - m - 7, m + 7],
    [m + 7, height - m - 7],
    [width - m - 7, height - m - 7],
  ].forEach(([cx, cy]) => {
    ctx.fillStyle = '#3B261A';
    ctx.fillRect(cx - 9, cy - 9, 18, 18);
    ctx.strokeStyle = '#A98545';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 7, cy - 7, 14, 14);
    ctx.fillStyle = '#F3C879';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Latitude & Longitude Degree Numerals inside the Border
  ctx.font = 'bold 10px "Cinzel", Georgia, serif';
  ctx.fillStyle = 'rgba(59, 38, 26, 0.72)';
  ctx.textAlign = 'center';
  for (let i = 1; i < GRID_COLS; i += 2) {
    const x = 48 + i * gridStepX;
    if (x < BANNER.x0 - 20 || x > BANNER.x1 + 20) {
      ctx.fillText(`${10 + i * 5}°E`, x, m + 32);
    }
    ctx.fillText(`${10 + i * 5}°E`, x, height - m - 24);
  }
  for (let j = 1; j < GRID_ROWS; j += 2) {
    const y = 48 + j * gridStepY;
    ctx.fillText(`${50 - j * 5}°N`, m + 38, y + 3);
    ctx.fillText(`${50 - j * 5}°N`, width - m - 38, y + 3);
  }

  // Darkened Weathered Edges & Natural Irregular Deckle Darkening
  const edgeShade = [
    ctx.createLinearGradient(0, 0, 0, 56),
    ctx.createLinearGradient(0, height, 0, height - 56),
    ctx.createLinearGradient(0, 0, 56, 0),
    ctx.createLinearGradient(width, 0, width - 56, 0),
  ];
  edgeShade.forEach((g) => {
    g.addColorStop(0, 'rgba(42, 24, 12, 0.62)');
    g.addColorStop(0.45, 'rgba(68, 42, 22, 0.22)');
    g.addColorStop(1, 'rgba(68, 42, 22, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  });

  // Cartouche Banner in Top Margin: The Literary Treasure Map
  ctx.fillStyle = '#F4ECD8';
  ctx.strokeStyle = '#59432E';
  ctx.lineWidth = 3;
  ctx.fillRect(width * 0.5 - 390, 58, 780, 64);
  ctx.strokeRect(width * 0.5 - 390, 58, 780, 64);
  ctx.strokeStyle = '#A98545';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(width * 0.5 - 384, 64, 768, 52);

  ctx.font = 'bold 23px "Cinzel", Georgia, serif';
  ctx.fillStyle = '#3B261A';
  ctx.textAlign = 'center';
  ctx.fillText('THE LITERARY TREASURE MAP • SEVEN REALMS OF ANTIQUITY', width * 0.5, 98);
  ctx.restore();

  // 8. Build Bump / Height Texture for Paper Grain, Wrinkles & Crease Relief
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);
  for (let i = 0; i < 6500; i++) {
    const gx = rand() * bumpCanvas.width;
    const gy = rand() * bumpCanvas.height;
    const shade = 110 + Math.floor(rand() * 36);
    bCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
    bCtx.fillRect(gx, gy, 2, 2);
  }
  wrinkles.forEach(([x0, y0, c1x, c1y, c2x, c2y, x3, y3]) => {
    bCtx.strokeStyle = '#626262';
    bCtx.lineWidth = 1.4;
    bCtx.beginPath();
    bCtx.moveTo(x0 * 0.5, y0 * 0.5);
    bCtx.bezierCurveTo(
      c1x * 0.5,
      c1y * 0.5,
      c2x * 0.5,
      c2y * 0.5,
      x3 * 0.5,
      y3 * 0.5
    );
    bCtx.stroke();
  });
  bCtx.strokeStyle = '#555555';
  bCtx.lineWidth = 3;
  bCtx.beginPath();
  bCtx.moveTo(bumpCanvas.width * 0.5, 0);
  bCtx.lineTo(bumpCanvas.width * 0.5, bumpCanvas.height);
  bCtx.moveTo(0, bumpCanvas.height * 0.5);
  bCtx.lineTo(bumpCanvas.width, bumpCanvas.height * 0.5);
  bCtx.stroke();

  // 9. Irregular Deckle-Edge Alpha Mask for Natural Parchment Perimeter
  const alphaCanvas = document.createElement('canvas');
  alphaCanvas.width = 1024;
  alphaCanvas.height = 660;
  const aCtx = alphaCanvas.getContext('2d');
  let alphaTexture: THREE.CanvasTexture | null = null;
  if (aCtx) {
    aCtx.fillStyle = '#000000';
    aCtx.fillRect(0, 0, alphaCanvas.width, alphaCanvas.height);
    aCtx.fillStyle = '#FFFFFF';
    aCtx.beginPath();
    const aw = alphaCanvas.width;
    const ah = alphaCanvas.height;
    const pad = 4;
    for (let x = pad; x <= aw - pad; x += 6) {
      const jitter = Math.sin(x * 0.09) * 2.2 + (rand() - 0.5) * 2.4;
      if (x === pad) aCtx.moveTo(x, pad + jitter);
      else aCtx.lineTo(x, pad + jitter);
    }
    for (let y = pad; y <= ah - pad; y += 6) {
      const jitter = Math.cos(y * 0.09) * 2.2 + (rand() - 0.5) * 2.4;
      aCtx.lineTo(aw - pad + jitter, y);
    }
    for (let x = aw - pad; x >= pad; x -= 6) {
      const jitter = Math.sin(x * 0.11) * 2.2 + (rand() - 0.5) * 2.4;
      aCtx.lineTo(x, ah - pad + jitter);
    }
    for (let y = ah - pad; y >= pad; y -= 6) {
      const jitter = Math.cos(y * 0.11) * 2.2 + (rand() - 0.5) * 2.4;
      aCtx.lineTo(pad + jitter, y);
    }
    aCtx.closePath();
    aCtx.fill();
    alphaTexture = new THREE.CanvasTexture(alphaCanvas);
  }

  const mapTexture = new THREE.CanvasTexture(canvas);
  mapTexture.colorSpace = THREE.SRGBColorSpace;
  mapTexture.anisotropy = 8;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

  return { mapTexture, bumpTexture, alphaTexture };
}

export function createWalnutWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#3B261A';
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 2) {
      const wave = Math.sin(y * 0.04) * 12;
      ctx.strokeStyle = y % 6 === 0 ? 'rgba(28, 16, 9, 0.52)' : 'rgba(72, 46, 30, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(170, y + wave, 340, y - wave, 512, y);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}
