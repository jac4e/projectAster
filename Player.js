class Player {
    constructor(x, y, z) {
        this.spawn = new THREE.Vector3(x, y, z);
        this.accel = new THREE.Vector3(0, 0, 0);
        this.vel = new THREE.Vector3(0, 0, 0);
        this.pos = new THREE.Vector3(0, 0, 0);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(x, y, z);
    }
    control(x, y, z, rotX, rotY, rotZ) {
        camera.translateX(x);
        camera.translateY(y);
        camera.translateZ(z);
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