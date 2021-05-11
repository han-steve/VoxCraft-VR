// toggle the mode between survival and creative. It's just a button listner
AFRAME.registerComponent("change-mode", {
  init: function () {
    // Do something when component first attached.
    let rig = this.el.sceneEl.querySelector("#camera-rig");
    this.el.addEventListener("bbuttonup", () => {
      rig.setAttribute("movement-mode", {
        survival: !rig.getAttribute("movement-mode").survival,
      });
    });
  },
});
