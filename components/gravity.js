AFRAME.registerComponent("gravity", {
  schema: {},
  init: function () {
    this.cellSize = 32;
    this.rotation = this.el.sceneEl.querySelector("#camera").object3D.rotation;
  },
  update: function () {},

  // check for the voxel beneath our feet and adjust height
  tick: function () {
    let xPos = this.el.object3D.position.x;
    let yPos = this.el.object3D.position.y;
    let zPos = this.el.object3D.position.z;
    
    let cellUnder = document.world.getVoxel(xPos, yPos - 2 + 20, zPos);

    if (cellUnder == 0) {
      this.el.object3D.position.y -= 0.1;
    }
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});
