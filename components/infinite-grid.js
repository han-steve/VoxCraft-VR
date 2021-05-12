AFRAME.registerComponent("infinite-grid", {
  dependencies: ["position"],
  schema: {
    cellSize: { default: 32 },
  },

  // initializing grid
  init: function () {
    this.pos = this.el.sceneEl.querySelector("#camera-rig").object3D.position;
    this.xMin = 0;
    this.xMax = this.data.cellSize;
    this.zMin = 0;
    this.zMax = this.data.cellSize;

    this.updateCenterCell.bind(this);
  },

  // crossing over cell threshold
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
      centerCell: `${this.xMin / this.data.cellSize},${
        this.zMin / this.data.cellSize
      }`,
    });
  },
});
