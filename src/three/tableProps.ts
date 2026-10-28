import * as THREE from 'three';
import { createParchmentChartTextures, createWalnutWoodTexture } from './parchmentTexture';

export interface ChartTableSceneHandles {
  tableGroup: THREE.Group;
  candleFlameMesh: THREE.Mesh;
  candleLight: THREE.PointLight;
  compassNeedleGroup: THREE.Group;
}

export function buildNavigatorChartTable(): ChartTableSceneHandles {
  const tableGroup = new THREE.Group();
  tableGroup.name = 'navigator-chart-table';

  const walnutTex = createWalnutWoodTexture();
  const { mapTexture, bumpTexture } = createParchmentChartTextures();

  // Materials
  const walnutMat = new THREE.MeshStandardMaterial({
    color: '#3B261A',
    map: walnutTex,
    roughness: 0.62,
    metalness: 0.08,
  });

  const deepWalnutMat = new THREE.MeshStandardMaterial({
    color: '#26170E',
    map: walnutTex,
    roughness: 0.55,
    metalness: 0.1,
  });

  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: '#2E1C12',
    roughness: 0.78,
    metalness: 0.05,
  });

  const antiqueBrassMat = new THREE.MeshStandardMaterial({
    color: '#A98545',
    roughness: 0.32,
    metalness: 0.84,
  });

  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: '#785B2A',
    roughness: 0.45,
    metalness: 0.78,
  });

  const crimsonWaxMat = new THREE.MeshStandardMaterial({
    color: '#873B35',
    roughness: 0.38,
    metalness: 0.12,
  });

  const vellumRollMat = new THREE.MeshStandardMaterial({
    color: '#EADBC0',
    roughness: 0.75,
    metalness: 0.02,
  });

  // 1. Main Dark Walnut Tabletop & Worn Leather Inlay Bed
  const tabletopSlab = new THREE.Mesh(new THREE.BoxGeometry(44, 1.4, 30), walnutMat);
  tabletopSlab.position.y = -0.82;
  tabletopSlab.receiveShadow = true;
  tableGroup.add(tabletopSlab);

  const leatherInlay = new THREE.Mesh(new THREE.BoxGeometry(38.5, 0.18, 25.5), wornLeatherMat);
  leatherInlay.position.y = -0.18;
  leatherInlay.receiveShadow = true;
  tableGroup.add(leatherInlay);

  // Beveled Outer Walnut Molding Rails
  const railNorth = new THREE.Mesh(new THREE.BoxGeometry(44.4, 0.55, 1.8), deepWalnutMat);
  railNorth.position.set(0, 0.08, -14.2);
  railNorth.receiveShadow = true;
  const railSouth = railNorth.clone();
  railSouth.position.set(0, 0.08, 14.2);

  const railWest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 26.8), deepWalnutMat);
  railWest.position.set(-21.3, 0.08, 0);
  railWest.receiveShadow = true;
  const railEast = railWest.clone();
  railEast.position.set(21.3, 0.08, 0);

  tableGroup.add(railNorth, railSouth, railWest, railEast);

  // Brass Corner Mounts & Rivets on the Table Frame
  const cornerCoords: [number, number][] = [
    [-20.6, -13.5],
    [20.6, -13.5],
    [-20.6, 13.5],
    [20.6, 13.5],
  ];
  cornerCoords.forEach(([cx, cz]) => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.62, 2.8), antiqueBrassMat);
    bracket.position.set(cx, 0.1, cz);
    tableGroup.add(bracket);

    const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), darkBrassMat);
    rivet.position.set(cx, 0.42, cz);
    tableGroup.add(rivet);
  });

  // 2. Weathered Parchment Map Surface with Subtle Crease & Terrain Relief
  const mapGeo = new THREE.PlaneGeometry(34, 22, 96, 64);
  mapGeo.rotateX(-Math.PI / 2);

  const posAttr = mapGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vz = posAttr.getZ(i);

    // Subtle folio fold creases along x=0 and z=0 plus gentle corner curl
    const creaseX = Math.exp(-Math.abs(vx) * 2.2) * 0.055;
    const creaseZ = Math.exp(-Math.abs(vz) * 2.2) * 0.045;
    const wave = Math.sin(vx * 0.35) * Math.cos(vz * 0.42) * 0.045;
    const edgeDist = Math.max(Math.abs(vx) / 17, Math.abs(vz) / 11);
    const cornerCurl = edgeDist > 0.88 ? Math.pow((edgeDist - 0.88) / 0.12, 2) * 0.16 : 0;

    // Ensure parchment surface stays strictly elevated above the table and leather inlay underbed
    const paperY = Math.max(0.04, 0.05 + creaseX + creaseZ + wave + cornerCurl);
    posAttr.setY(i, paperY);
  }
  mapGeo.computeVertexNormals();

  const parchmentMat = new THREE.MeshStandardMaterial({
    map: mapTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.035,
    roughness: 0.82,
    metalness: 0.02,
  });

  const parchmentMesh = new THREE.Mesh(mapGeo, parchmentMat);
  parchmentMesh.receiveShadow = true;
  tableGroup.add(parchmentMesh);

  // Brass Map Weights pinning the upper corners of the parchment
  [
    [-15.8, -9.8],
    [15.8, -9.8],
    [-15.8, 9.8],
    [15.8, 9.8],
  ].forEach(([wx, wz], idx) => {
    if (idx === 0 || idx === 3) return; // Leave room for candlestick and pocket compass
    const weightBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.65, 0.22, 20),
      antiqueBrassMat
    );
    weightBase.position.set(wx, 0.16, wz);
    weightBase.castShadow = true;
    const weightKnob = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), antiqueBrassMat);
    weightKnob.position.set(wx, 0.36, wz);
    tableGroup.add(weightBase, weightKnob);
  });

  // 3. Captain's Cabin Artifacts on the Table Margin
  // 3A. Brass Chamberstick & Warm Candle on Upper-Left Corner
  const candleGroup = new THREE.Group();
  candleGroup.position.set(-16.2, 0.05, -9.2);

  const saucer = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.1, 0.18, 24), antiqueBrassMat);
  saucer.castShadow = true;
  const saucerRim = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.08, 10, 28), antiqueBrassMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 0.08;
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 0.85, 18), antiqueBrassMat);
  stem.position.y = 0.45;
  stem.castShadow = true;

  const waxPillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.34, 1.95, 18),
    new THREE.MeshStandardMaterial({
      color: '#F4ECD8',
      emissive: '#F3C879',
      emissiveIntensity: 0.22,
      roughness: 0.55,
    })
  );
  waxPillar.position.y = 1.65;
  waxPillar.castShadow = true;

  const candleFlameMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.16, 0.48, 12),
    new THREE.MeshBasicMaterial({ color: '#FFF3C4' })
  );
  candleFlameMesh.position.y = 2.82;

  const candleLight = new THREE.PointLight('#F3C879', 24, 52, 1.35);
  candleLight.position.set(-14.5, 6.2, -7.8);
  candleLight.castShadow = true;
  candleLight.shadow.mapSize.width = 1024;
  candleLight.shadow.mapSize.height = 1024;
  candleLight.shadow.bias = -0.0008;

  candleGroup.add(saucer, saucerRim, stem, waxPillar, candleFlameMesh);
  tableGroup.add(candleGroup, candleLight);

  // 3B. Brass Compass Dividers (Calipers) on Bottom-Left Margin
  const dividersGroup = new THREE.Group();
  dividersGroup.position.set(-15.4, 0.18, 8.6);
  dividersGroup.rotation.y = 0.42;

  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16), antiqueBrassMat);
  const leg1 = new THREE.Mesh(new THREE.ConeGeometry(0.1, 2.9, 8), antiqueBrassMat);
  leg1.rotation.x = Math.PI / 2;
  leg1.rotation.z = -0.18;
  leg1.position.set(-0.28, 0, 1.35);
  leg1.castShadow = true;

  const leg2 = new THREE.Mesh(new THREE.ConeGeometry(0.1, 2.9, 8), antiqueBrassMat);
  leg2.rotation.x = Math.PI / 2;
  leg2.rotation.z = 0.18;
  leg2.position.set(0.28, 0, 1.35);
  leg2.castShadow = true;

  dividersGroup.add(hinge, leg1, leg2);
  tableGroup.add(dividersGroup);

  // 3C. Octagonal Inkwell & Quill on Upper-Right Margin
  const inkwellGroup = new THREE.Group();
  inkwellGroup.position.set(16.2, 0.05, -8.4);

  const inkpot = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.85, 8), darkBrassMat);
  inkpot.position.y = 0.42;
  inkpot.castShadow = true;
  const inkWellHole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.88, 12),
    new THREE.MeshStandardMaterial({ color: '#1A110B', roughness: 0.15 })
  );
  inkWellHole.position.y = 0.43;

  // Quill shaft resting in the inkpot
  const quillShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.05, 2.8, 8),
    vellumRollMat
  );
  quillShaft.position.set(0.35, 1.35, -0.2);
  quillShaft.rotation.z = -0.38;
  quillShaft.rotation.x = 0.18;
  quillShaft.castShadow = true;

  inkwellGroup.add(inkpot, inkWellHole, quillShaft);
  tableGroup.add(inkwellGroup);

  // 3D. Rolled Nautical Charts & Wax-Sealed Folio on West Walnut Margin
  const scrollGroup = new THREE.Group();
  scrollGroup.position.set(-18.8, 0.28, 0.8);
  scrollGroup.rotation.y = 0.08;

  const scrollTube1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 6.2, 18),
    vellumRollMat
  );
  scrollTube1.rotation.x = Math.PI / 2;
  scrollTube1.castShadow = true;

  const ribbonBand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.44, 0.35, 18),
    crimsonWaxMat
  );
  ribbonBand.rotation.x = Math.PI / 2;

  const waxSealDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 0.09, 16),
    crimsonWaxMat
  );
  waxSealDisc.position.set(0.32, 0.32, 0);
  waxSealDisc.rotation.z = -0.6;

  scrollGroup.add(scrollTube1, ribbonBand, waxSealDisc);
  tableGroup.add(scrollGroup);

  // 3E. Interactive 3D Brass Pocket Compass on Lower-Right Corner
  const compassGroup = new THREE.Group();
  compassGroup.position.set(15.6, 0.08, 8.2);

  const compassCase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.42, 0.32, 28),
    antiqueBrassMat
  );
  compassCase.position.y = 0.16;
  compassCase.castShadow = true;

  const compassDial = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.18, 0.05, 24),
    vellumRollMat
  );
  compassDial.position.y = 0.31;

  const compassRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.26, 0.09, 12, 28),
    antiqueBrassMat
  );
  compassRing.rotation.x = Math.PI / 2;
  compassRing.position.y = 0.32;

  const compassNeedleGroup = new THREE.Group();
  compassNeedleGroup.position.y = 0.36;

  const northNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.95, 4), crimsonWaxMat);
  northNeedle.rotation.x = -Math.PI / 2;
  northNeedle.position.z = -0.45;

  const southNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.95, 4), darkBrassMat);
  southNeedle.rotation.x = Math.PI / 2;
  southNeedle.position.z = 0.45;

  const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 12), antiqueBrassMat);
  compassNeedleGroup.add(northNeedle, southNeedle, centerCap);

  compassGroup.add(compassCase, compassDial, compassRing, compassNeedleGroup);
  tableGroup.add(compassGroup);

  return {
    tableGroup,
    candleFlameMesh,
    candleLight,
    compassNeedleGroup,
  };
}
