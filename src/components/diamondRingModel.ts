import * as THREE from 'three';

/**
 * Generates an authentic 57/58-facet Round Brilliant Cut Diamond Geometry.
 * Incorporates:
 * - Octagonal Flat Table facet
 * - 8 Star facets
 * - 8 Kite / Bezel facets
 * - 16 Upper Girdle facets
 * - 16 Girdle Facets (rim band)
 * - 16 Lower Girdle facets
 * - 8 Pavilion Main facets
 * - Culet (bottom point)
 */
export function createBrilliantCutDiamondGeometry(radius = 0.75): THREE.BufferGeometry {
  const rGirdle = radius;
  const rTable = radius * 0.54;
  const rStar = radius * 0.76;

  const yTable = radius * 0.32;
  const yStar = radius * 0.20;
  const yGirdleTop = radius * 0.025;
  const yGirdleBottom = -radius * 0.025;
  const yCulet = -radius * 0.88;

  const positions: number[] = [];

  const addTri = (
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) => {
    positions.push(...p1, ...p2, ...p3);
  };

  const addQuad = (
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number],
    p4: [number, number, number]
  ) => {
    addTri(p1, p2, p3);
    addTri(p1, p3, p4);
  };

  // 1. Table Vertices (8-gon)
  const tableVerts: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    tableVerts.push([Math.cos(angle) * rTable, yTable, Math.sin(angle) * rTable]);
  }

  // Table Top Face (radiating from center)
  const tableCenter: [number, number, number] = [0, yTable, 0];
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addTri(tableCenter, tableVerts[i], tableVerts[next]);
  }

  // 2. Star / Kite Crown Vertices
  // 8 Star vertices (halfway between table corners, offset angle)
  const starVerts: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = ((i + 0.5) / 8) * Math.PI * 2;
    starVerts.push([Math.cos(angle) * rStar, yStar, Math.sin(angle) * rStar]);
  }

  // 3. Upper Girdle Vertices (16 vertices around the girdle rim)
  const upperGirdleVerts: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    upperGirdleVerts.push([Math.cos(angle) * rGirdle, yGirdleTop, Math.sin(angle) * rGirdle]);
  }

  // 4. Lower Girdle Vertices (16 vertices)
  const lowerGirdleVerts: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    lowerGirdleVerts.push([Math.cos(angle) * rGirdle, yGirdleBottom, Math.sin(angle) * rGirdle]);
  }

  // Culet vertex
  const culet: [number, number, number] = [0, yCulet, 0];

  // A. Star Facets (Triangles between Table edge & Star vertices)
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addTri(tableVerts[i], starVerts[i], tableVerts[next]);
  }

  // B. Kite (Bezel) Facets & Upper Girdle Triangles
  for (let i = 0; i < 8; i++) {
    const tCurrent = tableVerts[i];
    const sPrev = starVerts[(i + 7) % 8];
    const sCurrent = starVerts[i];

    const ugLeft = upperGirdleVerts[i * 2];
    const ugMid = upperGirdleVerts[i * 2 + 1];
    const ugRight = upperGirdleVerts[(i * 2 + 2) % 16];

    // Kite facet (Bezel) formed by table vertex, two upper girdle, and two stars
    addTri(tCurrent, sPrev, ugLeft);
    addTri(tCurrent, ugLeft, sCurrent);

    // Upper girdle triangles
    addTri(sCurrent, ugLeft, ugMid);
    addTri(sCurrent, ugMid, ugRight);
  }

  // C. Girdle Facet Band (16 vertical rectangle segments around perimeter)
  for (let i = 0; i < 16; i++) {
    const next = (i + 1) % 16;
    addQuad(
      upperGirdleVerts[i],
      lowerGirdleVerts[i],
      lowerGirdleVerts[next],
      upperGirdleVerts[next]
    );
  }

  // D. Lower Girdle & Pavilion Main Facets
  // 8 Pavilion Main facets connect culet to alternating lower girdle vertices
  for (let i = 0; i < 8; i++) {
    const lgA = lowerGirdleVerts[i * 2];
    const lgB = lowerGirdleVerts[i * 2 + 1];
    const lgC = lowerGirdleVerts[(i * 2 + 2) % 16];

    // Pavilion main triangle
    addTri(culet, lgA, lgC);

    // Lower girdle pair facets
    addTri(lgA, lgB, lgC);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates an ultra-realistic HDRI-style studio environment reflection map
 * with softbox banks, strip lights, and chiaroscuro contrast.
 */
export function createStudioReflectionMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Pure deep black background
    ctx.fillStyle = '#020204';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Overhead Main Softbox (Soft, glowing, high-intensity white light)
    const topGrad = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.25,
      20,
      canvas.width * 0.5,
      canvas.height * 0.25,
      350
    );
    topGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    topGrad.addColorStop(0.3, 'rgba(250, 252, 255, 0.85)');
    topGrad.addColorStop(0.7, 'rgba(210, 220, 235, 0.35)');
    topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);

    // 2. Left High-Key Vertical Strip Light (for sharp specular ring band edges)
    const leftStrip = ctx.createLinearGradient(
      canvas.width * 0.15,
      0,
      canvas.width * 0.25,
      0
    );
    leftStrip.addColorStop(0, 'rgba(0, 0, 0, 0)');
    leftStrip.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
    leftStrip.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = leftStrip;
    ctx.fillRect(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.2, canvas.height * 0.8);

    // 3. Right Warm Accent Strip Light
    const rightStrip = ctx.createLinearGradient(
      canvas.width * 0.75,
      0,
      canvas.width * 0.85,
      0
    );
    rightStrip.addColorStop(0, 'rgba(0, 0, 0, 0)');
    rightStrip.addColorStop(0.5, 'rgba(255, 250, 240, 0.9)');
    rightStrip.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rightStrip;
    ctx.fillRect(canvas.width * 0.7, canvas.height * 0.1, canvas.width * 0.2, canvas.height * 0.8);

    // 4. Center-Back Brilliant Rim Glow
    const backRim = ctx.createRadialGradient(
      canvas.width * 0.5,
      canvas.height * 0.8,
      10,
      canvas.width * 0.5,
      canvas.height * 0.8,
      280
    );
    backRim.addColorStop(0, 'rgba(240, 245, 255, 0.75)');
    backRim.addColorStop(0.6, 'rgba(180, 200, 230, 0.2)');
    backRim.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = backRim;
    ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds the complete Hyper-Realistic 3D Ring with:
 * - Monumental Round Brilliant Cut Center Diamond
 * - Inner Prismatic Refraction Core
 * - 6 Platinum Claw Prongs
 * - Sculpted Cathedral Basket & Gallery Struts
 * - Tapered Cathedral Shank (Ring Band) with Comfort-Fit profile
 * - Micro-Pavé Accent Diamonds along the shoulders
 */
