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
            <a-box id="${this.idPrefix}Frame" scale="0.01 0.007 0.0005" position="0 0 -0.0085"  material="opacity: 0.5; transparent: false; color: #000000"></a-box>
            
            <a-entity position="0 0.33 -0.708"
                text="anchor: right; width: 0.4; color: white; value: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam">
            </a-entity>

            <a-box id="${this.idPrefix}Button" scale="0.002 0.002 0.0001" position="-0.003 0.0015 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0016 0.0016 0.0001" position="-0.00295 0.001 -0.0079" src="./assets/icons/grass.png" ></a-image>

            <a-box id="${this.idPrefix}Button" scale="0.002 0.002 0.0001" position="0 0.0015 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>

            <a-box id="${this.idPrefix}Button" scale="0.002 0.002 0.0001" position="0.003 0.0015 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            
            <a-box id="${this.idPrefix}Button" scale="0.002 0.002 0.0001" position="-0.003 -0.0015 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
            <a-image scale="0.0016 0.0016 0.0001" position="-0.00295 0.001 -0.0079" src="./assets/icons/grass.png" ></a-image>

            <a-box id="${this.idPrefix}Button" scale="0.002 0.002 0.0001" position="0 -0.0015 -0.008"  material="opacity: 1; transparent: false; color: #ffffff"></a-box>
        `;

    selectEl.appendChild(selectRenderEl);
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
});
