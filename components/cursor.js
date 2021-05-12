AFRAME.registerComponent("crawling-cursor", {
  dependencies: ["raycaster"],
  init: function () {
    // Do something when component first attached.
    this.cursor = this.el.sceneEl.querySelector("#cursor");
    this.el.addEventListener("raycaster-intersection", (event) => {
      let raycaster = this.el.components.raycaster;
      let id = raycaster.intersectedEls[0].id;
      this.raycaster = raycaster;
      this.cursor.setAttribute("visible", true);
      if (id === "world") {
      } else if (id === "Plank") {
        document.currentBlock = 16;
        this.highlightInventoryItem(id);
        this.el.sceneEl
          .querySelector("#pickaxe")
          .setAttribute("visible", false);
        document.pickaxe = false;
      } else if (id === "Stone") {
        document.currentBlock = 4;
        this.highlightInventoryItem(id);
        this.el.sceneEl
          .querySelector("#pickaxe")
          .setAttribute("visible", false);
        document.pickaxe = false;
      } else if (id === "Grass") {
        document.currentBlock = 14;
        this.highlightInventoryItem(id);
        this.el.sceneEl
          .querySelector("#pickaxe")
          .setAttribute("visible", false);
        document.pickaxe = false;
      } else if (id === "FreeHands") {
        document.pickaxe = false;
        this.el.sceneEl
          .querySelector("#pickaxe")
          .setAttribute("visible", false);
        this.highlightInventoryItem(id);
      } else if (id === "Pickaxe") {
        document.pickaxe = true;
        this.el.sceneEl.querySelector("#pickaxe").setAttribute("visible", true);
        this.highlightInventoryItem(id);
      }
    });
    this.el.addEventListener("raycaster-intersection-cleared", (evt) => {
      this.cursor.setAttribute("visible", false);
      this.raycaster = null;
    });
  },

  highlightInventoryItem: function (id) {
    let ids = ["Grass", "Stone", "Plank", "Pickaxe", "FreeHands"];
    for (i of ids) {
      if (i !== id) this.unHighlightInventoryItem(i);
    }
    let element = this.el.sceneEl.querySelector("#" + id);
    element.setAttribute("material", "color", "#ffffff");
  },

  unHighlightInventoryItem: function (id) {
    let element = this.el.sceneEl.querySelector("#" + id);
    element.setAttribute("material", "color", "#999999");
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    if (!this.raycaster) return;
    let pos = this.raycaster.intersections[0].point;
    let normal = this.raycaster.intersections[0].face.normal;
    this.cursor.object3D.position.set(
      pos.x + normal.x * 0.01,
      pos.y + normal.y * 0.01,
      pos.z + normal.z * 0.01
    );
    // this.cursor.object3D.position.set(pos.x, pos.y, pos.z);
    if (normal.x === 1 || normal.x === -1)
      this.cursor.object3D.rotation.set(0, Math.PI / 2, 0);
    else if (normal.y === 1 || normal.y === -1)
      this.cursor.object3D.rotation.set(Math.PI / 2, 0, 0);
    else this.cursor.object3D.rotation.set(0, 0, 0);
  },
});
