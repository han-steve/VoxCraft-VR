AFRAME.registerComponent("minecraft-hand", {
  schema: {
    hand: { default: "left" },
  },

  init: function () {
    // Do something when component first attached.
    var el = this.el;

    this.onControllerConnected = this.onControllerConnected.bind(this);
    this.onControllerDisconnected = this.onControllerDisconnected.bind(this);

    el.addEventListener("controllerconnected", this.onControllerConnected);
    el.addEventListener(
      "controllerdisconnected",
      this.onControllerDisconnected
    );

    el.object3D.visible = false;
  },

  onControllerConnected: function () {
    this.el.object3D.visible = true;
  },

  onControllerDisconnected: function () {
    this.el.object3D.visible = false;
  },

  update: function () {
    // Do something when component's data is updated.
    // this is basically init
    var controlConfiguration;
    var el = this.el;
    var hand = this.data.hand;

    controlConfiguration = {
      hand: hand,
      model: false,
    };

    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.3);
    const material = new THREE.MeshBasicMaterial({ color: "#aaa" });
    const arm = new THREE.Mesh(geometry, material);
    el.setObject3D("mesh", arm);
    el.setAttribute("magicleap-controls", controlConfiguration);
    el.setAttribute("vive-controls", controlConfiguration);
    el.setAttribute("oculus-touch-controls", controlConfiguration);
    el.setAttribute("windows-motion-controls", controlConfiguration);
    el.setAttribute("hp-mixed-reality-controls", controlConfiguration);
  },

  remove: function () {
    // Do something the component or its entity is detached.
    this.el.removeObject3D("mesh");
  },
});
