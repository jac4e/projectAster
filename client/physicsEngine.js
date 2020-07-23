import * as THREE from '/lib/three.module.js'

export let objectArray = []
const zeroVector = new THREE.Vector3(0, 0, 0)
const g = 0.3
let deltaTime = 0.05

export function updateDeltaTime() {
    deltaTime = this.value/100
    console.log('deltaTime:',deltaTime)
}

function calculateGravity(objectA, objectB) {
    let positionVector = objectB.position.clone().sub(objectA.position)
    let magnitude = g * (objectA.mass * objectB.mass) / objectA.position.distanceToSquared(objectB.position)
    let deltaForce = positionVector.clone().normalize().multiplyScalar(magnitude)
    objectA.addForce(`gravity-${objectB.uuid}`, deltaForce)
    objectB.addForce(`gravity-${objectA.uuid}`, deltaForce.negate())
}
export function updateState() {
    // Creates copy physicsObjectArray of the objectArray and pops each
    // The physicsObjectArray then serves as an array of objects yet to simulated
    // This allows us to simulate the interactions between each physics object only once
    // Probably can be done differently, need to look into that
    let physicsObjectArray = [...objectArray];
    let loopAmt = physicsObjectArray.length
    for (let i = 0; i < loopAmt; i++) {
        let object = physicsObjectArray.pop()
        // sum all forces of object
        let totalForce = zeroVector.clone()
        for (const [name, force] of Object.entries(object.forces)) {
            totalForce.add(force)
        }
        // update objects acceleration and velocity
        object.acceleration.copy(totalForce.clone().divideScalar(object.mass))
        object.velocity.add(object.acceleration.clone().multiplyScalar(deltaTime))
        let newPosition = object.position.clone().add(object.velocity.clone().multiplyScalar(deltaTime))
        // Run code that requires another body 
        for (let j = 0; j < physicsObjectArray.length; j++) {
            let objectB = physicsObjectArray[j]
            if (!(object.player) && !(objectB.player)) {
                let position = objectB.position.clone().sub(object.position)
                let distance = position.length()

                //Check to consider collision
                if (distance < object.radius + objectB.radius) {
                    console.log(distance)
                    // Compute relative velocities, if close to zero, do not compute the following
                    const relVel = objectB.velocity.clone().sub(object.velocity)
                    console.log(relVel.length)
                    // Collision Resolution
                    
                    let coefficientOfRestitution = 0.8
                    const normal = objectB.position.clone().sub(object.position)
                    object.velocity.sub(object.velocity.clone().projectOnVector(normal).multiplyScalar(1+coefficientOfRestitution))
                    objectB.velocity.sub(objectB.velocity.clone().projectOnVector(normal).multiplyScalar(1+coefficientOfRestitution))

                    // Normal Forces
                    let normalA = zeroVector.clone() // Normal force applied on A
                    let normalB = zeroVector.clone() // ditto
                    for (const [name, force] of Object.entries(object.forces)) {
                        if (!name.includes("normal")) {
                            normalA.add(force.clone())
                        }
                    }
                    for (const [name, force] of Object.entries(objectB.forces)) {
                        if (!name.includes("normal")) {
                             normalB.add(force.clone())
                        }
                    }
                    object.addForce(`normal-${objectB.uuid}`, normalA.projectOnVector(position).negate())
                    objectB.addForce(`normal-${object.uuid}`, normalB.projectOnVector(position).negate())
                } else {
                    // Set Normal Forces to Zero
                    object.addForce(`normal-${objectB.uuid}`, zeroVector.clone())
                    objectB.addForce(`normal-${object.uuid}`, zeroVector.clone())
                }
                calculateGravity(object, objectB)
            }
        }
        object.position.add(object.velocity.clone().multiplyScalar(deltaTime))
    }
}

export default class physicsObject extends THREE.Object3D {
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
        objectArray.push(this)
    }

    addForce(name, forceVector) {
        //    console.log(`${name}: ${forceVector.x.toFixed(2)} ${forceVector.y.toFixed(2)} ${forceVector.z.toFixed(2)}`)
        this.forces[name] = forceVector.clone()
    }
}