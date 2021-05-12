AFRAME.registerComponent("minecraft-texture", {
  dependencies: ["material"],
  init: function () {
    // Different arm angles
    const topTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/top.png"
    );
    const bottomTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/bottom.png"
    );
    const frontTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/front.png"
    );
    const backTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/back.png"
    );
    const leftTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/left.png"
    );
    const rightTexture = new THREE.TextureLoader().load(
      "../assets/textures/arm/right.png"
    );

    const tempTexture = new THREE.TextureLoader().load(
      "../assets/textures/grass_block_side.png"
    );

    // magnifying filters
    topTexture.magFilter = THREE.NearestFilter;
    topTexture.minFilter = THREE.LinearMipMapLinearFilter;
    bottomTexture.magFilter = THREE.NearestFilter;
    bottomTexture.minFilter = THREE.LinearMipMapLinearFilter;
    frontTexture.magFilter = THREE.NearestFilter;
    frontTexture.minFilter = THREE.LinearMipMapLinearFilter;
    backTexture.magFilter = THREE.NearestFilter;
    backTexture.minFilter = THREE.LinearMipMapLinearFilter;
    leftTexture.magFilter = THREE.NearestFilter;
    leftTexture.minFilter = THREE.LinearMipMapLinearFilter;
    rightTexture.magFilter = THREE.NearestFilter;
    rightTexture.minFilter = THREE.LinearMipMapLinearFilter;

    // immediately use the texture for material creation
    const topMaterial = new THREE.MeshStandardMaterial({
      map: topTexture,
    });
    const bottomMaterial = new THREE.MeshStandardMaterial({
      map: bottomTexture,
    });
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
    });
    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
    });
    const leftMaterial = new THREE.MeshStandardMaterial({
      map: leftTexture,
    });
    const rightMaterial = new THREE.MeshStandardMaterial({
      map: rightTexture,
    });

    const materials = [
      rightMaterial,
      leftMaterial,
      frontMaterial,
      backMaterial,
      topMaterial,
      bottomMaterial,
    ];
    this.el.getOrCreateObject3D("mesh").material = materials;
    // console.log(this.el.getObject3D("mesh").geometry.faces);
  },
});
