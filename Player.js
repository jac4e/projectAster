class Player {
    constructor(x, y, z) {
        this.spawn = new THREE.Vector3(x, y, z)
        this.accel = new THREE.Vector3(0, 0, 0)
        this.vel = new THREE.Vector3(0, 0, 0)
        this.maxSpeed = 0.1
        this.position = this.spawn
        this.rotation = new THREE.Euler(0,0,0,'YXZ')
        console.log(this.rotation)
    }
    movement(translate) {
        this.position.add(
            translate.applyEuler(this.rotation).multiplyScalar(this.maxSpeed)
        )
    }
}