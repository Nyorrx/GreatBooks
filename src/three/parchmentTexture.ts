import * as THREE from 'three';
import { LITERARY_REALMS } from '../data/realms';

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
    return { mapTexture: fallback, bumpTexture: fallback };
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

  // Secondary Windroses in Western and Eastern Seas
  const drawCompassRose = (cx: number, cy: number, radius: number, primary: boolean) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#59432E';
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.78, 0, Math.PI * 2);
    ctx.stroke();

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
    ctx.restore();
  };

  drawCompassRose(ithacaX, ithacaY, 115, true);
  drawCompassRose(width * 0.16, height * 0.48, 58, false);
  drawCompassRose(width * 0.86, height * 0.24, 58, false);

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

  // 4. Hand-Drawn Mountain Ranges, Rivers, Forests & Storm Lines
  const drawMountainChain = (points: [number, number][], scale = 1) => {
    ctx.save();
    ctx.strokeStyle = '#59432E';
    ctx.lineWidth = 2.0;
    points.forEach(([px, py]) => {
      const w = 28 * scale;
      const h = 22 * scale;
      ctx.beginPath();
      ctx.moveTo(px - w, py);
      ctx.lineTo(px, py - h);
      ctx.lineTo(px + w, py);
      ctx.fillStyle = 'rgba(142, 133, 117, 0.32)';
      ctx.fill();
      ctx.stroke();

      // East-side hatching shadow
      ctx.beginPath();
      ctx.moveTo(px, py - h);
      ctx.lineTo(px + w * 0.4, py);
      ctx.strokeStyle = 'rgba(89, 67, 46, 0.45)';
      ctx.stroke();
    });
    ctx.restore();
  };

  // Pyrenean Mountains around Roncevaux (Northwest)
  drawMountainChain(
    [
      [210, 290],
      [250, 275],
      [295, 295],
      [340, 280],
      [385, 305],
      [230, 340],
      [280, 355],
    ],
    1.15
  );

  // Rugged Sandstone Crags of Uz (Southwest)
  drawMountainChain(
    [
      [330, 880],
      [380, 860],
      [430, 890],
      [485, 875],
      [360, 935],
      [415, 950],
    ],
    1.05
  );

  // Northern Ridges above India / Kurukshetra (Northeast)
  drawMountainChain(
    [
      [1380, 250],
      [1435, 230],
      [1490, 245],
      [1545, 225],
      [1600, 250],
      [1655, 235],
    ],
    1.15
  );

  // Winding Rivers in Sepia Ink
  ctx.save();
  ctx.strokeStyle = 'rgba(74, 102, 108, 0.55)';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(1480, 255);
  ctx.bezierCurveTo(1520, 410, 1690, 480, 1790, 650);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(640, 260);
  ctx.bezierCurveTo(680, 340, 620, 410, 690, 460);
  ctx.stroke();
  ctx.restore();

  // Hand-drawn Decorative Waves & Sea Monster Vignette
  const drawWaveCluster = (wx: number, wy: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(89, 67, 46, 0.48)';
    ctx.lineWidth = 1.6;
    for (let row = 0; row < 2; row++) {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const sx = wx + i * 18 + row * 9;
        const sy = wy + row * 8;
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(sx + 9, sy - 6, sx + 18, sy);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  drawWaveCluster(790, 560);
  drawWaveCluster(980, 720);
  drawWaveCluster(1510, 980);
  drawWaveCluster(185, 620);

  // Sea Serpent / Leviathan Coils in Southern Ocean
  ctx.save();
  ctx.strokeStyle = '#59432E';
  ctx.lineWidth = 2.4;
  for (let c = 0; c < 3; c++) {
    ctx.beginPath();
    ctx.arc(820 + c * 32, 1080, 14, Math.PI, 0, false);
    ctx.stroke();
  }
  ctx.font = 'italic 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = 'rgba(89, 67, 46, 0.78)';
  ctx.fillText('Hic sunt dracones marini & Leviathan', 735, 1112);
  ctx.restore();

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

  // Outer Double Border Frame
  const m = 34;
  ctx.strokeStyle = '#3B261A';
  ctx.lineWidth = 5;
  ctx.strokeRect(m, m, width - m * 2, height - m * 2);

  ctx.strokeStyle = '#59432E';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(m + 14, m + 14, width - (m + 14) * 2, height - (m + 14) * 2);

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

  // Cartouche Banner in Top Margin: The Literary Treasure Map
  ctx.fillStyle = '#F4ECD8';
  ctx.strokeStyle = '#59432E';
  ctx.lineWidth = 3;
  ctx.fillRect(width * 0.5 - 390, 58, 780, 64);
  ctx.strokeRect(width * 0.5 - 390, 58, 780, 64);

  ctx.font = 'bold 23px "Cinzel", Georgia, serif';
  ctx.fillStyle = '#3B261A';
  ctx.textAlign = 'center';
  ctx.fillText('THE LITERARY TREASURE MAP • SEVEN REALMS OF ANTIQUITY', width * 0.5, 98);
  ctx.restore();

  // 8. Build Bump / Height Texture for Paper Grain & Crease Relief
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);
  for (let i = 0; i < 6500; i++) {
    const gx = Math.random() * bumpCanvas.width;
    const gy = Math.random() * bumpCanvas.height;
    const shade = 112 + Math.floor(Math.random() * 32);
    bCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
    bCtx.fillRect(gx, gy, 2, 2);
  }
  bCtx.strokeStyle = '#555555';
  bCtx.lineWidth = 3;
  bCtx.beginPath();
  bCtx.moveTo(bumpCanvas.width * 0.5, 0);
  bCtx.lineTo(bumpCanvas.width * 0.5, bumpCanvas.height);
  bCtx.moveTo(0, bumpCanvas.height * 0.5);
  bCtx.lineTo(bumpCanvas.width, bumpCanvas.height * 0.5);
  bCtx.stroke();

  const mapTexture = new THREE.CanvasTexture(canvas);
  mapTexture.colorSpace = THREE.SRGBColorSpace;
  mapTexture.anisotropy = 8;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

  return { mapTexture, bumpTexture };
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
