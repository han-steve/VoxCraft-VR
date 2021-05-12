AFRAME.registerComponent("minecraft-texture", {
  dependencies: ["material"],
  init: function () {
    // Do something when component first attached.
    const texture = new THREE.TextureLoader().load(
      "../assets/textures/cursor.png"
    );
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    // immediately use the texture for material creation
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
      transparent: true,
    });
    this.el.setObject3D("mesh").material = material;
  },
});
