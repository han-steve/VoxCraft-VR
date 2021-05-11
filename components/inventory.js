AFRAME.registerComponent("inventory", {
  schema: {},
  init: function () {
    var selectEl = this.el; // Reference to the component's element.
    this.blockSelected = 0;
    this.handSelected = 0;
    // console.log("inventory");

    // Create the "frame" of the select menu bar
    var selectRenderEl = document.createElement("a-entity");
    selectRenderEl.id = this.idPrefix + "selectRender";
    selectRenderEl.innerHTML = `
            <a-entity position="1.15 0.28 -0.7"
                text="font: monoid; anchor: right; width: 1.5; color: white; value: INVENTORY">
            </a-entity>

            <a-entity position="0.55 0.215 -0.708"
                text="font: monoid; anchor: right; width: .9; color: white; value: Blocks">
            </a-entity>

            <a-entity position="0.65 -0.06 -0.708"
                text="font: monoid; anchor: right; width: 1; color: white; value: Hands">
            </a-entity>

            <a-box id="${this.idPrefix}Frame" scale="0.01 0.0085 0.0005" position="0 0 -0.0085"  material="opacity: 0.5; transparent: true; color: #000000"></a-box>

            <a-box id="${this.idPrefix}Grass" scale="0.002 0.002 0.0001" position="-0.003 0.0009 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0018 0.0018 0.0001" position="-0.00295 0.0009 -0.0079" src="./assets/icons/grass.png" ></a-image>

            <a-box id="${this.idPrefix}Plank" scale="0.002 0.002 0.0001" position="0 0.0009 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0018 0.0018 0.0001" position="0 0.0009 -0.0079" src="./assets/icons/plank.png" ></a-image>

            <a-box id="${this.idPrefix}Stone" scale="0.002 0.002 0.0001" position="0.003 0.0009 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0018 0.0018 0.0001" position="0.003 0.0009 -0.0079" src="./assets/icons/stone.png" ></a-image>
            
            <a-box id="${this.idPrefix}FreeHands" scale="0.002 0.002 0.0001" position="-0.003 -0.0022 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0018 0.0018 0.0001" position="-0.003 -0.0022 -0.0079" src="./assets/icons/no.png" ></a-image>

            <a-box id="${this.idPrefix}Bow" scale="0.002 0.002 0.0001" position="0 -0.0022 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0018 0.0018 0.0001" position="0 -0.0022 -0.0079" src="./assets/icons/bow_temp.png" ></a-image>
        `;

    selectEl.appendChild(selectRenderEl);
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
