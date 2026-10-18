import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ProceduralSupercar, CarMaterialSettings } from './CarModel';
import { RotateCw, Eye, Sparkles, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface CarCanvasProps {
  settings: CarMaterialSettings;
  vehicleName: string;
}

type CameraPreset = 'front-quarter' | 'side-profile' | 'rear-aero' | 'top-down' | 'cockpit';

const CAMERA_PRESETS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number]; label: string }> = {
  'front-quarter': { pos: [3.8, 1.4, 3.8], target: [0, 0.45, 0], label: 'Front 3/4' },
  'side-profile': { pos: [4.6, 1.1, 0], target: [0, 0.45, 0], label: 'Side Profile' },
  'rear-aero': { pos: [-2.8, 1.3, -3.8], target: [0, 0.45, 0], label: 'Rear Aero' },
  'top-down': { pos: [0.1, 5.8, 0.1], target: [0, 0, 0], label: 'Top Aero' },
  'cockpit': { pos: [0.85, 1.1, 0.45], target: [0, 0.75, 0], label: 'Cockpit Focus' },
};

export const CarCanvas: React.FC<CarCanvasProps> = ({ settings, vehicleName }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<CameraPreset>('front-quarter');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Mutable refs to avoid re-instantiating WebGL
  const supercarRef = useRef<ProceduralSupercar | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(3.8, 1.4, 3.8));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 0));
  const autoRotateRef = useRef<boolean>(true);

  // Pointer drag state
  const isDraggingRef = useRef<boolean>(false);
  const prevPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sphericalRef = useRef<{ radius: number; theta: number; phi: number }>({
    radius: 5.6,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
  });

  autoRotateRef.current = autoRotate;

  // Camera preset handler
  const selectPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset);
    const config = CAMERA_PRESETS[preset];
    targetCameraPos.current.set(...config.pos);
    targetLookAt.current.set(...config.target);

    // Update spherical coords for smooth handoff if user drags afterwards
    const dx = config.pos[0] - config.target[0];
    const dy = config.pos[1] - config.target[1];
    const dz = config.pos[2] - config.target[2];
    sphericalRef.current.radius = Math.sqrt(dx * dx + dy * dy + dz * dz);
    sphericalRef.current.phi = Math.acos(Math.max(-1, Math.min(1, dy / sphericalRef.current.radius)));
    sphericalRef.current.theta = Math.atan2(dx, dz);
  }, []);

  // Update materials when settings change
  useEffect(() => {
    if (supercarRef.current) {
      supercarRef.current.updatePaint(settings.paintColor);
      supercarRef.current.updateCaliper(settings.caliperColor);
      supercarRef.current.updateRimFinish(settings.wheelStyle);
      supercarRef.current.updateAero(settings.aeroPackage);
    }
  }, [settings]);

  // Scene initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGlAvailable(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08090b);
    scene.fog = new THREE.FogExp2(0x08090b, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(3.8, 1.4, 3.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    try {
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    } catch {
      // fallback if RoomEnvironment fails
    }
    pmremGenerator.dispose();

    // Lighting Rig
    // 1. Warm Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(5, 7, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    scene.add(keyLight);

    // 2. Cool Rim / Backlight
    const rimLight = new THREE.DirectionalLight(0x00e5ff, 2.2);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    // 3. Cool Ambient Fill
    const hemiLight = new THREE.HemisphereLight(0x223040, 0x08090b, 1.4);
    scene.add(hemiLight);

    // Ground Studio Floor & Soft Contact Shadow
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.35,
      metalness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Contact Shadow Plane (procedural gradient)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 6.2), shadowPlaneMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    scene.add(contactShadow);

    // Build the procedural supercar
    const supercar = new ProceduralSupercar(settings);
    scene.add(supercar.group);
    supercarRef.current = supercar;

    // Pointer events for manual rotation
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      prevPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevPointer.current.x;
      const dy = e.clientY - prevPointer.current.y;
      prevPointer.current = { x: e.clientX, y: e.clientY };

      sphericalRef.current.theta -= dx * 0.007;
      sphericalRef.current.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - dy * 0.007));

      // Calculate new target pos
      const r = sphericalRef.current.radius;
      const phi = sphericalRef.current.phi;
      const theta = sphericalRef.current.theta;

      targetCameraPos.current.set(
        targetLookAt.current.x + r * Math.sin(phi) * Math.sin(theta),
        targetLookAt.current.y + r * Math.cos(phi),
        targetLookAt.current.z + r * Math.sin(phi) * Math.cos(theta)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsInteracting(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(3.0, Math.min(8.5, sphericalRef.current.radius + e.deltaY * 0.005));
      const r = sphericalRef.current.radius;
      const phi = sphericalRef.current.phi;
      const theta = sphericalRef.current.theta;

      targetCameraPos.current.set(
        targetLookAt.current.x + r * Math.sin(phi) * Math.sin(theta),
        targetLookAt.current.y + r * Math.cos(phi),
        targetLookAt.current.z + r * Math.sin(phi) * Math.cos(theta)
      );
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto rotation when enabled and not dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        sphericalRef.current.theta += delta * 0.35;
        const r = sphericalRef.current.radius;
        const phi = sphericalRef.current.phi;
        const theta = sphericalRef.current.theta;
        targetCameraPos.current.set(
          targetLookAt.current.x + r * Math.sin(phi) * Math.sin(theta),
          targetLookAt.current.y + r * Math.cos(phi),
          targetLookAt.current.z + r * Math.sin(phi) * Math.cos(theta)
        );
      }

      // Smooth camera dampening
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPos.current.x, 5.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPos.current.y, 5.0, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPos.current.z, 5.0, delta);

      currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 5.0, delta);
      currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 5.0, delta);
      currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 5.0, delta);

      camera.lookAt(currentLookAt.current);

      // Subtle wheel spin if auto rotating
      if (autoRotateRef.current) {
        supercar.rotateWheels(delta * 0.8);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);

      supercar.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [settings, selectPreset]);

  if (!webGlAvailable) {
    return (
      <div className="relative w-full h-[540px] bg-[#0c0e12] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="w-10 h-10 text-cyan-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Interactive 3D Hardware Accelerated Mode</h3>
        <p className="text-sm text-neutral-400 max-w-md">
          Hardware acceleration is currently disabled or unavailable on your display adapter. 
          The configurator remains fully functional below with concept vehicle specifications.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[580px] lg:h-[640px] rounded-2xl overflow-hidden border border-white/10 bg-[#08090B]">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
      />

      {/* Top Left Floating Minimal Badge */}
      <div className="absolute top-5 left-5 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#00E5FF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Studio</span>
        </div>
        <div className="text-lg font-bold text-white tracking-wide">
          {vehicleName}
        </div>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors border ${
            autoRotate
              ? 'bg-[#00E5FF]/10 border-[#00E5FF]/40 text-[#00E5FF]'
              : 'bg-[#17191D]/80 border-white/10 text-neutral-400 hover:text-white'
          }`}
          title="Toggle 360° Studio Orbit"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? 'Orbiting' : 'Paused'}</span>
        </button>
      </div>

      {/* Center Drag Hint (Fades out when interacting) */}
      {!isInteracting && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 opacity-60 flex flex-col items-center">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
            Drag to Rotate 360° · Scroll to Zoom
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Dock (Following Three.js guidelines: zero viewport occlusion) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl transition-all duration-300 ease-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-2.25rem)]' : 'translate-y-0'
        }`}
      >
        {/* Toggle Bar */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1 px-3 py-1 rounded-t-lg bg-[#17191D] border-t border-x border-white/15 text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Show Camera Angles</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                <span>Hide Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Content */}
        <div className="bg-[#17191D]/90 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Eye className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="hidden sm:inline">Camera:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-1 justify-end sm:justify-start overflow-x-auto py-0.5">
            {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((preset) => (
              <button
                key={preset}
                onClick={() => selectPreset(preset)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activePreset === preset
                    ? 'bg-[#00E5FF] text-black font-semibold'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {CAMERA_PRESETS[preset].label}
              </button>
            ))}
          </div>

          <button
            onClick={() => selectPreset('front-quarter')}
            className="text-[11px] font-mono text-neutral-400 hover:text-white underline decoration-dotted transition-colors ml-auto sm:ml-0"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
