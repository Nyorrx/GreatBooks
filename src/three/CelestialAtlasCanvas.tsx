import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { LiteraryRealm, RealmId } from '../types/atlas';
import { LITERARY_REALMS, REALM_MAP } from '../data/realms';
import { buildRealmMonument, type MonumentGroupHandles } from './monuments';
import { buildNavigatorChartTable } from './tableProps';

export const OUTWARD_FLOAT_DURATION_MS = 1400;
export const RETURN_FLOAT_DURATION_MS = 1100;
export const ISLAND_FLOAT_UP_OFFSET_Y = 0.68;

export type IslandAnimationPhase = 'idle' | 'lifting' | 'floating' | 'returning';

export interface FloatingDestinationMetrics {
  position: THREE.Vector3;
  scale: number;
  rotation: THREE.Vector3;
  screenX: number;
  screenY: number;
  centerXPercent: number;
  availableWidthPx: number;
  availableHeightPx: number;
  chartLeftPx: number;
  cardTopPx: number;
  cardGapPx: number;
  visualRadiusPx: number;
}

/**
 * Calculates the viewport-aware 3D world destination and screen layout metrics
 * so the selected island floats in the dedicated open area beside the Navigator's Chart
 * and its title card sits with a clear, consistent visible gap below the island.
 */
export function computeFloatingDestination(
  realm: LiteraryRealm,
  viewportWidth: number,
  viewportHeight: number
): FloatingDestinationMetrics {
  const safeW = Math.max(viewportWidth, 320);
  const safeH = Math.max(viewportHeight, 420);
  const isMobile = safeW < 640;

  let chartLeftPx = safeW;
  let availableWidthPx = safeW - 32;
  let leftSafePx = 16;
  let topSafePx = 52;
  let bottomSafePx = safeH - 24;
  const cardGapPx = isMobile ? 18 : 28;
  const cardEstHeightPx = isMobile ? 68 : 82;

  if (!isMobile) {
    const rightMargin = 16;
    const chartWidth =
      safeW >= 1024
        ? Math.min(safeW * 0.50, 980)
        : safeW >= 768
          ? 460
          : 420;
    chartLeftPx = safeW - chartWidth - rightMargin;
    leftSafePx = 20;
    availableWidthPx = Math.max(220, chartLeftPx - leftSafePx - 16);
    topSafePx = 64;
    bottomSafePx = safeH - 32;
  } else {
    // On mobile screens, the Navigator's Chart occupies the lower 58% of the screen (top: 42vh)
    topSafePx = 48;
    bottomSafePx = Math.max(topSafePx + 160, safeH * 0.42 - 8);
    availableWidthPx = safeW - 24;
    leftSafePx = 12;
  }

  const screenX = leftSafePx + availableWidthPx * 0.5;
  const centerXPercent = (screenX / safeW) * 100;

  const aspect = safeW / safeH;
  const isNarrow = aspect < 1.25;
  const isMobileCam = safeW < 768;
  const fov = isNarrow ? 60 : 44;

  const camPos = isNarrow
    ? new THREE.Vector3(0, isMobileCam ? 28.0 : 31.0, isMobileCam ? 26.0 : 27.5)
    : new THREE.Vector3(0, 18.0, 19.5);
  const lookTarget = new THREE.Vector3(0, 0.25, 0.4);

  const forward = lookTarget.clone().sub(camPos).normalize();
  const worldUp = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(forward, worldUp).normalize();
  const up = new THREE.Vector3().crossVectors(right, forward).normalize();

  const floatDepth = isNarrow ? (isMobileCam ? 17.6 : 18.4) : 12.8;
  const halfHeightWorld = floatDepth * Math.tan(THREE.MathUtils.degToRad(fov * 0.5));
  const halfWidthWorld = halfHeightWorld * aspect;
  const pixelsPerUnit = (safeH * 0.5) / Math.max(halfHeightWorld, 0.001);

  // Outer physical diorama boundary radius (accounting for base plinth, terrain, and floating shadow)
  const outerRadiusUnits = realm.isFavoriteMasterpiece ? 3.35 : 2.75;

  // For The Book of Job, the vertical swirling whirlwind pillar of Uz extends higher than other
  // landmarks. Position its floating destination slightly lower on screen so the entire island and
  // the full height of the whirlwind remain completely visible in the inspection view.
  const isJob = realm.id === 'job';
  const jobVerticalOffsetPx = isJob ? (isMobile ? 12 : 38) : 0;

  const totalStageHeightPx = bottomSafePx - topSafePx;
  const maxIslandDiameterPx = Math.max(
    120,
    totalStageHeightPx - cardGapPx - cardEstHeightPx - (isJob && isMobile ? jobVerticalOffsetPx : 0)
  );
  const desiredRadiusPx = Math.min(
    availableWidthPx * 0.38,
    maxIslandDiameterPx * 0.48
  );
  const desiredWorldRadius = desiredRadiusPx / Math.max(pixelsPerUnit, 1);
  const minScale = isMobile ? 0.75 : 1.12;
  const scale = THREE.MathUtils.clamp(desiredWorldRadius / outerRadiusUnits, minScale, 1.38);

  const visualRadiusPx = outerRadiusUnits * scale * pixelsPerUnit;
  const compositeHeightPx = visualRadiusPx * 2 + cardGapPx + cardEstHeightPx;
  const compositeTopPx = Math.max(
    topSafePx,
    topSafePx + (totalStageHeightPx - compositeHeightPx - (isJob && !isMobile ? jobVerticalOffsetPx : 0)) * 0.42
  );

  const screenY = compositeTopPx + visualRadiusPx + jobVerticalOffsetPx;
  const cardTopPx = Math.round(screenY + visualRadiusPx + cardGapPx);

  const ndcX = (screenX / safeW) * 2 - 1;
  const ndcY = -(screenY / safeH) * 2 + 1;

  const worldOffsetRight = ndcX * halfWidthWorld;
  const worldOffsetUp = ndcY * halfHeightWorld;

  const position = camPos
    .clone()
    .addScaledVector(forward, floatDepth)
    .addScaledVector(right, worldOffsetRight)
    .addScaledVector(up, worldOffsetUp);

  // Subtle 3D perspective tilt toward the viewer and Navigator's Chart
  const rotation = new THREE.Vector3(0.16, -ndcX * 0.28, -0.035);

  return {
    position,
    scale,
    rotation,
    screenX,
    screenY,
    centerXPercent,
    availableWidthPx,
    availableHeightPx: totalStageHeightPx,
    chartLeftPx,
    cardTopPx,
    cardGapPx,
    visualRadiusPx,
  };
}

