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

export function detectCollisions() {
    let physicsObjectArray = [...objectArray]
    const loopAmt = physicsObjectArray.length
    for (let i = 0; i < loopAmt; i++) {
        let objectA = objectArray[i]
        if (objectA.player) continue
        for (let j = 0; j < objectArray.length; j++) {
            let objectB = physicsObjectArray[j]
            if (objectA == objectB || objectB.player) continue
            let position = objectB.position.clone().sub(objectA.position)
            let distance = position.length()
            
            if (distance < objectA.radius + objectB.radius) {
                // Collision Resolution
                // Implementation of oblique impact analysis found in Russel C. Hibbeler's Engineering Mechanics
                const e = 0.5
                const lineOfImpact = objectB.position.clone().sub(objectA.position).normalize()

                const vax1 = objectA.velocity.clone().dot(lineOfImpact)
                const vbx1 = objectB.velocity.clone().dot(lineOfImpact)
                const vax2 = ( objectA.mass * vax1 + objectB.mass * vbx1 - objectB.mass * e * ( vax1 - vbx1 ) ) / ( objectB.mass + objectA.mass )
                const vbx2 = e * (vax1 - vbx1) + vax2

                objectA.velocity.sub(objectA.velocity.clone().projectOnVector(lineOfImpact))
                objectA.velocity.add(lineOfImpact.clone().multiplyScalar(vax2))

                objectB.velocity.sub(objectB.velocity.clone().projectOnVector(lineOfImpact))
                objectB.velocity.add(lineOfImpact.negate().clone().multiplyScalar(vbx2))

                // At or near rest
                const relVel = objectB.velocity.clone().sub(objectA.velocity)
                //console.log(relVel.length())
                let normalA = zeroVector.clone() // Normal force applied on A
                let normalB = zeroVector.clone() // ditto
                for (const [name, force] of Object.entries(objectA.forces)) {
                    if (!name.includes("normal")) {
                        normalA.add(force.clone())
                    }
                }
                for (const [name, force] of Object.entries(objectB.forces)) {
                    if (!name.includes("normal")) {
                        normalB.add(force.clone())
                    }
                }
                objectA.addForce(`normal-${objectB.uuid}`, normalA.projectOnVector(position).negate())
                objectB.addForce(`normal-${objectA.uuid}`, normalB.projectOnVector(position).negate())
            } else {
                // Set Normal Forces to Zero
                objectA.addForce(`normal-${objectB.uuid}`, zeroVector.clone())
                objectB.addForce(`normal-${objectA.uuid}`, zeroVector.clone())
            }
        }
    }
}

export function updateState() {
    let physicsObjectArray = [...objectArray]
    const loopAmt = physicsObjectArray.length
    for (let i = 0; i < loopAmt; i++) {
        let object = physicsObjectArray.pop()
        // console.log(object)
        // sum all forces of object
        let totalForce = zeroVector.clone()
        for (const [name, force] of Object.entries(object.forces)) {
            totalForce.add(force)
        }
        // update linear motion
        object.acceleration.copy(totalForce.clone().divideScalar(object.mass))
        object.velocity.add(object.acceleration.clone().multiplyScalar(deltaTime))

        let newPosition = object.position.clone().add(object.velocity.clone().multiplyScalar(deltaTime))
        // Run code that requires another body 
        for (let j = 0; j < physicsObjectArray.length; j++) {
            let objectB = physicsObjectArray[j]
            if (object == objectB || object.player || objectB.player) continue
            calculateGravity(object, objectB)
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