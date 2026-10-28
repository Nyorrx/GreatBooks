import * as THREE from 'three';
import type { LiteraryRealm, RealmId } from '../types/atlas';

export interface MonumentGroupHandles {
  root: THREE.Group;
  hitMesh: THREE.Mesh;
  animate: (
    elapsed: number,
    isHovered: boolean,
    isSelected: boolean,
    liftProgress?: number
  ) => void;
}

/**
 * Generates a soft layered radial drop-shadow texture rendered beneath an island
 * as it lifts off the parchment chart.
 */
function createFloatingShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const cx = size * 0.5;
    const cy = size * 0.5;
    const grad = ctx.createRadialGradient(cx, cy, size * 0.06, cx, cy, size * 0.48);
    grad.addColorStop(0, 'rgba(20, 11, 6, 0.72)');
    grad.addColorStop(0.45, 'rgba(36, 22, 14, 0.45)');
    grad.addColorStop(0.76, 'rgba(89, 67, 46, 0.16)');
    grad.addColorStop(1, 'rgba(36, 22, 14, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates a high-contrast illuminated vellum & antique brass cartouche texture
 * for the island's 3D nameplate so its title travels with the island when lifted.
 */
function createIslandCartoucheTexture(realm: LiteraryRealm): THREE.CanvasTexture {
  const width = 640;
  const height = 112;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#FCF7ED';
    ctx.fillRect(0, 0, width, height);

    // Outer antique border
    ctx.strokeStyle = realm.isFavoriteMasterpiece ? '#873B35' : '#A98545';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Inner sepia hairline rule
    ctx.strokeStyle = 'rgba(89, 67, 46, 0.48)';
    ctx.lineWidth = 2;
    ctx.strokeRect(11, 11, width - 22, height - 22);

    // Corner brass rivets
    const corners: [number, number][] = [
      [18, 18],
      [width - 18, 18],
      [18, height - 18],
      [width - 18, height - 18],
    ];
    ctx.fillStyle = realm.isFavoriteMasterpiece ? '#873B35' : '#A98545';
    corners.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Roman Numeral + Proper Title
    ctx.font = realm.isFavoriteMasterpiece
      ? 'bold 34px "Cinzel", Georgia, serif'
      : 'bold 31px "Cinzel", Georgia, serif';
    ctx.fillStyle = realm.isFavoriteMasterpiece ? '#873B35' : '#2C1E12';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${realm.romanNumeral}. ${realm.properTitle.toUpperCase()}`,
      width * 0.5,
      50
    );

    // Subtitle / Realm Name
    ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#59432E';
    ctx.fillText(realm.realmName, width * 0.5, 84);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * Builds a handcrafted miniature landscape diorama for each of the seven literary works,
 * emerging physically from the weathered parchment chart table.
 */
export function buildRealmMonument(realm: LiteraryRealm): MonumentGroupHandles {
  const root = new THREE.Group();
  root.position.set(realm.coordinates[0], realm.coordinates[1], realm.coordinates[2]);
  root.name = `diorama-group-${realm.id}`;

  // Shared tactile materials crafted from the historical palette
  const carvedWalnutMat = new THREE.MeshStandardMaterial({
    color: '#3B261A',
    roughness: 0.65,
    metalness: 0.08,
  });

  const antiqueBrassMat = new THREE.MeshStandardMaterial({
    color: '#A98545',
    roughness: 0.32,
    metalness: 0.82,
  });

  const burnishedBrassMat = new THREE.MeshStandardMaterial({
    color: '#C8A45D',
    roughness: 0.26,
    metalness: 0.88,
  });

  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: '#C9A673',
    roughness: 0.82,
    metalness: 0.05,
    flatShading: true,
  });

  const ochreRockMat = new THREE.MeshStandardMaterial({
    color: '#A87E49',
    roughness: 0.85,
    metalness: 0.06,
    flatShading: true,
  });

  const limestoneMat = new THREE.MeshStandardMaterial({
    color: '#C7B99E',
    roughness: 0.78,
    metalness: 0.05,
    flatShading: true,
  });

  const weatheredStoneMat = new THREE.MeshStandardMaterial({
    color: '#8E8575',
    roughness: 0.86,
    metalness: 0.08,
    flatShading: true,
  });

  const darkSlateMat = new THREE.MeshStandardMaterial({
    color: '#635C51',
    roughness: 0.88,
    metalness: 0.1,
    flatShading: true,
  });

  const mossGreenMat = new THREE.MeshStandardMaterial({
    color: '#68704A',
    roughness: 0.8,
    metalness: 0.04,
    flatShading: true,
  });

  const deepFoliageMat = new THREE.MeshStandardMaterial({
    color: '#4F5736',
    roughness: 0.84,
    metalness: 0.04,
    flatShading: true,
  });

  const agedIvoryMat = new THREE.MeshStandardMaterial({
    color: '#F4ECD8',
    roughness: 0.42,
    metalness: 0.05,
  });

  const sealingWaxMat = new THREE.MeshStandardMaterial({
    color: '#873B35',
    roughness: 0.38,
    metalness: 0.12,
  });

  const agedCedarMat = new THREE.MeshStandardMaterial({
    color: '#5E3A22',
    roughness: 0.68,
    metalness: 0.08,
  });

  const seaSlateMat = new THREE.MeshStandardMaterial({
    color: '#3E626B',
    roughness: 0.25,
    metalness: 0.18,
  });

  const terracottaMat = new THREE.MeshStandardMaterial({
    color: '#B85A3A',
    roughness: 0.76,
    metalness: 0.05,
    flatShading: true,
  });

  const agedBronzeMat = new THREE.MeshStandardMaterial({
    color: '#4F6A5B',
    roughness: 0.45,
    metalness: 0.72,
  });

  const goldLeafMat = new THREE.MeshStandardMaterial({
    color: '#E5B842',
    roughness: 0.28,
    metalness: 0.88,
  });

  const snowWhiteMat = new THREE.MeshStandardMaterial({
    color: '#EAE6DF',
    roughness: 0.65,
    metalness: 0.02,
    flatShading: true,
  });

  const foamWhiteMat = new THREE.MeshStandardMaterial({
    color: '#FAF6EB',
    roughness: 0.5,
    metalness: 0.08,
  });

  const amberGlowMat = new THREE.MeshStandardMaterial({
    color: '#E89A38',
    emissive: '#D97724',
    emissiveIntensity: 0.65,
    roughness: 0.35,
  });

  // 1. Handcrafted Miniature Diorama Emerging Directly from the Parchment Chart
  const baseRadius = realm.isFavoriteMasterpiece ? 2.95 : 2.25;

  // Physical Brass & Sealing-Wax Cartographic Pin Marker beside the Diorama
  const markerPinGroup = new THREE.Group();
  markerPinGroup.position.set(baseRadius * 0.84, 0.02, baseRadius * 0.58);
  const pinNeedle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.015, 0.75, 10),
    burnishedBrassMat
  );
  pinNeedle.position.y = 0.35;
  const pinWaxHead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.24, 0.11, 16),
    sealingWaxMat
  );
  pinWaxHead.position.y = 0.74;
  const pinBrassRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.03, 10, 20),
    burnishedBrassMat
  );
  pinBrassRim.rotation.x = Math.PI / 2;
  pinBrassRim.position.y = 0.74;
  markerPinGroup.add(pinNeedle, pinWaxHead, pinBrassRim);
  root.add(markerPinGroup);

  const animatedParts: THREE.Object3D[] = [];
  const dioramaCore = new THREE.Group();
  dioramaCore.position.y = 0.02;
  root.add(dioramaCore);

  switch (realm.id) {
    case 'job': {
      // I. The Book of Job - The Whirlwind and Altar of Uz
      // Layered desert plateau, natural rock arch, stone altar with glowing embers, offering jars,
      // and atmospheric wind vortex streamers rising into the desert sky.

      // 1. Layered ochre & sandstone desert plateau
      const desertBed = new THREE.Mesh(
        new THREE.CylinderGeometry(2.05, 2.15, 0.22, 16),
        sandstoneMat
      );
      desertBed.position.y = 0.1;
      desertBed.receiveShadow = true;

      const subPlateau = new THREE.Mesh(
        new THREE.CylinderGeometry(1.65, 1.78, 0.16, 12),
        ochreRockMat
      );
      subPlateau.position.set(-0.15, 0.22, -0.1);
      subPlateau.receiveShadow = true;
      dioramaCore.add(desertBed, subPlateau);

      // 2. Weathered desert crags, pinnacles, and scattered boulders
      const cragSpecs = [
        { x: -1.25, z: -0.75, r: 0.52, h: 0.85 },
        { x: 1.25, z: -0.65, r: 0.46, h: 0.72 },
        { x: -1.05, z: 0.95, r: 0.48, h: 0.62 },
        { x: 1.15, z: 0.85, r: 0.54, h: 0.88 },
        { x: 0.05, z: -1.35, r: 0.65, h: 1.05 },
      ];
      cragSpecs.forEach((c, idx) => {
        const crag = new THREE.Mesh(
          new THREE.ConeGeometry(c.r, c.h, 6),
          idx % 2 === 0 ? ochreRockMat : sandstoneMat
        );
        crag.position.set(c.x, 0.2 + c.h * 0.45, c.z);
        crag.rotation.y = idx * 0.85;
        crag.castShadow = true;
        crag.receiveShadow = true;
        dioramaCore.add(crag);
      });

      // Natural wind-carved desert rock arch (hoodoo) framing the rear-left cliff
      const archGroup = new THREE.Group();
      archGroup.position.set(-0.82, 0.22, -0.78);
      archGroup.rotation.y = 0.52;

      const archPillar1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.22, 1.08, 8),
        sandstoneMat
      );
      archPillar1.position.set(-0.34, 0.52, 0);
      archPillar1.rotation.z = -0.1;
      archPillar1.castShadow = true;

      const archPillar2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.21, 1.08, 8),
        sandstoneMat
      );
      archPillar2.position.set(0.34, 0.52, 0);
      archPillar2.rotation.z = 0.1;
      archPillar2.castShadow = true;

      const archLintel = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.11, 8, 16, Math.PI),
        sandstoneMat
      );
      archLintel.position.set(0, 0.98, 0);
      archLintel.castShadow = true;

      archGroup.add(archPillar1, archPillar2, archLintel);
      dioramaCore.add(archGroup);

      // Scattered weathered boulders
      const boulders = [
        { x: 0.85, z: -0.2, s: 0.22 },
        { x: -0.65, z: 0.72, s: 0.18 },
        { x: 0.7, z: 0.82, s: 0.25 },
        { x: -0.15, z: 1.05, s: 0.16 },
      ];
      boulders.forEach((b) => {
        const bMesh = new THREE.Mesh(
          new THREE.DodecahedronGeometry(b.s, 1),
          weatheredStoneMat
        );
        bMesh.position.set(b.x, 0.22 + b.s * 0.6, b.z);
        bMesh.castShadow = true;
        dioramaCore.add(bMesh);
      });

      // 3. Central Weathered Stone Altar of Uz
      const altarStep1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.2, 0.95),
        weatheredStoneMat
      );
      altarStep1.position.set(-0.1, 0.28, 0.05);
      altarStep1.castShadow = true;

      const altarStep2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.24, 0.68),
        weatheredStoneMat
      );
      altarStep2.position.set(-0.1, 0.48, 0.05);
      altarStep2.castShadow = true;

      // Stone sacrificial brazier with glowing embers atop the altar
      const brazier = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.16, 0.14, 10),
        darkSlateMat
      );
      brazier.position.set(-0.1, 0.67, 0.05);
      brazier.castShadow = true;

      const embers = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 8, 8),
        amberGlowMat
      );
      embers.position.set(-0.1, 0.73, 0.05);
      embers.scale.set(1.2, 0.5, 1.2);

      const emberLight = new THREE.PointLight('#E89A38', 2.2, 3.5);
      emberLight.position.set(-0.1, 0.82, 0.05);

      // Terracotta offering jars beside the altar base
      const jar1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 0.24, 8),
        terracottaMat
      );
      jar1.position.set(-0.48, 0.32, 0.45);
      jar1.castShadow = true;

      const jar2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.09, 0.18, 8),
        terracottaMat
      );
      jar2.position.set(-0.36, 0.28, 0.55);
      jar2.castShadow = true;

      dioramaCore.add(altarStep1, altarStep2, brazier, embers, emberLight, jar1, jar2);

      // 4. Atmospheric Sandstorm & Whirlwind Pillars behind the Altar
      const whirlwindGroup = new THREE.Group();
      whirlwindGroup.position.set(-0.15, 0.65, -0.45);

      for (let i = 0; i < 6; i++) {
        const radius = 0.32 + i * 0.16;
        const ribbonArc = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.032, 8, 28, Math.PI * 1.4),
          i % 2 === 0 ? ochreRockMat : sandstoneMat
        );
        ribbonArc.position.y = i * 0.32;
        ribbonArc.rotation.x = Math.PI / 2 + (i % 2 === 0 ? 0.16 : -0.16);
        ribbonArc.rotation.z = i * 0.85;
        ribbonArc.castShadow = true;
        whirlwindGroup.add(ribbonArc);
        animatedParts.push(ribbonArc);
      }

      for (let s = 0; s < 3; s++) {
        const pts: THREE.Vector3[] = [];
        const offsetAngle = (s / 3) * Math.PI * 2;
        for (let step = 0; step <= 16; step++) {
          const t = step / 16;
          const a = offsetAngle + t * Math.PI * 3.2;
          const r = 0.2 + t * 0.95;
          pts.push(new THREE.Vector3(Math.cos(a) * r, t * 2.1, Math.sin(a) * r));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        const streamer = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 28, 0.024, 6, false),
          s === 0 ? antiqueBrassMat : sandstoneMat
        );
        streamer.castShadow = true;
        whirlwindGroup.add(streamer);
      }

      dioramaCore.add(whirlwindGroup);
      animatedParts.push(whirlwindGroup);
      break;
    }

    case 'panchatantra': {
      // II. The Panchatantra - The Emerald Court
      // Tiered banyan-tree court with five interlocking wooden platforms, roots, branches, moss foliage, and animal figures
      const forestFloor = new THREE.Mesh(
        new THREE.CylinderGeometry(2.08, 2.16, 0.2, 18),
        mossGreenMat
      );
      forestFloor.position.y = 0.08;
      forestFloor.receiveShadow = true;
      dioramaCore.add(forestFloor);

      // Five interlocking carved wooden courtyard platforms (representing the Five Tantras)
      const platformSpecs = [
        { x: 0, y: 0.25, z: 0, r: 1.35 },
        { x: -0.65, y: 0.58, z: 0.45, r: 0.72 },
        { x: 0.68, y: 0.78, z: 0.38, r: 0.68 },
        { x: -0.48, y: 1.05, z: -0.52, r: 0.64 },
        { x: 0.42, y: 1.32, z: -0.35, r: 0.6 },
      ];
      platformSpecs.forEach((p) => {
        const deck = new THREE.Mesh(
          new THREE.CylinderGeometry(p.r, p.r * 1.04, 0.12, 8),
          agedCedarMat
        );
        deck.position.set(p.x, p.y, p.z);
        deck.castShadow = true;
        deck.receiveShadow = true;

        const brassRim = new THREE.Mesh(
          new THREE.TorusGeometry(p.r * 0.96, 0.025, 8, 8),
          antiqueBrassMat
        );
        brassRim.rotation.x = Math.PI / 2;
        brassRim.position.set(p.x, p.y + 0.07, p.z);
        dioramaCore.add(deck, brassRim);
      });

      // Central Ancient Banyan Trunk & Twisted Aerial Roots
      const mainTrunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.52, 2.15, 10),
        carvedWalnutMat
      );
      mainTrunk.position.y = 1.12;
      mainTrunk.castShadow = true;
      dioramaCore.add(mainTrunk);

      for (let r = 0; r < 6; r++) {
        const angle = (r / 6) * Math.PI * 2;
        const rootStrut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.075, 1.55, 8),
          agedCedarMat
        );
        rootStrut.position.set(Math.cos(angle) * 0.68, 0.82, Math.sin(angle) * 0.68);
        rootStrut.rotation.z = Math.cos(angle) * 0.28;
        rootStrut.rotation.x = -Math.sin(angle) * 0.28;
        rootStrut.castShadow = true;
        dioramaCore.add(rootStrut);
      }

      // Sculpted Moss-Green Banyan Canopy Domes
      const canopyGroup = new THREE.Group();
      const canopyCluster = [
        { x: 0, y: 2.35, z: 0, r: 0.95 },
        { x: -0.75, y: 2.05, z: 0.4, r: 0.68 },
        { x: 0.78, y: 2.1, z: 0.35, r: 0.65 },
        { x: -0.5, y: 2.15, z: -0.6, r: 0.62 },
        { x: 0.55, y: 2.2, z: -0.5, r: 0.64 },
      ];
      canopyCluster.forEach((c, idx) => {
        const dome = new THREE.Mesh(
          new THREE.DodecahedronGeometry(c.r, 1),
          idx % 2 === 0 ? mossGreenMat : deepFoliageMat
        );
        dome.scale.set(1.15, 0.62, 1.15);
        dome.position.set(c.x, c.y, c.z);
        dome.castShadow = true;
        canopyGroup.add(dome);
      });
      dioramaCore.add(canopyGroup);
      animatedParts.push(canopyGroup);

      // Miniature Sculpted Animal Figures on the Platforms (Lion Pingalaka, Bull Sanjivaka, Jackals)
      const createAnimalSilhouette = (x: number, y: number, z: number, mat: THREE.Material, scale = 1) => {
        const fig = new THREE.Group();
        fig.position.set(x, y, z);
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.16 * scale, 0.14 * scale), mat);
        body.position.y = 0.08 * scale;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.09 * scale, 8, 8), mat);
        head.position.set(0.12 * scale, 0.18 * scale, 0);
        fig.add(body, head);
        fig.castShadow = true;
        return fig;
      };

      dioramaCore.add(
        createAnimalSilhouette(0.38, 1.38, -0.32, burnishedBrassMat, 1.25), // Lion King Pingalaka
        createAnimalSilhouette(-0.45, 1.12, -0.48, agedIvoryMat, 1.15),     // Bull Sanjivaka
        createAnimalSilhouette(-0.62, 0.65, 0.45, ochreRockMat, 0.95),      // Karataka
        createAnimalSilhouette(0.65, 0.85, 0.35, ochreRockMat, 0.95)        // Damanaka
      );
      break;
    }

    case 'ramayana': {
      // III. The Ramayana - The Bridge to Lanka
      // Sculpted stone bridge (Rama Setu) crossing sea channel toward the fortified Golden Citadel of Lanka,
      // with Kishkindha shore, curved coconut palm trees, Vanara camp fire, floating inscribed stones, and temple gopuram.
      const seaBasin = new THREE.Mesh(
        new THREE.CylinderGeometry(2.12, 2.18, 0.16, 24),
        seaSlateMat
      );
      seaBasin.position.y = 0.06;
      seaBasin.receiveShadow = true;

      // Sea foam crests wrapping the inner channel shorelines
      const nearFoam = new THREE.Mesh(
        new THREE.TorusGeometry(0.92, 0.035, 6, 24, Math.PI * 0.85),
        foamWhiteMat
      );
      nearFoam.rotation.x = Math.PI / 2;
      nearFoam.rotation.z = -1.85;
      nearFoam.position.set(-1.22, 0.14, 0.35);

      const farFoam = new THREE.Mesh(
        new THREE.TorusGeometry(0.88, 0.035, 6, 24, Math.PI * 0.85),
        foamWhiteMat
      );
      farFoam.rotation.x = Math.PI / 2;
      farFoam.rotation.z = 1.29;
      farFoam.position.set(1.22, 0.14, -0.35);

      dioramaCore.add(seaBasin, nearFoam, farFoam);

      // Near Shore (Mainland Woods of Rameshwaram & Kishkindha)
      const nearShore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.75, 0.92, 0.35, 12),
        sandstoneMat
      );
      nearShore.position.set(-1.25, 0.22, 0.35);
      nearShore.castShadow = true;

      const nearShoreGrass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.74, 0.08, 12),
        mossGreenMat
      );
      nearShoreGrass.position.set(-1.25, 0.42, 0.35);
      dioramaCore.add(nearShore, nearShoreGrass);

      // Realistic Miniature Tropical Palm Trees on Near Shore
      [-1.48, -1.1].forEach((px, idx) => {
        const pz = 0.35 + idx * 0.24;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.055, 0.58, 7),
          agedCedarMat
        );
        trunk.position.set(px, 0.58, pz);
        trunk.rotation.z = idx === 0 ? -0.18 : 0.14;
        trunk.rotation.x = 0.1;
        trunk.castShadow = true;

        // Radiating arched palm fronds
        const frondGroup = new THREE.Group();
        frondGroup.position.set(px + (idx === 0 ? -0.05 : 0.04), 0.86, pz + 0.03);
        for (let f = 0; f < 6; f++) {
          const fAng = (f / 6) * Math.PI * 2;
          const frondPivot = new THREE.Group();
          frondPivot.rotation.y = fAng;
          const frond = new THREE.Mesh(
            new THREE.ConeGeometry(0.065, 0.34, 4),
            deepFoliageMat
          );
          frond.scale.set(1.2, 1, 0.35);
          frond.position.set(0.15, -0.02, 0);
          frond.rotation.z = 1.18;
          frondPivot.add(frond);
          frondGroup.add(frondPivot);
        }
        dioramaCore.add(trunk, frondGroup);
      });

      // Vanara Army Encampment Campfire
      const campFire = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 8, 8),
        amberGlowMat
      );
      campFire.position.set(-1.05, 0.48, 0.12);
      const campLight = new THREE.PointLight('#E89A38', 1.5, 2.5);
      campLight.position.set(-1.05, 0.55, 0.12);
      dioramaCore.add(campFire, campLight);

      // Dominant Silhouette: Sculpted Multi-Arch Stone Bridge (Rama Setu)
      const bridgeGroup = new THREE.Group();
      const numArches = 5;
      for (let a = 0; a < numArches; a++) {
        const bx = -0.82 + a * 0.44;
        const bz = 0.22 - a * 0.12;
        const archHeight = 0.42 + Math.sin((a / (numArches - 1)) * Math.PI) * 0.22;

        const pier = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, archHeight, 0.36),
          weatheredStoneMat
        );
        pier.position.set(bx - 0.2, 0.12 + archHeight * 0.5, bz);
        pier.rotation.y = 0.26;
        pier.castShadow = true;

        const archSpan = new THREE.Mesh(
          new THREE.TorusGeometry(0.19, 0.055, 10, 18, Math.PI),
          sandstoneMat
        );
        archSpan.position.set(bx, 0.06 + archHeight * 0.65, bz);
        archSpan.rotation.y = 0.26;
        archSpan.castShadow = true;

        const parapet = new THREE.Mesh(
          new THREE.BoxGeometry(0.46, 0.09, 0.34),
          agedIvoryMat
        );
        parapet.position.set(bx, 0.35 + archHeight * 0.65, bz);
        parapet.rotation.y = 0.26;
        parapet.castShadow = true;

        // Lotus bud finials on the bridge piers
        const finial = new THREE.Mesh(
          new THREE.ConeGeometry(0.035, 0.08, 6),
          goldLeafMat
        );
        finial.position.set(bx - 0.2, 0.38 + archHeight * 0.65, bz + 0.18);
        bridgeGroup.add(pier, archSpan, parapet, finial);
      }

      // Floating inscribed stones in the sea along the bridge
      [
        { x: -0.52, z: 0.38 },
        { x: 0.12, z: 0.28 },
        { x: 0.65, z: 0.08 },
      ].forEach((st) => {
        const stone = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.11, 0),
          weatheredStoneMat
        );
        stone.position.set(st.x, 0.12, st.z);
        stone.castShadow = true;
        const ripple = new THREE.Mesh(
          new THREE.TorusGeometry(0.15, 0.02, 6, 12),
          foamWhiteMat
        );
        ripple.rotation.x = Math.PI / 2;
        ripple.position.set(st.x, 0.14, st.z);
        bridgeGroup.add(stone, ripple);
      });
      dioramaCore.add(bridgeGroup);

      // Far Shore: Fortified Terraced Island Citadel of Lanka with Temple Gopuram & Spire
      const lankaCrag = new THREE.Mesh(
        new THREE.ConeGeometry(0.88, 0.85, 8),
        ochreRockMat
      );
      lankaCrag.position.set(1.22, 0.45, -0.35);
      lankaCrag.castShadow = true;

      const citadelWall = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.64, 0.52, 8),
        sandstoneMat
      );
      citadelWall.position.set(1.22, 0.92, -0.35);
      citadelWall.castShadow = true;

      // Multi-tiered stepped golden temple gopuram tower
      const gopuramTier1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.22, 0.48),
        sandstoneMat
      );
      gopuramTier1.position.set(1.22, 1.25, -0.35);

      const gopuramTier2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.18, 0.38),
        goldLeafMat
      );
      gopuramTier2.position.set(1.22, 1.44, -0.35);

      const centralSpire = new THREE.Mesh(
        new THREE.ConeGeometry(0.24, 0.58, 8),
        burnishedBrassMat
      );
      centralSpire.position.set(1.22, 1.82, -0.35);
      centralSpire.castShadow = true;

      dioramaCore.add(lankaCrag, citadelWall, gopuramTier1, gopuramTier2, centralSpire);
      animatedParts.push(centralSpire);
      break;
    }

    case 'mahabharata': {
      // IV. The Mahabharata - The Chariot of Kurukshetra
      // Bronze war chariot (Nandighosha) with rotating spoked wheels, Arjuna's canopy, divine Hanuman flag (Kapi Dhwaja),
      // golden arrow quivers, sacred conch Panchajanya, ivory horses, discarded battlefield shields, and spears.
      const battlefieldMound = new THREE.Mesh(
        new THREE.CylinderGeometry(2.08, 2.18, 0.24, 18),
        ochreRockMat
      );
      battlefieldMound.position.y = 0.1;
      battlefieldMound.receiveShadow = true;

      // Wheel ruts carved across the dusty field
      const rut1 = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.04, 0.12),
        sandstoneMat
      );
      rut1.position.set(0.1, 0.23, 0.32);
      rut1.rotation.y = -0.15;

      const rut2 = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.04, 0.12),
        sandstoneMat
      );
      rut2.position.set(0.1, 0.23, -0.32);
      rut2.rotation.y = -0.15;
      dioramaCore.add(battlefieldMound, rut1, rut2);

      // Discarded battlefield relics: bronze shield, half-buried wheel, and broken spears
      const discardedShield = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.04, 12),
        agedBronzeMat
      );
      discardedShield.position.set(-1.05, 0.25, 0.72);
      discardedShield.rotation.x = 0.32;
      discardedShield.rotation.z = -0.22;
      discardedShield.castShadow = true;

      const buriedWheel = new THREE.Mesh(
        new THREE.TorusGeometry(0.28, 0.035, 6, 16),
        burnishedBrassMat
      );
      buriedWheel.position.set(-0.85, 0.22, -0.85);
      buriedWheel.rotation.y = 0.45;
      buriedWheel.rotation.x = 0.65;
      buriedWheel.castShadow = true;

      // Broken spear shaft
      const spearShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.85, 6),
        carvedWalnutMat
      );
      spearShaft.position.set(0.95, 0.34, 0.82);
      spearShaft.rotation.z = 0.75;
      spearShaft.rotation.y = 0.3;
      dioramaCore.add(discardedShield, buriedWheel, spearShaft);

      const chariotGroup = new THREE.Group();
      chariotGroup.position.set(-0.22, 0.22, 0);

      // Carved Dark Timber & Bronze Chariot Platform
      const chassis = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 0.22, 1.05),
        carvedWalnutMat
      );
      chassis.position.y = 0.42;
      chassis.castShadow = true;

      const brassTrim = new THREE.Mesh(
        new THREE.BoxGeometry(1.42, 0.08, 1.12),
        antiqueBrassMat
      );
      brassTrim.position.y = 0.52;

      // Four Pillars & Ornate Canopy of Arjuna's Chariot
      [
        [-0.5, -0.4],
        [0.5, -0.4],
        [-0.5, 0.4],
        [0.5, 0.4],
      ].forEach(([px, pz]) => {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.045, 1.06, 8),
          antiqueBrassMat
        );
        post.position.set(px, 1.04, pz);
        post.castShadow = true;
        chariotGroup.add(post);
      });

      const canopyDome = new THREE.Mesh(
        new THREE.ConeGeometry(0.88, 0.58, 8),
        burnishedBrassMat
      );
      canopyDome.position.y = 1.72;
      canopyDome.rotation.y = Math.PI / 8;
      canopyDome.castShadow = true;

      // Divine Kapi Dhwaja (Hanuman Flag Standard)
      const flagMast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.85, 6),
        burnishedBrassMat
      );
      flagMast.position.set(-0.2, 2.22, 0);

      const flagCloth = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.24, 0.02),
        sealingWaxMat
      );
      flagCloth.position.set(-0.4, 2.38, 0);

      const flagEmblem = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        goldLeafMat
      );
      flagEmblem.position.set(-0.4, 2.38, 0);
      flagEmblem.scale.set(1, 1, 0.6);

      // Golden Arrow Quivers on Chariot Sides
      [-0.48, 0.48].forEach((qz) => {
        const quiver = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.05, 0.45, 8),
          goldLeafMat
        );
        quiver.position.set(-0.35, 0.72, qz);
        quiver.rotation.z = -0.32;
        quiver.castShadow = true;
        chariotGroup.add(quiver);
      });

      chariotGroup.add(chassis, brassTrim, canopyDome, flagMast, flagCloth, flagEmblem);

      // Spoked Bronze Chariot Wheels
      const buildSpokedWheel = (zPos: number) => {
        const wGroup = new THREE.Group();
        wGroup.position.set(0, 0.52, zPos);

        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(0.54, 0.06, 12, 32),
          burnishedBrassMat
        );
        rim.castShadow = true;
        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.14, 0.16, 12),
          antiqueBrassMat
        );
        hub.rotation.x = Math.PI / 2;
        wGroup.add(rim, hub);

        for (let s = 0; s < 12; s++) {
          const spoke = new THREE.Mesh(
            new THREE.CylinderGeometry(0.018, 0.018, 1.04, 6),
            antiqueBrassMat
          );
          spoke.rotation.z = (s / 12) * Math.PI;
          wGroup.add(spoke);
        }
        return wGroup;
      };

      const leftWheel = buildSpokedWheel(0.62);
      const rightWheel = buildSpokedWheel(-0.62);
      chariotGroup.add(leftWheel, rightWheel);
      animatedParts.push(leftWheel, rightWheel);

      // Two Ivory War Horses & Bronze Reins
      [-0.34, 0.34].forEach((hz) => {
        const horse = new THREE.Group();
        horse.position.set(1.18, 0.38, hz);

        const torso = new THREE.Mesh(
          new THREE.BoxGeometry(0.62, 0.28, 0.22),
          agedIvoryMat
        );
        torso.castShadow = true;
        const neck = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.12, 0.38, 8),
          agedIvoryMat
        );
        neck.position.set(0.26, 0.22, 0);
        neck.rotation.z = -0.35;
        const head = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.12, 0.12),
          agedIvoryMat
        );
        head.position.set(0.38, 0.34, 0);

        [
          [-0.22, -0.07],
          [0.22, -0.07],
          [-0.22, 0.07],
          [0.22, 0.07],
        ].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.025, 0.36, 6),
            agedIvoryMat
          );
          leg.position.set(lx, -0.22, lz);
          horse.add(leg);
        });

        const rein = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.012, 0.95, 6),
          burnishedBrassMat
        );
        rein.position.set(-0.32, 0.24, 0);
        rein.rotation.z = Math.PI / 2 - 0.15;

        horse.add(torso, neck, head, rein);
        chariotGroup.add(horse);
      });

      dioramaCore.add(chariotGroup);

      // Battlefield standards on the perimeter
      [
        [-1.35, -0.85],
        [-1.25, 0.9],
        [1.35, -0.95],
      ].forEach(([sx, sz]) => {
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.03, 1.35, 6),
          carvedWalnutMat
        );
        pole.position.set(sx, 0.75, sz);
        const flag = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.22, 0.03),
          sealingWaxMat
        );
        flag.position.set(sx + 0.18, 1.28, sz);
        dioramaCore.add(pole, flag);
      });
      break;
    }

    case 'iliad': {
      // V. The Iliad - The Citadel of Troy
      // Walled miniature Trojan citadel with layered limestone fortifications, towers, narrow Scaean gate, and bronze Shield of Achilles
      const acropolisHill = new THREE.Mesh(
        new THREE.CylinderGeometry(1.75, 2.15, 0.42, 12),
        sandstoneMat
      );
      acropolisHill.position.y = 0.2;
      acropolisHill.receiveShadow = true;
      dioramaCore.add(acropolisHill);

      // Battered Sloped Limestone Circuit Wall of Ilium
      const outerWall = new THREE.Mesh(
        new THREE.CylinderGeometry(1.42, 1.62, 0.68, 8),
        limestoneMat
      );
      outerWall.position.y = 0.68;
      outerWall.castShadow = true;
      outerWall.receiveShadow = true;
      dioramaCore.add(outerWall);

      // Four Corner Watchtowers along the Trojan Ramparts
      const towerAngles = [0.4, 1.9, 3.5, 5.1];
      towerAngles.forEach((ang) => {
        const tx = Math.cos(ang) * 1.42;
        const tz = Math.sin(ang) * 1.42;
        const tower = new THREE.Mesh(
          new THREE.BoxGeometry(0.46, 1.12, 0.46),
          limestoneMat
        );
        tower.position.set(tx, 0.92, tz);
        tower.rotation.y = -ang;
        tower.castShadow = true;

        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(0.36, 0.28, 4),
          sealingWaxMat
        );
        roof.position.set(tx, 1.62, tz);
        roof.rotation.y = -ang + Math.PI / 4;
        dioramaCore.add(tower, roof);
      });

      // Narrow Scaean Gate with Aged Timber Doors at the Front
      const gateArch = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.85, 0.42),
        weatheredStoneMat
      );
      gateArch.position.set(0, 0.78, 1.45);
      gateArch.castShadow = true;
      const timberDoor = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.62, 0.46),
        carvedWalnutMat
      );
      timberDoor.position.set(0, 0.68, 1.46);
      dioramaCore.add(gateArch, timberDoor);

      // Upper Pergamos Megaron / Temple inside the Citadel
      const innerKeep = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.65, 0.88),
        limestoneMat
      );
      innerKeep.position.set(0, 1.28, -0.15);
      innerKeep.castShadow = true;
      const keepRoof = new THREE.Mesh(
        new THREE.ConeGeometry(0.92, 0.42, 4),
        sealingWaxMat
      );
      keepRoof.position.set(0, 1.82, -0.15);
      keepRoof.rotation.y = Math.PI / 4;
      keepRoof.scale.set(1.15, 1, 0.88);
      dioramaCore.add(innerKeep, keepRoof);

      // Rampart walk level (top face of the octagonal circuit wall)
      const rampartTopY = 1.02;

      // Limestone coping course capping the octagonal rampart (8-sided ring aligned to the wall)
      const wallCoping = new THREE.Mesh(
        new THREE.TorusGeometry(1.42, 0.032, 6, 8),
        agedIvoryMat
      );
      wallCoping.rotation.x = Math.PI / 2;
      wallCoping.position.y = rampartTopY;
      dioramaCore.add(wallCoping);

      // Crenellated parapet merlons along each rampart face, leaving the towers, gate, and shield clear
      const towerCenters = towerAngles.map((ang) => new THREE.Vector2(Math.cos(ang) * 1.42, Math.sin(ang) * 1.42));
      const merlonClearZones = [
        ...towerCenters.map((c) => ({ c, r: 0.36 })),
        { c: new THREE.Vector2(0, 1.45), r: 0.46 }, // Scaean gate
        { c: new THREE.Vector2(0.65, 1.28), r: 0.62 }, // Shield of Achilles
      ];
      const merlonRadius = 1.36;
      const merlonsPerFace = 4;
      for (let face = 0; face < 8; face++) {
        const phiA = (face / 8) * Math.PI * 2;
        const phiB = ((face + 1) / 8) * Math.PI * 2;
        const faceMid = (phiA + phiB) / 2;
        for (let m = 0; m < merlonsPerFace; m++) {
          const t = (m + 0.5) / merlonsPerFace;
          const mx = THREE.MathUtils.lerp(Math.sin(phiA), Math.sin(phiB), t) * merlonRadius;
          const mz = THREE.MathUtils.lerp(Math.cos(phiA), Math.cos(phiB), t) * merlonRadius;
          const mPos = new THREE.Vector2(mx, mz);
          if (merlonClearZones.some((zone) => zone.c.distanceTo(mPos) < zone.r)) continue;
          const merlon = new THREE.Mesh(
            new THREE.BoxGeometry(0.11, 0.09, 0.07),
            limestoneMat
          );
          merlon.position.set(mx, rampartTopY + 0.045, mz);
          merlon.rotation.y = faceMid;
          merlon.castShadow = true;
          dioramaCore.add(merlon);
        }
      }

      // Tower arrow slits (outward & inward faces) and crimson pennants above each roof
      towerAngles.forEach((ang, idx) => {
        const outward = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang));
        const towerCenter = new THREE.Vector3(towerCenters[idx].x, 0, towerCenters[idx].y);
        [1, -1].forEach((dir) => {
          const slit = new THREE.Mesh(
            new THREE.BoxGeometry(0.02, 0.15, 0.05),
            darkSlateMat
          );
          slit.position.copy(towerCenter).addScaledVector(outward, dir * 0.232);
          slit.position.y = 1.24;
          slit.rotation.y = -ang;
          dioramaCore.add(slit);
        });

        // Ivory string course banding each tower just above the rampart
        const band = new THREE.Mesh(
          new THREE.BoxGeometry(0.49, 0.035, 0.49),
          agedIvoryMat
        );
        band.position.set(towerCenter.x, 1.4, towerCenter.z);
        band.rotation.y = -ang;
        dioramaCore.add(band);

        const pennantPole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.01, 0.012, 0.3, 6),
          carvedWalnutMat
        );
        pennantPole.position.set(towerCenter.x, 1.76 + 0.13, towerCenter.z);
        const pennant = new THREE.Mesh(
          new THREE.ConeGeometry(0.045, 0.18, 3),
          sealingWaxMat
        );
        pennant.rotation.z = -Math.PI / 2;
        pennant.scale.set(1, 1, 0.25);
        pennant.position.set(towerCenter.x + 0.09, 1.76 + 0.24, towerCenter.z);
        dioramaCore.add(pennantPole, pennant);
      });

      // Scaean Gate lintel, bronze door straps, and twin gate braziers
      const gateLintel = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.08, 0.48),
        agedIvoryMat
      );
      gateLintel.position.set(0, 1.245, 1.45);
      gateLintel.castShadow = true;
      dioramaCore.add(gateLintel);
      [0.5, 0.84].forEach((sy) => {
        const strap = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.035, 0.02),
          agedBronzeMat
        );
        strap.position.set(0, sy, 1.695);
        dioramaCore.add(strap);
      });
      [-0.3, 0.3].forEach((bx) => {
        const brazierBowl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.055, 0.035, 0.06, 8),
          agedBronzeMat
        );
        brazierBowl.position.set(bx, 1.315, 1.5);
        const brazierFlame = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 6),
          amberGlowMat
        );
        brazierFlame.scale.set(1, 0.7, 1);
        brazierFlame.position.set(bx, 1.355, 1.5);
        dioramaCore.add(brazierBowl, brazierFlame);
      });

      // Megaron porch of the Pergamos: stylobate, four ivory columns, architrave, and dark doorway
      const keepFrontZ = -0.15 + 0.44;
      const porchStylobate = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.04, 0.26),
        agedIvoryMat
      );
      porchStylobate.position.set(0, rampartTopY + 0.02, keepFrontZ + 0.1);
      porchStylobate.receiveShadow = true;
      dioramaCore.add(porchStylobate);
      const porchColumnBaseY = rampartTopY + 0.04;
      const porchArchitraveY = 1.58;
      [-0.42, -0.14, 0.14, 0.42].forEach((cx) => {
        const column = new THREE.Mesh(
          new THREE.CylinderGeometry(0.036, 0.042, porchArchitraveY - 0.03 - porchColumnBaseY, 10),
          agedIvoryMat
        );
        column.position.set(cx, (porchColumnBaseY + porchArchitraveY - 0.03) / 2, keepFrontZ + 0.13);
        column.castShadow = true;
        dioramaCore.add(column);
      });
      const porchArchitrave = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.06, 0.18),
        agedIvoryMat
      );
      porchArchitrave.position.set(0, porchArchitraveY, keepFrontZ + 0.08);
      porchArchitrave.castShadow = true;
      const megaronDoor = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.34, 0.02),
        darkSlateMat
      );
      megaronDoor.position.set(0, porchColumnBaseY + 0.17, keepFrontZ + 0.005);
      dioramaCore.add(porchArchitrave, megaronDoor);

      // The Wooden Horse, wheeled inside the walls of Ilium
      const trojanHorse = new THREE.Group();
      trojanHorse.position.set(-0.72, rampartTopY, 0.74);
      trojanHorse.rotation.y = 0.35;
      const horseBoard = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.03, 0.42),
        carvedWalnutMat
      );
      horseBoard.position.y = 0.105;
      horseBoard.castShadow = true;
      trojanHorse.add(horseBoard);
      [
        [-0.11, -0.15],
        [0.11, -0.15],
        [-0.11, 0.15],
        [0.11, 0.15],
      ].forEach(([wx, wz]) => {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.045, 0.025, 10),
          carvedWalnutMat
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.045, wz);
        trojanHorse.add(wheel);
      });
      [
        [-0.05, -0.12],
        [0.05, -0.12],
        [-0.05, 0.12],
        [0.05, 0.12],
      ].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.024, 0.19, 6),
          agedCedarMat
        );
        leg.position.set(lx, 0.21, lz);
        trojanHorse.add(leg);
      });
      const horseBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.14, 0.36),
        agedCedarMat
      );
      horseBody.position.y = 0.35;
      horseBody.castShadow = true;
      const horseNeck = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.22, 0.09),
        agedCedarMat
      );
      horseNeck.position.set(0, 0.47, 0.16);
      horseNeck.rotation.x = 0.35;
      horseNeck.castShadow = true;
      const horseHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.16),
        agedCedarMat
      );
      horseHead.position.set(0, 0.585, 0.24);
      horseHead.rotation.x = 0.2;
      horseHead.castShadow = true;
      const horseMane = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.2, 0.03),
        carvedWalnutMat
      );
      horseMane.position.set(0, 0.49, 0.11);
      horseMane.rotation.x = 0.35;
      const horseTail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.022, 0.16, 6),
        carvedWalnutMat
      );
      horseTail.position.set(0, 0.31, -0.2);
      horseTail.rotation.x = -0.45;
      // Hidden hatch of the Achaean warriors on the flank
      const horseHatch = new THREE.Mesh(
        new THREE.BoxGeometry(0.004, 0.06, 0.1),
        darkSlateMat
      );
      horseHatch.position.set(0.077, 0.35, 0);
      trojanHorse.add(horseBody, horseNeck, horseHead, horseMane, horseTail, horseHatch);
      dioramaCore.add(trojanHorse);

      // Sacred cypress trees flanking the rear of the Pergamos
      [
        [-0.88, -0.74],
        [0.86, -0.8],
      ].forEach(([tx, tz]) => {
        const cypressTrunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.035, 0.12, 6),
          carvedWalnutMat
        );
        cypressTrunk.position.set(tx, rampartTopY + 0.06, tz);
        const cypressCrown = new THREE.Mesh(
          new THREE.ConeGeometry(0.11, 0.52, 8),
          deepFoliageMat
        );
        cypressCrown.position.set(tx, rampartTopY + 0.37, tz);
        cypressCrown.castShadow = true;
        dioramaCore.add(cypressTrunk, cypressCrown);
      });

      // Prominent Weathered Bronze Shield of Achilles Mounted Near the Entrance
      const shieldGroup = new THREE.Group();
      shieldGroup.position.set(0.65, 1.25, 1.28);
      shieldGroup.rotation.y = 0.35;
      shieldGroup.rotation.x = -0.18;

      const shieldDisc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.56, 0.52, 0.08, 24),
        antiqueBrassMat
      );
      shieldDisc.rotation.x = Math.PI / 2;
      shieldDisc.castShadow = true;
      shieldGroup.add(shieldDisc);

      [0.22, 0.38, 0.5].forEach((r) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r, 0.02, 8, 24),
          burnishedBrassMat
        );
        ring.position.z = 0.05;
        shieldGroup.add(ring);
      });
      const boss = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 12, 12),
        burnishedBrassMat
      );
      boss.position.z = 0.06;
      shieldGroup.add(boss);

      dioramaCore.add(shieldGroup);
      animatedParts.push(shieldGroup);
      break;
    }

    case 'odyssey': {
      // VI. The Odyssey - The Harbor of Ithaca (Centerpiece Masterpiece)
      // Inlaid Brass Compass Rose + Sheltered Aegean Harbor + Greek Classical Ruins (Doric columns, architrave) +
      // Sandy shoreline + Wooden jetty dock with amphorae + Hillside hall with glowing hearth window +
      // Sacred olive trees + Ancient Greek Trireme with shields, ram, sail, and sea-foam wake.
      const compassRoseGroup = new THREE.Group();
      compassRoseGroup.position.y = 0.02;

      const outerBrassCompass = new THREE.Mesh(
        new THREE.TorusGeometry(2.85, 0.065, 12, 64),
        burnishedBrassMat
      );
      outerBrassCompass.rotation.x = Math.PI / 2;
      compassRoseGroup.add(outerBrassCompass);

      // 8 Brass Cardinal & Intercardinal Compass Points around the Harbor Base
      for (let pt = 0; pt < 8; pt++) {
        const a = (pt / 8) * Math.PI * 2;
        const isCardinal = pt % 2 === 0;
        const pointerSpike = new THREE.Mesh(
          new THREE.ConeGeometry(isCardinal ? 0.16 : 0.1, isCardinal ? 0.58 : 0.38, 4),
          pt === 0 ? sealingWaxMat : burnishedBrassMat
        );
        const r = 2.88;
        pointerSpike.position.set(Math.cos(a) * r, 0.04, Math.sin(a) * r);
        pointerSpike.rotation.x = Math.PI / 2;
        pointerSpike.rotation.z = -a - Math.PI / 2;
        compassRoseGroup.add(pointerSpike);
      }
      dioramaCore.add(compassRoseGroup);

      // Sheltered Aegean Sea Basin inside the Harbor
      const harborWater = new THREE.Mesh(
        new THREE.CylinderGeometry(2.58, 2.65, 0.18, 32),
        seaSlateMat
      );
      harborWater.position.y = 0.08;
      harborWater.receiveShadow = true;

      // Sandy shoreline shelf lining the inner cove of the horseshoe cliffs
      const sandShore = new THREE.Mesh(
        new THREE.TorusGeometry(1.48, 0.22, 8, 32, Math.PI * 1.2),
        sandstoneMat
      );
      sandShore.rotation.x = Math.PI / 2;
      // Midpoint of the 1.2π arc sits at 1.5π (-Z rear cove), tucking both ends under the west & east headlands
      sandShore.rotation.z = Math.PI * 0.9;
      sandShore.position.set(0, 0.13, -0.12);
      dioramaCore.add(harborWater, sandShore);

      // Curved Rocky Ithacan Headlands (Horseshoe Cliffs)
      const cliffNodes = [
        { x: -1.85, z: 0.45, r: 0.62, h: 0.78 },
        { x: -1.75, z: -0.55, r: 0.72, h: 0.98 },
        { x: -1.15, z: -1.45, r: 0.85, h: 1.25 },
        { x: -0.15, z: -1.75, r: 0.92, h: 1.42 },
        { x: 0.95, z: -1.5, r: 0.82, h: 1.18 },
        { x: 1.72, z: -0.65, r: 0.7, h: 0.92 },
        { x: 1.82, z: 0.35, r: 0.58, h: 0.72 },
      ];
      cliffNodes.forEach((c, idx) => {
        const rock = new THREE.Mesh(
          new THREE.ConeGeometry(c.r, c.h, 7),
          idx % 2 === 0 ? weatheredStoneMat : limestoneMat
        );
        rock.position.set(c.x, 0.12 + c.h * 0.46, c.z);
        rock.rotation.y = idx * 0.7;
        rock.castShadow = true;
        rock.receiveShadow = true;
        dioramaCore.add(rock);
      });

      // Hilltop terrace footing for Odysseus' hall (top surface the hall rests on)
      const hallTerraceTopY = 1.16;
      const hallTerrace = new THREE.Mesh(
        new THREE.CylinderGeometry(0.54, 0.72, hallTerraceTopY - 0.15, 7),
        limestoneMat
      );
      hallTerrace.position.set(-0.12, (hallTerraceTopY + 0.15) * 0.5, -1.58);
      hallTerrace.castShadow = true;
      hallTerrace.receiveShadow = true;
      dioramaCore.add(hallTerrace);

      // Ground height on the headlands so props rest on the rock instead of floating
      const harborWaterTopY = 0.17;
      const cliffSurfaceY = (x: number, z: number): number => {
        let y = harborWaterTopY;
        cliffNodes.forEach((c) => {
          const effR = c.r * 0.9; // inscribed radius of the 7-sided cone
          const d = Math.hypot(x - c.x, z - c.z);
          if (d < effR) {
            const apexY = 0.12 + c.h * 0.96;
            y = Math.max(y, apexY - (d / effR) * c.h);
          }
        });
        if (Math.hypot(x + 0.12, z + 1.58) < 0.5) y = Math.max(y, hallTerraceTopY);
        return y;
      };

      // Ancient Greek Ruins on a rocky knoll of the West Headland (Doric Columns & Architrave)
      const ruinsKnoll = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.52, 0.34, 7),
        limestoneMat
      );
      ruinsKnoll.position.set(-1.6, 0.3, 0.05);
      ruinsKnoll.castShadow = true;
      ruinsKnoll.receiveShadow = true;
      dioramaCore.add(ruinsKnoll);

      const ruinsGroup = new THREE.Group();
      ruinsGroup.position.set(-1.6, 0.52, 0.05);
      ruinsGroup.rotation.y = 0.55;

      // Weathered stylobate the colonnade stands on
      const stylobate = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, 0.05, 0.3),
        agedIvoryMat
      );
      stylobate.position.y = -0.025;
      stylobate.castShadow = true;
      stylobate.receiveShadow = true;
      ruinsGroup.add(stylobate);

      [-0.24, 0.24].forEach((cx) => {
        const col = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.055, 0.48, 8),
          agedIvoryMat
        );
        col.position.set(cx, 0.24, 0);
        col.castShadow = true;
        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.04, 0.12),
          agedIvoryMat
        );
        cap.position.set(cx, 0.49, 0);
        ruinsGroup.add(col, cap);
      });
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.66, 0.06, 0.14),
        agedIvoryMat
      );
      beam.position.set(0, 0.54, 0);
      beam.castShadow = true;
      ruinsGroup.add(beam);

      // Fallen column drum resting on the knoll beside the stylobate
      const fallenDrum = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.18, 8),
        weatheredStoneMat
      );
      fallenDrum.position.set(0.18, 0.0, 0.24);
      fallenDrum.rotation.z = Math.PI / 2;
      fallenDrum.castShadow = true;
      ruinsGroup.add(fallenDrum);
      dioramaCore.add(ruinsGroup);

      // Wooden Harbor Jetty / Pier with stacked amphorae
      const pierGroup = new THREE.Group();
      pierGroup.position.set(1.15, 0.16, 0.25);
      pierGroup.rotation.y = -0.42;

      const pierDeck = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.06, 0.95),
        agedCedarMat
      );
      pierDeck.position.set(0, 0, 0);
      pierDeck.castShadow = true;
      pierGroup.add(pierDeck);

      // Wooden mooring pilings
      [
        [-0.18, -0.4],
        [0.18, -0.4],
        [-0.18, 0.4],
        [0.18, 0.4],
      ].forEach(([px, pz]) => {
        const piling = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.035, 0.32, 6),
          carvedWalnutMat
        );
        piling.position.set(px, 0.08, pz);
        pierGroup.add(piling);
      });

      // Stacked terracotta amphorae on the pier
      const amphora1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.065, 0.16, 8),
        terracottaMat
      );
      amphora1.position.set(0.08, 0.11, 0.22);
      amphora1.castShadow = true;
      const amphora2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.055, 0.14, 8),
        terracottaMat
      );
      amphora2.position.set(-0.06, 0.1, 0.28);
      amphora2.castShadow = true;
      pierGroup.add(amphora1, amphora2);
      dioramaCore.add(pierGroup);

      // Carved stone stair climbing the west headland to the hilltop terrace in front of the hall.
      // Treads rise monotonically to the terrace rim and each rests on a solid masonry riser
      // seated into the rock, so no step floats, dips, or jumps.
      const stairStart = new THREE.Vector2(-1.4, -0.8);
      const terraceCenter = new THREE.Vector2(-0.12, -1.58);
      const terraceRimR = 0.54 * Math.cos(Math.PI / 7); // inscribed radius of the 7-sided terrace top
      const stairLandingAngle = 2.0; // front-west rim, facing the hall entrance
      const stairEnd = new THREE.Vector2(
        terraceCenter.x + Math.cos(stairLandingAngle) * terraceRimR,
        terraceCenter.y + Math.sin(stairLandingAngle) * terraceRimR
      );
      const stairDir = stairEnd.clone().sub(stairStart);
      const stairLen = stairDir.length();
      stairDir.normalize();
      const stairSide = new THREE.Vector2(-stairDir.y, stairDir.x);
      const stairAngle = Math.atan2(stairDir.x, stairDir.y);
      const stairBaseY = cliffSurfaceY(stairStart.x, stairStart.y);
      // Top tread sits a hair below the terrace top to avoid coplanar flicker
      const stairTopY = hallTerraceTopY - 0.004;
      const stepCount = Math.max(2, Math.round((stairTopY - stairBaseY) / 0.065));
      const stepRise = (stairTopY - stairBaseY) / stepCount;
      const stepRun = stairLen / stepCount;
      const stepWidth = 0.2;
      const treadThickness = 0.03;
      for (let s = 0; s < stepCount; s++) {
        const treadTopY = stairBaseY + (s + 1) * stepRise;
        const centerDist = (s + 0.5) * stepRun;
        const px = stairStart.x + stairDir.x * centerDist;
        const pz = stairStart.y + stairDir.y * centerDist;

        // Lowest rock under the step footprint so the riser block reaches solid ground
        let groundMinY = Infinity;
        [-0.5, 0.5].forEach((along) => {
          [-0.5, 0.5].forEach((across) => {
            const fx = px + stairDir.x * along * stepRun + stairSide.x * across * stepWidth;
            const fz = pz + stairDir.y * along * stepRun + stairSide.y * across * stepWidth;
            groundMinY = Math.min(groundMinY, cliffSurfaceY(fx, fz));
          });
        });
        const riserBottomY = Math.min(groundMinY, treadTopY - stepRise) - 0.04;
        const riserTopY = treadTopY - treadThickness;

        const riser = new THREE.Mesh(
          new THREE.BoxGeometry(stepWidth, riserTopY - riserBottomY, stepRun + 0.01),
          limestoneMat
        );
        riser.position.set(px, (riserTopY + riserBottomY) / 2, pz);
        riser.rotation.y = stairAngle;
        riser.castShadow = true;
        riser.receiveShadow = true;

        const tread = new THREE.Mesh(
          new THREE.BoxGeometry(stepWidth + 0.02, treadThickness, stepRun + 0.012),
          agedIvoryMat
        );
        tread.position.set(px, treadTopY - treadThickness / 2, pz);
        tread.rotation.y = stairAngle;
        tread.castShadow = true;
        tread.receiveShadow = true;
        dioramaCore.add(riser, tread);
      }

      // Odysseus' Hillside Hall with Warm Candlelit Window, resting on the hilltop terrace
      const hallBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.76, 0.44, 0.48),
        agedIvoryMat
      );
      hallBody.position.set(-0.12, hallTerraceTopY + 0.22, -1.58);
      hallBody.castShadow = true;

      const hallRoof = new THREE.Mesh(
        new THREE.ConeGeometry(0.58, 0.28, 4),
        terracottaMat
      );
      hallRoof.position.set(-0.12, hallTerraceTopY + 0.58, -1.58);
      hallRoof.rotation.y = Math.PI / 4;
      hallRoof.scale.set(1.2, 1, 0.85);

      const warmWindow = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.14, 0.5),
        amberGlowMat
      );
      warmWindow.position.set(-0.12, hallTerraceTopY + 0.22, -1.58);
      dioramaCore.add(hallBody, hallRoof, warmWindow);

      // Sacred Olive Trees rooted on the Headlands
      [
        [-1.48, -0.48],
        [1.15, -1.25],
        [0.52, -1.55],
      ].forEach(([ox, oz]) => {
        const groundY = cliffSurfaceY(ox, oz);
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, 0.36, 7),
          carvedWalnutMat
        );
        trunk.position.set(ox, groundY + 0.14, oz);
        trunk.rotation.z = 0.12;
        const foliage = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.26, 1),
          mossGreenMat
        );
        foliage.scale.set(1.2, 0.75, 1.2);
        foliage.position.set(ox, groundY + 0.38, oz);
        foliage.castShadow = true;
        dioramaCore.add(trunk, foliage);
      });

      // Centerpiece Miniature Ancient Greek Warship (Odysseus' Black Ship / Homeric Galley)
      const triremeGroup = new THREE.Group();
      triremeGroup.position.set(-0.18, 0.26, 0.48);
      triremeGroup.rotation.y = -0.28;

      // 1. Slender Carved Timber Hull of Antiquity (tapered bow, beam, and stern)
      const hullGroup = new THREE.Group();

      // Shared hull section: the bow and stern taper from the exact midships end faces
      const HULL_HALF_L = 0.59;
      const HULL_HALF_W = 0.22;
      const HULL_TOP = 0.19;
      const HULL_BOTTOM = -0.03;
      // Bow stem rakes forward at the forefoot (under the stem post, above the ram)
      const BOW_TIP_X = -1.095;
      const BOW_KEEL_X = -1.13;
      // Stern tip sits under the base of the aphlaston
      const STERN_TIP_X = 0.99;
      const STERN_KEEL_X = 0.88;
      const KEEL_TIP_Y = -0.01;

      // Midships hull
      const midHull = new THREE.Mesh(
        new THREE.BoxGeometry(HULL_HALF_L * 2, HULL_TOP - HULL_BOTTOM, HULL_HALF_W * 2),
        agedCedarMat
      );
      midHull.position.set(0, (HULL_TOP + HULL_BOTTOM) / 2, 0);
      midHull.castShadow = true;

      // Closed tapered hull end: rectangular base flush with the midships face, converging
      // port & starboard planking into a single raked stem line on the centerline
      const buildHullEndGeometry = (dir: -1 | 1, tipX: number, keelX: number) => {
        const x0 = dir * HULL_HALF_L;
        const A = new THREE.Vector3(x0, HULL_TOP, HULL_HALF_W);
        const B = new THREE.Vector3(x0, HULL_BOTTOM, HULL_HALF_W);
        const C = new THREE.Vector3(x0, HULL_BOTTOM, -HULL_HALF_W);
        const D = new THREE.Vector3(x0, HULL_TOP, -HULL_HALF_W);
        const T = new THREE.Vector3(tipX, HULL_TOP, 0);
        const K = new THREE.Vector3(keelX, KEEL_TIP_Y, 0);
        const inner = new THREE.Vector3(x0 + dir * 0.15, (HULL_TOP + HULL_BOTTOM) / 2, 0);
        const tris = [
          [A, T, D], // deck plane
          [B, C, K], // underside
          [A, B, K], [A, K, T], // port planking
          [D, K, C], [D, T, K], // starboard planking
        ];
        const positions: number[] = [];
        const e1 = new THREE.Vector3();
        const e2 = new THREE.Vector3();
        const centroid = new THREE.Vector3();
        tris.forEach(([p, q, r]) => {
          e1.subVectors(q, p);
          e2.subVectors(r, p);
          centroid.copy(p).add(q).add(r).divideScalar(3).sub(inner);
          // Enforce outward-facing winding so the hull renders solid from every angle
          const ordered = e1.cross(e2).dot(centroid) >= 0 ? [p, q, r] : [p, r, q];
          ordered.forEach((v) => positions.push(v.x, v.y, v.z));
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.computeVertexNormals();
        return { geo, A, D, T, K };
      };

      // Hull plan outline (XZ) inset by `d` from the planking edge, used for deck & gunwales
      const buildHullPlanShape = (d: number) => {
        const bowLen = -BOW_TIP_X - HULL_HALF_L;
        const sternLen = STERN_TIP_X - HULL_HALF_L;
        const bowAngle = Math.atan2(HULL_HALF_W, bowLen);
        const sternAngle = Math.atan2(HULL_HALF_W, sternLen);
        const bowTip = BOW_TIP_X + d / Math.sin(bowAngle);
        const sternTip = STERN_TIP_X - d / Math.sin(sternAngle);
        const halfW = HULL_HALF_W - d;
        const bowCorner = bowTip + (halfW * bowLen) / HULL_HALF_W;
        const sternCorner = sternTip - (halfW * sternLen) / HULL_HALF_W;
        const shape = new THREE.Shape();
        shape.moveTo(bowTip, 0);
        shape.lineTo(bowCorner, halfW);
        shape.lineTo(sternCorner, halfW);
        shape.lineTo(sternTip, 0);
        shape.lineTo(sternCorner, -halfW);
        shape.lineTo(bowCorner, -halfW);
        shape.closePath();
        return shape;
      };

      // Extrudes a plan shape downward from `topY` (shape Y maps to world Z)
      const extrudePlan = (shape: THREE.Shape, depth: number, topY: number, mat: THREE.Material) => {
        const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
        geo.rotateX(Math.PI / 2);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = topY;
        return mesh;
      };

      // Tapered sharp bow wedge pointing forward (-X)
      const bowEnd = buildHullEndGeometry(-1, BOW_TIP_X, BOW_KEEL_X);
      const bowWedge = new THREE.Mesh(bowEnd.geo, agedCedarMat);
      bowWedge.castShadow = true;

      // Upswept Prow Stem Post (Acrostolion)
      const prowStem = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.42, 0.08),
        carvedWalnutMat
      );
      prowStem.position.set(-1.08, 0.24, 0);
      prowStem.rotation.z = -0.28;
      prowStem.castShadow = true;

      // Bronze Underwater Battering Ram (Embolon) at the prow waterline
      // Square section spun about its own axis before tilting, so it stays on the keel line
      const prowRamGeo = new THREE.ConeGeometry(0.09, 0.35, 4);
      prowRamGeo.rotateY(Math.PI / 4);
      const prowRam = new THREE.Mesh(prowRamGeo, burnishedBrassMat);
      prowRam.position.set(-1.2, 0.02, 0);
      prowRam.rotation.z = Math.PI / 2;
      prowRam.castShadow = true;

      // Tapered stern wedge aft (+X)
      const sternEnd = buildHullEndGeometry(1, STERN_TIP_X, STERN_KEEL_X);
      const sternWedge = new THREE.Mesh(sternEnd.geo, agedCedarMat);
      sternWedge.castShadow = true;

      // Gracefully upswept Homeric swan-neck sternpost (Aphlaston) curving high above the stern
      const aphlastonCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.88, 0.12, 0),
        new THREE.Vector3(1.04, 0.28, 0),
        new THREE.Vector3(1.06, 0.48, 0),
        new THREE.Vector3(0.94, 0.62, 0),
      ]);
      const aphlaston = new THREE.Mesh(
        new THREE.TubeGeometry(aphlastonCurve, 14, 0.032, 8, false),
        carvedWalnutMat
      );
      aphlaston.castShadow = true;

      const aphlastonFinial = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        burnishedBrassMat
      );
      aphlastonFinial.position.set(0.94, 0.62, 0);
      hullGroup.add(aphlastonFinial);

      // Dark Walnut Deck Planking & Bulwarks (follows the tapered hull plan to both tips)
      const deck = extrudePlan(buildHullPlanShape(0.03), 0.04, 0.21, carvedWalnutMat);

      // Raised Port & Starboard Gunwales: one continuous rail converging at bow and stern
      const gunwaleShape = buildHullPlanShape(0.01);
      gunwaleShape.holes.push(new THREE.Path(buildHullPlanShape(0.05).getPoints().reverse()));
      const gunwale = extrudePlan(gunwaleShape, 0.06, 0.26, carvedWalnutMat);
      hullGroup.add(gunwale);

      // Painted Apotropaic Greek Eyes (Ophthalmoi) on Port & Starboard Bow, seated on the planking
      const EYE_X = -0.82;
      const EYE_Y = 0.13;
      const yAxis = new THREE.Vector3(0, 1, 0);
      [-1, 1].forEach((side) => {
        const plankCorner = side > 0 ? bowEnd.A : bowEnd.D;
        const normal = new THREE.Vector3()
          .subVectors(bowEnd.K, plankCorner)
          .cross(new THREE.Vector3().subVectors(bowEnd.T, plankCorner))
          .normalize();
        if (normal.z * side < 0) normal.negate();
        const ez =
          plankCorner.z -
          (normal.x * (EYE_X - plankCorner.x) + normal.y * (EYE_Y - plankCorner.y)) / normal.z;
        const eyeCenter = new THREE.Vector3(EYE_X, EYE_Y, ez).addScaledVector(normal, 0.002);
        const eyeQuat = new THREE.Quaternion().setFromUnitVectors(yAxis, normal);

        const eyeWhite = new THREE.Mesh(
          new THREE.CylinderGeometry(0.038, 0.038, 0.02, 10),
          agedIvoryMat
        );
        eyeWhite.quaternion.copy(eyeQuat);
        eyeWhite.position.copy(eyeCenter);

        const eyePupil = new THREE.Mesh(
          new THREE.SphereGeometry(0.018, 6, 6),
          darkSlateMat
        );
        eyePupil.position.copy(eyeCenter).addScaledVector(normal, 0.012);
        hullGroup.add(eyeWhite, eyePupil);
      });

      hullGroup.add(midHull, bowWedge, prowStem, prowRam, sternWedge, aphlaston, deck);
      triremeGroup.add(hullGroup);

      // 2. Miniature Banks of Ivory Oars on Port & Starboard sloping downward from the hull into the harbor water
      for (let o = -3; o <= 2; o++) {
        [-1, 1].forEach((side) => {
          const oar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.012, 0.016, 0.48, 6),
            agedIvoryMat
          );
          oar.position.set(o * 0.2 - 0.05, 0.04, side * 0.29);
          oar.rotation.x = -side * 0.85;
          oar.rotation.z = 0.15;
          triremeGroup.add(oar);
        });
      }

      // 3. Miniature Hoplite Shields along the Gunwales
      for (let s = -2; s <= 2; s++) {
        [-1, 1].forEach((side) => {
          const shield = new THREE.Mesh(
            new THREE.CylinderGeometry(0.075, 0.075, 0.02, 10),
            s % 2 === 0 ? agedBronzeMat : sealingWaxMat
          );
          shield.position.set(s * 0.25 - 0.05, 0.21, side * 0.21);
          shield.rotation.x = Math.PI / 2;
          shield.castShadow = true;
          triremeGroup.add(shield);
        });
      }

      // 4. Subtle V-shaped sea foam wake ripples on the water surface alongside the hull
      [-1, 1].forEach((side) => {
        const wakeRipple = new THREE.Mesh(
          new THREE.BoxGeometry(0.62, 0.015, 0.03),
          foamWhiteMat
        );
        wakeRipple.position.set(0.68, -0.08, side * 0.24);
        wakeRipple.rotation.y = -side * 0.22;
        triremeGroup.add(wakeRipple);
      });

      // 5. Central Mast, Upper & Lower Spars, and Naturally Billowing Square Sail
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.032, 0.042, 1.48, 8),
        carvedWalnutMat
      );
      mast.position.set(-0.06, 0.85, 0);
      mast.castShadow = true;

      const yardarm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 1.12, 8),
        carvedWalnutMat
      );
      yardarm.position.set(-0.06, 1.32, 0);
      yardarm.rotation.x = Math.PI / 2;

      const lowerBoom = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 1.08, 8),
        carvedWalnutMat
      );
      lowerBoom.position.set(-0.06, 0.56, 0);
      lowerBoom.rotation.x = Math.PI / 2;

      // Billowing Square Sail tied flush to the upper yardarm and lower boom while curving forward (-X)
      const sailGeo = new THREE.PlaneGeometry(1.02, 0.76, 12, 8);
      const sailPos = sailGeo.attributes.position;
      for (let i = 0; i < sailPos.count; i++) {
        const nx = sailPos.getX(i) / 0.51;
        const ny = sailPos.getY(i) / 0.38;
        const bow = (1 - nx * nx * 0.35) * (1 - ny * ny) * 0.18;
        sailPos.setZ(i, -bow);
      }
      sailGeo.computeVertexNormals();

      const sailMat = new THREE.MeshStandardMaterial({
        color: '#F4ECD8',
        roughness: 0.72,
        side: THREE.DoubleSide,
      });
      const sailMesh = new THREE.Mesh(sailGeo, sailMat);
      sailMesh.position.set(-0.06, 0.94, 0);
      sailMesh.rotation.y = Math.PI / 2;
      sailMesh.castShadow = true;

      // Curved Crimson Band woven directly onto the billowing sail surface (no flat-box clipping)
      const stripeGeo = new THREE.PlaneGeometry(1.02, 0.13, 12, 2);
      const stripePos = stripeGeo.attributes.position;
      for (let i = 0; i < stripePos.count; i++) {
        const nx = stripePos.getX(i) / 0.51;
        const ny = stripePos.getY(i) / 0.38;
        const bow = (1 - nx * nx * 0.35) * (1 - ny * ny) * 0.18 + 0.008;
        stripePos.setZ(i, -bow);
      }
      stripeGeo.computeVertexNormals();
      const crimsonStripeMat = new THREE.MeshStandardMaterial({
        color: '#873B35',
        roughness: 0.5,
        side: THREE.DoubleSide,
      });
      const crimsonStripe = new THREE.Mesh(stripeGeo, crimsonStripeMat);
      crimsonStripe.position.set(-0.06, 0.94, 0);
      crimsonStripe.rotation.y = Math.PI / 2;

      // Rigging stays connecting the masthead (-0.06, 1.48, 0) to the bow stem and stern deck
      const foreStay = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 1.5, 6),
        antiqueBrassMat
      );
      foreStay.position.set(-0.55, 0.91, 0);
      foreStay.rotation.z = -0.71;

      const backStay = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 1.5, 6),
        antiqueBrassMat
      );
      backStay.position.set(0.39, 0.88, 0);
      backStay.rotation.z = 0.64;

      triremeGroup.add(mast, yardarm, lowerBoom, sailMesh, crimsonStripe, foreStay, backStay);
      dioramaCore.add(triremeGroup);
      animatedParts.push(triremeGroup);

      // Warm Golden Harbor Lantern Light
      const harborCandleLight = new THREE.PointLight('#F3C879', 4.5, 10);
      harborCandleLight.position.set(0, 2.2, 0);
      dioramaCore.add(harborCandleLight);
      break;
    }

    case 'roland': {
      // VII. The Song of Roland - The Pass of Roncevaux
      // Deep cloven Pyrenean gorge with snow-capped slate peaks, alpine pine trees,
      // winding stone defile road, fortified stone watchtower on a rocky crag bastion with Frankish banner,
      // the carved Ivory Oliphant war-horn on a stepped memorial altar plinth, and sword Durendal wedged in split granite.
      const mountainBase = new THREE.Mesh(
        new THREE.CylinderGeometry(2.08, 2.18, 0.24, 24),
        darkSlateMat
      );
      mountainBase.position.y = 0.1;
      mountainBase.receiveShadow = true;
      dioramaCore.add(mountainBase);

      // Winding Stone-Paved Pyrenean Defile Road (running cleanly through the center of the gorge)
      const roadGroup = new THREE.Group();
      for (let s = -4; s <= 4; s++) {
        const t = s / 4;
        const rx = -0.14 + Math.sin(t * 1.1) * 0.12 - t * 0.12;
        const rz = t * 1.56;
        const roadSlab = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.06, 0.46),
          s % 2 === 0 ? sandstoneMat : weatheredStoneMat
        );
        roadSlab.position.set(rx, 0.23, rz);
        roadSlab.rotation.y = Math.cos(t * 1.1) * 0.12 - 0.08;
        roadSlab.receiveShadow = true;
        roadGroup.add(roadSlab);
      }
      dioramaCore.add(roadGroup);

      // Steep Cloven Pyrenean Peaks with Coaxial Snow Caps (no overhanging caps)
      const westPeakGroup = new THREE.Group();
      westPeakGroup.position.set(-1.18, 0.22, 0.18);
      westPeakGroup.rotation.z = -0.09;

      const westSlope = new THREE.Mesh(
        new THREE.ConeGeometry(0.84, 1.96, 7),
        darkSlateMat
      );
      westSlope.position.set(0, 0.98, 0);
      westSlope.castShadow = true;
      westSlope.receiveShadow = true;

      const westShoulder = new THREE.Mesh(
        new THREE.ConeGeometry(0.56, 1.28, 6),
        weatheredStoneMat
      );
      westShoulder.position.set(0.24, 0.64, 0.36);
      westShoulder.castShadow = true;
      westShoulder.receiveShadow = true;

      const westSnowCap = new THREE.Mesh(
        new THREE.ConeGeometry(0.285, 0.64, 7),
        snowWhiteMat
      );
      westSnowCap.position.set(0, 1.65, 0);
      westSnowCap.castShadow = true;

      westPeakGroup.add(westSlope, westShoulder, westSnowCap);

      const eastPeakGroup = new THREE.Group();
      eastPeakGroup.position.set(1.16, 0.22, -0.14);
      eastPeakGroup.rotation.z = 0.09;

      const eastSlope = new THREE.Mesh(
        new THREE.ConeGeometry(0.82, 1.84, 7),
        weatheredStoneMat
      );
      eastSlope.position.set(0, 0.92, 0);
      eastSlope.castShadow = true;
      eastSlope.receiveShadow = true;

      const eastShoulder = new THREE.Mesh(
        new THREE.ConeGeometry(0.54, 1.22, 6),
        darkSlateMat
      );
      eastShoulder.position.set(-0.22, 0.61, -0.38);
      eastShoulder.castShadow = true;
      eastShoulder.receiveShadow = true;

      const eastSnowCap = new THREE.Mesh(
        new THREE.ConeGeometry(0.275, 0.6, 7),
        snowWhiteMat
      );
      eastSnowCap.position.set(0, 1.55, 0);
      eastSnowCap.castShadow = true;

      eastPeakGroup.add(eastSlope, eastShoulder, eastSnowCap);
      dioramaCore.add(westPeakGroup, eastPeakGroup);

      // Fortified Stone Watchtower on a Grounded Crag Bastion with Frankish Banner
      const towerGroup = new THREE.Group();
      towerGroup.position.set(-0.82, 0.22, -0.92);

      const towerBastion = new THREE.Mesh(
        new THREE.CylinderGeometry(0.44, 0.58, 0.56, 8),
        darkSlateMat
      );
      towerBastion.position.y = 0.28;
      towerBastion.castShadow = true;
      towerBastion.receiveShadow = true;

      const watchtower = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.82, 0.5),
        weatheredStoneMat
      );
      watchtower.position.y = 0.96;
      watchtower.castShadow = true;
      watchtower.receiveShadow = true;

      const towerBattlement = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.14, 0.58),
        carvedWalnutMat
      );
      towerBattlement.position.y = 1.42;
      towerBattlement.castShadow = true;

      // Four corner stone merlons atop the watchtower parapet
      [
        [-0.22, -0.22],
        [0.22, -0.22],
        [-0.22, 0.22],
        [0.22, 0.22],
      ].forEach(([mx, mz]) => {
        const merlon = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.1, 0.14),
          weatheredStoneMat
        );
        merlon.position.set(mx, 1.54, mz);
        towerGroup.add(merlon);
      });

      const flagPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.02, 0.62, 6),
        burnishedBrassMat
      );
      flagPole.position.set(0, 1.78, 0);

      const bannerPivot = new THREE.Group();
      bannerPivot.position.set(0, 1.96, 0);
      const frankishBanner = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.18, 0.022),
        sealingWaxMat
      );
      frankishBanner.position.set(0.19, 0, 0);
      const bannerCross = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.04, 0.026),
        goldLeafMat
      );
      bannerCross.position.set(0.18, 0, 0);
      bannerPivot.add(frankishBanner, bannerCross);

      towerGroup.add(towerBastion, watchtower, towerBattlement, flagPole, bannerPivot);
      dioramaCore.add(towerGroup);
      animatedParts.push(bannerPivot);

      // Grounded Pyrenean Alpine Pine Trees (trunks rooted firmly in terrain and ledges)
      [
        { x: -0.68, z: 0.96, s: 1.0 },
        { x: -1.32, z: 0.78, s: 0.88 },
        { x: 0.72, z: -0.94, s: 0.95 },
        { x: 1.24, z: 0.58, s: 0.9 },
      ].forEach((tp) => {
        const treeGroup = new THREE.Group();
        treeGroup.position.set(tp.x, 0.22, tp.z);
        treeGroup.scale.setScalar(tp.s);

        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.048, 0.32, 6),
          agedCedarMat
        );
        trunk.position.y = 0.16;
        trunk.castShadow = true;

        const lowerCone = new THREE.Mesh(
          new THREE.ConeGeometry(0.2, 0.44, 7),
          deepFoliageMat
        );
        lowerCone.position.y = 0.42;
        lowerCone.castShadow = true;

        const upperCone = new THREE.Mesh(
          new THREE.ConeGeometry(0.15, 0.36, 7),
          mossGreenMat
        );
        upperCone.position.y = 0.64;
        upperCone.castShadow = true;

        treeGroup.add(trunk, lowerCone, upperCone);
        dioramaCore.add(treeGroup);
      });

      // Primary Focal Artifact: The Legendary Carved Ivory Oliphant Horn of Roland
      const oliphantGroup = new THREE.Group();
      oliphantGroup.position.set(0.38, 0.22, 0.54);
      oliphantGroup.rotation.y = -0.06;

      // Stepped stone memorial altar plinth grounded beside the Roncevaux gorge path
      const plinthStep = new THREE.Mesh(
        new THREE.BoxGeometry(0.94, 0.1, 0.58),
        darkSlateMat
      );
      plinthStep.position.y = 0.05;
      plinthStep.castShadow = true;
      plinthStep.receiveShadow = true;

      const hornPlinth = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.28, 0.46),
        weatheredStoneMat
      );
      hornPlinth.position.y = 0.24;
      hornPlinth.castShadow = true;
      hornPlinth.receiveShadow = true;

      const hornPlinthCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.86, 0.07, 0.52),
        darkSlateMat
      );
      hornPlinthCap.position.y = 0.415;
      hornPlinthCap.castShadow = true;

      // Crimson ceremonial baldrick cloth draped across the altar with gold trim
      const baldrickRibbon = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.04, 0.28),
        sealingWaxMat
      );
      baldrickRibbon.position.set(0, 0.46, 0);

      const baldrickFrontDrape = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.22, 0.03),
        sealingWaxMat
      );
      baldrickFrontDrape.position.set(0, 0.34, 0.255);

      const baldrickGoldTrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.035, 0.035),
        goldLeafMat
      );
      baldrickGoldTrim.position.set(0, 0.23, 0.255);

      // Two ornate brass cradle brackets supporting the curved ivory horn on the plinth
      [-0.1, 0.22].forEach((cx, cIdx) => {
        const cradleHeight = cIdx === 0 ? 0.1 : 0.11;
        const cradleStem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.042, cradleHeight, 8),
          burnishedBrassMat
        );
        cradleStem.position.set(cx, 0.47 + cradleHeight * 0.5, 0);
        const cradleYoke = new THREE.Mesh(
          new THREE.TorusGeometry(0.085 - cIdx * 0.03, 0.014, 6, 12, Math.PI),
          burnishedBrassMat
        );
        cradleYoke.position.set(cx, 0.47 + cradleHeight + 0.025, 0);
        cradleYoke.rotation.y = Math.PI / 2;
        cradleYoke.rotation.x = Math.PI;
        oliphantGroup.add(cradleStem, cradleYoke);
      });

      oliphantGroup.add(
        plinthStep,
        hornPlinth,
        hornPlinthCap,
        baldrickRibbon,
        baldrickFrontDrape,
        baldrickGoldTrim
      );

      // Seamless Curved & Tapered Ivory Oliphant Tusk Body (broadside crescent profile)
      const hornSubGroup = new THREE.Group();
      hornSubGroup.position.set(0, 0.47, 0);

      const hornCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.48, 0.28, 0),
        new THREE.Vector3(0.22, 0.12, 0),
        new THREE.Vector3(-0.08, 0.11, 0),
        new THREE.Vector3(-0.36, 0.19, 0),
        new THREE.Vector3(-0.56, 0.35, 0),
      ]);

      const getHornRadius = (t: number) =>
        0.026 + 0.105 * Math.pow(t, 1.25) + 0.062 * Math.pow(t, 3.0);

      const tubularSegments = 36;
      const radialSegments = 16;
      const hornPositions: number[] = [];
      const hornIndices: number[] = [];
      const binormal = new THREE.Vector3(0, 0, 1);

      for (let i = 0; i <= tubularSegments; i++) {
        const t = i / tubularSegments;
        const pt = hornCurve.getPointAt(t);
        const tangent = hornCurve.getTangentAt(t).normalize();
        const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
        const r = getHornRadius(t);

        for (let j = 0; j <= radialSegments; j++) {
          const theta = (j / radialSegments) * Math.PI * 2;
          // Subtle 8-fluted medieval carved ivory facet relief
          const flute = 1 + Math.cos(theta * 8) * 0.018;
          const vx = pt.x + normal.x * Math.cos(theta) * r * flute;
          const vy = pt.y + normal.y * Math.cos(theta) * r * flute;
          const vz = pt.z + binormal.z * Math.sin(theta) * r * flute;
          hornPositions.push(vx, vy, vz);
        }
      }

      const ringStride = radialSegments + 1;
      for (let i = 0; i < tubularSegments; i++) {
        for (let j = 0; j < radialSegments; j++) {
          const a = i * ringStride + j;
          const b = (i + 1) * ringStride + j;
          const c = (i + 1) * ringStride + (j + 1);
          const d = i * ringStride + (j + 1);
          // Outward-facing surface normals
          hornIndices.push(a, d, b, b, d, c);
        }
      }

      // Cap the mouthpiece tip (t = 0)
      const tipCenterIdx = hornPositions.length / 3;
      const tipPt = hornCurve.getPointAt(0);
      hornPositions.push(tipPt.x, tipPt.y, tipPt.z);
      for (let j = 0; j < radialSegments; j++) {
        hornIndices.push(tipCenterIdx, j + 1, j);
      }

      const hornGeo = new THREE.BufferGeometry();
      hornGeo.setAttribute('position', new THREE.Float32BufferAttribute(hornPositions, 3));
      hornGeo.setIndex(hornIndices);
      hornGeo.computeVertexNormals();

      const oliphantIvoryMat = new THREE.MeshStandardMaterial({
        color: '#F4ECD8',
        roughness: 0.38,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });

      const hornBodyMesh = new THREE.Mesh(hornGeo, oliphantIvoryMat);
      hornBodyMesh.castShadow = true;
      hornBodyMesh.receiveShadow = true;
      hornSubGroup.add(hornBodyMesh);

      // Ornate Gold Mountings & Carved Relief Bands aligned perpendicularly to the horn curve
      const zAxis = new THREE.Vector3(0, 0, 1);
      [
        { t: 0.0, tube: 0.011 },
        { t: 0.25, tube: 0.013 },
        { t: 0.55, tube: 0.015 },
        { t: 0.82, tube: 0.017 },
        { t: 1.0, tube: 0.02 },
      ].forEach(({ t, tube }) => {
        const pt = hornCurve.getPointAt(t);
        const tangent = hornCurve.getTangentAt(t).normalize();
        const r = getHornRadius(t);
        const goldBand = new THREE.Mesh(
          new THREE.TorusGeometry(r * 1.01, tube, 10, 24),
          goldLeafMat
        );
        goldBand.position.copy(pt);
        goldBand.quaternion.setFromUnitVectors(zAxis, tangent);
        goldBand.castShadow = true;
        hornSubGroup.add(goldBand);
      });

      // Deep Hollow Interior Disc recessed inside the Flared Oliphant Bell
      const bellPt = hornCurve.getPointAt(0.98);
      const bellTan = hornCurve.getTangentAt(0.98).normalize();
      const hornInterior = new THREE.Mesh(
        new THREE.CylinderGeometry(getHornRadius(0.98) * 0.84, getHornRadius(0.96) * 0.78, 0.018, 16),
        darkSlateMat
      );
      hornInterior.position.copy(bellPt);
      hornInterior.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bellTan);
      hornSubGroup.add(hornInterior);

      oliphantGroup.add(hornSubGroup);
      dioramaCore.add(oliphantGroup);

      // Secondary Focal Element: Weathered Steel Sword Durendal Wedged in the Cloven Granite Boulder
      const boulderGroup = new THREE.Group();
      boulderGroup.position.set(-0.56, 0.22, -0.22);

      const leftRockHalf = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.32, 0),
        darkSlateMat
      );
      leftRockHalf.position.set(-0.15, 0.22, 0);
      leftRockHalf.scale.set(0.85, 1.15, 1.05);
      leftRockHalf.rotation.z = 0.22;
      leftRockHalf.castShadow = true;
      leftRockHalf.receiveShadow = true;

      const rightRockHalf = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.3, 0),
        weatheredStoneMat
      );
      rightRockHalf.position.set(0.15, 0.2, 0.04);
      rightRockHalf.scale.set(0.85, 1.08, 1.0);
      rightRockHalf.rotation.z = -0.2;
      rightRockHalf.castShadow = true;
      rightRockHalf.receiveShadow = true;

      boulderGroup.add(leftRockHalf, rightRockHalf);
      dioramaCore.add(boulderGroup);

      const swordGroup = new THREE.Group();
      swordGroup.position.set(-0.56, 0.88, -0.2);
      swordGroup.rotation.z = 0.12;
      swordGroup.rotation.y = 0.24;

      const agedSteelMat = new THREE.MeshStandardMaterial({
        color: '#B6BDC4',
        roughness: 0.3,
        metalness: 0.86,
      });
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.32, 0.032),
        agedSteelMat
      );
      blade.castShadow = true;

      const bladeFuller = new THREE.Mesh(
        new THREE.BoxGeometry(0.036, 1.18, 0.04),
        burnishedBrassMat
      );
      bladeFuller.position.y = 0.04;

      const crossguard = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.075, 0.09),
        goldLeafMat
      );
      crossguard.position.y = 0.5;
      crossguard.castShadow = true;

      const grip = new THREE.Mesh(
        new THREE.CylinderGeometry(0.036, 0.036, 0.26, 8),
        sealingWaxMat
      );
      grip.position.y = 0.66;

      const pommel = new THREE.Mesh(
        new THREE.SphereGeometry(0.072, 10, 10),
        goldLeafMat
      );
      pommel.position.y = 0.83;

      swordGroup.add(blade, bladeFuller, crossguard, grip, pommel);
      dioramaCore.add(swordGroup);
      break;
    }
  }

  // Carved Dark Walnut & Burnished Brass Miniature Plinth Under-Bevel (visible when lifted from the chart)
  const plinthGroup = new THREE.Group();
  const walnutPlinth = new THREE.Mesh(
    new THREE.CylinderGeometry(baseRadius * 0.96, baseRadius * 0.82, 0.24, 32),
    carvedWalnutMat
  );
  walnutPlinth.position.y = -0.06;
  walnutPlinth.castShadow = true;
  walnutPlinth.receiveShadow = true;

  const brassPlinthRim = new THREE.Mesh(
    new THREE.TorusGeometry(baseRadius * 0.97, 0.032, 10, 48),
    burnishedBrassMat
  );
  brassPlinthRim.rotation.x = Math.PI / 2;
  brassPlinthRim.position.y = 0.03;

  plinthGroup.add(walnutPlinth, brassPlinthRim);
  dioramaCore.add(plinthGroup);

  // Soft Layered Floating Shadow beneath the island when elevated above the parchment map
  const shadowTex = createFloatingShadowTexture();
  const floatingShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const floatingShadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(baseRadius * 3.1, baseRadius * 3.1),
    floatingShadowMat
  );
  floatingShadowMesh.name = 'floating-shadow';
  floatingShadowMesh.rotation.x = -Math.PI / 2;
  floatingShadowMesh.position.y = -0.36;
  floatingShadowMesh.visible = false;
  root.add(floatingShadowMesh);

  // 3D Vellum & Brass Cartouche Nameplate attached to the island so its title travels with it
  const cartoucheW = realm.isFavoriteMasterpiece ? 5.6 : 4.85;
  const cartoucheD = 0.88;
  const baseCartoucheZ = realm.isFavoriteMasterpiece ? 3.55 : 2.68;
  const liftedCartoucheZ = realm.isFavoriteMasterpiece ? 3.45 : 2.82;

  const cartoucheTex = createIslandCartoucheTexture(realm);
  const cartoucheTopMat = new THREE.MeshBasicMaterial({
    map: cartoucheTex,
  });
  const cartouchePlaqueMesh = new THREE.Mesh(
    new THREE.BoxGeometry(cartoucheW, 0.055, cartoucheD),
    [
      carvedWalnutMat,
      carvedWalnutMat,
      cartoucheTopMat,
      carvedWalnutMat,
      carvedWalnutMat,
      carvedWalnutMat,
    ]
  );
  cartouchePlaqueMesh.castShadow = true;
  cartouchePlaqueMesh.userData = { realmId: realm.id as RealmId };

  const cartouchePlaqueGroup = new THREE.Group();
  cartouchePlaqueGroup.name = 'cartouche-plaque';
  cartouchePlaqueGroup.position.set(0, 0.05, baseCartoucheZ);
  cartouchePlaqueGroup.add(cartouchePlaqueMesh);
  root.add(cartouchePlaqueGroup);

  // Invisible generous hit volume for smooth pointer and touch selection
  const hitGeo = new THREE.CylinderGeometry(baseRadius * 1.38, baseRadius * 1.38, 3.8, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.y = 1.45;
  hitMesh.userData = { realmId: realm.id as RealmId };
  root.add(hitMesh);

  const animate = (
    elapsed: number,
    isHovered: boolean,
    isSelected: boolean,
    liftProgress?: number
  ) => {
    const effectiveLift = liftProgress !== undefined ? liftProgress : isSelected ? 1 : 0;

    // When resting on the parchment map (liftProgress === 0), keep size unchanged
    if (liftProgress === undefined || effectiveLift <= 0.001) {
      const breath = isHovered && !isSelected ? Math.sin(elapsed * 3.0) * 0.012 : 0;
      const baseScale = isHovered && !isSelected ? 1.03 : 1.0;
      const targetScale = baseScale + breath;
      root.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
    }

    // Update layered floating shadow & 3D title cartouche orientation based on liftProgress
    if (effectiveLift > 0.005) {
      floatingShadowMesh.visible = true;
      floatingShadowMat.opacity = effectiveLift * 0.78;
      const shadowScale = 0.86 + effectiveLift * 0.32;
      floatingShadowMesh.scale.set(shadowScale, shadowScale, 1);
      floatingShadowMesh.position.y = -0.32 - effectiveLift * 0.68;
    } else {
      floatingShadowMesh.visible = false;
      floatingShadowMat.opacity = 0;
    }

    cartouchePlaqueGroup.position.x = 0;
    cartouchePlaqueGroup.position.y = THREE.MathUtils.lerp(0.05, -0.12, effectiveLift);
    cartouchePlaqueGroup.position.z = THREE.MathUtils.lerp(
      baseCartoucheZ,
      liftedCartoucheZ,
      effectiveLift
    );
    cartouchePlaqueGroup.rotation.set(THREE.MathUtils.lerp(0, 0.36, effectiveLift), 0, 0);

    // Physical Brass & Sealing-Wax Pin Marker raises and floats when hovered or selected
    const pinHoverBob = isSelected ? Math.sin(elapsed * 3.6) * 0.035 : 0;
    const targetPinY = (isSelected ? 0.32 : isHovered ? 0.18 : 0.02) + pinHoverBob;
    markerPinGroup.position.y += (targetPinY - markerPinGroup.position.y) * 0.15;

    // Continuous handcrafted mechanical diorama motion across all seven realms
    animatedParts.forEach((part, idx) => {
      if (realm.id === 'job') {
        // Swirling sandstorm ribbons of Uz rotating in alternating directions
        part.rotation.y = elapsed * (0.42 + idx * 0.07) * (idx % 2 === 0 ? 1 : -1);
      } else if (realm.id === 'mahabharata') {
        // Spoked bronze chariot wheels turning continuously along Kurukshetra
        part.rotation.z = -elapsed * 0.65;
      } else if (realm.id === 'odyssey') {
        // Gentle harbor wave rocking of the Ithacan trireme (pitch and roll)
        part.position.y = 0.26 + Math.sin(elapsed * 1.6) * 0.04;
        part.rotation.z = Math.sin(elapsed * 1.2) * 0.035;
        part.rotation.x = Math.cos(elapsed * 0.9) * 0.02;
      } else if (realm.id === 'panchatantra') {
        // Tiered banyan-tree canopy and pavilion swaying gently in forest breeze
        part.rotation.y = Math.sin(elapsed * 0.75) * 0.07;
      } else if (realm.id === 'ramayana') {
        // Golden spire of Lanka shimmering gently atop the citadel
        part.rotation.y = Math.sin(elapsed * 0.85) * 0.08;
        part.position.y = 1.82 + Math.sin(elapsed * 1.5) * 0.02;
      } else if (realm.id === 'iliad') {
        // Achilles celestial shield rotating slowly in Aegean sunlight while preserving its base angle
        part.rotation.y = 0.35 + Math.sin(elapsed * 0.9) * 0.06;
        part.rotation.z = 0.18 + Math.sin(elapsed * 1.1) * 0.04;
      } else if (realm.id === 'roland') {
        // Frankish banner fluttering gently in the Pyrenean mountain breeze
        part.rotation.y = Math.sin(elapsed * 1.8) * 0.12;
        part.rotation.z = Math.sin(elapsed * 1.2) * 0.03;
      } else {
        part.rotation.y = Math.sin(elapsed * 0.7) * 0.06;
      }
    });
  };

  return { root, hitMesh, animate };
}
