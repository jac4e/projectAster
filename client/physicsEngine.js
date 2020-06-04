let physicsObjects = []
const zeroVector = new THREE.Vector3(0, 0, 0)
const g = 0.3
const deltaTime = 0.1
//Colliders
// class ColliderSphere extends THREE.Object3D{
//     constructor(r){
//         this.radius =
//     }
// }

class physicsObject extends THREE.Object3D {
    constructor() {
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
    get gravityVector() {

    }
    updateGravity(other) {
        let positionVector = other.position.clone().sub(this.position)
        let magnitude = g * (this.mass * other.mass) / this.position.distanceToSquared(other.position)
        let deltaForce = positionVector.clone().normalize().multiplyScalar(magnitude)
        this.addForce(`gravity-${other.uuid}`, deltaForce)
        other.addForce(`gravity-${this.uuid}`, deltaForce.negate())
    }
    static updateState() {
        let physicsObjectArray = [...physicsObjects];
        let loopAmt = physicsObjectArray.length
        for (let i = 0; i < loopAmt; i++) {
            let object = physicsObjectArray.pop()
            // sum all forces of object
            let totalForce = zeroVector.clone()
            for (const [key, value] of Object.entries(object.forces)) {
                totalForce.add(value)
            }
            // update objects acceleration and velocity
            object.acceleration.copy(totalForce.clone().divideScalar(object.mass))
            object.velocity.add(object.acceleration.clone().multiplyScalar(deltaTime))
            let newPosition = object.position.clone().add(object.velocity.clone().multiplyScalar(deltaTime))
            // Run code that requires another body 
            for (let j = 0; j < physicsObjectArray.length; j++) {
                let objectB = physicsObjectArray[j]
                if (!(object instanceof Player) && !(objectB instanceof Player)) {
                    let position = objectB.position.clone().sub(object.position)
                    let distance = position.length()
                    let noGo = object.radius + objectB.radius
                    if (distance < noGo) {
                        // Lerp forward until objects are touching
                        let moveDistance = object.position.distanceTo(newPosition)
                        //object.position.lerp(newPosition, 1 - (noGo - distance) / moveDistance)
                        // Collision Resolution
                        let coefficientOfRestitution = 0.1
                        let massOneCoefficient = 2 * objectB.mass / (object.mass + objectB.mass)
                        let massTwoCoefficient = 2 * object.mass / (object.mass + objectB.mass)
                        let centerOne = object.position.clone().sub(objectB.position)
                        let centerTwo = objectB.position.clone().sub(object.position)
                        let vectorOneDot = object.velocity.clone().sub(objectB.velocity).dot(centerOne)
                        let vectorTwoDot = objectB.velocity.clone().sub(object.velocity).dot(centerTwo)
                        object.velocity.sub(centerOne.multiplyScalar(massOneCoefficient * vectorOneDot / (centerOne.lengthSq()))).multiplyScalar(coefficientOfRestitution)
                        objectB.velocity.sub(centerTwo.multiplyScalar(massTwoCoefficient * vectorTwoDot / (centerTwo.lengthSq()))).multiplyScalar(coefficientOfRestitution)
                        // Normal Forces
                        let externalA = zeroVector.clone() // External force applied on A
                        let normalA = zeroVector.clone() // Normal force applied on A
                        let externalB = zeroVector.clone() // ditto
                        let normalB = zeroVector.clone() // ditto
                        for (const [name, force] of Object.entries(object.forces)) {
                            if (name.includes("gravity")) {
                                if (name.includes(`gravity-${objectB.uuid}`)) {
                                    normalA = force.clone().projectOnVector(position).negate()
                                } else {
                                    externalB.add(force)
                                }
                            }
                        }
                        for (const [name, force] of Object.entries(objectB.forces)) {
                            if (name.includes("gravity")) {
                                if (name.includes(`gravity-${object.uuid}`)) {
                                    normalB = force.clone().projectOnVector(position).negate()
                                } else {
                                    externalA.add(force)
                                }
                            }
                        }
                        object.addForce(`normal-${objectB.uuid}`, normalA)
                        objectB.addForce(`normal-${object.uuid}`, normalB)
                        object.addForce(`external-${objectB.uuid}`, externalA.projectOnVector(position).negate())
                        objectB.addForce(`external-${object.uuid}`, externalB.projectOnVector(position))
                    } else {
                        // Set Normal Forces to Zero
                        object.addForce(`normal-${objectB.uuid}`, zeroVector.clone())
                        objectB.addForce(`normal-${object.uuid}`, zeroVector.clone())
                        object.addForce(`external-${objectB.uuid}`, zeroVector.clone())
                        objectB.addForce(`external-${object.uuid}`, zeroVector.clone())
                    }
                    object.updateGravity(objectB)
                }
            }
            object.position.add(object.velocity.clone().multiplyScalar(deltaTime))
        }
    }
    addForce(name, forceVector) {
        //    console.log(`${name}: ${forceVector.x.toFixed(2)} ${forceVector.y.toFixed(2)} ${forceVector.z.toFixed(2)}`)
        this.forces[name] = forceVector.clone()
    }
}