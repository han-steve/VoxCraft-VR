AFRAME.registerComponent("cursor", {
  dependencies: ["raycaster"],
  init: function () {
    // Do something when component first attached.
    this.el.addEventListener("raycaster-intersection", () => {
      console.log(this.el.intersectObjects);
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
  },
});
