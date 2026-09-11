import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface WebGLCanvasProps {
  interactive?: boolean;
  artifactType?: 'ring' | 'medallion' | 'torque';
}

export function WebGLCanvas({ interactive = true, artifactType = 'ring' }: WebGLCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [lightingMode, setLightingMode] = useState<'candle' | 'spotlight' | 'moonlight'>('candle');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020202, 0.045);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Group for the 3D artifact
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Luxury Antique Gold Material
    // We create procedural procedural normal/bump maps via canvas
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 256;
    canvasTexture.height = 256;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const radius = Math.random() * 2;
        const shade = Math.floor(Math.random() * 60 + 100);
        ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const bumpMap = new THREE.CanvasTexture(canvasTexture);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(4, 4);

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.95,
      bumpMap: bumpMap,
      bumpScale: 0.015,
    });

    const obsidianMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.12,
      metalness: 0.2,
    });

    // Build the 3D sculptural high-jewelry artifact
    let mainMesh: THREE.Object3D;

    if (artifactType === 'ring') {
      // Sculpted Signet Ring: Torus band + Bezel + Intaglio Gem
      const ringGroup = new THREE.Group();

      // Band
      const bandGeo = new THREE.TorusGeometry(1.6, 0.38, 36, 100);
      const bandMesh = new THREE.Mesh(bandGeo, goldMaterial);
      ringGroup.add(bandMesh);

      // Bezel setting (Ancient signet top)
      const bezelGeo = new THREE.CylinderGeometry(0.85, 0.7, 0.5, 32);
      const bezelMesh = new THREE.Mesh(bezelGeo, goldMaterial);
      bezelMesh.position.set(0, 1.75, 0);
      ringGroup.add(bezelMesh);

      // Intaglio Obsidian Stone
      const stoneGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.2, 32);
      const stoneMesh = new THREE.Mesh(stoneGeo, obsidianMaterial);
      stoneMesh.position.set(0, 1.95, 0);
      ringGroup.add(stoneMesh);

      // Acanthus decorative side leaves
      for (let i = -1; i <= 1; i += 2) {
        const leafGeo = new THREE.ConeGeometry(0.28, 0.9, 16);
        const leafMesh = new THREE.Mesh(leafGeo, goldMaterial);
        leafMesh.position.set(i * 1.45, 1.1, 0);
        leafMesh.rotation.z = -i * 0.75;
        ringGroup.add(leafMesh);
      }

      mainMesh = ringGroup;
    } else {
      // Classical Medallion
      const medGroup = new THREE.Group();
      const outerRimGeo = new THREE.TorusGeometry(1.8, 0.15, 24, 80);
      const rimMesh = new THREE.Mesh(outerRimGeo, goldMaterial);
      medGroup.add(rimMesh);

      const discGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.12, 48);
      discGeo.rotateX(Math.PI / 2);
      const discMesh = new THREE.Mesh(discGeo, goldMaterial);
      medGroup.add(discMesh);

      mainMesh = medGroup;
    }

    artifactGroup.add(mainMesh);
    artifactGroup.position.set(0, 0, 0);
    artifactGroup.rotation.x = 0.3;

    // Distant classical columns in deep shadows
    const columnsGroup = new THREE.Group();
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x090909,
      roughness: 0.85,
      metalness: 0.1,
    });
    [-5.5, 5.5].forEach((xPos) => {
      const colGeo = new THREE.CylinderGeometry(0.75, 0.85, 12, 24);
      const colMesh = new THREE.Mesh(colGeo, columnMat);
      colMesh.position.set(xPos, 0, -4);
      columnsGroup.add(colMesh);

      // Capital
      const capGeo = new THREE.BoxGeometry(2, 0.8, 2);
      const capMesh = new THREE.Mesh(capGeo, columnMat);
      capMesh.position.set(xPos, 5.5, -4);
      columnsGroup.add(capMesh);
    });
    scene.add(columnsGroup);

    // Floating Golden Dust Motes / Temple Embers
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: Math.random() * 0.004 + 0.001,
        z: (Math.random() - 0.5) * 0.003,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe6ca85,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Cinematic Lighting
    // Ambient light - very faint, pure aristocrat black mood
    const ambientLight = new THREE.AmbientLight(0x1a1610, 0.45);
    scene.add(ambientLight);

    // Golden key light (candle/beam)
    const keyLight = new THREE.PointLight(0xffdf99, 4.5, 14);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Subtle cool rim light for obsidian edge definition
    const rimLight = new THREE.DirectionalLight(0x405566, 0.8);
    rimLight.position.set(-5, 2, -3);
    scene.add(rimLight);

    // Interactive pointer tracker
    const targetRotation = { x: 0.3, y: 0 };
    const currentRotation = { x: 0.3, y: 0 };
    const mouseLightTarget = { x: 3, y: 4 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotation.y = normX * 0.9;
      targetRotation.x = 0.3 - normY * 0.6;

      mouseLightTarget.x = normX * 5;
      mouseLightTarget.y = normY * 4 + 2;
    };

    if (interactive) {
      window.addEventListener('mousemove', handlePointerMove);
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.04;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.04;

      // Constant slow majestic drift
      artifactGroup.rotation.y = currentRotation.y + Math.sin(elapsedTime * 0.25) * 0.15;
      artifactGroup.rotation.x = currentRotation.x + Math.cos(elapsedTime * 0.2) * 0.08;
      artifactGroup.position.y = Math.sin(elapsedTime * 0.45) * 0.12;

      // Light reacts smoothly
      keyLight.position.x += (mouseLightTarget.x - keyLight.position.x) * 0.05;
      keyLight.position.y += (mouseLightTarget.y - keyLight.position.y) * 0.05;

      // Update particle drift
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += particleVelocities[i].y;
        posArray[i * 3] += particleVelocities[i].x;

        // Wrap around
        if (posArray[i * 3 + 1] > 6) {
          posArray[i * 3 + 1] = -6;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      goldMaterial.dispose();
      obsidianMaterial.dispose();
      bumpMap.dispose();
    };
  }, [interactive, artifactType]);

  return (
    <div
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={containerRef} className="w-full h-full" />

      {/* Subtle WebGL interactive badge */}
      <div className="absolute bottom-6 right-6 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#050505]/80 border border-[#C5A059]/20 text-[10px] uppercase tracking-[0.25em] text-[#C5A059]/80 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
        WebGL 3D Sculpture • Pan to inspect
      </div>
    </div>
  );
}
