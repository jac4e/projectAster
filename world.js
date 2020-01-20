// Check this site on voxels in three.js https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html

let cube = [
    new Float32Array([ // left
        0, 0, 1,
        0, 1, 1,
        0, 1, 0,

        0, 0, 0,
        0, 0, 1,
        0, 1, 0,
    ]),
    new Float32Array([ // right
        1, 0, 1,
        1, 1, 0,
        1, 1, 1,

        1, 0, 1,
        1, 0, 0,
        1, 1, 0,
    ]),
    new Float32Array([ // bottom
        1, 0, 1,
        0, 0, 0,
        1, 0, 0,

        1, 0, 1,
        0, 0, 1,
        0, 0, 0,
    ]),
    new Float32Array([ // top
        1, 1, 1,
        1, 1, 0,
        0, 1, 0,

        1, 1, 1,
        0, 1, 0,
        0, 1, 1,
    ]),
    new Float32Array([ // back
        1, 1, 0,
        0, 0, 0,
        0, 1, 0,

        1, 0, 0,
        0, 0, 0,
        1, 1, 0,
    ]),
    new Float32Array([ // front
        0, 0, 1,
        1, 0, 1,
        1, 1, 1,

        1, 1, 1,
        0, 1, 1,
        0, 0, 1.
    ]),
]


class Voxel {
    constructor(posX, posY, posZ, col) {
        this.pos = new THREE.Vector3(posX, posY, posZ);
        this.side = 1;
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.MeshBasicMaterial({
            color: col || 0x005000,
            wireframe: true
        });

    }
    createGeometry() {
        let face = new Float32Array(18 * 6)
        let count = 0
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 18; j++) {
                face[count] = cube[i][j]
                count += 1
            }
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(face, 3));
        this.createMesh();
    }
    createMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
        scene.add(this.mesh);
    }
}

// create chunk array
// fill chunk array with blocks represented by numbers
// attatch correct geometry to each cell
// generate mesh based of each cell and add to scene
// have voxelupdate function that will update meshes of surronding cells when new voxel is placed or destroyed


class Chunk {
    constructor(i, j, k) {
        // creates cells
        this.cellSize =3;
        this.cellSliceSize = this.cellSize * this.cellSize;
        this.cell = new Array(this.cellSize * this.cellSize * this.cellSize);
        //console.log(this.cell)

        // Set cell block
        for (let y = 0; y < this.cellSize; y++) {
            for (let z = 0; z < this.cellSize; z++) {
                for (let x = 0; x < this.cellSize; x++) {
                    let offset = this.getCellId(x, y, z)
                    const height = (Math.sin(x / this.cellSize * Math.PI * 4) + Math.sin(z / this.cellSize * Math.PI * 6)) + this.cellSize / 2;
                    if (height > y+1 ) {
                        const offset = y * this.cellSize * this.cellSize +
                            z * this.cellSize +
                            x;
                        this.cell[offset] = 1;
                    }
                }
            }
        }
        for (let y = 0; y < this.cellSize; y++) {
            for (let z = 0; z < this.cellSize; z++) {
                for (let x = 0; x < this.cellSize; x++) {
                    let offset = this.getCellId(x, y, z)
                    if (this.cell[offset]==1){
                        this.cell[offset] = new Voxel(x, y, z)
                        this.cell[offset].createGeometry();

                    }
                }
            }
        }
    }
    getCellId(x, y, z) {
        const {
            cellSize,
            cellSliceSize
        } = this;
        const voxelX = THREE.Math.euclideanModulo(x, cellSize) | 0;
        const voxelY = THREE.Math.euclideanModulo(y, cellSize) | 0;
        const voxelZ = THREE.Math.euclideanModulo(z, cellSize) | 0;
        return voxelY * cellSliceSize +
            voxelZ * cellSize +
            voxelX;
    };
}

let bgMesh;
let bgScene;

class World {
    constructor() {
        let sunHemi = new THREE.HemisphereLight(0xaaaaaa, 10);
        let sunDirectional = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        scene.add(sunHemi);
        scene.add(sunDirectional);

        bgScene = new THREE.Scene();
        let loader = new THREE.TextureLoader();
        let texture = loader.load(
            '/img/sky.png',
        );
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;

        let shader = THREE.ShaderLib.equirect;
        let material2 = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide,
        });
        material2.uniforms.tEquirect.value = texture;
        let plane = new THREE.BoxBufferGeometry(2, 2, 2);
        bgMesh = new THREE.Mesh(plane, material2);
        bgScene.add(bgMesh);

        // Adds in game colored axis to help with directions
        let axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        //Creates ground
        ground = new Chunk(0, 0, 0);
    }
    render() {
        bgMesh.position.copy(camera.position);
        renderer.render(bgScene, camera);
    }
}