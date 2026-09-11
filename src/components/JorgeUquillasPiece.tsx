import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Instagram } from 'lucide-react';
import { createHyperRealisticDiamondRing, createStudioReflectionMap } from './diamondRingModel';

interface JorgeUquillasPieceProps {
  onBackToAtelier: () => void;
  onOpenConsultation?: (pieceName: string) => void;
}

const ASSET_BASE_URL = "https://api.getlayers.ai/storage/v1/object/public/public/assets/laocoon-59f84455c6";

export function JorgeUquillasPiece({ onBackToAtelier, onOpenConsultation }: JorgeUquillasPieceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Scroll to top upon entering
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let gltfModel: THREE.Group | null = null;
    let modelPivot: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    let currentScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let outerCursorX = window.innerWidth / 2;
    let outerCursorY = window.innerHeight / 2;

    const shaderUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 }
    };

    let sparkParticles: THREE.Points | null = null;
    const sparkCount = 450;
    const sparkData: Array<{
      speedX: number;
      speedY: number;
      speedZ: number;
      swaySpeed: number;
      swayRadius: number;
      phase: number;
    }> = [];

    const sizes = { width: window.innerWidth, height: window.innerHeight };

    // --- 1. Scene, Camera, Shader ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.01);

    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0.2, 3.0);
    scene.add(camera);

    // Atmospheric "Preto com Branco Esfumaçado" (Black with Silky Volumetric Smoke) Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;

      // Pseudo-random hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Smooth 2D noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // Fractional Brownian Motion (fBm) for organic smoky turbulence
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.52), sin(0.52), -sin(0.52), cos(0.52));
        for (int i = 0; i < 5; ++i) {
          v += a * noise(p);
          p = rot * p * 2.08 + vec2(100.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        float time = uTime * 0.085;
        
        // Mouse drift & scroll velocity displacement
        vec2 mouseOffset = vec2(uMouse.x * 0.12, -uMouse.y * 0.12);
        vec2 p = uv * 1.65 + vec2(0.0, -time * 0.16) + mouseOffset;
        p.y += uScroll * 1.55;

        // Double domain warping to simulate organic silky smoke curls
        vec2 q = vec2(fbm(p + vec2(0.0, 0.0)), fbm(p + vec2(5.2, 1.3) + time * 0.04));
        vec2 r = vec2(fbm(p + 3.8 * q + vec2(1.7, 9.2) + time * 0.10),
                      fbm(p + 3.8 * q + vec2(8.3, 2.8) - time * 0.07));
        
        float smokeDensity = fbm(p + 3.6 * r);

        // Palette: Deep Obsidian Black with Smoky Pearl & White Plumes
        vec3 colBlack     = vec3(0.005, 0.005, 0.008); // Deep velvet black
        vec3 colSmokeDark = vec3(0.12, 0.13, 0.16);    // Translucent charcoal mist shadow
        vec3 colSmokeMid  = vec3(0.54, 0.57, 0.62);    // Silvery ethereal mist
        vec3 colSmokeHigh = vec3(0.92, 0.94, 0.98);    // Luminous billowing white smoke
        vec3 colPureWhite = vec3(1.0, 1.0, 1.0);       // Crisp white billowing crests

        // Layer the smoke with smooth density transitions
        vec3 color = colBlack;
        color = mix(color, colSmokeDark, smoothstep(0.16, 0.50, smokeDensity) * 0.82);
        color = mix(color, colSmokeMid,  smoothstep(0.38, 0.70, smokeDensity) * 0.88);
        color = mix(color, colSmokeHigh, smoothstep(0.65, 0.92, smokeDensity) * 0.94);

        // Fine crisp smoke filaments & wisps
        float wisps = pow(fbm(p * 3.6 + r * 2.2), 2.7);
        color += colPureWhite * wisps * 0.38;

        // Theatrical cinematic vignette
        float vignette = 1.0 - smoothstep(0.40, 1.40, length(uv));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
      depthWrite: false,
      depthTest: false
    });

    const bgGeometry = new THREE.PlaneGeometry(30, 30);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.set(0.0, 0.0, -8.0);
    bgMesh.renderOrder = -10;
    camera.add(bgMesh);

    // --- 2. Renderer ---
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;

    // Studio Environment Reflections for Realistic Gem & Platinum Shimmer
    const studioEnv = createStudioReflectionMap(renderer);
    scene.environment = studioEnv;

    // --- 3. Chiaroscuro High-Jewelry Lighting ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.25);
    scene.add(ambientLight);

    // Primary Spotlight for Diamond Table Facets & Fire
    const keyLight = new THREE.SpotLight('#ffffff', 26.0);
    keyLight.position.set(4, 7, 5);
    keyLight.angle = Math.PI / 4.2;
    keyLight.penumbra = 0.85;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Sharp cool rim light to outline the platinum band silhouette
    const rimLight = new THREE.DirectionalLight('#edf4ff', 12.0);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Front-fill light for inner band and micro-pavé brilliance
    const fillLight = new THREE.DirectionalLight('#ffffff', 2.0);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Dynamic gemstone flare point light for animated diamond scintillation
    const gemFlareLight = new THREE.PointLight('#ffffff', 8.0, 8.0);
    gemFlareLight.position.set(0, 2.2, 0.8);
    scene.add(gemFlareLight);

    // --- 4. Diamond Dust & Starlight Glimmer (Luminous White / Silver Points) ---
    function createSparkTexture() {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(240, 250, 255, 0.95)');
        gradient.addColorStop(0.55, 'rgba(200, 230, 255, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(c);
    }

    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkCols = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      const x = (Math.random() - 0.5) * 7.0;
      const y = (Math.random() - 0.5) * 5.5 - 0.2;
      const z = (Math.random() - 0.5) * 7.0;
      sparkPos[i * 3] = x;
      sparkPos[i * 3 + 1] = y;
      sparkPos[i * 3 + 2] = z;

      if (Math.random() < 0.7) {
        // Pure luminous diamond white
        sparkCols[i * 3] = 0.95 + Math.random() * 0.05;
        sparkCols[i * 3 + 1] = 0.96 + Math.random() * 0.04;
        sparkCols[i * 3 + 2] = 1.0;
      } else {
        // Ethereal pale diamond cyan / frost
        sparkCols[i * 3] = 0.80 + Math.random() * 0.15;
        sparkCols[i * 3 + 1] = 0.90 + Math.random() * 0.10;
        sparkCols[i * 3 + 2] = 1.0;
      }

      sparkData.push({
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: 0.12 + Math.random() * 0.28,
        speedZ: (Math.random() - 0.5) * 0.35,
        swaySpeed: 0.6 + Math.random() * 1.4,
        swayRadius: 0.06 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2
      });
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkCols, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createSparkTexture()
    });

    sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // --- 5. Hyper-Realistic 3D Diamond Ring Construction & Placement ---
    const ringModel = createHyperRealisticDiamondRing();
    gltfModel = ringModel;
    modelPivot = new THREE.Group();
    scene.add(modelPivot);
    modelPivot.add(ringModel);

    // Precise high-jewelry scale and centering
    const boxInitial = new THREE.Box3().setFromObject(ringModel);
    const sizeInitial = boxInitial.getSize(new THREE.Vector3());
    const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
    const targetScale = 3.6 / (maxDim > 0.0001 ? maxDim : 1);
    ringModel.scale.setScalar(targetScale);

    ringModel.updateMatrixWorld(true);

    const boxScaled = new THREE.Box3().setFromObject(ringModel);
    const centerScaled = boxScaled.getCenter(new THREE.Vector3());

    ringModel.position.sub(centerScaled);
    modelPivot.position.y = -0.15;

    // Initial dramatic ring angle showcasing diamond crown & cathedral band
    ringModel.rotation.x = 0.25;
    ringModel.rotation.y = -0.45;

    // --- 6. Per-Letter Title Split ---
    const titles = document.querySelectorAll('.jq-slide-title');
    titles.forEach((title) => {
      const text = title.innerHTML;
      if (title.getAttribute('data-split') === 'true') return;
      title.setAttribute('data-split', 'true');
      let newHTML = '';
      let delayCounter = 0;
      const parts = text.split(/(<br\s*\/?>)/i);
      parts.forEach((part) => {
        if (part.toLowerCase().startsWith('<br')) {
          newHTML += part;
        } else {
          for (let i = 0; i < part.length; i++) {
            if (part[i] === ' ') {
              newHTML += ' ';
            } else {
              newHTML += `<span class="char" style="transition-delay: ${delayCounter * 0.035}s">${part[i]}</span>`;
              delayCounter++;
            }
          }
        }
      });
      title.innerHTML = newHTML;
    });

    // --- 7. Event Listeners ---
    const onMouseMove = (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      const cursorInner = document.querySelector('.jq-cursor-inner') as HTMLElement;
      if (cursorInner) {
        cursorInner.style.left = `${cursorX}px`;
        cursorInner.style.top = `${cursorY}px`;
      }
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // --- 8. Navigation Smooth Scroll ---
    const navLinks = document.querySelectorAll('.jq-nav-link');
    const targetScrolls = [0.0, 0.34, 0.62, 0.94];
    const navCleanups: Array<() => void> = [];

    navLinks.forEach((link, index) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const targetY = maxScroll * targetScrolls[index];
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      };
      link.addEventListener('click', handler);
      navCleanups.push(() => link.removeEventListener('click', handler));
    });

    // --- 9. Animation Loop ---
    let animId: number;

    const updateSlides = (scroll: number) => {
      const slide1 = document.getElementById('jq-slide-1');
      const slide2 = document.getElementById('jq-slide-2');
      const slide3 = document.getElementById('jq-slide-3');
      const slide4 = document.getElementById('jq-slide-4');

      for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`jq-dash-fill-${i}`);
        if (fill) {
          const start = (i - 1) * 0.25;
          const end = i * 0.25;
          let progress = (scroll - start) / (end - start);
          progress = Math.max(0, Math.min(1, progress));
          fill.style.height = `${progress * 100}%`;
        }
      }

      const isActive = (val: number, start: number, end: number) => val >= start && val <= end;

      if (slide1) slide1.classList.toggle('active', isActive(scroll, -0.10, 0.12));
      if (slide2) {
        const active2 = isActive(scroll, 0.28, 0.40);
        slide2.classList.toggle('active', active2);
        const slide2Img = document.getElementById('jq-slide-2-img');
        if (slide2Img) slide2Img.classList.toggle('active', active2);
      }
      if (slide3) slide3.classList.toggle('active', isActive(scroll, 0.56, 0.68));
      if (slide4) slide4.classList.toggle('active', isActive(scroll, 0.84, 1.05));
    };

    const updateGridDots = (scroll: number) => {
      const dots = document.querySelectorAll('.jq-grid-dot');
      dots.forEach((dot, i) => {
        const startY = (i * 17) % 80 + 10;
        let speed = 90 + (i * 55) % 180;
        if (i % 2 === 0) speed = -speed;
        let y = startY + scroll * speed;
        y = ((y % 100) + 100) % 100;
        (dot as HTMLElement).style.top = `${y}%`;
      });
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      if (mixer) mixer.update(deltaTime);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY !== undefined ? window.scrollY
        : (window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop);
      const targetScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;

      currentScroll += (targetScroll - currentScroll) * 0.025;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      outerCursorX += (cursorX - outerCursorX) * 0.2;
      outerCursorY += (cursorY - outerCursorY) * 0.2;
      const cursorOuter = document.querySelector('.jq-cursor-outer') as HTMLElement;
      if (cursorOuter) {
        cursorOuter.style.left = `${outerCursorX}px`;
        cursorOuter.style.top = `${outerCursorY}px`;
      }

      if (gemFlareLight) {
        const time = clock.getElapsedTime();
        gemFlareLight.position.x = Math.sin(time * 1.6) * 1.8;
        gemFlareLight.position.y = 1.6 + Math.cos(time * 1.2) * 0.7;
        gemFlareLight.position.z = Math.cos(time * 1.6) * 1.8 + 0.8;
      }

      if (modelPivot) {
        modelPivot.rotation.y = mouseX * 0.3 + currentScroll * Math.PI * 0.75;
        modelPivot.rotation.x = mouseY * 0.18 + Math.sin(currentScroll * Math.PI) * 0.2;
      }

      if (sparkParticles) {
        const positions = sparkParticles.geometry.attributes.position.array as Float32Array;
        const time = clock.getElapsedTime();
        const scrollVelocity = Math.abs(targetScroll - currentScroll);
        const speedMultiplier = 1.0 + scrollVelocity * 9.0;
        const turbulence = scrollVelocity * 0.8;

        for (let i = 0; i < sparkCount; i++) {
          const idx = i * 3;
          const data = sparkData[i];
          positions[idx] += data.speedX * deltaTime * speedMultiplier;
          positions[idx + 1] += data.speedY * deltaTime * speedMultiplier;
          positions[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

          const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
          positions[idx] += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime;
          positions[idx + 2] += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime;

          if (positions[idx + 1] > 3.0 || Math.abs(positions[idx]) > 3.5 || Math.abs(positions[idx + 2]) > 3.5) {
            positions[idx + 1] = -2.5;
            positions[idx] = (Math.random() - 0.5) * 3.0;
            positions[idx + 2] = (Math.random() - 0.5) * 3.0;
          }
        }
        sparkParticles.geometry.attributes.position.needsUpdate = true;
      }

      const phi = currentScroll * Math.PI * 2.0;
      const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8;
      const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.6;
      const x = radius * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const transitionProgress = Math.min(1.0, currentScroll / 0.28);
      const easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5;
      const lookAtXOffset = -0.9 * easeFactor;
      const targetLookAt = new THREE.Vector3(lookAtXOffset, -0.15, 0);
      const targetPos = new THREE.Vector3(x, y, z);
      camera.position.lerp(targetPos, 0.025);
      camera.lookAt(targetLookAt);

      shaderUniforms.uTime.value = clock.getElapsedTime();
      shaderUniforms.uMouse.value.set(mouseX, -mouseY);
      shaderUniforms.uScroll.value = currentScroll;

      updateSlides(currentScroll);
      updateGridDots(currentScroll);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      navCleanups.forEach((c) => c());
      renderer.dispose();
      studioEnv.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000000] text-[#ffffff] min-h-[900vh] cursor-none select-none font-['Outfit']"
      style={{ cursor: 'none' }}
    >
      <style>{`
        .jq-cursor-inner {
          position: fixed; top: 0; left: 0;
          width: 6px; height: 6px;
          border: 2px solid rgba(255, 255, 255, 1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
        }
        .jq-cursor-outer {
          position: fixed; top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
          transition: width 0.3s, height 0.3s, background 0.3s;
        }
        .jq-cinematic-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 60px 40px 60px;
          box-sizing: border-box;
        }
        .jq-slide { position: absolute; bottom: 12%; pointer-events: none; }
        #jq-slide-1 { left: 0; width: 100%; }
        #jq-slide-1 .jq-slide-title { margin-left: 60px; }
        #jq-slide-1 .jq-desc-row { position: relative; display: flex; width: 100%; }
        #jq-slide-1 .jq-col-1 {
          margin-left: 60px;
          width: calc(25vw - 60px);
          max-width: calc(25vw - 60px);
        }
        #jq-slide-1 .jq-col-2 {
          position: absolute;
          left: calc(25vw + 40px);
          width: calc(25vw - 60px);
          max-width: calc(25vw - 60px);
        }

        #jq-slide-2 { left: 0; width: 100%; }
        #jq-slide-2-img {
          position: fixed;
          top: 90px;
          left: 60px;
          width: calc(25vw - 60px);
          aspect-ratio: 1 / 1;
          overflow: hidden;
          z-index: 2;
          pointer-events: none;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
          opacity: 0;
        }
        #jq-slide-2-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.15);
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #jq-slide-2-img.active { clip-path: inset(0 0 0 0); opacity: 1; }
        #jq-slide-2-img.active img { transform: scale(1); }

        #jq-slide-2 .jq-slide-title { margin-left: calc(25vw + 40px); }
        #jq-slide-2 .jq-slide-desc {
          margin-left: calc(50vw + 20px);
          width: calc(25vw - 60px);
          max-width: calc(25vw - 60px);
        }

        #jq-slide-3 {
          left: calc(50vw + 20px);
          width: calc(25vw - 60px);
          max-width: calc(25vw - 60px);
        }
        #jq-slide-3 .jq-slide-title { white-space: nowrap; }

        #jq-slide-4 { left: calc(25% + 40px); max-width: 600px; }

        .jq-slide-title {
          font-family: 'Italiana', serif;
          font-size: 116px;
          line-height: 1.0;
          font-weight: 400;
          letter-spacing: 2px;
          margin-bottom: 20px;
          color: #fff6ed;
        }
        .jq-slide-desc {
          font-size: 16px; line-height: 1.7; font-weight: 300;
          color: #d1d5db; letter-spacing: 0.5px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1),
                      transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          transition-delay: 0.4s;
        }
        .jq-slide.active .jq-slide-desc { opacity: 1; transform: translateY(0); }

        .jq-slide-title .char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
          filter: blur(12px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1),
                      transform 0.8s cubic-bezier(0.25, 1, 0.5, 1),
                      filter 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .jq-slide.active .jq-slide-title .char { opacity: 1; transform: translateY(0); filter: blur(0); }
        .jq-slide.active { pointer-events: auto; }

        .jq-story-dashes {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          display: flex; flex-direction: column; gap: 12px;
        }
        .jq-story-dash { width: 2px; height: 40px; background: rgba(255, 255, 255, 0.15); border-radius: 2px; }
        .jq-story-dash-fill { width: 100%; height: 0%; background: #ffffff; border-radius: 2px; }

        .jq-grid-horizontal-line {
          position: fixed; top: 70px; left: 0; right: 0;
          width: 100%; height: 1px;
          background: rgba(255, 255, 255, 0.12);
          z-index: 5; pointer-events: none;
        }
        .jq-grid-lines {
          position: fixed; top: 0; left: 40px; right: 40px;
          width: calc(100% - 80px); height: 100vh;
          display: flex; justify-content: space-between;
          z-index: 5; pointer-events: none;
        }
        .jq-grid-line {
          position: relative; width: 1px; height: 100%;
          background: rgba(255, 255, 255, 0.12);
        }
        .jq-grid-line:nth-child(3) { margin-top: 70px; height: calc(100vh - 70px); }
        .jq-grid-dot {
          position: absolute; left: 50%;
          transform: translate(-50%, -50%);
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 900px) {
          .jq-slide-title { font-size: 64px; }
          .jq-cinematic-container { padding: 0 24px 24px 24px; }
          #jq-slide-1 .jq-slide-title { margin-left: 24px; }
          #jq-slide-1 .jq-col-1 { margin-left: 24px; width: calc(85vw); max-width: none; }
          #jq-slide-1 .jq-col-2 { display: none; }
          #jq-slide-2 .jq-slide-title { margin-left: 24px; }
          #jq-slide-2 .jq-slide-desc { margin-left: 24px; width: calc(85vw); }
          #jq-slide-3 { left: 24px; width: calc(85vw); }
          #jq-slide-4 { left: 24px; width: calc(85vw); }
          .jq-grid-lines { left: 16px; right: 16px; width: calc(100% - 32px); }
        }
      `}</style>

      {/* Two cursor divs */}
      <div className="jq-cursor-inner"></div>
      <div className="jq-cursor-outer"></div>

      {/* Cinematic container */}
      <div className="jq-cinematic-container">
        {/* Header */}
        <div className="flex justify-between items-center w-full z-20 pointer-events-auto py-5">
          <div className="flex flex-col">
            <div className="text-sm font-semibold tracking-[5px] uppercase text-white font-['Outfit']">
              Laocoön
            </div>
            <div className="text-[9px] tracking-[3px] uppercase text-[#C5A059] mt-0.5">
              Jorge Uquillas • Obra Única
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#slide-1" className="jq-nav-link text-white no-underline text-[10px] uppercase tracking-[2px] font-medium hover:text-[#C5A059] transition-colors">
              Bronze
            </a>
            <span className="w-[3px] h-[3px] bg-white/20 rounded-full"></span>
            <a href="#slide-2" className="jq-nav-link text-white no-underline text-[10px] uppercase tracking-[2px] font-medium hover:text-[#C5A059] transition-colors">
              Marble
            </a>
            <span className="w-[3px] h-[3px] bg-white/20 rounded-full"></span>
            <a href="#slide-3" className="jq-nav-link text-white no-underline text-[10px] uppercase tracking-[2px] font-medium hover:text-[#C5A059] transition-colors">
              Fluid
            </a>
            <span className="w-[3px] h-[3px] bg-white/20 rounded-full"></span>
            <a href="#slide-4" className="jq-nav-link text-white no-underline text-[10px] uppercase tracking-[2px] font-medium hover:text-[#C5A059] transition-colors">
              Digital
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/ringsluxury"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#C5A059] text-[10px] uppercase tracking-[2px] px-4 py-2 border border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-[#C5A059]/10 rounded-full transition-all"
              title="Instagram Oficial @ringsluxury"
            >
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">@ringsluxury</span>
            </a>

            <button
              onClick={onBackToAtelier}
              className="text-white text-[10px] uppercase tracking-[2px] px-4 py-2 border border-[#C5A059]/40 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-[#C5A059]/10 rounded-full transition-all"
            >
              ← Rings Luxury Atelier
            </button>

            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation('Jorge Uquillas: Laocoön — Bronze and Time');
                } else {
                  onBackToAtelier();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black no-underline text-[10px] uppercase tracking-[1px] font-semibold rounded-full hover:scale-105 hover:bg-[#f0f0f0] transition-all"
            >
              <span>Contact</span>
              <span className="inline-block w-1.5 h-1.5 border border-black rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Slide 1 */}
        <div className="jq-slide" id="jq-slide-1">
          <h2 className="jq-slide-title">
            Bronze <br />and Time
          </h2>
          <div className="jq-desc-row">
            <p className="jq-slide-desc jq-col-1">
              A timeless material holding centuries of human history. Fluid in hot flames, eternal in its form. Each curve captures a tense, dramatic moment.
            </p>
            <div className="jq-slide-desc jq-col-2 space-y-3">
              <p>
                Born of molten fire and creative will, it stands to bridge our ancient memory and modern vision. A fluid energy frozen in still, heavy bronze.
              </p>
              <a
                href="https://www.instagram.com/ringsluxury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-[#C5A059] hover:text-[#E6CA85] px-4 py-1.5 border border-[#C5A059]/30 hover:border-[#C5A059] rounded-full transition-all bg-black/40"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram: @ringsluxury</span>
              </a>
            </div>
          </div>
        </div>

        {/* Slide 2 Image Mask */}
        <div className="slide-image-mask" id="jq-slide-2-img">
          <img
            src={`${ASSET_BASE_URL}/1.png`}
            alt="Editorial Concept Jorge Uquillas"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Slide 2 */}
        <div className="jq-slide" id="jq-slide-2">
          <h2 className="jq-slide-title">
            Marble <br />Emotion
          </h2>
          <p className="jq-slide-desc">
            A sculpture frozen at the peak of human suffering and heroic struggle. Laocoön and his sons, bound by ruthless fate.
          </p>
        </div>

        {/* Slide 3 */}
        <div className="jq-slide" id="jq-slide-3">
          <h2 className="jq-slide-title">Liquid Metal</h2>
          <p className="jq-slide-desc">
            Art that breathes. Mesmerizing waves of liquid bronze flow through space, reflecting every contour and tensed muscle of the ancient masterpiece.
          </p>
        </div>

        {/* Slide 4 */}
        <div className="jq-slide" id="jq-slide-4">
          <h2 className="jq-slide-title">
            Eternal <br />Moment
          </h2>
          <p className="jq-slide-desc">
            Contemplating antique form through the lens of new dimensions. A classic masterpiece reborn in the currents of radiant digital matter.
          </p>
        </div>
      </div>

      {/* Grid horizontal divider */}
      <div className="jq-grid-horizontal-line"></div>

      {/* Grid lines & story progress */}
      <div className="jq-grid-lines">
        <div className="jq-grid-line">
          <div className="jq-grid-dot top"></div>
          <div className="jq-grid-dot bottom"></div>
        </div>
        <div className="jq-grid-line">
          <div className="jq-grid-dot top"></div>
          <div className="jq-grid-dot bottom"></div>
        </div>
        <div className="jq-grid-line">
          <div className="jq-grid-dot top"></div>
          <div className="jq-grid-dot bottom"></div>
        </div>
        <div className="jq-grid-line">
          <div className="jq-grid-dot top"></div>
          <div className="jq-grid-dot bottom"></div>
        </div>
        <div className="jq-grid-line story-progress-container">
          <div className="jq-grid-dot top"></div>
          <div className="jq-grid-dot bottom"></div>
          <div className="jq-story-dashes">
            <div className="jq-story-dash">
              <div className="jq-story-dash-fill" id="jq-dash-fill-1"></div>
            </div>
            <div className="jq-story-dash">
              <div className="jq-story-dash-fill" id="jq-dash-fill-2"></div>
            </div>
            <div className="jq-story-dash">
              <div className="jq-story-dash-fill" id="jq-dash-fill-3"></div>
            </div>
            <div className="jq-story-dash">
              <div className="jq-story-dash-fill" id="jq-dash-fill-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        id="webgl"
        className="fixed top-0 left-0 w-full h-full z-[1] outline-none"
      />
    </div>
  );
}
