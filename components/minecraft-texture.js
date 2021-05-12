AFRAME.registerComponent("minecraft-texture", {
  dependencies: ["material"],
  init: function () {
    // Do something when component first attached.
    const topTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm.png"
    );
    const sideTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm.png"
    );
    topTexture.magFilter = THREE.NearestFilter;
    topTexture.minFilter = THREE.LinearMipMapLinearFilter;
    sideTexture.magFilter = THREE.NearestFilter;
    sideTexture.minFilter = THREE.LinearMipMapLinearFilter;
    // immediately use the texture for material creation
    const topMaterial = new THREE.MeshStandardMaterial({
      map: topTexture,
      color: "#99FF99",
    });
    const sideMaterial = new THREE.MeshStandardMaterial({
      map: sideTexture,
    });
    const materials = [
      sideMaterial,
      sideMaterial,
      topMaterial,
      sideMaterial,
      sideMaterial,
      sideMaterial,
    ];
    this.el.getOrCreateObject3D("mesh").material = materials;
    // console.log(this.el.getObject3D("mesh").geometry.faces);
  },
});