interface IslandFlightState {
  originPos: THREE.Vector3;
  currentPos: THREE.Vector3;
  currentScale: number;
  currentRot: THREE.Vector3;
  currentLift: number;
  fromPos: THREE.Vector3;
  toPos: THREE.Vector3;
  fromScale: number;
  toScale: number;
  fromRot: THREE.Vector3;
  toRot: THREE.Vector3;
  fromLift: number;
  toLift: number;
  startTime: number;
  duration: number;
  phase: IslandAnimationPhase;
}

interface CelestialAtlasCanvasProps {
  selectedRealmId: RealmId | null;
  hoveredRealmId: RealmId | null;
  visitedRealms?: RealmId[];
  onSelectRealm: (realmId: RealmId) => void;
  onCloseRealm?: () => void;
  onHoverRealm: (realmId: RealmId | null) => void;
  reducedMotion: boolean;
  showConstellationLines: boolean;
  cameraPresetMode: 'overview' | 'home' | 'realm' | 'odyssey-spotlight';
  isChartOpen?: boolean;
}

export const CelestialAtlasCanvas: React.FC<CelestialAtlasCanvasProps> = ({
  selectedRealmId,
  hoveredRealmId,
  visitedRealms = [],
  onSelectRealm,
  onCloseRealm,
  onHoverRealm,
  reducedMotion,
  showConstellationLines,
  cameraPresetMode,
  isChartOpen = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [sceneReady, setSceneReady] = useState<boolean>(false);

  // Track active or returning island and its animation phase for the floating inspection UI
  const [displayRealmId, setDisplayRealmId] = useState<RealmId | null>(selectedRealmId);
  const [animationPhase, setAnimationPhase] = useState<IslandAnimationPhase>(
    selectedRealmId ? 'floating' : 'idle'
  );
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const prefersReducedMotionOS =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveReducedMotion = reducedMotion || prefersReducedMotionOS;

  // Mutable refs for animation loop access without re-creating the scene
  const selectedRef = useRef<RealmId | null>(selectedRealmId);
  const hoveredRef = useRef<RealmId | null>(hoveredRealmId);
  const visitedRef = useRef<RealmId[]>(visitedRealms);
  const reducedMotionRef = useRef<boolean>(effectiveReducedMotion);
  const showLinesRef = useRef<boolean>(showConstellationLines);
  const onSelectRef = useRef(onSelectRealm);
  const onCloseRef = useRef(onCloseRealm);
  const onHoverRef = useRef(onHoverRealm);
  // Dedicated active-island rotation offset (yaw, pitch) kept separate from map OrbitControls
  const userIslandRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  selectedRef.current = selectedRealmId;
  hoveredRef.current = hoveredRealmId;
  visitedRef.current = visitedRealms;
  reducedMotionRef.current = effectiveReducedMotion;
  showLinesRef.current = showConstellationLines;
  onSelectRef.current = onSelectRealm;
  onCloseRef.current = onCloseRealm;
  onHoverRef.current = onHoverRealm;

  const islandFlightsRef = useRef<Record<RealmId, IslandFlightState>>((() => {
    const initial = {} as Record<RealmId, IslandFlightState>;
    LITERARY_REALMS.forEach((r) => {
      const origin = new THREE.Vector3(r.coordinates[0], r.coordinates[1], r.coordinates[2]);
      initial[r.id] = {
        originPos: origin.clone(),
        currentPos: origin.clone(),
        currentScale: 1.0,
        currentRot: new THREE.Vector3(0, 0, 0),
        currentLift: 0.0,
        fromPos: origin.clone(),
        toPos: origin.clone(),
        fromScale: 1.0,
        toScale: 1.0,
        fromRot: new THREE.Vector3(0, 0, 0),
        toRot: new THREE.Vector3(0, 0, 0),
        fromLift: 0.0,
        toLift: 0.0,
        startTime: 0,
        duration: OUTWARD_FLOAT_DURATION_MS / 1000,
        phase: 'idle',
      };
    });
    return initial;
  })());

  const cameraTransitionRef = useRef<{
    active: boolean;
    startPos: THREE.Vector3;
    endPos: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    startTime: number;
    duration: number;
  }>({
    active: false,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(0, 13.8, 16.0),
    startTarget: new THREE.Vector3(),
    endTarget: new THREE.Vector3(0, 0.25, 0.4),
    startTime: 0,
    duration: 1.0,
  });

  const cameraInstanceRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsInstanceRef = useRef<OrbitControls | null>(null);
  const pathwayMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pathwayGroupRef = useRef<THREE.Group | null>(null);
  const inspectionLightRef = useRef<THREE.PointLight | null>(null);

  // Synchronize per-island outward (850ms) and return (750ms) animations whenever selection or viewport changes
  useEffect(() => {
    const nowSec = performance.now() / 1000;
    const cont = containerRef.current;
    const w = cont?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1280);
    const h = cont?.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 800);
    const isReduced = reducedMotionRef.current;

    LITERARY_REALMS.forEach((realm) => {
      const state = islandFlightsRef.current[realm.id];
      if (!state) return;

      if (selectedRealmId === realm.id) {
        const dest = computeFloatingDestination(realm, w, h);
        if (state.phase === 'lifting' || state.phase === 'floating') {
          // Update destination smoothly on resize without restarting flight
          state.toPos.copy(dest.position);
          state.toScale = dest.scale;
          state.toRot.copy(dest.rotation);
          if (state.phase === 'floating' || isReduced) {
            state.currentPos.copy(dest.position);
            state.currentScale = dest.scale;
            state.currentRot.copy(dest.rotation);
            state.currentLift = 1.0;
          }
        } else {
          // Reset interactive island rotation offset for fresh landmark inspection
          userIslandRotationRef.current = { x: 0, y: 0 };
          state.fromPos.copy(state.currentPos);
          state.fromScale = state.currentScale;
          state.fromRot.copy(state.currentRot);
          state.fromLift = state.currentLift;

          state.toPos.copy(dest.position);
          state.toScale = dest.scale;
          state.toRot.copy(dest.rotation);
          state.toLift = 1.0;

          state.startTime = nowSec;
          state.duration = isReduced ? 0.01 : OUTWARD_FLOAT_DURATION_MS / 1000;
          state.phase = isReduced ? 'floating' : 'lifting';

          if (isReduced) {
            state.currentPos.copy(dest.position);
            state.currentScale = dest.scale;
            state.currentRot.copy(dest.rotation);
            state.currentLift = 1.0;
          }
        }
      } else if (state.phase !== 'idle' || state.currentLift > 0.001) {
        if (state.phase !== 'returning') {
          state.fromPos.copy(state.currentPos);
          state.fromScale = state.currentScale;
          // Capture current orientation including interactive rotation so it gracefully unspins back to (0,0,0)
          state.fromRot.set(
            state.currentRot.x + userIslandRotationRef.current.x,
            state.currentRot.y + userIslandRotationRef.current.y,
            state.currentRot.z
          );
          userIslandRotationRef.current = { x: 0, y: 0 };
          state.fromLift = state.currentLift;

          state.toPos.copy(state.originPos);
          state.toScale = 1.0;
          state.toRot.set(0, 0, 0);
          state.toLift = 0.0;

          state.startTime = nowSec;
          state.duration = isReduced
            ? 0.01
            : (RETURN_FLOAT_DURATION_MS / 1000) * Math.max(0.75, state.fromLift);
          state.phase = isReduced ? 'idle' : 'returning';

          if (isReduced) {
            state.currentPos.copy(state.originPos);
            state.currentScale = 1.0;
            state.currentRot.set(0, 0, 0);
            state.currentLift = 0.0;
          }
        }
      }
    });
  }, [selectedRealmId, viewportSize.w, viewportSize.h, effectiveReducedMotion]);

  // Manage DOM Floating Island Inspection Stage lifecycle for outward and return transitions
  useEffect(() => {
    if (selectedRealmId) {
      setDisplayRealmId(selectedRealmId);
      if (effectiveReducedMotion) {
        setAnimationPhase('floating');
        return;
      }
      setAnimationPhase('lifting');
      const timer = setTimeout(() => {
        setAnimationPhase('floating');
      }, OUTWARD_FLOAT_DURATION_MS);
      return () => clearTimeout(timer);
    } else if (displayRealmId) {
      if (effectiveReducedMotion) {
        setAnimationPhase('idle');
        setDisplayRealmId(null);
        return;
      }
      setAnimationPhase('returning');
      const timer = setTimeout(() => {
        setAnimationPhase('idle');
        setDisplayRealmId(null);
      }, RETURN_FLOAT_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [selectedRealmId, effectiveReducedMotion]);

  // Keep the 3D chart table in its overview layout when selecting islands so the map and remaining islands stay stationary
  useEffect(() => {
    const cam = cameraInstanceRef.current;
    const ctrl = controlsInstanceRef.current;
    if (!cam || !ctrl) return;

    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    const targetPos = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();

    // OrbitControls operates across the map overview only when no island is active.
    // When an island is selected, OrbitControls is disabled so rotation interactions are scoped
    // strictly to the active island diorama, keeping the chart table and remaining map stationary.
    if (selectedRealmId) {
      ctrl.enabled = false;
    } else {
      ctrl.enabled = true;
      ctrl.enableRotate = true;
      ctrl.enablePan = true;
    }

    if (cameraPresetMode === 'odyssey-spotlight' && !selectedRealmId) {
      lookTarget.set(0, 1.0, 0.4);
      targetPos.set(-1.8, 5.8, 8.2);
    } else if (cameraPresetMode === 'home' && !selectedRealmId) {
      lookTarget.set(0, 0.35, 0.5);
      targetPos.set(0, isMobileViewport ? 22.0 : 16.5, isMobileViewport ? 24.0 : 18.5);
    } else {
      // Full Chart Table Overview: Preserves the parchment map and all remaining islands in their original positions
      const cont = containerRef.current;
      const currentAspect = cont
        ? cont.clientWidth / Math.max(cont.clientHeight, 1)
        : window.innerWidth / Math.max(window.innerHeight, 1);
      const isNarrow = currentAspect < 1.25;

      cam.fov = isNarrow ? 60 : 44;
      cam.updateProjectionMatrix();

      lookTarget.set(0, 0.25, 0.4);
      if (isNarrow) {
        const aspectFactor = Math.max(1, 0.88 / Math.max(currentAspect, 0.35));
        const distScale = Math.sqrt(aspectFactor);
        const baseH = isMobileViewport ? 28.0 : 31.0;
        const baseZ = isMobileViewport ? 26.0 : 27.5;
        targetPos.set(0, baseH * distScale, baseZ * distScale);
      } else {
        targetPos.set(0, 18.0, 19.5);
      }
    }

    const posDelta = cam.position.distanceTo(targetPos);
    const targetDelta = ctrl.target.distanceTo(lookTarget);
    if (posDelta < 0.02 && targetDelta < 0.02) {
      cameraTransitionRef.current.active = false;
      return;
    }

    if (reducedMotionRef.current) {
      cam.position.copy(targetPos);
      ctrl.target.copy(lookTarget);
      ctrl.update();
      cameraTransitionRef.current.active = false;
      return;
    }

    cameraTransitionRef.current = {
      active: true,
      startPos: cam.position.clone(),
      endPos: targetPos,
      startTarget: ctrl.target.clone(),
      endTarget: lookTarget,
      startTime: performance.now() / 1000,
      duration: 0.75,
    };
  }, [selectedRealmId, cameraPresetMode, isChartOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const probeCanvas = document.createElement('canvas');
      const gl =
        probeCanvas.getContext('webgl2') ||
        probeCanvas.getContext('webgl') ||
        probeCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Warm, candlelit navigator's cabin atmosphere in Ithaca
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1E130C');
    scene.fog = new THREE.FogExp2('#1E130C', 0.012);

    const initW = container.clientWidth;
    const initH = Math.max(container.clientHeight, 1);
    const initialAspect = initW / initH;
    const isNarrowInit = initialAspect < 1.25;
    const initialFov = isNarrowInit ? 60 : 44;

    const camera = new THREE.PerspectiveCamera(
      initialFov,
      initialAspect,
      0.1,
      160
    );
    const initAspectFactor = isNarrowInit
      ? Math.max(1, 0.88 / Math.max(initialAspect, 0.35))
      : 1.0;
    const initDistScale = Math.sqrt(initAspectFactor);
    const initBaseH = isNarrowInit ? (window.innerWidth < 768 ? 28.0 : 31.0) : 18.0;
    const initBaseZ = isNarrowInit ? (window.innerWidth < 768 ? 26.0 : 27.5) : 19.5;
    camera.position.set(
      0,
      initBaseH * initDistScale,
      initBaseZ * initDistScale
    );
    cameraInstanceRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.maxDistance = 44.0;
    controls.minDistance = 5.0;
    controls.minPolarAngle = 0.24;
    controls.maxPolarAngle = Math.PI * 0.43; // Never allow camera to dip under the walnut table
    controls.target.set(0, 0.25, 0.4);
    controls.enabled = !selectedRef.current;
    controlsInstanceRef.current = controls;

    const cancelFlight = () => {
      cameraTransitionRef.current.active = false;
    };
    controls.addEventListener('start', cancelFlight);

    // Warm Cabin Lighting: Soft Parchment Hemisphere + Overhead Lantern + Corner Candle
    const hemiLight = new THREE.HemisphereLight('#FCE7B2', '#3B261A', 1.25);
    scene.add(hemiLight);

    const lanternKeyLight = new THREE.DirectionalLight('#F6D58E', 2.1);
    lanternKeyLight.position.set(10, 24, 14);
    lanternKeyLight.castShadow = true;
    lanternKeyLight.shadow.mapSize.width = 2048;
    lanternKeyLight.shadow.mapSize.height = 2048;
    lanternKeyLight.shadow.camera.near = 4;
    lanternKeyLight.shadow.camera.far = 55;
    const d = 22;
    lanternKeyLight.shadow.camera.left = -d;
    lanternKeyLight.shadow.camera.right = d;
    lanternKeyLight.shadow.camera.top = d;
    lanternKeyLight.shadow.camera.bottom = -d;
    lanternKeyLight.shadow.bias = -0.0005;
    scene.add(lanternKeyLight);

    const warmRimLight = new THREE.DirectionalLight('#D9A760', 0.85);
    scene.add(warmRimLight);
    warmRimLight.position.set(-16, 12, -12);

    // Warm Candlelit Inspection Light for the Floating Island beside the Navigator's Chart
    const floatingInspectionLight = new THREE.PointLight('#FCE7B2', 0, 26, 1.25);
    floatingInspectionLight.position.set(-4.5, 13.5, 12.0);
    scene.add(floatingInspectionLight);
    inspectionLightRef.current = floatingInspectionLight;

    // 1. Build the Dark Walnut Navigator's Chart Table, Parchment Map & Cabin Props
    const tableHandles = buildNavigatorChartTable();
    scene.add(tableHandles.tableGroup);

    // 2. Build Inked & Brass Sea Route Segments on the Parchment Surface
    const pathwayGroup = new THREE.Group();
    pathwayGroupRef.current = pathwayGroup;
    scene.add(pathwayGroup);

    const routeWaypoints = [
      new THREE.Vector3(REALM_MAP.odyssey.coordinates[0], 0.14, REALM_MAP.odyssey.coordinates[2]),
      new THREE.Vector3(REALM_MAP.job.coordinates[0], 0.14, REALM_MAP.job.coordinates[2]),
      new THREE.Vector3(REALM_MAP.panchatantra.coordinates[0], 0.14, REALM_MAP.panchatantra.coordinates[2]),
      new THREE.Vector3(REALM_MAP.ramayana.coordinates[0], 0.14, REALM_MAP.ramayana.coordinates[2]),
      new THREE.Vector3(REALM_MAP.mahabharata.coordinates[0], 0.14, REALM_MAP.mahabharata.coordinates[2]),
      new THREE.Vector3(REALM_MAP.iliad.coordinates[0], 0.14, REALM_MAP.iliad.coordinates[2]),
      new THREE.Vector3(REALM_MAP.roland.coordinates[0], 0.14, REALM_MAP.roland.coordinates[2]),
      new THREE.Vector3(REALM_MAP.odyssey.coordinates[0], 0.14, REALM_MAP.odyssey.coordinates[2]),
    ];

    const routeCurve = new THREE.CatmullRomCurve3(routeWaypoints, false, 'catmullrom', 0.4);
    const routeGeo = new THREE.TubeGeometry(routeCurve, 140, 0.052, 8, false);
    const routeMat = new THREE.MeshStandardMaterial({
      color: '#873B35',
      roughness: 0.55,
      metalness: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    pathwayMatRef.current = routeMat;
    const routeMesh = new THREE.Mesh(routeGeo, routeMat);
    pathwayGroup.add(routeMesh);

    // Small Brass Waypoint Tacks along the Sea Route
    const studMat = new THREE.MeshStandardMaterial({
      color: '#A98545',
      roughness: 0.3,
      metalness: 0.85,
    });
    for (let s = 0; s <= 28; s++) {
      const pt = routeCurve.getPointAt(s / 28);
      const stud = new THREE.Mesh(new THREE.SphereGeometry(0.088, 8, 8), studMat);
      stud.position.copy(pt);
      pathwayGroup.add(stud);
    }

    // 3. Build the Seven Carved Miniature Literary Landmarks
    const monumentHandles: Record<RealmId, MonumentGroupHandles> = {} as Record<
      RealmId,
      MonumentGroupHandles
    >;
    const hitMeshes: THREE.Mesh[] = [];

    LITERARY_REALMS.forEach((realm: LiteraryRealm) => {
      const handle = buildRealmMonument(realm);
      monumentHandles[realm.id] = handle;
      hitMeshes.push(handle.hitMesh);
      scene.add(handle.root);
    });

    // 4. Ambient Golden Sea-Mist & Candlelit Dust Particles
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 32;
      particlePositions[p * 3 + 1] = 0.35 + Math.random() * 3.8;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#F3C879',
      size: 0.13,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    setSceneReady(true);

    // Pointer Raycasting, Hover, and Dedicated Active-Island Drag Rotation
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let lastPointerPos = { x: 0, y: 0 };
    let isDraggingIsland = false;
    let hasDragged = false;
    let activePointerId: number | null = null;

    const pickHitRealmId = (intersects: THREE.Intersection[]): RealmId | null => {
      if (intersects.length === 0) return null;
      return intersects[0].object.userData.realmId as RealmId;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Active island drag rotation: rotates only the selected island diorama
      if (isDraggingIsland && selectedRef.current) {
        if (!hasDragged && Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 7) {
          hasDragged = true;
        }
        const deltaX = e.clientX - lastPointerPos.x;
        const deltaY = e.clientY - lastPointerPos.y;
        lastPointerPos = { x: e.clientX, y: e.clientY };

        const ROTATION_SPEED = 0.009;
        userIslandRotationRef.current.y += deltaX * ROTATION_SPEED;
        userIslandRotationRef.current.x += deltaY * ROTATION_SPEED;

        // Clamp pitch angle so island stays right-side-up and easily viewable
        userIslandRotationRef.current.x = THREE.MathUtils.clamp(
          userIslandRotationRef.current.x,
          -0.7,
          0.75
        );

        renderer.domElement.style.cursor = 'grabbing';
        return;
      }

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(hitMeshes, false);
      const hitRealmId = pickHitRealmId(intersects);

      if (selectedRef.current) {
        const activeHandle = monumentHandles[selectedRef.current];
        const hitActive =
          hitRealmId === selectedRef.current ||
          (activeHandle ? raycaster.intersectObject(activeHandle.root, true).length > 0 : false);

        if (hitActive) {
          renderer.domElement.style.cursor = 'grab';
        } else if (hitRealmId) {
          renderer.domElement.style.cursor = 'pointer';
        } else {
          renderer.domElement.style.cursor = 'default';
        }

        if (hitRealmId && hitRealmId !== selectedRef.current) {
          if (hoveredRef.current !== hitRealmId) {
            onHoverRef.current(hitRealmId);
          }
        } else if (hoveredRef.current !== null) {
          onHoverRef.current(null);
        }
      } else {
        if (hitRealmId) {
          renderer.domElement.style.cursor = 'pointer';
          if (hoveredRef.current !== hitRealmId) {
            onHoverRef.current(hitRealmId);
          }
        } else {
          renderer.domElement.style.cursor = 'grab';
          if (hoveredRef.current !== null) {
            onHoverRef.current(null);
          }
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      lastPointerPos = { x: e.clientX, y: e.clientY };
      hasDragged = false;

      if (selectedRef.current) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(hitMeshes, false);
        const hitRealmId = pickHitRealmId(intersects);

        // If clicking another island on the map, allow pointerup to switch selection.
        // Otherwise, target the active floating island for interactive drag-rotation.
        const clickedAnotherIsland = hitRealmId && hitRealmId !== selectedRef.current;
        if (!clickedAnotherIsland) {
          isDraggingIsland = true;
          activePointerId = e.pointerId;
          if (renderer.domElement.setPointerCapture) {
            try {
              renderer.domElement.setPointerCapture(e.pointerId);
            } catch {
              // Safe for test environments
            }
          }
          renderer.domElement.style.cursor = 'grabbing';
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDraggingIsland) {
        isDraggingIsland = false;
        if (
          activePointerId !== null &&
          renderer.domElement.hasPointerCapture &&
          renderer.domElement.releasePointerCapture
        ) {
          try {
            if (renderer.domElement.hasPointerCapture(activePointerId)) {
              renderer.domElement.releasePointerCapture(activePointerId);
            }
          } catch {
            // Safe for test environments
          }
        }
        activePointerId = null;
      }

      const isTouch = e.pointerType === 'touch';
      const maxTapDist = isTouch ? 18 : 7;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (hasDragged || dist > maxTapDist) {
        // Drag rotation finished; do not trigger selection or deselection
        if (selectedRef.current) {
          renderer.domElement.style.cursor = 'grab';
        }
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(hitMeshes, false);
      const hitRealmId = pickHitRealmId(intersects);
      if (hitRealmId) {
        // Reclicking the selected floating island smoothly returns it to its original coordinates
        if (hitRealmId === selectedRef.current) {
          if (onCloseRef.current) {
            onCloseRef.current();
          } else {
            onSelectRef.current(hitRealmId);
          }
          return;
        }
        onSelectRef.current(hitRealmId);
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (isDraggingIsland) {
        isDraggingIsland = false;
        if (
          activePointerId !== null &&
          renderer.domElement.hasPointerCapture &&
          renderer.domElement.releasePointerCapture
        ) {
          try {
            if (renderer.domElement.hasPointerCapture(activePointerId)) {
              renderer.domElement.releasePointerCapture(activePointerId);
            }
          } catch {
            // Safe for test environments
          }
        }
        activePointerId = null;
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointermove', handlePointerMove);
    domElem.addEventListener('pointerdown', handlePointerDown);
    domElem.addEventListener('pointerup', handlePointerUp);
    domElem.addEventListener('pointercancel', handlePointerCancel);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      const asp = w / h;
      camera.aspect = asp;
      camera.fov = asp < 1.25 ? 60 : 44;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      setViewportSize({ w, h });
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    let animFrameId = 0;

    const renderLoop = (nowMs: number) => {
      animFrameId = requestAnimationFrame(renderLoop);
      try {
        const elapsed = nowMs / 1000;
        const isReduced = reducedMotionRef.current;

        // Update camera flight if active
        const flight = cameraTransitionRef.current;
        if (flight.active) {
          const rawT = Math.min((elapsed - flight.startTime) / flight.duration, 1);
          const eased =
            rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;
          camera.position.lerpVectors(flight.startPos, flight.endPos, eased);
          controls.target.lerpVectors(flight.startTarget, flight.endTarget, eased);
          if (rawT >= 1) {
            flight.active = false;
          }
        }

        // Clamp OrbitControls target so visitor never pans off the walnut chart table
        controls.target.x = THREE.MathUtils.clamp(controls.target.x, -18, 18);
        controls.target.y = THREE.MathUtils.clamp(controls.target.y, -0.2, 2.5);
        controls.target.z = THREE.MathUtils.clamp(controls.target.z, -9, 9);
        controls.update();

        if (pathwayGroupRef.current) {
          pathwayGroupRef.current.visible = showLinesRef.current;
        }

        // Subtle warm candle flicker & interactive 3D pocket compass needle response
        if (!isReduced) {
          const flicker =
            Math.sin(elapsed * 7.3) * 0.6 +
            Math.cos(elapsed * 13.1) * 0.4 +
            Math.sin(elapsed * 3.7) * 0.5;
          tableHandles.candleLight.intensity = 23.5 + flicker * 1.4;
          tableHandles.candleFlameMesh.scale.set(
            1 + flicker * 0.04,
            1 + flicker * 0.08,
            1 + flicker * 0.04
          );
        }

        // Rotate the 3D brass pocket compass needle toward the hovered or selected landmark
        const activeRealmId = hoveredRef.current || selectedRef.current || 'odyssey';
        const targetRealm = REALM_MAP[activeRealmId];
        const targetAngleRad = THREE.MathUtils.degToRad(-targetRealm.compassAngleDeg);
        const magneticTremor = isReduced
          ? 0
          : Math.sin(elapsed * 5.4) * 0.014 + Math.cos(elapsed * 9.8) * 0.007;
        const currentNeedleY = tableHandles.compassNeedleGroup.rotation.y;
        tableHandles.compassNeedleGroup.rotation.y +=
          (targetAngleRad + magneticTremor - currentNeedleY) * (isReduced ? 1 : 0.08);

        // Drift ambient golden dust & sea-mist particles continuously
        if (!isReduced) {
          const posAttr = particleGeo.attributes.position;
          const posArray = posAttr.array as Float32Array;
          for (let p = 0; p < particleCount; p++) {
            posArray[p * 3 + 1] += Math.sin(elapsed * 1.3 + p) * 0.003;
            posArray[p * 3] += Math.cos(elapsed * 0.6 + p) * 0.002;
            posArray[p * 3 + 2] += Math.sin(elapsed * 0.5 + p) * 0.002;
            if (posArray[p * 3 + 1] > 4.4) posArray[p * 3 + 1] = 0.35;
            if (posArray[p * 3 + 1] < 0.3) posArray[p * 3 + 1] = 4.3;
          }
          posAttr.needsUpdate = true;
        }

        // Inked route becomes more prominent as realms are explored or selected
        if (pathwayMatRef.current) {
          const visitedBoost = Math.min(visitedRef.current.length * 0.04, 0.25);
          pathwayMatRef.current.opacity = selectedRef.current ? 0.92 : 0.65 + visitedBoost;
        }

        let maxActiveLift = 0;
        let activeFloatingPos: THREE.Vector3 | null = null;

        // Update floating outward / return flight and continuous diorama motion for all seven islands
        LITERARY_REALMS.forEach((realm) => {
          const handle = monumentHandles[realm.id];
          const state = islandFlightsRef.current[realm.id];
          if (!handle || !state) return;

          if (state.phase === 'lifting' || state.phase === 'returning') {
            const rawT = Math.min(
              Math.max((elapsed - state.startTime) / Math.max(state.duration, 0.001), 0),
              1
            );
            // Smooth ease-out curve for gentle, natural gliding
            const eased = 1 - Math.pow(1 - rawT, 3);

            state.currentPos.lerpVectors(state.fromPos, state.toPos, eased);
            // Gentle parabolic lift arc rising cleanly off the map and gliding smoothly across
            const arcHeight = state.phase === 'lifting' ? 1.45 : 0.85;
            state.currentPos.y += Math.sin(rawT * Math.PI) * arcHeight;

            state.currentScale = THREE.MathUtils.lerp(state.fromScale, state.toScale, eased);
            state.currentRot.lerpVectors(state.fromRot, state.toRot, eased);
            state.currentLift = THREE.MathUtils.lerp(state.fromLift, state.toLift, eased);

            if (rawT >= 1) {
              if (state.phase === 'lifting') {
                state.phase = 'floating';
                state.currentPos.copy(state.toPos);
                state.currentScale = state.toScale;
                state.currentRot.copy(state.toRot);
                state.currentLift = 1.0;
              } else {
                state.phase = 'idle';
                state.currentPos.copy(state.originPos);
                state.currentScale = 1.0;
                state.currentRot.set(0, 0, 0);
                state.currentLift = 0.0;
              }
            }
          }

          if (state.phase === 'idle') {
            // Stationary island locked at its exact original coordinates on the parchment map
            handle.root.position.copy(state.originPos);
            handle.root.rotation.set(0, 0, 0);
            handle.root.scale.set(1, 1, 1);
          } else {
            // Floating or transitioning island in the dedicated open area beside the Navigator's Chart
            const hoverBobY = isReduced
              ? 0
              : Math.sin(elapsed * 1.8) * 0.07 * state.currentLift;
            const hoverTiltY = isReduced
              ? 0
              : Math.sin(elapsed * 1.2) * 0.02 * state.currentLift;

            const isSelected = selectedRef.current === realm.id;
            const userRot = isSelected ? userIslandRotationRef.current : { x: 0, y: 0 };

            handle.root.position.set(
              state.currentPos.x,
              state.currentPos.y + hoverBobY,
              state.currentPos.z
            );
            handle.root.rotation.set(
              state.currentRot.x + userRot.x,
              state.currentRot.y + hoverTiltY + userRot.y,
              state.currentRot.z
            );
            handle.root.scale.setScalar(state.currentScale);

            if (state.currentLift > maxActiveLift) {
              maxActiveLift = state.currentLift;
              activeFloatingPos = handle.root.position;
            }
          }

          handle.animate(
            elapsed,
            hoveredRef.current === realm.id,
            selectedRef.current === realm.id,
            state.currentLift
          );

          // Keep the 3D cartouche nameplate readable in front of the floating island when user-rotated
          if (state.phase !== 'idle' && selectedRef.current === realm.id) {
            const userRot = userIslandRotationRef.current;
            if (Math.abs(userRot.x) > 0.0001 || Math.abs(userRot.y) > 0.0001) {
              const plaque = handle.root.getObjectByName('cartouche-plaque');
              if (plaque) {
                const hoverTiltY = isReduced
                  ? 0
                  : Math.sin(elapsed * 1.2) * 0.02 * state.currentLift;
                const baseQuat = new THREE.Quaternion().setFromEuler(
                  new THREE.Euler(
                    state.currentRot.x,
                    state.currentRot.y + hoverTiltY,
                    state.currentRot.z
                  )
                );
                const rootInvQuat = handle.root.quaternion.clone().invert();
                const deltaQuat = rootInvQuat.multiply(baseQuat);

                plaque.position.applyQuaternion(deltaQuat);
                plaque.quaternion.premultiply(deltaQuat);
              }
            }
          }
        });

        // Warm candlelit inspection light follows the floating island
        if (inspectionLightRef.current) {
          inspectionLightRef.current.intensity = maxActiveLift * 6.5;
          if (activeFloatingPos) {
            inspectionLightRef.current.position.set(
              (activeFloatingPos as THREE.Vector3).x + 1.8,
              (activeFloatingPos as THREE.Vector3).y + 3.2,
              (activeFloatingPos as THREE.Vector3).z + 2.4
            );
          }
        }

        renderer.render(scene, camera);
      } catch (renderErr) {
        // Prevent any unexpected error from terminating the animation loop
        console.error('Atlas renderLoop error:', renderErr);
      }
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      domElem.removeEventListener('pointermove', handlePointerMove);
      domElem.removeEventListener('pointerdown', handlePointerDown);
      domElem.removeEventListener('pointerup', handlePointerUp);
      domElem.removeEventListener('pointercancel', handlePointerCancel);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Illustrated 2D Antique Parchment Chart Fallback when WebGL is unavailable
  if (!webglSupported) {
    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-[#24160E] p-4 sm:p-8"
        aria-label="Illustrated 2D Navigator's Parchment Map"
      >
        <div className="vellum-sheet relative w-full max-w-4xl rounded-sm border-4 border-[#3B261A] p-6 shadow-2xl sm:p-8">
          <div className="border-2 border-[#59432E] p-5 sm:p-6">
            <div className="text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#873B35] uppercase">
                Illustrated Cartographic Folio • 2D Chart Table Mode
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-[#2C1E12] sm:text-3xl">
                The Literary Treasure Map: Seven Horizons of Antiquity
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-[#59432E]">
                Explore all seven handcrafted literary landmarks across the ancient world. Select any
                destination below to unfold its leather-bound Field Journal and complete literary
                analysis.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {LITERARY_REALMS.map((r) => {
                const isSelected = selectedRealmId === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    data-island-card={r.id}
                    data-floating={isSelected ? 'true' : 'false'}
                    onClick={() => {
                      if (selectedRealmId === r.id) {
                        if (onCloseRealm) {
                          onCloseRealm();
                        } else {
                          onSelectRealm(r.id);
                        }
                        return;
                      }
                      onSelectRealm(r.id);
                    }}
                    className={`flex flex-col justify-between rounded-sm border-2 p-4 text-left transition-transform duration-450 ease-out ${
                      isSelected
                        ? 'border-[#873B35] bg-[#E6D3AE] shadow-md -translate-y-5'
                        : r.isFavoriteMasterpiece
                          ? 'border-[#873B35]/80 bg-[#EFE1C2] hover:border-[#873B35]'
                          : 'border-[#59432E]/50 bg-[#F4ECD8] hover:border-[#3B261A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#873B35]">
                          Landmark {r.romanNumeral}{' '}
                          {r.isFavoriteMasterpiece ? '• Origin Harbor' : ''}
                        </span>
                        <span className="font-mono text-[10px] text-[#59432E]">
                          {r.civilizationRegion}
                        </span>
                      </div>
                      <p className="mt-1 font-display text-base font-bold text-[#2C1E12]">
                        {r.properTitle}
                      </p>
                      <p className="font-serif text-xs font-semibold italic text-[#59432E]">
                        {r.realmName}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#2C1E12]">
                        {r.shortEvocativeTagline}
                      </p>
                    </div>
                    <span className="mt-3 inline-block border-t border-[#59432E]/25 pt-2 font-mono text-[10px] font-semibold text-[#873B35] uppercase">
                      Open Field Journal →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none touch-none"
      aria-label="The Literary Treasure Map - Interactive 3D Chart Table"
    >
      {/* Loading State while 3D Parchment & Dioramas Initialize (R-27) */}
      {!sceneReady && (
        <div
          role="status"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-[#24160E]"
        >
          <div className="vellum-sheet rounded-sm border-2 border-[#A98545] px-6 py-4 text-center shadow-xl">
            <p className="font-display text-sm font-bold tracking-wider text-[#2C1E12] uppercase">
              Unrolling the Navigator&apos;s Parchment Chart...
            </p>
            <p className="mt-1 font-serif text-xs italic text-[#59432E]">
              Preparing the seven carved miniature landscapes and lighting the cabin lantern
            </p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};
