/**
 * Goodlife Media - 3D DNA Helix (The Goodlife DNA Helix & 4 Grand Crystal Nodes)
 */

class DnaScene {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.grandNodes = [];       // 4 Grand Crystal Menu Nodes
    this.interactiveMeshes = []; // Raycast hitboxes
    this.labelAnchors = [];     // 3D Anchors for floating 2D HTML labels
    this.strandSpheres = [];    // Spheres along the two helical strands
    this.rungs = [];            // Base pair connector rungs
    this.bioParticles = null;
    this.hoveredNodeIdx = null;
    this.activeNodeIdx = null;

    // Pulse Wave state
    this.pulseWave = {
      active: false,
      originY: 0,
      radius: 0,
      speed: 8.0,
      color: new THREE.Color(0x38bdf8)
    };

    this.buildDnaHelix();
    this.buildGrandCrystalNodes();
    this.buildBioParticleField();
  }

  buildDnaHelix() {
    const helixRadius = 1.35;
    const height = 7.6;
    const turns = 2.5; // Number of full helical revolutions
    const steps = 72;  // Points along each helix
    const yStart = -height / 2;
    const yStep = height / steps;
    const angleStep = (turns * Math.PI * 2) / steps;

    // Shared glowing glass sphere geometry & material for strands
    const sphereGeo = new THREE.SphereGeometry(0.095, 16, 16);
    const strandMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3
    });
    const strandMat2 = new THREE.MeshStandardMaterial({
      color: 0x00a896,
      emissive: 0x00a896,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.3
    });

    const pointsStrand1 = [];
    const pointsStrand2 = [];

    for (let i = 0; i <= steps; i++) {
      const angle = i * angleStep;
      const y = yStart + i * yStep;

      // Strand 1 position
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const p1 = new THREE.Vector3(x1, y, z1);
      pointsStrand1.push(p1);

      const sphereMesh1 = new THREE.Mesh(sphereGeo, strandMat1.clone());
      sphereMesh1.position.copy(p1);
      sphereMesh1.userData = { baseY: y, baseIntensity: 0.6 };
      this.group.add(sphereMesh1);
      this.strandSpheres.push(sphereMesh1);

      // Strand 2 position (180 deg offset)
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      const p2 = new THREE.Vector3(x2, y, z2);
      pointsStrand2.push(p2);

      const sphereMesh2 = new THREE.Mesh(sphereGeo, strandMat2.clone());
      sphereMesh2.position.copy(p2);
      sphereMesh2.userData = { baseY: y, baseIntensity: 0.6 };
      this.group.add(sphereMesh2);
      this.strandSpheres.push(sphereMesh2);

      // Base Pair Rungs connecting Strand 1 and Strand 2 (every 2 steps)
      if (i % 2 === 0) {
        const rungDistance = p1.distanceTo(p2);
        const rungGeo = new THREE.CylinderGeometry(0.022, 0.022, rungDistance, 8);
        const rungMat = new THREE.MeshStandardMaterial({
          color: 0x0c2c4d,
          emissive: (i % 4 === 0) ? 0x38bdf8 : 0x00a896,
          emissiveIntensity: 0.45,
          transparent: true,
          opacity: 0.85,
          roughness: 0.2
        });

        const rungMesh = new THREE.Mesh(rungGeo, rungMat);
        // Position at midpoint
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        rungMesh.position.copy(midPoint);

        // Orient cylinder along p1 -> p2
        rungMesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(p2, p1).normalize()
        );

        rungMesh.userData = { baseY: y, baseIntensity: 0.45 };
        this.group.add(rungMesh);
        this.rungs.push(rungMesh);
      }
    }

    // Continuous fiber-optic glowing spline tubes along both strands
    const curve1 = new THREE.CatmullRomCurve3(pointsStrand1);
    const tubeGeo1 = new THREE.TubeGeometry(curve1, 120, 0.042, 8, false);
    const tubeMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85
    });
    this.group.add(new THREE.Mesh(tubeGeo1, tubeMat1));

    const curve2 = new THREE.CatmullRomCurve3(pointsStrand2);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 120, 0.042, 8, false);
    const tubeMat2 = new THREE.MeshBasicMaterial({
      color: 0x00a896,
      transparent: true,
      opacity: 0.85
    });
    this.group.add(new THREE.Mesh(tubeGeo2, tubeMat2));
  }

  buildGrandCrystalNodes() {
    // 4 Grand Nodes aligned with the 4 Menu categories:
    // Node 04: Base (y = -2.4), Emerald #10B981
    // Node 03: Lower (y = -0.8), Amber Gold #F59E0B
    // Node 02: Upper (y = 0.8), Teal #00A896
    // Node 01: Top (y = 2.5), Cyan #38BDF8
    const nodeConfigs = [
      { nodeIdx: 0, y: -2.4, color: 0x10b981, dataIdx: 0, title: "04. FAQ & Tư vấn" },
      { nodeIdx: 1, y: -0.8, color: 0xf59e0b, dataIdx: 1, title: "03. Sensory Design" },
      { nodeIdx: 2, y: 0.8, color: 0x00a896, dataIdx: 2, title: "02. Dịch vụ & Báo giá" },
      { nodeIdx: 3, y: 2.5, color: 0x38bdf8, dataIdx: 3, title: "01. Giới thiệu" }
    ];

    nodeConfigs.forEach((cfg) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(0, cfg.y, 0);

      // 1. Inner Faceted Crystal Gem (Rotating octahedron / icosahedron)
      const coreGeo = new THREE.OctahedronGeometry(0.32, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 1.4,
        roughness: 0.1,
        metalness: 0.85,
        wireframe: false
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      nodeGroup.add(coreMesh);

      // 2. Outer Luxury Translucent Glass Sphere
      const glassGeo = new THREE.SphereGeometry(0.56, 32, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
        metalness: 0.15,
        roughness: 0.1,
        transparent: true,
        opacity: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      nodeGroup.add(glassMesh);

      // 3. Orbital Luminous Rings around the node
      const ringGeo = new THREE.TorusGeometry(0.74, 0.016, 12, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.75
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      nodeGroup.add(ring1);

      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 4;
      nodeGroup.add(ring2);

      // 4. Dedicated PointLight emitting bioluminescent glow
      const pointLight = new THREE.PointLight(cfg.color, 2.4, 5.5);
      nodeGroup.add(pointLight);

      // 5. Invisible Raycast Hitbox
      const hitGeo = new THREE.SphereGeometry(0.9, 16, 16);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { nodeIndex: cfg.nodeIdx, parentGroup: nodeGroup };
      nodeGroup.add(hitMesh);
      this.interactiveMeshes.push(hitMesh);

      // 6. Floating Label Anchor (offset to right for smooth SVG connector linking)
      const anchor = new THREE.Object3D();
      anchor.position.set(1.4, 0, 0);
      nodeGroup.add(anchor);
      this.labelAnchors.push(anchor);

      nodeGroup.userData = {
        nodeIdx: cfg.nodeIdx,
        baseY: cfg.y,
        color: cfg.color,
        coreMesh: coreMesh,
        glassMesh: glassMesh,
        ring1: ring1,
        ring2: ring2,
        pointLight: pointLight,
        baseScale: 1.0
      };

      this.group.add(nodeGroup);
      this.grandNodes.push(nodeGroup);
    });
  }

  buildBioParticleField() {
    const count = 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const palette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0x00a896), // Teal
      new THREE.Color(0xf59e0b), // Amber
      new THREE.Color(0x10b981)  // Emerald
    ];

    for (let i = 0; i < count; i++) {
      // Swirling cylinder around DNA
      const radius = 1.4 + Math.random() * 3.6;
      const angle = Math.random() * Math.PI * 2;
      const y = -4.2 + Math.random() * 8.4;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = 0.05 + Math.random() * 0.08;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.bioParticles = new THREE.Points(geometry, material);
    this.scene.add(this.bioParticles);
  }

  // Trigger Hover on Grand Node
  setHoverNode(nodeIdx) {
    if (this.hoveredNodeIdx === nodeIdx) return;
    this.hoveredNodeIdx = nodeIdx;

    this.grandNodes.forEach((node, idx) => {
      const isTarget = (idx === nodeIdx);
      const isCurrentActive = (idx === this.activeNodeIdx);

      if (nodeIdx !== null) {
        if (isTarget) {
          // Scale up target node
          gsap.to(node.scale, {
            x: 1.28,
            y: 1.28,
            z: 1.28,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
          // Supercharge inner gem emissive
          gsap.to(node.userData.coreMesh.material, {
            emissiveIntensity: 3.2,
            duration: 0.3
          });
          // Supercharge point light
          gsap.to(node.userData.pointLight, {
            intensity: 4.5,
            duration: 0.3
          });
          gsap.to(node.userData.glassMesh.material, {
            emissiveIntensity: 0.65,
            duration: 0.3
          });

          // Trigger Pulse Wave traversing the DNA
          this.triggerPulseWave(node.userData.baseY, node.userData.color);
        } else {
          // Reset other nodes and gently dim
          gsap.to(node.scale, {
            x: isCurrentActive ? 1.2 : 0.92,
            y: isCurrentActive ? 1.2 : 0.92,
            z: isCurrentActive ? 1.2 : 0.92,
            duration: 0.4,
            ease: "power2.out"
          });
          gsap.to(node.userData.coreMesh.material, {
            emissiveIntensity: isCurrentActive ? 2.5 : 0.5,
            duration: 0.3
          });
          gsap.to(node.userData.pointLight, {
            intensity: isCurrentActive ? 3.5 : 0.8,
            duration: 0.3
          });
        }
      } else {
        // Clear hover: return to normal state
        gsap.to(node.scale, {
          x: isCurrentActive ? 1.2 : 1.0,
          y: isCurrentActive ? 1.2 : 1.0,
          z: isCurrentActive ? 1.2 : 1.0,
          duration: 0.45,
          ease: "power2.out"
        });
        gsap.to(node.userData.coreMesh.material, {
          emissiveIntensity: isCurrentActive ? 2.5 : 1.4,
          duration: 0.4
        });
        gsap.to(node.userData.pointLight, {
          intensity: isCurrentActive ? 3.5 : 2.4,
          duration: 0.4
        });
        gsap.to(node.userData.glassMesh.material, {
          emissiveIntensity: 0.25,
          duration: 0.4
        });
      }
    });
  }

  triggerPulseWave(originY, colorHex) {
    this.pulseWave.active = true;
    this.pulseWave.originY = originY;
    this.pulseWave.radius = 0;
    this.pulseWave.color.setHex(colorHex);
  }

  update(time, delta) {
    // 1. Continuous smooth idle rotation of DNA helix
    if (this.group) {
      this.group.rotation.y += delta * 0.22;
    }

    // 2. Slow swirling of bio-particles
    if (this.bioParticles) {
      this.bioParticles.rotation.y -= delta * 0.08;
    }

    // 3. Animate each Grand Node's internal gem and orbital rings
    this.grandNodes.forEach((node, i) => {
      if (node.userData.coreMesh) {
        node.userData.coreMesh.rotation.y += delta * 1.2;
        node.userData.coreMesh.rotation.x += delta * 0.8;
      }
      if (node.userData.ring1) {
        node.userData.ring1.rotation.z += delta * 1.5;
      }
      if (node.userData.ring2) {
        node.userData.ring2.rotation.z -= delta * 1.2;
      }
    });

    // 4. Update pulse wave propagation along the DNA backbone
    if (this.pulseWave.active) {
      this.pulseWave.radius += delta * this.pulseWave.speed;

      this.strandSpheres.forEach((sphere) => {
        const dist = Math.abs(sphere.userData.baseY - this.pulseWave.originY);
        const waveDist = Math.abs(dist - this.pulseWave.radius);

        if (waveDist < 0.6) {
          const factor = 1.0 - (waveDist / 0.6);
          sphere.material.emissiveIntensity = sphere.userData.baseIntensity + factor * 2.2;
          sphere.scale.setScalar(1.0 + factor * 0.4);
        } else {
          sphere.material.emissiveIntensity = sphere.userData.baseIntensity;
          sphere.scale.setScalar(1.0);
        }
      });

      if (this.pulseWave.radius > 5.5) {
        this.pulseWave.active = false;
      }
    }
  }
}
