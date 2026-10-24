/**
 * Goodlife Media - Camera Controller & Interactive Raycaster (GSAP + Three.js)
 */

class CameraController {
  constructor(buildingScene, onFloorSelect, onFloorHover) {
    this.bs = buildingScene;
    this.camera = buildingScene.camera;
    this.onFloorSelect = onFloorSelect;
    this.onFloorHover = onFloorHover;

    // Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    // Camera State
    this.mode = 'overview'; // 'overview' | 'focused'
    this.activeFloorIndex = null;

    // Parallax & Orbit Drag
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.hasMovedSignificantly = false;

    // Rotation angles (Spherical coordinates approximation matching initialCameraPos)
    const initRadius = this.bs.initialCameraPos.length();
    const initTheta = Math.atan2(this.bs.initialCameraPos.x, this.bs.initialCameraPos.z);
    const initPhi = Math.acos(this.bs.initialCameraPos.y / initRadius);

    this.orbitAngle = {
      theta: initTheta,
      phi: initPhi,
      radius: initRadius
    };
    this.targetOrbitAngle = { ...this.orbitAngle };

    // Mouse parallax offsets
    this.parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.setupEventListeners();
  }

  setupEventListeners() {
    const dom = this.bs.renderer.domElement;

    // Pointer Move: Parallax + Raycasting + Drag
    window.addEventListener('pointermove', (e) => {
      // Screen space [-1, 1] for raycasting
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Mouse Parallax target
      this.parallax.targetX = (e.clientX / window.innerWidth - 0.5) * 0.7;
      this.parallax.targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;

      if (this.isDragging) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;

        if (Math.hypot(dx, dy) > 4) {
          this.hasMovedSignificantly = true;
        }

        // Adjust orbit angles
        this.targetOrbitAngle.theta -= dx * 0.0055;
        this.targetOrbitAngle.phi = Math.max(0.35, Math.min(1.45, this.targetOrbitAngle.phi - dy * 0.004));

        this.dragStart = { x: e.clientX, y: e.clientY };
      } else {
        // Only raycast hover if not dragging
        this.checkRaycastHover();
      }
    });

