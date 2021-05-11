AFRAME.registerComponent("movement-mode", {
  schema: {
    survival: { default: true },
  },

  init: function () {
    // Do something when component first attached.
  },

  update: function () {
    if (!this.data.survival) {
      this.el.removeAttribute("gravity");
      this.el.removeAttribute("auto-jump");
      this.el.setAttribute("movement-controls", { fly: true });
    } else {
      this.el.setAttribute("gravity", "");
      this.el.setAttribute("auto-jump", "");
      this.el.setAttribute("movement-controls", { fly: false });
    }
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
});
