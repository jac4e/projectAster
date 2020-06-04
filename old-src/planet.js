let test = 1
class Planet extends physicsObject{
    constructor(radius, mass, startPos) {
        super(false) // route spawn into physicsObject
        this.radius = radius
        this.mass = mass
        let geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32)
        let material = new THREE.MeshBasicMaterial({
            color: 0xffff00
        })
        let sphere = new THREE.Mesh(geometry, material);
        this.attach(sphere)
        
        scene.add(this)
        this.position.copy(startPos)
        // this.velocity.copy(startPos.negate().divideScalar(30))
        console.log(`physicsObject:spawned ${this.uuid} at ${startPos.x} ${startPos.y} ${startPos.z}`)
    }
}