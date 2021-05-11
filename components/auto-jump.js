AFRAME.registerComponent("auto-jump", {
    schema: {},
    init: function () {
        this.cellTrans = 20;
        this.angle = this.el.sceneEl.querySelector("#camera").object3D.rotation.y;
    },
    update: function () {},

    // do we need to jump up a block?
    tick: function () {
        let xPos = this.el.object3D.position.x; 
        let yPos = this.el.object3D.position.y; 
        let zPos = this.el.object3D.position.z; 

        let newX = xPos - 0.1 * Math.sin(this.angle); 
        let newZ = zPos - 0.1 * Math.cos(this.angle); 
        let topY = yPos - 0.5 + this.cellTrans; 

        let bottomVox = document.world.getVoxel(newX, topY - 1, newZ); 
        let topVox = document.world.getVoxel(newX, topY, newZ); 

        if(topVox == 0 && bottomVox != 0) {
            // do a lil jump!
            this.el.object3D.position.y = Math.round(this.el.object3D.position.y + 1); 
        } else if(topVox != 0 && bottomVox != 0) {
            // don't run through the block
            this.el.object3D.position.x += 0.1; 
            this.el.object3D.position.z += 0.1; 
        }
    },
    remove: function () {},
    pause: function () {},
    play: function () {}
  });