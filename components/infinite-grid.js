AFRAME.registerComponent("infinite-grid", {
  dependencies: ["position"],
  schema: {
    // currentGridX: { default: 0 },
    // currentGridZ: { default: 0 },
    cellSize: { default: 32 },
  },

  init: function () {
    // this.camera = this.el.sceneEl.querySelector("#camera-rig")
    this.pos = this.el.sceneEl.querySelector("#camera-rig").object3D.position;
    this.xMin = -this.data.cellSize / 2;
    this.xMax = this.data.cellSize / 2;
    this.zMin = -this.data.cellSize / 2;
    this.zMax = this.data.cellSize / 2;

    this.updateCenterCell.bind(this);
  },

  tick: function (time, timeDelta) {
    if (this.pos.x < this.xMin) {
      this.xMin -= this.data.cellSize;
      this.xMax -= this.data.cellSize;
      this.updateCenterCell();
    } else if (this.pos.x > this.xMax) {
      this.xMin += this.data.cellSize;
      this.xMax += this.data.cellSize;
      this.updateCenterCell();
    }
    if (this.pos.z < this.zMin) {
      this.zMin -= this.data.cellSize;
      this.zMax -= this.data.cellSize;
      this.updateCenterCell();
    } else if (this.pos.z > this.zMax) {
      this.zMin += this.data.cellSize;
      this.zMax += this.data.cellSize;
      this.updateCenterCell();
    }
  },

  updateCenterCell: function () {
    this.el.setAttribute("voxel-world", {
      centerCell: `${
        (this.xMin + this.data.cellSize / 2) / this.data.cellSize
      },${(this.zMin + this.data.cellSize / 2) / this.data.cellSize}`,
    });
  },
});
