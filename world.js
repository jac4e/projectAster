// Check this site on voxels in three.js https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html

class Voxel {
    constructor(posX, posY, posZ, col) {
        this.pos = new THREE.Vector3(posX, posY, posZ);
        this.side = 1;
        this.geometry = new THREE.BoxBufferGeometry(this.side, this.side, this.side);
        this.material = new THREE.MeshPhongMaterial({
            color: col || 0x005000
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(posX, posY, posZ);
        scene.add(this.mesh);
    }
}

class Chunk {
    constructor(i, j, k) {
        // creates cells
        this.cellSize = 5;
        this.cell = new Uint8Array(this.cellSize * this.cellSize * this.cellSize);
        console.log(this.cell)

        // Set cell block
        for (var y = 0; y < this.cellSize; y++) {
            for (var z = 0; z < this.cellSize; z++) {
                for (var x = 0; x < this.cellSize; x++) {
                    var offset = y * this.cellSize * this.cellSize + z * this.cellSize + x;
                    this.cell[offset] = 1
                }
            }
        }

        // adds block to each cell
        for (var y = 0; y < this.cellSize; y++) {
            for (var z = 0; z < this.cellSize; z++) {
                for (var x = 0; x < this.cellSize; x++) {
                    var offset = y * this.cellSize * this.cellSize + z * this.cellSize + x;
                    if (this.cell[offset] == 1) {
                        this.cell[offset] = new Voxel(x, y, z)
                        console.log(this.cell[offset])
                    }
                }
            }
        }
        console.log(this.cell)
        this.cullBlockSides();
    }
    cullBlockSides() {
        for (var y = 0; y < this.cellSize; y++) {
            for (var z = 0; z < this.cellSize; z++) {
                for (var x = 0; x < this.cellSize; x++) {
                    var offset = y * this.cellSize * this.cellSize + z * this.cellSize + x;
                    // check for and delete faces that are touching blocks???
                    console.log(this.cell[offset])
                }
            }
        }
    }
}


function generateWorld(){

}