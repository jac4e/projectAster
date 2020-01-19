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


let bgMesh;
let bgScene;

class World {
    constructor() {
        var sunHemi = new THREE.HemisphereLight(0xaaaaaa, 10);
        var sunDirectional = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(sunHemi);
        scene.add(sunDirectional);

        bgScene = new THREE.Scene();
        var loader = new THREE.TextureLoader();
        var texture = loader.load(
            '/img/sky.png',
        );
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;

        var shader = THREE.ShaderLib.equirect;
        var material2 = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide,
        });
        material2.uniforms.tEquirect.value = texture;
        var plane = new THREE.BoxBufferGeometry(2, 2, 2);
        bgMesh = new THREE.Mesh(plane, material2);
        bgScene.add(bgMesh);

        // Adds in game colored axis to help with directions
        var axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        //Creates ground
        ground = new Chunk(0, 0, 0);
    }
    update() {
        bgMesh.position.copy(camera.position);
    }
    render() {
        renderer.render(bgScene, camera);
    }
}