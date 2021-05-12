AFRAME.registerComponent("inventory", {
  schema: {},
  init: function () {
    var selectEl = this.el; // Reference to the component's element.
    this.el.sceneEl
      .querySelector("#right-hand")
      .addEventListener("abuttonup", () => {
        if (this.el.getAttribute("visible")) {
          // set not visible, remove intersectable
          this.el.setAttribute("visible", false);
          const ids = [
            "Grass",
            "Stone",
            "Plank",
            "FreeHands",
            "Pickaxe",
            "Frame",
          ];
          for (id of ids) {
            this.el.sceneEl
              .querySelector("#" + id)
              .classList.remove("intersectable");
          }
        } else {
          this.el.setAttribute("visible", true);
          const ids = [
            "Grass",
            "Stone",
            "Plank",
            "FreeHands",
            "Pickaxe",
            "Frame",
          ];
          for (id of ids) {
            this.el.sceneEl
              .querySelector("#" + id)
              .classList.add("intersectable");
          }
        }
      });

    // Create the "frame" of the select menu bar
    selectEl.innerHTML = `
        <a-entity position="1.15 0.28 -0.7"
            text="font: monoid; anchor: right; width: 1.5; color: white; value: INVENTORY"
            flatShading="true">
        </a-entity>

        <a-entity position="0.55 0.215 -0.7"
            text="font: monoid; anchor: right; width: .9; color: white; value: Blocks"
            flatShading="true">
        </a-entity>

        <a-entity position="0.65 -0.06 -0.7"
            text="font: monoid; anchor: right; width: 1; color: white; value: Hands"
            flatShading="true">
        </a-entity>

        <a-entity class="intersectable" geometry="primitive: box" id="Frame" scale=".9 .75 0.1" position="0 0 -0.8"  material="opacity: 0.5; transparent: true; color: #000"></a-entity>

        <a-box id="Grass" class="intersectable" scale="0.17 0.17 0.001" position="-0.26 0.08 -0.7"  material="shader: flat; opacity: 1; transparent: false; color: #999999"></a-box>
        <a-image scale="0.15 0.15 0.001" position="-0.255 0.08 -0.68" src="./assets/icons/grass.png"></a-image>

        <a-box id="Plank" class="intersectable" scale="0.17 0.17 0.001" position="0 0.08 -0.7"  material="shader: flat; opacity: 1; transparent: false; color: #999999" flatShading="true"></a-box>
        <a-image scale="0.15 0.15 0.001" position="0 0.08 -0.68" src="./assets/icons/plank.png"></a-image>

        <a-box id="Stone" class="intersectable" scale="0.17 0.17 0.001" position="0.26 0.08 -0.7"  material="shader: flat; opacity: 1; transparent: false; color: #999999" flatShading="true"></a-box>
        <a-image scale="0.15 0.15 0.001" position="0.255 0.08 -0.68" src="./assets/icons/stone.png"></a-image>
        
        <a-box id="FreeHands" class="intersectable" scale="0.17 0.17 0.001" position="-0.26 -0.19 -0.7"  material="shader: flat; opacity: 1; transparent: false; color: #999999" flatShading="true"></a-box>
        <a-image scale="0.15 0.15 0.001" position="-0.25 -0.18 -0.68" src="./assets/icons/no.png"></a-image>

        <a-box id="Pickaxe" class="intersectable" scale="0.17 0.17 0.001" position="0 -0.19 -0.7"  material="shader: flat; opacity: 1; transparent: false; color: #999999" flatShading="true"></a-box>
        <a-image scale="0.15 0.15 0.001" position="-0.01 -0.18 -0.68" src="./assets/icons/pickaxe.png"></a-image>
        `;
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