export function createHyperRealisticDiamondRing(): THREE.Group {
  const ringGroup = new THREE.Group();

  // Materials
  // 1. Mirror-Polished Platinum & 18k White Gold
  const platinumMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FAFAFC'),
    metalness: 0.98,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    reflectivity: 1.0,
    specularIntensity: 1.5,
    specularColor: new THREE.Color('#FFFFFF'),
  });

  // 2. Warm Champagne Platinum for inner band
  const warmGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#EDE6DA'),
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  });

  // 3. Ultra-Realistic Physical Diamond Material
  const diamondMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.98,
    ior: 2.418, // Exact diamond refractive index
    thickness: 1.8,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    specularIntensity: 2.5,
    specularColor: new THREE.Color('#FFFFFF'),
    attenuationColor: new THREE.Color('#F0F7FF'),
    attenuationDistance: 2.2,
    flatShading: true,
  });

  // 4. Inner Prismatic Fire Core (Simulates diamond dispersion / fire)
  const innerFireMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#EBF5FF'),
    emissive: new THREE.Color('#1A233A'),
    emissiveIntensity: 0.25,
    roughness: 0.02,
    metalness: 0.1,
    transmission: 0.85,
    ior: 2.48,
    clearcoat: 1.0,
    specularIntensity: 2.0,
    specularColor: new THREE.Color('#FFE8BD'),
    flatShading: true,
  });

  // 5. Micro-Pavé Diamonds Material
  const paveDiamondMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    ior: 2.418,
    specularIntensity: 2.0,
    flatShading: true,
  });

  // ==========================================
  // A. CENTER LARGE DIAMOND
  // ==========================================
  const diamondScale = 1.25;
  const diamondGeo = createBrilliantCutDiamondGeometry(diamondScale);
  const mainDiamond = new THREE.Mesh(diamondGeo, diamondMaterial);
  mainDiamond.position.set(0, 1.85, 0);
  mainDiamond.castShadow = true;
  mainDiamond.receiveShadow = true;
  ringGroup.add(mainDiamond);

  // Inner prismatic core for intense scintillation
  const innerDiamondGeo = createBrilliantCutDiamondGeometry(diamondScale * 0.94);
  const innerDiamond = new THREE.Mesh(innerDiamondGeo, innerFireMaterial);
  innerDiamond.position.set(0, 1.85, 0);
  innerDiamond.rotation.y = Math.PI / 16;
  ringGroup.add(innerDiamond);

  // ==========================================
  // B. 6 PLATINUM CLAW PRONGS
  // ==========================================
  const prongsGroup = new THREE.Group();
  prongsGroup.position.set(0, 1.85, 0);

  const prongCount = 6;
  for (let i = 0; i < prongCount; i++) {
    const angle = (i / prongCount) * Math.PI * 2;
    const clawGroup = new THREE.Group();

    // Curved prong rod
    const curvePoints = [
      new THREE.Vector3(Math.cos(angle) * 0.35, -diamondScale * 0.65, Math.sin(angle) * 0.35),
      new THREE.Vector3(Math.cos(angle) * 0.62, -diamondScale * 0.15, Math.sin(angle) * 0.62),
      new THREE.Vector3(Math.cos(angle) * 1.02 * diamondScale, 0.03, Math.sin(angle) * 1.02 * diamondScale),
      new THREE.Vector3(Math.cos(angle) * 0.95 * diamondScale, diamondScale * 0.16, Math.sin(angle) * 0.95 * diamondScale),
    ];
    const prongCurve = new THREE.CatmullRomCurve3(curvePoints);
    const prongGeo = new THREE.TubeGeometry(prongCurve, 24, 0.045, 12, false);
    const prongMesh = new THREE.Mesh(prongGeo, platinumMaterial);
    prongMesh.castShadow = true;
    clawGroup.add(prongMesh);

    // Tip claw sphere clasping the diamond
    const tipGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const tipMesh = new THREE.Mesh(tipGeo, platinumMaterial);
    tipMesh.position.copy(curvePoints[3]);
    clawGroup.add(tipMesh);

    prongsGroup.add(clawGroup);
  }
  ringGroup.add(prongsGroup);

  // ==========================================
  // C. UNDER-GALLERY BASKET & COLLAR
  // ==========================================
  const basketGroup = new THREE.Group();
  basketGroup.position.set(0, 1.85, 0);

  // Upper gallery wire ring under the diamond girdle
  const upperCollarGeo = new THREE.TorusGeometry(diamondScale * 0.88, 0.042, 16, 64);
  const upperCollar = new THREE.Mesh(upperCollarGeo, platinumMaterial);
  upperCollar.rotation.x = Math.PI / 2;
  upperCollar.position.y = -diamondScale * 0.12;
  basketGroup.add(upperCollar);

  // Lower gallery base ring
  const lowerCollarGeo = new THREE.TorusGeometry(0.42, 0.048, 16, 48);
  const lowerCollar = new THREE.Mesh(lowerCollarGeo, platinumMaterial);
  lowerCollar.rotation.x = Math.PI / 2;
  lowerCollar.position.y = -diamondScale * 0.62;
  basketGroup.add(lowerCollar);

  // 6 Radial basket struts connecting upper and lower collars
  for (let i = 0; i < prongCount; i++) {
    const angle = (i / prongCount) * Math.PI * 2 + Math.PI / prongCount;
    const strutPoints = [
      new THREE.Vector3(Math.cos(angle) * 0.40, -diamondScale * 0.62, Math.sin(angle) * 0.40),
      new THREE.Vector3(Math.cos(angle) * 0.78 * diamondScale, -diamondScale * 0.12, Math.sin(angle) * 0.78 * diamondScale),
    ];
    const strutCurve = new THREE.CatmullRomCurve3(strutPoints);
    const strutGeo = new THREE.TubeGeometry(strutCurve, 12, 0.035, 10, false);
    const strutMesh = new THREE.Mesh(strutGeo, platinumMaterial);
    basketGroup.add(strutMesh);
  }

  ringGroup.add(basketGroup);

  // ==========================================
  // D. SCULPTED CATHEDRAL SHANK (RING BAND)
  // ==========================================
  // Main Band Loop (Comfort Fit profile)
  const bandRadius = 1.65;
  const bandTubeRadius = 0.18;
  const mainBandGeo = new THREE.TorusGeometry(bandRadius, bandTubeRadius, 36, 120, Math.PI * 1.65);
  const mainBand = new THREE.Mesh(mainBandGeo, warmGoldMaterial);
  // Center gap at top for cathedral setting
  mainBand.rotation.z = Math.PI * 0.175;
  mainBand.castShadow = true;
  mainBand.receiveShadow = true;
  ringGroup.add(mainBand);

  // Cathedral Shoulders (left and right arches rising to meet the diamond head)
  [-1, 1].forEach((side) => {
    const archPoints = [
      new THREE.Vector3(side * (bandRadius * 0.92), 0.75, 0),
      new THREE.Vector3(side * (bandRadius * 0.78), 1.15, 0),
      new THREE.Vector3(side * 0.52, 1.45, 0),
      new THREE.Vector3(side * 0.38, 1.68, 0),
    ];
    const archCurve = new THREE.CatmullRomCurve3(archPoints);
    const archGeo = new THREE.TubeGeometry(archCurve, 32, 0.15, 16, false);
    const archMesh = new THREE.Mesh(archGeo, platinumMaterial);
    archMesh.castShadow = true;
    ringGroup.add(archMesh);

    // Inner reinforcement bridge
    const bridgePoints = [
      new THREE.Vector3(side * 0.75, 0.95, 0),
      new THREE.Vector3(0, 1.25, 0),
    ];
    const bridgeCurve = new THREE.CatmullRomCurve3(bridgePoints);
    const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 16, 0.08, 12, false);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, platinumMaterial);
    ringGroup.add(bridgeMesh);

    // ==========================================
    // E. MICRO-PAVÉ ACCENT DIAMONDS
    // ==========================================
    // 7 micro brilliant diamonds on each shoulder
    const paveCount = 7;
    for (let p = 0; p < paveCount; p++) {
      const t = 0.15 + (p / (paveCount - 1)) * 0.75;
      const pt = archCurve.getPoint(t);
      const tangent = archCurve.getTangent(t);

      // Micro diamond gem
      const paveSize = 0.11 - p * 0.006;
      const paveGeo = createBrilliantCutDiamondGeometry(paveSize);
      const paveMesh = new THREE.Mesh(paveGeo, paveDiamondMaterial);

      // Offset slightly to outer crown surface
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
      paveMesh.position.copy(pt).addScaledVector(normal, 0.14);

      // Orient gem perpendicular to the shank curve
      paveMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      ringGroup.add(paveMesh);

      // Delicate micro-prongs/beads between pavé gems
      const beadGeo = new THREE.SphereGeometry(0.024, 10, 10);
      const beadMesh = new THREE.Mesh(beadGeo, platinumMaterial);
      beadMesh.position.copy(paveMesh.position).add(new THREE.Vector3(0, 0, 0.08));
      ringGroup.add(beadMesh);

      const beadMesh2 = beadMesh.clone();
      beadMesh2.position.z = -0.08;
      ringGroup.add(beadMesh2);
    }
  });

  // Base luxury hallmarking medallion at the bottom of the band
  const stampGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24);
  const stampMesh = new THREE.Mesh(stampGeo, platinumMaterial);
  stampMesh.position.set(0, -bandRadius + 0.16, 0);
  ringGroup.add(stampMesh);

  return ringGroup;
}
