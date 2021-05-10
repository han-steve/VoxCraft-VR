class VoxelWorld {
  // inspired by https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html
  constructor({ cellSize, tileSize, tileTextureWidth, tileTextureHeight }) {
    this.cellSize = cellSize;
    this.tileSize = tileSize;
    this.tileTextureHeight = tileTextureHeight;
    this.tileTextureWidth = tileTextureWidth;
    this.cellSliceSize = cellSize * cellSize; // size of a 2d layer
    this.cell = new Uint8Array(cellSize * cellSize * cellSize);
    this.cells = {};
  }
  computeCellId(x, y, z) {
    const { cellSize } = this;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    return `${cellX},${cellY},${cellZ}`;
  }
  // helper function to mod by cell size and compute index into cells array
  computeVoxelOffset(x, y, z) {
    const { cellSize, cellSliceSize } = this;
    const voxelX = THREE.MathUtils.euclideanModulo(x, cellSize) | 0;
    const voxelY = THREE.MathUtils.euclideanModulo(y, cellSize) | 0;
    const voxelZ = THREE.MathUtils.euclideanModulo(z, cellSize) | 0;
    return voxelY * cellSliceSize + voxelZ * cellSize + voxelX;
  }
  // get the cell from voxel
  getCellForVoxel(x, y, z) {
    return this.cells[this.computeCellId(x, y, z)];
  }
  // set a voxel
  setVoxel(x, y, z, v) {
    let cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      cell = this.addCellForVoxel(x, y, z);
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    cell[voxelOffset] = v;
  }
  addCellForVoxel(x, y, z) {
    const cellId = this.computeCellId(x, y, z);
    let cell = this.cells[cellId];
    if (!cell) {
      const { cellSize } = this;
      cell = new Uint8Array(cellSize * cellSize * cellSize);
      this.cells[cellId] = cell;
    }
    return cell;
  }
  getVoxel(x, y, z) {
    const cell = this.getCellForVoxel(x, y, z);
    if (!cell) {
      return 0;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return cell[voxelOffset];
  }
  generateGeometryDataForCell(cellX, cellY, cellZ) {
    const { cellSize, tileSize, tileTextureHeight, tileTextureWidth } = this;
    const positions = [];
    const normals = [];
    const indices = [];
    const uvs = [];
    const startX = cellX * cellSize;
    const startY = cellY * cellSize;
    const startZ = cellZ * cellSize;

    for (let y = 0; y < cellSize; ++y) {
      const voxelY = startY + y;
      for (let z = 0; z < cellSize; ++z) {
        const voxelZ = startZ + z;
        for (let x = 0; x < cellSize; ++x) {
          const voxelX = startX + x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
          if (voxel) {
            const uvVoxel = voxel - 1;
            // There is a voxel here but do we need faces for it?
            for (const { dir, corners, uvRow } of VoxelWorld.faces) {
              const neighbor = this.getVoxel(
                voxelX + dir[0],
                voxelY + dir[1],
                voxelZ + dir[2]
              );
              if (!neighbor) {
                // this voxel has no neighbor in this direction so we need a face.
                const ndx = positions.length / 3;
                for (const { pos, uv } of corners) {
                  positions.push(pos[0] + x, pos[1] + y, pos[2] + z);
                  normals.push(...dir);
                  uvs.push(
                    ((uvVoxel + uv[0]) * tileSize) / tileTextureWidth,
                    1 - ((uvRow + 1 - uv[1]) * tileSize) / tileTextureHeight
                  );
                }
                indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
              }
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      uvs,
      indices,
    };
  }
}

VoxelWorld.faces = [
  {
    // left
    uvRow: 0,
    dir: [-1, 0, 0],
    corners: [
      { pos: [0, 1, 0], uv: [0, 1] },
      { pos: [0, 0, 0], uv: [0, 0] },
      { pos: [0, 1, 1], uv: [1, 1] },
      { pos: [0, 0, 1], uv: [1, 0] },
    ],
  },
  {
    // right
    uvRow: 0,
    dir: [1, 0, 0],
    corners: [
      { pos: [1, 1, 1], uv: [0, 1] },
      { pos: [1, 0, 1], uv: [0, 0] },
      { pos: [1, 1, 0], uv: [1, 1] },
      { pos: [1, 0, 0], uv: [1, 0] },
    ],
  },
  {
    // bottom
    uvRow: 2,
    dir: [0, -1, 0],
    corners: [
      { pos: [1, 0, 1], uv: [1, 0] },
      { pos: [0, 0, 1], uv: [0, 0] },
      { pos: [1, 0, 0], uv: [1, 1] },
      { pos: [0, 0, 0], uv: [0, 1] },
    ],
  },
  {
    // top
    uvRow: 1,
    dir: [0, 1, 0],
    corners: [
      { pos: [0, 1, 1], uv: [1, 0] },
      { pos: [1, 1, 1], uv: [0, 1] },
      { pos: [0, 1, 0], uv: [1, 0] },
      { pos: [1, 1, 0], uv: [0, 0] },
    ],
  },
  {
    // back
    uvRow: 0,
    dir: [0, 0, -1],
    corners: [
      { pos: [1, 0, 0], uv: [0, 0] },
      { pos: [0, 0, 0], uv: [1, 0] },
      { pos: [1, 1, 0], uv: [0, 1] },
      { pos: [0, 1, 0], uv: [1, 1] },
    ],
  },
  {
    // front
    uvRow: 0,
    dir: [0, 0, 1],
    corners: [
      { pos: [0, 0, 1], uv: [0, 0] },
      { pos: [1, 0, 1], uv: [1, 0] },
      { pos: [0, 1, 1], uv: [0, 1] },
      { pos: [1, 1, 1], uv: [1, 1] },
    ],
  },
];

AFRAME.registerComponent("voxel-world", {
  schema: {
    centerCell: { default: "0,0" },
    cellSize: { default: 32 },
  },

  init: function () {
    const loader = new THREE.TextureLoader();
    const texture = loader.load("../assets/textures/atlas.png");
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    const tileSize = 16;
    const tileTextureWidth = 256;
    const tileTextureHeight = 64;
    let cellSize = this.data.cellSize;

    const world = new VoxelWorld({
      cellSize,
      tileSize,
      tileTextureWidth,
      tileTextureHeight,
    });

    const material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
      transparent: true,
    });

    this.world = world;
    document.world = world;
    this.material = material;

    // seed the noise (global)
    noise.seed(Math.random());

    this.generateCell.bind(this);

    this.cellIdToMesh = {};
    this.cellIdToLight = {};

    this.updateCellGeometry.bind(this);

    // console.log(this.cellIdToMesh);
  },

  update: function () {
    // console.log(this.data.centerCell);
    let [centerx, centerz] = this.data.centerCell.split(",");
    centerx = Number(centerx);
    centerz = Number(centerz);

    let radius = 2;

    let currentCellIds = [];
    // y is always set to 0
    for (let x = centerx - radius; x <= centerx + radius; x++) {
      for (let z = centerz - radius; z <= centerz + radius; z++) {
        let cellId = `${x},0,${z}`;
        currentCellIds.push(cellId);

        // only generate cell if it's not already generated
        if (!this.world.cells[cellId]) {
          this.generateCell(x, 0, z);
        }
        if (!this.cellIdToMesh[cellId])
          this.updateCellGeometry(
            x * this.data.cellSize,
            0,
            z * this.data.cellSize
          );
      }
    }
    // console.log(this.world.cells);
    for (let [key, value] of Object.entries(this.cellIdToMesh)) {
      if (currentCellIds.includes(key)) this.el.setObject3D(key, value);
      else if (this.el.getObject3D(key)) this.el.removeObject3D(key);
    }
  },

  updateCellGeometry: function (x, y, z) {
    let { world, cellIdToMesh } = this;
    let cellSize = this.data.cellSize;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    const cellId = world.computeCellId(x, y, z);
    let mesh = cellIdToMesh[cellId];
    const geometry = mesh ? mesh.geometry : new THREE.BufferGeometry();

    const {
      positions,
      normals,
      uvs,
      indices,
    } = world.generateGeometryDataForCell(cellX, cellY, cellZ);
    const positionNumComponents = 3;
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(positions),
        positionNumComponents
      )
    );
    const normalNumComponents = 3;
    geometry.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    const uvNumComponents = 2;
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );
    geometry.setIndex(indices);
    // geometry.computeBoundingSphere();

    if (!mesh) {
      mesh = new THREE.Mesh(geometry, this.material);
      mesh.name = cellId;
      cellIdToMesh[cellId] = mesh;
      mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
    }
  },

  generateCell: function (startx, starty, startz) {
    let cellSize = this.data.cellSize;
    for (let z = startz * cellSize; z < startz * cellSize + cellSize; ++z) {
      for (let x = startx * cellSize; x < startx * cellSize + cellSize; ++x) {
        const height = Math.round(noise.perlin2(x / 25, z / 25) * 15) + 10;
        this.world.setVoxel(x, 0, z, 4);
        if (height <= 3) {
          // water
          for (let y = 1; y < height - 1; y++) {
            this.world.setVoxel(x, y, z, 15);
          }
          for (let y = height - 1; y <= height; y++) {
            this.world.setVoxel(x, y, z, 13);
          }
        } else if (height <= 4) {
          // wet ground
          for (let y = 1; y <= height; y++) {
            this.world.setVoxel(x, y, z, 8);
          }
        } else if (height <= 15) {
          // grassy ground
          for (let y = 1; y <= height - 5; y++) {
            this.world.setVoxel(x, y, z, 4);
          }
          for (let y = height - 5; y <= height - 1; y++) {
            this.world.setVoxel(x, y, z, 15);
          }
          this.world.setVoxel(x, height, z, 14);

          // lantern
          if (
            x === startx * cellSize + cellSize / 2 &&
            z === startz * cellSize + cellSize / 2
          ) {
            this.world.setVoxel(x, height + 1, z, 1);
            // this.cellIdToLight[`${startx},${starty},${startz}`]
          }
          // trees
          else if (
            height > 7 &&
            x % 10 == 0 &&
            z % 10 == 0 &&
            Math.random() > 0.5
          ) {
            // leaves
            let radius = 1;
            if (Math.random() > 0.5) {
              radius = 2;
            }
            for (
              let x1 = Math.max(x - radius, startx * cellSize);
              x1 <= Math.min(x + radius, startx * cellSize + cellSize - 1);
              x1++
            ) {
              for (
                let z1 = Math.max(z - radius, startz * cellSize);
                z1 <= Math.min(z + radius, startz * cellSize + cellSize - 1);
                z1++
              ) {
                for (let y = height + 4; y <= height + 7; y++) {
                  this.world.setVoxel(x1, y, z1, 12);
                }
              }
            }

            // trunk
            for (let y = height + 1; y <= height + 5; y++) {
              this.world.setVoxel(x, y, z, 10);
            }
          }
        } else if (height <= 20) {
          // rocks
          for (let y = 1; y <= height - 1; y++) {
            this.world.setVoxel(x, y, z, 4);
          }
          this.world.setVoxel(x, height, z, 4);
        } else {
          for (let y = 1; y <= height - 1; y++) {
            this.world.setVoxel(x, y, z, 4);
          }
          this.world.setVoxel(x, height, z, 5);
        }
      }
    }
  },
});
