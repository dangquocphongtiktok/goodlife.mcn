/**
 * Goodlife Media - Master 3D WebGL Scene & Lighting Manager
 * Hosts: Chuỗi Xoắn Kép DNA Ánh Sáng (The Goodlife DNA Helix) & Thấu Kính Đa Giác Quan (Sensory Optical Lens)
 */

class BuildingScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.hoveredNodeIndex = null;
    this.activeNodeIndex = null;

    this.initScene();
    this.initLights();
    this.createGlowingPedestal();

    // Initialize DNA Helix Scene
    this.dnaScene = new DnaScene(this.scene, this.camera);
    this.activeModel = this.dnaScene;
    this.activeMode = 'dna';

    this.setupResizeHandler();
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Deep medical biotech space fog (#030E1A)
    this.scene.fog = new THREE.FogExp2(0x030e1a, 0.024);

    const isMobile = window.innerWidth < 768;
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);

    // Dynamic isometric golden viewing perspective for the vertical DNA helix
    // On mobile, position camera slightly further back so helix and all 4 nodes fit comfortably
    this.initialCameraPos = isMobile
      ? new THREE.Vector3(2.4, 0.3, 11.2)
      : new THREE.Vector3(3.2, 0.6, 9.2);
    this.camera.position.copy(this.initialCameraPos);

    this.initialTarget = new THREE.Vector3(0, 0, 0);
    this.cameraTarget = this.initialTarget.clone();
    this.camera.lookAt(this.cameraTarget);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.renderer.domElement.setAttribute('role', 'img');
    this.renderer.domElement.setAttribute(
      'aria-label',
      'Mô hình 3D tương tác kiến trúc xoắn ốc DNA đại diện cho 4 trụ cột truyền thông y khoa: Giới thiệu Goodlife Media, Dịch vụ xây kênh TikTok bác sĩ và phòng khám, Sensory Design thiết kế phòng khám và FAQ.'
    );

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // Ambient light - deep ocean navy mood
    const ambientLight = new THREE.AmbientLight(0x061e36, 1.8);
    this.scene.add(ambientLight);

    // Key directional light (cool white clinical glow)
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    keyLight.position.set(8, 14, 12);
    this.scene.add(keyLight);

    // Rim light 1: Medical Cyan (#38BDF8)
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.4);
    cyanRim.position.set(-10, 6, -8);
    this.scene.add(cyanRim);

    // Rim light 2: Emerald / Teal (#00A896)
    const tealRim = new THREE.DirectionalLight(0x00a896, 2.0);
    tealRim.position.set(8, -6, -6);
    this.scene.add(tealRim);

    // Central bio-luminescence uplight
    const underGlow = new THREE.PointLight(0x38bdf8, 2.8, 14);
    underGlow.position.set(0, -4.2, 0);
    this.scene.add(underGlow);
  }

  createGlowingPedestal() {
    this.pedestalGroup = new THREE.Group();
    this.pedestalGroup.position.set(0, -4.3, 0);

    // Dark titanium metallic base disc
    const baseGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.18, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x051528,
      metalness: 0.9,
      roughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    this.pedestalGroup.add(baseMesh);

    // Concentric glowing rings on the pedestal
    const ringRadii = [2.6, 2.0, 1.4, 0.8];
    const ringColors = [0x00a896, 0x38bdf8, 0x10b981, 0x38bdf8];
    this.pedestalRings = [];

    ringRadii.forEach((r, i) => {
      const ringGeo = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65 - i * 0.1
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.1 + i * 0.003;
      this.pedestalGroup.add(ringMesh);
      this.pedestalRings.push(ringMesh);
    });

    this.scene.add(this.pedestalGroup);
  }



  get interactiveMeshes() {
    return this.activeModel ? this.activeModel.interactiveMeshes : [];
  }

  get labelAnchors() {
    return this.activeModel ? this.activeModel.labelAnchors : [];
  }

  // Hover node on active 3D model
  setHoverFloor(nodeIndex) {
    this.hoveredNodeIndex = nodeIndex;
    if (this.activeModel && this.activeModel.setHoverNode) {
      this.activeModel.setHoverNode(nodeIndex);
    }
  }

  setupResizeHandler() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const isMobile = width < 768;
      this.initialCameraPos.set(
        isMobile ? 2.4 : 3.2,
        isMobile ? 0.3 : 0.6,
        isMobile ? 11.2 : 9.2
      );
    });
  }

  update(time, delta) {
    // Pulse pedestal rings
    if (this.pedestalRings) {
      this.pedestalRings.forEach((ring, idx) => {
        ring.material.opacity = (0.45 + Math.sin(time * 2.0 + idx * 0.9) * 0.2) * (0.8 - idx * 0.1);
      });
    }

    // Update active 3D model
    if (this.activeModel && this.activeModel.update) {
      this.activeModel.update(time, delta);
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
