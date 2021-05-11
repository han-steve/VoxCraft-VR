AFRAME.registerComponent("block-manipulation", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener("raycaster-intersected", function () {
      console.log("intersected");
    });
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
