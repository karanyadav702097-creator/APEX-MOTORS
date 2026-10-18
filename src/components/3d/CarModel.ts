import * as THREE from 'three';

export interface CarMaterialSettings {
  paintColor: string;
  caliperColor: string;
  wheelStyle: string;
  aeroPackage: string;
}

/**
 * Creates a procedural carbon fiber canvas texture with micro-weave pattern
 */
export function createCarbonFiberTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#141618';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#22262a';
    for (let x = 0; x < 64; x += 4) {
      for (let y = 0; y < 64; y += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillRect(x, y, 4, 4);
        }
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class ProceduralSupercar {
  public group: THREE.Group;
  private bodyMesh: THREE.Mesh | null = null;
  private roofMesh: THREE.Mesh | null = null;
  private hoodMesh: THREE.Mesh | null = null;
  private wingGroup: THREE.Group | null = null;
  private wingMesh: THREE.Mesh | null = null;
  private wheelsGroup: THREE.Group | null = null;
  private calipers: THREE.Mesh[] = [];
  private rims: THREE.Mesh[] = [];
  private paintMaterial: THREE.MeshPhysicalMaterial;
  private carbonMaterial: THREE.MeshStandardMaterial;
  private glassMaterial: THREE.MeshPhysicalMaterial;
  private caliperMaterial: THREE.MeshStandardMaterial;
  private rimMaterial: THREE.MeshStandardMaterial;
  private headlightMaterial: THREE.MeshStandardMaterial;
  private taillightMaterial: THREE.MeshStandardMaterial;

  constructor(settings: CarMaterialSettings) {
    this.group = new THREE.Group();
    const carbonTex = createCarbonFiberTexture();

    // 1. High-end PBR Car Paint Material
    this.paintMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(settings.paintColor),
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.9,
    });

    // 2. Carbon Fiber Material
    this.carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      map: carbonTex,
      metalness: 0.2,
      roughness: 0.45,
    });

    // 3. Optical Glass Canopy
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05080c,
      transmission: 0.88,
      opacity: 0.92,
      transparent: true,
      roughness: 0.05,
      metalness: 0.15,
      ior: 1.52,
    });

    // 4. Brake Calipers
    this.caliperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(settings.caliperColor),
      metalness: 0.7,
      roughness: 0.25,
    });

    // 5. Wheel Rims
    this.rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x22262c,
      metalness: 0.92,
      roughness: 0.2,
    });

    // 6. Laser Headlights & Lightbar
    this.headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0f7ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 2.8,
      roughness: 0.1,
    });

    this.taillightMaterial = new THREE.MeshStandardMaterial({
      color: 0xff1020,
      emissive: 0xff0020,
      emissiveIntensity: 3.2,
      roughness: 0.1,
    });

    this.buildSupercar();
  }

  private buildSupercar() {
    // === PRIMARY SILHOUETTE: Main Body ===
    const bodyGeo = new THREE.BoxGeometry(1.9, 0.42, 4.4, 4, 2, 8);
    // Sculpt body by modifying vertex positions
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const y = pos.getY(i);
      // Taper front and rear
      if (z > 1.2) {
        // Front hood slope
        pos.setY(i, y - (z - 1.2) * 0.16);
      }
      if (z < -1.4) {
        // Rear tail kick-up
        pos.setY(i, y + 0.05);
      }
    }
    bodyGeo.computeVertexNormals();
    this.bodyMesh = new THREE.Mesh(bodyGeo, this.paintMaterial);
    this.bodyMesh.position.y = 0.45;
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.group.add(this.bodyMesh);

    // Front aggressive hood channels
    const hoodGeo = new THREE.CylinderGeometry(0.85, 0.95, 1.4, 16);
    hoodGeo.scale(1, 0.14, 1.2);
    this.hoodMesh = new THREE.Mesh(hoodGeo, this.paintMaterial);
    this.hoodMesh.position.set(0, 0.62, 0.85);
    this.hoodMesh.rotation.x = 0.15;
    this.hoodMesh.castShadow = true;
    this.group.add(this.hoodMesh);

    // Teardrop Cockpit Canopy & Glass
    const cabinGeo = new THREE.SphereGeometry(0.82, 16, 16);
    cabinGeo.scale(1.05, 0.62, 1.8);
    this.roofMesh = new THREE.Mesh(cabinGeo, this.glassMaterial);
    this.roofMesh.position.set(0, 0.76, -0.15);
    this.roofMesh.castShadow = true;
    this.group.add(this.roofMesh);

    // Roof scoop intake in carbon fiber
    const scoopGeo = new THREE.BoxGeometry(0.32, 0.12, 0.7);
    const scoopMesh = new THREE.Mesh(scoopGeo, this.carbonMaterial);
    scoopMesh.position.set(0, 1.14, -0.1);
    scoopMesh.rotation.x = -0.1;
    this.group.add(scoopMesh);

    // === SECONDARY READ: Splitters, Diffusers, Side-pods ===
    // Front Splitter
    const splitterGeo = new THREE.BoxGeometry(2.05, 0.05, 0.7);
    const splitterMesh = new THREE.Mesh(splitterGeo, this.carbonMaterial);
    splitterMesh.position.set(0, 0.18, 2.2);
    splitterMesh.castShadow = true;
    this.group.add(splitterMesh);

    // Front Aero Canards (left/right)
    [-1, 1].forEach((side) => {
      const canardGeo = new THREE.BoxGeometry(0.28, 0.02, 0.22);
      const canard = new THREE.Mesh(canardGeo, this.carbonMaterial);
      canard.position.set(side * 0.98, 0.32, 2.05);
      canard.rotation.z = side * 0.25;
      this.group.add(canard);
    });

    // Side Skirts (left/right)
    [-1, 1].forEach((side) => {
      const skirtGeo = new THREE.BoxGeometry(0.18, 0.08, 2.4);
      const skirt = new THREE.Mesh(skirtGeo, this.carbonMaterial);
      skirt.position.set(side * 1.02, 0.2, 0);
      skirt.castShadow = true;
      this.group.add(skirt);
    });

    // Rear Venturi Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.88, 0.16, 0.7);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, this.carbonMaterial);
    diffuserMesh.position.set(0, 0.22, -2.18);
    diffuserMesh.rotation.x = -0.18;
    diffuserMesh.castShadow = true;
    this.group.add(diffuserMesh);

    // Rear Active Aero Swan-Neck Wing
    this.wingGroup = new THREE.Group();
    this.wingGroup.position.set(0, 0.95, -1.95);

    // Wing upright pylons (left/right swan-neck)
    [-0.55, 0.55].forEach((x) => {
      const pylonGeo = new THREE.BoxGeometry(0.04, 0.45, 0.2);
      const pylon = new THREE.Mesh(pylonGeo, this.carbonMaterial);
      pylon.position.set(x, 0, 0);
      pylon.rotation.x = -0.25;
      this.wingGroup?.add(pylon);
    });

    // Aerofoil blade
    const wingGeo = new THREE.BoxGeometry(2.1, 0.04, 0.42);
    this.wingMesh = new THREE.Mesh(wingGeo, this.carbonMaterial);
    this.wingMesh.position.set(0, 0.22, 0.05);
    this.wingMesh.castShadow = true;
    this.wingGroup.add(this.wingMesh);

    // Wing endplates (left/right)
    [-1.05, 1.05].forEach((x) => {
      const endplateGeo = new THREE.BoxGeometry(0.02, 0.22, 0.44);
      const endplate = new THREE.Mesh(endplateGeo, this.carbonMaterial);
      endplate.position.set(x, 0.22, 0.05);
      this.wingGroup?.add(endplate);
    });

    this.group.add(this.wingGroup);

    // === ACCENTS: Lights & Exhaust ===
    // Front LED Blade Headlights
    [-0.65, 0.65].forEach((x) => {
      const lightGeo = new THREE.BoxGeometry(0.38, 0.04, 0.22);
      const light = new THREE.Mesh(lightGeo, this.headlightMaterial);
      light.position.set(x, 0.52, 2.12);
      light.rotation.y = (x > 0 ? -1 : 1) * 0.2;
      this.group.add(light);
    });

    // Rear LED Lightbar
    const rearLightGeo = new THREE.BoxGeometry(1.7, 0.04, 0.08);
    const rearLight = new THREE.Mesh(rearLightGeo, this.taillightMaterial);
    rearLight.position.set(0, 0.58, -2.18);
    this.group.add(rearLight);

    // Titanium Central Exhaust Tips
    [-0.14, 0, 0.14].forEach((x) => {
      const exhaustGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.15, 16);
      exhaustGeo.rotateX(Math.PI / 2);
      const exhaustMat = new THREE.MeshStandardMaterial({
        color: 0x4f708a,
        metalness: 0.95,
        roughness: 0.2,
      });
      const tip = new THREE.Mesh(exhaustGeo, exhaustMat);
      tip.position.set(x, 0.38, -2.2);
      this.group.add(tip);
    });

    // === WHEELS, TIRES, BRAKES ===
    this.wheelsGroup = new THREE.Group();
    const wheelPositions = [
      { x: -0.96, z: 1.35, isFront: true }, // Front Left
      { x: 0.96, z: 1.35, isFront: true },  // Front Right
      { x: -0.98, z: -1.35, isFront: false }, // Rear Left
      { x: 0.98, z: -1.35, isFront: false },  // Rear Right
    ];

    wheelPositions.forEach((posInfo) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(posInfo.x, 0.34, posInfo.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.28, 24);
      tireGeo.rotateZ(Math.PI / 2);
      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x151618,
        roughness: 0.85,
        metalness: 0.05,
      });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      wheelAssembly.add(tire);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.282, 16);
      rimGeo.rotateZ(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, this.rimMaterial);
      rim.castShadow = true;
      this.rims.push(rim);
      wheelAssembly.add(rim);

      // Carbon-Ceramic Brake Disc
      const discGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 16);
      discGeo.rotateZ(Math.PI / 2);
      const discMat = new THREE.MeshStandardMaterial({
        color: 0x60656d,
        metalness: 0.85,
        roughness: 0.35,
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      wheelAssembly.add(disc);

      // Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.06, 0.12, 0.07);
      const caliper = new THREE.Mesh(caliperGeo, this.caliperMaterial);
      caliper.position.set(posInfo.x > 0 ? 0.06 : -0.06, 0.1, 0);
      this.calipers.push(caliper);
      wheelAssembly.add(caliper);

      this.wheelsGroup?.add(wheelAssembly);
    });

    this.group.add(this.wheelsGroup);
  }

  public updatePaint(hexColor: string) {
    this.paintMaterial.color.set(hexColor);
  }

  public updateCaliper(hexColor: string) {
    this.caliperMaterial.color.set(hexColor);
  }

  public updateRimFinish(styleId: string) {
    if (styleId === 'aero-blade') {
      this.rimMaterial.color.set(0x111315);
      this.rimMaterial.metalness = 0.4;
      this.rimMaterial.roughness = 0.5;
    } else if (styleId === 'titanium-mesh') {
      this.rimMaterial.color.set(0xb0b8c2);
      this.rimMaterial.metalness = 0.95;
      this.rimMaterial.roughness = 0.15;
    } else {
      // standard forged spoke
      this.rimMaterial.color.set(0x282c34);
      this.rimMaterial.metalness = 0.85;
      this.rimMaterial.roughness = 0.22;
    }
  }

  public updateAero(packageId: string) {
    if (!this.wingGroup || !this.wingMesh) return;
    if (packageId === 'track-carbon') {
      this.wingGroup.scale.set(1.15, 1.25, 1.1);
      this.wingGroup.position.y = 1.05;
    } else if (packageId === 'touring-stealth') {
      this.wingGroup.scale.set(0.85, 0.6, 0.85);
      this.wingGroup.position.y = 0.82;
    } else {
      this.wingGroup.scale.set(1.0, 1.0, 1.0);
      this.wingGroup.position.y = 0.95;
    }
  }

  public rotateWheels(speed: number) {
    if (!this.wheelsGroup) return;
    this.wheelsGroup.children.forEach((wheel) => {
      wheel.rotation.x += speed;
    });
  }

  public dispose() {
    this.paintMaterial.dispose();
    this.carbonMaterial.dispose();
    this.glassMaterial.dispose();
    this.caliperMaterial.dispose();
    this.rimMaterial.dispose();
    this.headlightMaterial.dispose();
    this.taillightMaterial.dispose();
  }
}
