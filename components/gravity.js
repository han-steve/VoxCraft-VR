AFRAME.registerComponent("gravity", {
    schema: {},
    init: function () {
        this.cellSize = 32;
    },
    update: function () {},

    // check for the voxel beneath our feet and adjust height
    tick: function () {
        let xPos = this.el.object3D.position.x; 
        let yPos = this.el.object3D.position.y; 
        let zPos = this.el.object3D.position.z; 
        // console.log("zPos: " + zPos);
        
        // let currCell = document.world.getVoxel(xPos, yPos, zPos); 
        let cellUnder = document.world.getVoxel(xPos, yPos - 1 + this.cellSize, zPos); 

        // console.log("currCell: " + currCell); 
        console.log("cellUnder: " + cellUnder); 

        if(cellUnder == 0) {
            this.el.object3D.position.y -= 1; 
        }
    },
    remove: function () {},
    pause: function () {},
    play: function () {}
  });