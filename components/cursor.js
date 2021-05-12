AFRAME.registerComponent("crawling-cursor", {
  dependencies: ["raycaster"],
  init: function () {
    // Do something when component first attached.
    this.el.addEventListener("raycaster-intersection", (event) => {
      this.raycaster = this.el.components.raycaster;
    });
    this.el.addEventListener("raycaster-intersected-cleared", (evt) => {
      this.raycaster = null;
    });
    this.cursor = this.el.sceneEl.querySelector("#cursor");
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    if (!this.raycaster || this.raycaster.intersections.length === 0) return;
    let pos = this.raycaster.intersections[0].point;
    let normal = this.raycaster.intersections[0].face.normal;
    this.cursor.object3D.position.set(
      pos.x + normal.x * 0.05,
      pos.y + normal.y * 0.05,
      pos.z + normal.z * 0.05
    );
    // this.cursor.object3D.position.set(pos.x, pos.y, pos.z);
    console.log(normal);
    if (normal.x === 1 || normal.x === -1)
      this.cursor.object3D.rotation.set(0, Math.PI / 2, 0);
    else if (normal.y === 1 || normal.y === -1)
      this.cursor.object3D.rotation.set(Math.PI / 2, 0, 0);
    else this.cursor.object3D.rotation.set(0, 0, 0);
  },
});
