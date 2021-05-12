AFRAME.registerComponent("inventory", {
  schema: {},
  init: function () {
    var selectEl = this.el; // Reference to the component's element.
    this.blockSelected = 0;
    this.handSelected = 0;
    this.el.sceneEl
      .querySelector("#right-hand")
      .addEventListener("abuttonup", () => {
        this.el.setAttribute("visible", !this.el.getAttribute("visible"));
      });
    // console.log("inventory");

    // Create the "frame" of the select menu bar
    selectEl.innerHTML = `
        <a-entity position="1.15 0.28 -0.7"
            text="font: monoid; anchor: right; width: 1.5; color: white; value: INVENTORY">
        </a-entity>

        <a-entity position="0.55 0.215 -0.7"
            text="font: monoid; anchor: right; width: .9; color: white; value: Blocks">
        </a-entity>

        <a-entity position="0.65 -0.06 -0.7"
            text="font: monoid; anchor: right; width: 1; color: white; value: Hands">
        </a-entity>

        <a-entity geometry="primitive: box" id="Frame" scale=".9 .75 0.1" position="0 0 -0.8"  material="opacity: 0.5; transparent: true; color: #000"></a-entity>

        <a-box id="Grass" scale="0.17 0.17 0.001" position="-0.26 0.08 -0.7"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        <a-image scale="0.15 0.15 0.001" position="-0.255 0.08 -0.68" src="./assets/icons/grass.png" ></a-image>

        <a-box id="Plank" scale="0.17 0.17 0.001" position="0 0.08 -0.7"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        <a-image scale="0.15 0.15 0.001" position="0 0.08 -0.68" src="./assets/icons/plank.png" ></a-image>

        <a-box id="Stone" scale="0.17 0.17 0.001" position="0.26 0.08 -0.7"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        <a-image scale="0.15 0.15 0.001" position="0.255 0.08 -0.68" src="./assets/icons/stone.png" ></a-image>

        
        <a-box id="FreeHands" scale="0.17 0.17 0.001" position="-0.26 -0.19 -0.7"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        <a-image scale="0.15 0.15 0.001" position="-0.255 -0.19 -0.68" src="./assets/icons/no.png" ></a-image>

        <a-box id="Bow" scale="0.17 0.17 0.001" position="0 -0.19 -0.7"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        <a-image scale="0.15 0.15 0.001" position="0 -0.19 -0.68" src="./assets/icons/bow_temp.png" ></a-image>
        `;
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
