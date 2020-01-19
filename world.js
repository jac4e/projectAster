// Check this site on voxels in three.js https://threejsfundamentals.org/threejs/lessons/threejs-voxel-geometry.html

class Block {
    constructor(posX, posY, posZ) {
        this.pos = new THREE.Vector3(posX, posY, posZ);
        this.side = 1;
        this.geometry = new THREE.BoxGeometry(this.side, this.side, this.side);
        var loader = new THREE.TextureLoader();
        this.texture = [
            loader.load('/img/grassBlock_side.png'),
            loader.load('/img/grassBlock_side.png'),
            loader.load('/img/grassBlock_top.png'),
            loader.load('/img/grassBlock_bottom.png'),
            loader.load('/img/grassBlock_side.png'),
            loader.load('/img/grassBlock_side.png')
        ]
        this.materials = new Array(6);
        for(var i = 0; i < 6; i++) {
            this.texture[i].magFilter = THREE.NearestFilter;
            this.texture[i].minFilter = THREE.NearestFilter;
            this.materials[i] = new THREE.MeshBasicMaterial( { map: this.texture[i] } );
        }
        this.material = new THREE.MeshFaceMaterial( this.materials );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }
}

class Chunk{
    constructor(){
        
    }
}

function generateWorld(){

}