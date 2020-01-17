class Player {
    constructor(x, y, z) {
        this.spawn = new THREE.Vector3(x, y, z);
        this.accel = new THREE.Vector3(0, 0, 0);
        this.vel = new THREE.Vector3(0, 0, 0);
        this.pos = new THREE.Vector3(0, 0, 0);
        this.maxSpeed = 0.1;
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(x, y, z);
    }
    control(x, y, z, rotX, rotY, rotZ) {
        // Camera rotating is bugged as it currently is rotating about the local axis, need to rotate around world axis somehow
        camera.translateX(x*this.maxSpeed);
        camera.translateY(y*this.maxSpeed);
        camera.translateZ(z*this.maxSpeed);
        camera.rotateX(rotX);
        camera.rotateY(rotY);
        camera.rotateZ(rotZ);
    }
    updateCamera() {
        this.viewpoint.x = this.pos.x
        this.viewpoint.y = this.pos.y
        this.viewpoint.z = this.pos.z
    }
}