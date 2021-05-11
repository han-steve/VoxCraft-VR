AFRAME.registerComponent("block-manipulation", {
  schema: {},

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener("raycaster-intersected", (event) => {
      this.raycaster = event.detail.el;
    });
    this.el.addEventListener("raycaster-intersected-cleared", (evt) => {
      this.raycaster = null;
    });
    this.cellOffsetY = 20;

    this.previousPos = null;
    this.currentFace = null;
    this.miningCount = 0;

    this.startMiningThreshold = 50;
    this.finishMiningThreshold = 200;
    this.blockMineTime = {
      1: 200,
      2: 200,
      3: 200,
      4: 400,
      5: 400,
      6: 150,
      7: 100,
      8: 100,
      9: 400,
      10: 150,
      11: 200,
      12: 50,
      13: 100,
      14: 100,
      15: 100,
      16: 150,
    };

    let rightHand = this.el.sceneEl.querySelector("#right-hand");
    rightHand.addEventListener("triggerup", () => {
      if (!this.raycaster) {
        return;
      } // Not intersecting.

      let intersection = this.raycaster.components.raycaster.getIntersection(
        this.el
      );
      if (!intersection) {
        return;
      }
      // console.log(intersection.point);
      // console.log(intersection.face);

      let face = intersection.face;
      let position = intersection.point;
      this.placeBlock(face.normal, position, 14);
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    if (!this.raycaster) {
      this.currentFace = null;
      this.miningCount = 0;
      return;
    } // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(
      this.el
    );
    if (!intersection) {
      this.currentFace = null;
      this.miningCount = 0;
      return;
    }
    // console.log(intersection.point);
    // console.log(intersection.face);

    let faceId = intersection.faceIndex;
    let position = intersection.point;

    // if this face is 4 ids away from the current face then it's probably on the same cube
    if (this.currentFace && Math.abs(faceId - this.currentFace) < 5) {
      if (
        this.previousPos &&
        (Math.abs(position.x - this.previousPos.x) > 0.01 ||
          Math.abs(position.y - this.previousPos.y) > 0.01 ||
          Math.abs(position.z - this.previousPos.z) > 0.01)
      ) {
        this.miningCount++;
        this.previousPos = position;
        if (this.miningCount % 20 === 0) {
          this.tolerance = 3;
        }
        if (this.miningCount === this.startMiningThreshold) {
          // console.log("start mining");
          this.finishMiningThreshold =
            this.blockMineTime[
              document.world.getVoxel(
                position.x - intersection.face.normal.x * 0.5,
                position.y -
                  intersection.face.normal.y * 0.5 +
                  this.cellOffsetY,
                position.z - intersection.face.normal.z * 0.5
              )
            ];
        }
        if (this.miningCount === this.finishMiningThreshold) {
          // console.log("done mining");
          this.miningCount = 0;
          this.mine(intersection.face.normal, position);
        }
        return;
      }
      if (this.tolerance > 0) {
        this.tolerance--;
        this.previousPos = position;
        return;
      }
    } else {
      this.currentFace = faceId;
      // console.log("switched faces:", faceId);
    }
    this.miningCount = 0;
    this.previousPos = position;

    // console.log(
    //   document.world.computeCellId(
    //     intersection.point.x,
    //     intersection.point.y + this.cellOffsetY,
    //     intersection.point.z
    //   )
    // );
    // console.log(
    //   this.el.getObject3D(
    //     document.world.computeCellId(
    //       intersection.point.x,
    //       intersection.point.y + this.cellOffsetY,
    //       intersection.point.z
    //     )
    //   ).geometry
    // );

    // face.color = new THREE.Color(0x000000);
    // var numberOfSides = face instanceof THREE.Face3 ? 3 : 4;

    // console.log(numberOfSides);

    // // assign color to each vertex of current face
    // for (var j = 0; j < numberOfSides; j++) {
    //   // initialize color variable
    //   var color = new THREE.Color(0xffffff);
    //   color.setRGB(Math.random(), 0, 0);
    //   face.vertexColors[j] = color;
    //   console.log(face.vertexColors[j]);
    // }
  },
  mine: function (normal, position) {
    document.world.setVoxel(
      position.x - normal.x * 0.5,
      position.y - normal.y * 0.5 + this.cellOffsetY,
      position.z - normal.z * 0.5,
      0
    );
    this.el.sceneEl
      .querySelector("#world")
      .components["voxel-world"].updateCellGeometry(
        position.x - normal.x * 0.5,
        position.y - normal.y * 0.5 + this.cellOffsetY,
        position.z - normal.z * 0.5
      );
  },
  placeBlock: function (normal, position, block) {
    document.world.setVoxel(
      position.x + normal.x * 0.5,
      position.y + normal.y * 0.5 + this.cellOffsetY,
      position.z + normal.z * 0.5,
      block
    );
    this.el.sceneEl
      .querySelector("#world")
      .components["voxel-world"].updateCellGeometry(
        position.x + normal.x * 0.5,
        position.y + normal.y * 0.5 + this.cellOffsetY,
        position.z + normal.z * 0.5
      );
  },
});
