class Ground {

    constructor(x, y, z, i, j, k) {
        this.origin = new THREE.Vector3(x, y, z);

        this.side = 2;


        this.floorGeometry = new THREE.BoxGeometry(this.side, this.side, this.side);
        



        // create an array of 2,2,2 cubes and render them
        this.floorArray = new Array(i);

        for (var n = 0; n < i; n++) {
            this.floorArray[n] = new Array(j);
        }

        for (var n = 0; n < i; n++) {
            for (var m = 0; m < j; m++) {
                var floorMaterial = new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    wireframe: true
                });
                this.floorArray[n][m] = new THREE.Mesh(this.floorGeometry, floorMaterial);
                this.floorArray[n][m].position.set(x + n * this.side, y, z + m * this.side);
                
                scene.add(this.floorArray[n][m]);
            }
        }
    }
}