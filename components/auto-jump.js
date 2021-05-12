AFRAME.registerComponent("auto-jump", {
  schema: {},
  init: function () {
    this.cellTrans = 20;
    this.angle = this.el.sceneEl.querySelector("#camera").object3D.rotation.y;
    this.jumpingAnimation = 0;
    this.prevX = 0;
    this.prevZ = 0;
  },
  update: function () {},

  // do we need to jump up a block?
  tick: function () {
    if (this.jumpingAnimation >= 1) {
      this.jumpingAnimation = 0;
    } else if (this.jumpingAnimation > 0) {
      this.el.object3D.position.y = this.el.object3D.position.y + 0.1;
      this.jumpingAnimation += 0.1;
      return;
    }

    // camera positions
    let xPos = this.el.object3D.position.x;
    let yPos = this.el.object3D.position.y;
    let zPos = this.el.object3D.position.z;
    let topY = yPos - 0.5 + this.cellTrans;

    // the two voxels immediately in front of us
    let bottomVox = document.world.getVoxel(xPos, topY - 1, zPos);
    let topVox = document.world.getVoxel(xPos, topY, zPos);

    if (topVox == 0 && bottomVox != 0) {
      // do a lil jump! Start animation.
      this.el.object3D.position.y = Math.round(this.el.object3D.position.y);
      this.jumpingAnimation = 0.1;
    } else if (topVox != 0 && bottomVox != 0) {
      // don't run through the block
      this.el.object3D.position.x = this.prevX;
      this.el.object3D.position.z = this.prevZ;
      xPos = this.prevX;
      zPos = this.prevZ;
    }
    this.prevX = xPos;
    this.prevZ = zPos;
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});
