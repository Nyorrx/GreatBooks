import * as THREE from 'three';
import { createParchmentChartTextures } from './parchmentTexture';
import {
  createWalnutWoodTextures,
  createEngravedRailTextures,
  createTooledLeatherTexture,
  createEngravedBrassMedallionTexture,
  createWarmCabinEnvironmentTexture,
  createSoftContactShadowTexture,
  createCandleHaloTexture,
} from './tableTextures';

export interface ChartTableSceneHandles {
  tableGroup: THREE.Group;
  candleFlameMesh: THREE.Mesh;
  candleLight: THREE.PointLight;
  compassNeedleGroup: THREE.Group;
}

export function buildNavigatorChartTable(): ChartTableSceneHandles {
  const tableGroup = new THREE.Group();
  tableGroup.name = 'navigator-chart-table';

  const { map: walnutTex, bumpMap: walnutBump } = createWalnutWoodTextures();
  const horizRailTex = createEngravedRailTextures(44.4, 1.8, false);
  const vertRailTex = createEngravedRailTextures(26.8, 1.8, true);
  const leatherTex = createTooledLeatherTexture();
  const medallionTex = createEngravedBrassMedallionTexture();
  const brassEnvTex = createWarmCabinEnvironmentTexture();
  const contactShadowTex = createSoftContactShadowTexture();
  const candleHaloTex = createCandleHaloTexture();
  const { mapTexture, bumpTexture, alphaTexture } = createParchmentChartTextures();

  // Materials
  const walnutMat = new THREE.MeshStandardMaterial({
    color: '#472E1F',
    map: walnutTex,
    bumpMap: walnutBump,
    bumpScale: 0.025,
    roughness: 0.58,
    metalness: 0.08,
  });

  const deepWalnutMat = new THREE.MeshStandardMaterial({
    color: '#2E1C12',
    map: walnutTex,
    bumpMap: walnutBump,
    bumpScale: 0.022,
    roughness: 0.52,
    metalness: 0.1,
  });

  const horizRailTopMat = new THREE.MeshStandardMaterial({
    color: '#4E3322',
    map: horizRailTex.map,
    bumpMap: horizRailTex.bumpMap,
    bumpScale: 0.032,
    roughness: 0.5,
    metalness: 0.1,
  });

  const vertRailTopMat = new THREE.MeshStandardMaterial({
    color: '#4E3322',
    map: vertRailTex.map,
    bumpMap: vertRailTex.bumpMap,
    bumpScale: 0.032,
    roughness: 0.5,
    metalness: 0.1,
  });

  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: '#3A2418',
    map: leatherTex,
    bumpMap: leatherTex,
    bumpScale: 0.015,
    roughness: 0.74,
    metalness: 0.06,
  });

  const antiqueBrassMat = new THREE.MeshStandardMaterial({
    color: '#B8924E',
    envMap: brassEnvTex,
    envMapIntensity: 0.9,
    roughness: 0.28,
    metalness: 0.86,
  });

  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: '#846430',
    envMap: brassEnvTex,
    envMapIntensity: 0.75,
    roughness: 0.38,
    metalness: 0.8,
  });

  const medallionBrassMat = new THREE.MeshStandardMaterial({
    color: '#C8A35C',
    map: medallionTex,
    bumpMap: medallionTex,
    bumpScale: 0.018,
    envMap: brassEnvTex,
    envMapIntensity: 0.95,
    roughness: 0.26,
    metalness: 0.86,
  });

  const crimsonWaxMat = new THREE.MeshStandardMaterial({
    color: '#873B35',
    roughness: 0.36,
    metalness: 0.12,
  });

  const vellumRollMat = new THREE.MeshStandardMaterial({
    color: '#EADBC0',
    roughness: 0.75,
    metalness: 0.02,
  });

  // 1. Main Dark Walnut Tabletop, Carved Apron Paneling & Worn Tooled-Leather Inlay Bed
  const tabletopSlab = new THREE.Mesh(new THREE.BoxGeometry(44, 1.4, 30), walnutMat);
  tabletopSlab.position.y = -0.82;
  tabletopSlab.receiveShadow = true;
  tableGroup.add(tabletopSlab);

  // Stepped Lower Molding Skirt & Recessed Apron Panels around the Table Perimeter
  const moldingGroup = new THREE.Group();
  const lowerSkirt = new THREE.Mesh(new THREE.BoxGeometry(44.8, 0.28, 30.8), deepWalnutMat);
  lowerSkirt.position.y = -1.48;
  lowerSkirt.receiveShadow = true;
  moldingGroup.add(lowerSkirt);

  const upperLedge = new THREE.Mesh(new THREE.BoxGeometry(44.6, 0.18, 30.6), deepWalnutMat);
  upperLedge.position.y = -0.22;
  upperLedge.receiveShadow = true;
  moldingGroup.add(upperLedge);

  // Carved recessed side panels along North/South/East/West aprons
  for (const sideZ of [-15.05, 15.05]) {
    for (const px of [-12.5, 0, 12.5]) {
      const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.76, 0.14), deepWalnutMat);
      panelFrame.position.set(px, -0.85, sideZ);
      const brassTrim = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.52, 0.16), darkBrassMat);
      brassTrim.position.set(px, -0.85, sideZ);
      const innerPanel = new THREE.Mesh(new THREE.BoxGeometry(8.9, 0.44, 0.18), walnutMat);
      innerPanel.position.set(px, -0.85, sideZ);
      moldingGroup.add(panelFrame, brassTrim, innerPanel);
    }
  }
  for (const sideX of [-22.05, 22.05]) {
    for (const pz of [-6.8, 6.8]) {
      const panelFrame = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.76, 9.6), deepWalnutMat);
      panelFrame.position.set(sideX, -0.85, pz);
      const brassTrim = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.52, 9.0), darkBrassMat);
      brassTrim.position.set(sideX, -0.85, pz);
      const innerPanel = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.44, 8.7), walnutMat);
      innerPanel.position.set(sideX, -0.85, pz);
      moldingGroup.add(panelFrame, brassTrim, innerPanel);
    }
  }
  tableGroup.add(moldingGroup);

  const leatherInlay = new THREE.Mesh(new THREE.BoxGeometry(38.5, 0.18, 25.5), wornLeatherMat);
  leatherInlay.position.y = -0.18;
  leatherInlay.receiveShadow = true;
  tableGroup.add(leatherInlay);

  // Beveled & Engraved Outer Walnut Molding Rails
  const horizRailMats = [
    deepWalnutMat,
    deepWalnutMat,
    horizRailTopMat,
    deepWalnutMat,
    deepWalnutMat,
    deepWalnutMat,
  ];
  const vertRailMats = [
    deepWalnutMat,
    deepWalnutMat,
    vertRailTopMat,
    deepWalnutMat,
    deepWalnutMat,
    deepWalnutMat,
  ];

  const railNorth = new THREE.Mesh(new THREE.BoxGeometry(44.4, 0.55, 1.8), horizRailMats);
  railNorth.position.set(0, 0.08, -14.2);
  railNorth.castShadow = true;
  railNorth.receiveShadow = true;
  const railSouth = railNorth.clone();
  railSouth.position.set(0, 0.08, 14.2);

  const railWest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 26.8), vertRailMats);
  railWest.position.set(-21.3, 0.08, 0);
  railWest.castShadow = true;
  railWest.receiveShadow = true;
  const railEast = railWest.clone();
  railEast.position.set(21.3, 0.08, 0);

  tableGroup.add(railNorth, railSouth, railWest, railEast);

  // Inner Burnished Brass Inlay Strips & Miniature Countersunk Brass Screws along the Rails
  const trimGroup = new THREE.Group();
  const innerStripNorth = new THREE.Mesh(new THREE.BoxGeometry(40.8, 0.57, 0.12), antiqueBrassMat);
  innerStripNorth.position.set(0, 0.08, -13.26);
  const innerStripSouth = innerStripNorth.clone();
  innerStripSouth.position.set(0, 0.08, 13.26);

  const innerStripWest = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.57, 26.6), antiqueBrassMat);
  innerStripWest.position.set(-20.36, 0.08, 0);
  const innerStripEast = innerStripWest.clone();
  innerStripEast.position.set(20.36, 0.08, 0);
  trimGroup.add(innerStripNorth, innerStripSouth, innerStripWest, innerStripEast);

  const screwHeadGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.04, 12);
  const screwSlotGeo = new THREE.BoxGeometry(0.12, 0.02, 0.022);
  const addScrew = (sx: number, sy: number, sz: number, angle = 0.4) => {
    const head = new THREE.Mesh(screwHeadGeo, antiqueBrassMat);
    head.position.set(sx, sy, sz);
    const slot = new THREE.Mesh(screwSlotGeo, deepWalnutMat);
    slot.position.set(sx, sy + 0.018, sz);
    slot.rotation.y = angle;
    trimGroup.add(head, slot);
  };

  for (let x = -17.5; x <= 17.5; x += 5) {
    if (Math.abs(x) < 1.5) continue;
    addScrew(x, 0.36, -14.2, x * 0.2);
    addScrew(x, 0.36, 14.2, -x * 0.2);
  }
  for (let z = -10; z <= 10; z += 5) {
    if (Math.abs(z) < 1.5) continue;
    addScrew(-21.3, 0.36, z, z * 0.25);
    addScrew(21.3, 0.36, z, -z * 0.25);
  }

  // Cardinal Brass Azimuth Plaques at Mid-Rails
  [
    [0, -14.2, 2.2, 0.72],
    [0, 14.2, 2.2, 0.72],
    [-21.3, 0, 0.72, 2.2],
    [21.3, 0, 0.72, 2.2],
  ].forEach(([px, pz, pw, pd]) => {
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(pw, 0.04, pd), antiqueBrassMat);
    plaque.position.set(px, 0.365, pz);
    const boss = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.05, 16), medallionBrassMat);
    boss.position.set(px, 0.39, pz);
    trimGroup.add(plaque, boss);
  });
  tableGroup.add(trimGroup);

  // Decorative Brass Corner Reinforcements, Etched Medallions & Metal Rivets
  const cornerCoords: [number, number, number, number][] = [
    [-20.6, -13.5, 1, 1],
    [20.6, -13.5, -1, 1],
    [-20.6, 13.5, 1, -1],
    [20.6, 13.5, -1, -1],
  ];
  cornerCoords.forEach(([cx, cz, sx, sz]) => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.62, 2.8), antiqueBrassMat);
    bracket.position.set(cx, 0.1, cz);
    bracket.castShadow = true;
    bracket.receiveShadow = true;
    tableGroup.add(bracket);

    // L-shaped reinforcement arms extending along both rails
    const armX = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 1.55), darkBrassMat);
    armX.position.set(cx + sx * 1.9, 0.095, cz - sz * 0.55);
    const armZ = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.6, 2.2), darkBrassMat);
    armZ.position.set(cx - sx * 0.55, 0.095, cz + sz * 1.9);
    tableGroup.add(armX, armZ);

    // Etched brass compass-rose medallion disk
    const medallion = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.02, 0.06, 24),
      medallionBrassMat
    );
    medallion.position.set(cx, 0.42, cz);
    tableGroup.add(medallion);

    // Central finial rivet & perimeter dome rivets
    const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), darkBrassMat);
    rivet.position.set(cx, 0.46, cz);
    tableGroup.add(rivet);

    const subRivets: [number, number][] = [
      [cx - 1.05, cz - 1.05],
      [cx + 1.05, cz - 1.05],
      [cx - 1.05, cz + 1.05],
      [cx + 1.05, cz + 1.05],
      [cx + sx * 2.4, cz - sz * 0.55],
      [cx - sx * 0.55, cz + sz * 2.4],
    ];
    subRivets.forEach(([rx, rz]) => {
      const rMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 10), antiqueBrassMat);
      rMesh.position.set(rx, 0.41, rz);
      tableGroup.add(rMesh);
    });
  });

  // 2. Weathered Parchment Map Surface with Subtle Crease, Wrinkle & Terrain Relief
  const mapGeo = new THREE.PlaneGeometry(34, 22, 96, 64);
  mapGeo.rotateX(-Math.PI / 2);

  const posAttr = mapGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vz = posAttr.getZ(i);

    // Subtle folio fold creases along x=0 and z=0 plus gentle organic waves and lifted edges
    const creaseX = Math.exp(-Math.abs(vx) * 2.2) * 0.058;
    const creaseZ = Math.exp(-Math.abs(vz) * 2.2) * 0.048;
    const wave =
      Math.sin(vx * 0.35) * Math.cos(vz * 0.42) * 0.042 +
      Math.sin(vx * 0.9 + vz * 0.7) * 0.012;
    const edgeDist = Math.max(Math.abs(vx) / 17, Math.abs(vz) / 11);
    const edgeLift = edgeDist > 0.78 ? Math.pow((edgeDist - 0.78) / 0.22, 1.8) * 0.045 : 0;
    const cornerCurl = edgeDist > 0.88 ? Math.pow((edgeDist - 0.88) / 0.12, 2) * 0.16 : 0;

    // Ensure parchment surface stays strictly elevated above the table and leather inlay underbed
    const paperY = Math.max(0.048, 0.062 + creaseX + creaseZ + wave + edgeLift + cornerCurl);
    posAttr.setY(i, paperY);
  }
  mapGeo.computeVertexNormals();

  const parchmentMat = new THREE.MeshStandardMaterial({
    map: mapTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.042,
    ...(alphaTexture ? { alphaMap: alphaTexture, alphaTest: 0.15 } : {}),
    roughness: 0.8,
    metalness: 0.02,
  });

  const parchmentMesh = new THREE.Mesh(mapGeo, parchmentMat);
  parchmentMesh.castShadow = true;
  parchmentMesh.receiveShadow = true;
  tableGroup.add(parchmentMesh);

  // Soft Contact Shadow & Raised Vellum Under-Sheet beneath the Parchment
  const underbedGroup = new THREE.Group();
  const contactShadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(36.5, 24.5),
    new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    })
  );
  contactShadowMesh.rotation.x = -Math.PI / 2;
  contactShadowMesh.position.y = -0.078;
  underbedGroup.add(contactShadowMesh);

  // Second Slightly Rotated Vellum Under-Sheet peeking out from beneath the main map
  const underSheetMesh = new THREE.Mesh(
    new THREE.BoxGeometry(34.3, 0.035, 22.3),
    vellumRollMat
  );
  underSheetMesh.position.set(0.12, -0.045, 0.08);
  underSheetMesh.rotation.y = -0.008;
  underSheetMesh.receiveShadow = true;
  underbedGroup.add(underSheetMesh);
  tableGroup.add(underbedGroup);

  // Brass Map Weights pinning the corners of the parchment
  [
    [-15.8, -9.8],
    [15.8, -9.8],
    [-15.8, 9.8],
    [15.8, 9.8],
  ].forEach(([wx, wz], idx) => {
    if (idx === 0 || idx === 3) return; // Leave room for candlestick and pocket compass
    const weightBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.68, 0.22, 24),
      antiqueBrassMat
    );
    weightBase.position.set(wx, 0.17, wz);
    weightBase.castShadow = true;
    const weightStep = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.48, 0.1, 20),
      darkBrassMat
    );
    weightStep.position.set(wx, 0.31, wz);
    const weightKnob = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), antiqueBrassMat);
    weightKnob.position.set(wx, 0.42, wz);
    tableGroup.add(weightBase, weightStep, weightKnob);
  });

  // 3. Captain's Cabin Artifacts on the Table Margin
  // 3A. Brass Chamberstick & Warm Candle on Upper-Left Corner
  const candleGroup = new THREE.Group();
  candleGroup.position.set(-16.2, 0.05, -9.2);

  const saucer = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.12, 0.18, 28), antiqueBrassMat);
  saucer.castShadow = true;
  saucer.receiveShadow = true;
  const saucerRim = new THREE.Mesh(new THREE.TorusGeometry(1.34, 0.085, 12, 32), antiqueBrassMat);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 0.08;
  const fingerRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 10, 20), antiqueBrassMat);
  fingerRing.position.set(-1.55, 0.22, 0);
  fingerRing.rotation.y = Math.PI / 2;
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.54, 0.85, 20), antiqueBrassMat);
  stem.position.y = 0.45;
  stem.castShadow = true;
  const dripPan = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.42, 0.09, 20), darkBrassMat);
  dripPan.position.y = 0.86;

  const waxMat = new THREE.MeshStandardMaterial({
    color: '#F4ECD8',
    emissive: '#F3C879',
    emissiveIntensity: 0.26,
    roughness: 0.52,
  });
  const waxPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.35, 1.95, 20), waxMat);
  waxPillar.position.y = 1.65;
  waxPillar.castShadow = true;

  // Natural wax drips along the candle side
  [
    [0.31, 1.45, 0.08, 0.55],
    [-0.28, 1.6, -0.14, 0.42],
    [0.12, 1.32, -0.3, 0.65],
  ].forEach(([dx, dy, dz, dh]) => {
    const drip = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, dh, 6, 8), waxMat);
    drip.position.set(dx, dy, dz);
    candleGroup.add(drip);
  });

  const candleFlameMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.16, 0.48, 12),
    new THREE.MeshBasicMaterial({ color: '#FFF5CC' })
  );
  candleFlameMesh.position.y = 2.82;

  const haloSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: candleHaloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  haloSprite.scale.set(2.8, 2.8, 1);
  haloSprite.position.y = 2.82;

  const candleLight = new THREE.PointLight('#F3C879', 24, 54, 1.32);
  candleLight.position.set(-14.5, 6.2, -7.8);
  candleLight.castShadow = true;
  candleLight.shadow.mapSize.width = 1024;
  candleLight.shadow.mapSize.height = 1024;
  candleLight.shadow.bias = -0.0008;

  candleGroup.add(saucer, saucerRim, fingerRing, stem, dripPan, waxPillar, candleFlameMesh, haloSprite);
  tableGroup.add(candleGroup, candleLight);

  // 3B. Brass Compass Dividers (Calipers) & Parallel Navigation Rule on Bottom-Left Margin
  const dividersGroup = new THREE.Group();
  dividersGroup.position.set(-15.4, 0.18, 8.6);
  dividersGroup.rotation.y = 0.42;

  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16), antiqueBrassMat);
  const hingeRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 8, 18), darkBrassMat);
  hingeRing.position.z = -0.18;
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

  dividersGroup.add(hinge, hingeRing, leg1, leg2);
  tableGroup.add(dividersGroup);

  // Brass & Ebony Navigator's Parallel Ruler resting on the East Walnut Margin
  const rulerGroup = new THREE.Group();
  rulerGroup.position.set(18.8, 0.02, -0.8);
  rulerGroup.rotation.y = -0.06;
  const ruleBlade1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 6.4), deepWalnutMat);
  ruleBlade1.position.x = -0.34;
  ruleBlade1.castShadow = true;
  const ruleBlade2 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.08, 6.4), deepWalnutMat);
  ruleBlade2.position.x = 0.34;
  ruleBlade2.castShadow = true;
  for (const lz of [-1.8, 1.8]) {
    const link = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.12), antiqueBrassMat);
    link.position.set(0, 0.055, lz);
    link.rotation.y = 0.25;
    const knob1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 12), antiqueBrassMat);
    knob1.position.set(-0.34, 0.08, lz);
    const knob2 = knob1.clone();
    knob2.position.set(0.34, 0.08, lz);
    rulerGroup.add(link, knob1, knob2);
  }
  rulerGroup.add(ruleBlade1, ruleBlade2);
  tableGroup.add(rulerGroup);

  // 3C. Octagonal Inkwell & Quill on Upper-Right Margin
  const inkwellGroup = new THREE.Group();
  inkwellGroup.position.set(16.2, 0.05, -8.4);

  const inkStand = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.12, 8), antiqueBrassMat);
  inkStand.position.y = 0.06;
  const inkpot = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.78, 0.85, 8), darkBrassMat);
  inkpot.position.y = 0.44;
  inkpot.castShadow = true;
  const inkWellHole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.88, 12),
    new THREE.MeshStandardMaterial({ color: '#1A110B', roughness: 0.15 })
  );
  inkWellHole.position.y = 0.45;

  // Quill shaft resting in the inkpot
  const quillShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.05, 2.8, 8),
    vellumRollMat
  );
  quillShaft.position.set(0.35, 1.35, -0.2);
  quillShaft.rotation.z = -0.38;
  quillShaft.rotation.x = 0.18;
  quillShaft.castShadow = true;

  inkwellGroup.add(inkStand, inkpot, inkWellHole, quillShaft);
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
    new THREE.CylinderGeometry(1.38, 1.46, 0.34, 32),
    antiqueBrassMat
  );
  compassCase.position.y = 0.17;
  compassCase.castShadow = true;

  const compassBow = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.055, 10, 20),
    antiqueBrassMat
  );
  compassBow.rotation.x = Math.PI / 2;
  compassBow.position.set(0, 0.22, -1.58);

  const compassDial = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.18, 0.05, 28),
    medallionBrassMat
  );
  compassDial.position.y = 0.32;

  const compassRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.26, 0.09, 12, 32),
    antiqueBrassMat
  );
  compassRing.rotation.x = Math.PI / 2;
  compassRing.position.y = 0.33;

  const compassNeedleGroup = new THREE.Group();
  compassNeedleGroup.position.y = 0.37;

  const northNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.95, 4), crimsonWaxMat);
  northNeedle.rotation.x = -Math.PI / 2;
  northNeedle.position.z = -0.45;

  const southNeedle = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.95, 4), darkBrassMat);
  southNeedle.rotation.x = Math.PI / 2;
  southNeedle.position.z = 0.45;

  const centerCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.12, 14),
    antiqueBrassMat
  );
  compassNeedleGroup.add(northNeedle, southNeedle, centerCap);

  compassGroup.add(compassCase, compassBow, compassDial, compassRing, compassNeedleGroup);
  tableGroup.add(compassGroup);

  return {
    tableGroup,
    candleFlameMesh,
    candleLight,
    compassNeedleGroup,
  };
}
