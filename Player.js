class Player {
    constructor(x, y, z) {
        this.spawn = new THREE.Vector3(x, y, z);
        this.accel = new THREE.Vector3(0, 0, 0);
        this.vel = new THREE.Vector3(0, 0, 0);
        this.maxSpeed = 0.1;
        camera.position.set(x, y, z);
    }
    control(x, y, z, delta) {
        camera.translateX(x * this.maxSpeed);
        camera.translateY(y * this.maxSpeed);
        camera.translateZ(z * this.maxSpeed);
    }
    mouseMove(e) {
        if (p == false) {
            var euler = new THREE.Euler(0, 0, 0, 'YXZ');
            euler.setFromQuaternion(camera.quaternion);
            var maxY = window.innerHeight / 2;
            var maxX = window.innerWidth / 2;
            euler.y -= e.movementX / maxX * Math.PI / 2
            euler.x -= e.movementY / maxY * Math.PI / 2
            euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
            camera.quaternion.setFromEuler(euler);
        }
    }
}