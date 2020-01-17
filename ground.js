class Ground {
    let floorGeomety;
    let floormaterial;
    constructor() {





    };

    function createGround() {

        // create an area of 2,2,2 cubes and render them
        floorGeometry = new THREE.BoxGeometry(25, 2, 25);
        floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff0f
        });
        floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.set(-1, -1, -1);
        scene.add(floor);

    }
}