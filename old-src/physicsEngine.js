let physicsObjects = []
let zeroVector = new THREE.Vector3(0,0,0)
//Colliders
// class ColliderSphere extends THREE.Object3D{
//     constructor(r){
//         this.radius =
//     }
// }

class physicsObject extends THREE.Object3D {
    constructor(collider) {
        super()
        //Linear Dynamics
        this.forces = {}
        this.acceleration = zeroVector.clone()
        this.velocity = zeroVector.clone()
        //Angular Dynamics
        this.torques = {}
        this.angularAcceleration = zeroVector.clone()
        this.angularVelocity = zeroVector.clone()
        this.mass = 0
        physicsObjects.push(this)
    }
    static update() {
        physicsObjects.forEach((object) => {
            let gravity = zeroVector.clone()
            // N-Body Gravity Simulation
            physicsObjects.forEach((objectB) => {
                if (object != objectB) {
                    let deltaForce
                    let position = objectB.position.clone().sub(object.position)
                    let distance = object.position.distanceToSquared(objectB.position)
                    let magnitude = physicsObject.g * (object.mass * objectB.mass) / distance
                    deltaForce = position.clone().normalize().multiplyScalar(magnitude)
                    if (!(object instanceof Player) && !(objectB instanceof Player)) {
                        if (object != objectB) {
                            gravity.add(deltaForce)
                            object.addForce(`gravity-${objectB.uuid}`, deltaForce)
                        }
                    }
                }
            })
            // Collision Detection
            physicsObjects.forEach((objectB) => {
                if (object != objectB) {
                    let position = objectB.position.clone().sub(object.position)
                    let distance = position.length()
                    let normal = gravity.clone().projectOnVector(position)
                    if (distance <= object.radius + objectB.radius) {
                        // Collision Physics
                        object.addForce(`normal-${objectB.uuid}`, normal.negate())
                        objectB.addForce(`normal-${object.uuid}`, normal)
                        //objectB.addForce(`normal-${object.uuid}`,normal)
                        let coefficientOfRestitution = 0.8
                        let massOneCoefficient = 2 * objectB.mass / (object.mass + objectB.mass)
                        let massTwoCoefficient = 2 * object.mass / (object.mass + objectB.mass)
                        let centerOne = object.position.clone().sub(objectB.position)
                        let centerTwo = objectB.position.clone().sub(object.position)
                        let vectorOneDot = object.velocity.clone().sub(objectB.velocity).dot(centerOne)
                        let vectorTwoDot = objectB.velocity.clone().sub(object.velocity).dot(centerTwo)
                        object.velocity.sub(centerOne.multiplyScalar(massOneCoefficient * vectorOneDot / (centerOne.lengthSq()))).multiplyScalar(coefficientOfRestitution)
                        objectB.velocity.sub(centerTwo.multiplyScalar(massTwoCoefficient * vectorTwoDot / (centerTwo.lengthSq()))).multiplyScalar(coefficientOfRestitution)
                    } else {
                        object.addForce(`normal-${objectB.uuid}`, zeroVector.clone())
                        objectB.addForce(`normal-${object.uuid}`, zeroVector.clone())
                    }
                }
            })

            let totalForce = zeroVector.clone()
            for (const [key, value] of Object.entries(object.forces)) {
                totalForce.add(value)
            }

            // Update Acceleration and velocity then interpolate towards new posiiton
            object.acceleration.copy(totalForce.clone().divideScalar(object.mass))
            object.velocity.add(object.acceleration.clone().multiplyScalar(physicsObject.deltaTime))
            let newPosition = object.position.clone().add(object.velocity.clone().multiplyScalar(physicsObject.deltaTime))
            for (let i = 1; i < 100; i++) {
                object.position.lerp(newPosition, i / 100)
            }
        })
    }
    addForce(name, forceVector) {
    //    console.log(`${name}: ${forceVector.x.toFixed(2)} ${forceVector.y.toFixed(2)} ${forceVector.z.toFixed(2)}`)
        this.forces[name] = forceVector
    }
}
physicsObject.g = 0.1
physicsObject.deltaTime = 0.05