    // Pointer Down: Start drag
    dom.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.hasMovedSignificantly = false;
      this.dragStart = { x: e.clientX, y: e.clientY };
    });

    // Pointer Up: Finish drag or trigger click
    window.addEventListener('pointerup', (e) => {
      if (this.isDragging && !this.hasMovedSignificantly) {
        this.checkRaycastClick();
      }
      this.isDragging = false;
    });

    // Wheel zoom
    dom.addEventListener('wheel', (e) => {
      if (this.mode === 'overview') {
        this.targetOrbitAngle.radius = Math.max(7.5, Math.min(15, this.targetOrbitAngle.radius + e.deltaY * 0.008));
      }
    }, { passive: true });
  }

  checkRaycastHover() {
    const targets = this.bs.interactiveMeshes;
    if (!targets || targets.length === 0) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const nodeIdx = intersects[0].object.userData.nodeIndex;
      document.body.style.cursor = 'pointer';
      if (this.onFloorHover) this.onFloorHover(nodeIdx);
    } else {
      document.body.style.cursor = 'default';
      if (this.onFloorHover) this.onFloorHover(null);
    }
  }

  checkRaycastClick() {
    const targets = this.bs.interactiveMeshes;
    if (!targets || targets.length === 0) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const nodeIdx = intersects[0].object.userData.nodeIndex;
      if (this.onFloorSelect) this.onFloorSelect(nodeIdx);
    }
  }

  // Smooth GSAP Dolly Zoom to Focused DNA Node or Optical Ring
  focusFloor(nodeIndex) {
    this.mode = 'focused';
    this.activeFloorIndex = nodeIndex;
    this.bs.activeNodeIndex = nodeIndex;

    const nodeData = NODES_DATA[nodeIndex];
    const targetY = nodeData.cameraTarget.y;
    const shiftX = nodeData.cameraTarget.shiftX; // Shifts DNA helix to the left

    // 1. Rotate DNA model so the selected node aligns nicely with front view
    if (this.bs.activeMode === 'dna' && this.bs.dnaScene && this.bs.dnaScene.group) {
      gsap.killTweensOf(this.bs.dnaScene.group.rotation);
      // Align target node towards front
      gsap.to(this.bs.dnaScene.group.rotation, {
        y: Math.PI * 0.15,
        duration: 1.0,
        ease: "power2.out"
      });
    }

    // 2. Camera target lookAt point
    const newLookTarget = new THREE.Vector3(shiftX, targetY, 0);

    // 3. Camera position close-up dolly
    const newCamPos = new THREE.Vector3(
      shiftX + 2.8,
      targetY + 0.35,
      4.8
    );

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.bs.cameraTarget);

    gsap.to(this.bs.cameraTarget, {
      x: newLookTarget.x,
      y: newLookTarget.y,
      z: newLookTarget.z,
      duration: 1.2,
      ease: "power3.inOut"
    });

    gsap.to(this.camera.position, {
      x: newCamPos.x,
      y: newCamPos.y,
      z: newCamPos.z,
      duration: 1.3,
      ease: "power3.inOut",
      onUpdate: () => {
        this.camera.lookAt(this.bs.cameraTarget);
      }
    });
  }

  // Smooth GSAP Return to Full Overview
  resetToOverview() {
    this.mode = 'overview';
    this.activeFloorIndex = null;
    this.bs.activeNodeIndex = null;
    this.bs.setHoverFloor(null);

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.bs.cameraTarget);

    // Reset orbit angles to initial
    const initRadius = this.bs.initialCameraPos.length();
    const initTheta = Math.atan2(this.bs.initialCameraPos.x, this.bs.initialCameraPos.z);
    const initPhi = Math.acos(this.bs.initialCameraPos.y / initRadius);

    this.targetOrbitAngle.theta = initTheta;
    this.targetOrbitAngle.phi = initPhi;
    this.targetOrbitAngle.radius = initRadius;
    this.orbitAngle = { ...this.targetOrbitAngle };

    gsap.to(this.bs.cameraTarget, {
      x: this.bs.initialTarget.x,
      y: this.bs.initialTarget.y,
      z: this.bs.initialTarget.z,
      duration: 1.2,
      ease: "power3.inOut"
    });

    gsap.to(this.camera.position, {
      x: this.bs.initialCameraPos.x,
      y: this.bs.initialCameraPos.y,
      z: this.bs.initialCameraPos.z,
      duration: 1.3,
      ease: "power3.inOut",
      onUpdate: () => {
        this.camera.lookAt(this.bs.cameraTarget);
      }
    });
  }

  update() {
    // Smooth lerp for parallax
    this.parallax.x += (this.parallax.targetX - this.parallax.x) * 0.05;
    this.parallax.y += (this.parallax.targetY - this.parallax.y) * 0.05;

    if (this.mode === 'overview') {
      // Lerp orbit angles
      this.orbitAngle.theta += (this.targetOrbitAngle.theta - this.orbitAngle.theta) * 0.08;
      this.orbitAngle.phi += (this.targetOrbitAngle.phi - this.orbitAngle.phi) * 0.08;
      this.orbitAngle.radius += (this.targetOrbitAngle.radius - this.orbitAngle.radius) * 0.08;

      // Calculate camera position on sphere
      const theta = this.orbitAngle.theta + this.parallax.x * 0.2;
      const phi = this.orbitAngle.phi - this.parallax.y * 0.15;
      const r = this.orbitAngle.radius;

      const x = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.cos(theta);

      if (!gsap.isTweening(this.camera.position)) {
        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.bs.cameraTarget);
      }
    } else {
      if (!gsap.isTweening(this.camera.position)) {
        this.camera.lookAt(this.bs.cameraTarget);
      }
    }
  }
}
