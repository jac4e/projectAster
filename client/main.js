import * as THREE from '/lib/three.module.js'
import * as physicsEngine from '/physicsEngine.js'
import Player from '/player.js'
import Planet from '/planet.js'
import Universe from '/universe.js'
import * as UI from '/ui.js'
import Controls from '/controls.js'

let scene
let camera
let renderer
let player
let canvas
let universe
let planets
let controls
let clock = new THREE.Clock()

let n = 3

function init() {
    //Get html5 canvas and set pointer lock references
    canvas = document.querySelector("body > canvas")
    console.log(canvas)
    scene = new THREE.Scene()

    // Initialize Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    // Setup renderer
    renderer = new THREE.WebGLRenderer({
        canvas
    })

    renderer.autoClearColor = false

    renderer.setSize(window.innerWidth, window.innerHeight)
    // will need to add autosize

    //Game stuff
    universe = new Universe(scene)

    spawnBodies("random",25)
    player = new Player(0, 0, 500)
    controls = new Controls(player)

    debugMenu = new UI.debug(physicsEngine.objectArray)
}

function spawnBodies(spawningType, n) {
    // Evenly space cube
    switch (spawningType){
        case "cube":
            let spacing = 30
            let num = 0
            planets = new Array(n * n * n)
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    for (let k = 0; k < n; k++) {
                        planets[num] = new Planet(spacing / 3, 100, new THREE.Vector3(spacing * i, spacing * j, spacing * k))
                        num += 1
                    }
                }
            }
            break
        case "random":
            planets = new Array(n)
            for (let i = 0; i < n; i++){
                planets[i] = new Planet(10, 100, new THREE.Vector3(Math.random()*150 - 75, Math.random()*150 - 75, Math.random()*150 - 75)) 
            }
            break
        case "system":
            planets = [{
                radius: 300,
                mass: 10000,
                pos: new THREE.Vector3(0,0,0)
            },
            {
                radius: 30,
                mass: 30 * 3,
                pos: new THREE.Vector3(800,0,0)
            }]
            console.log(planets[1].pos.clone().distanceTo(planets[0].pos))
            const velocity = new THREE.Vector3(0, Math.sqrt( physicsEngine.g * planets[0].mass / 800 ), 0 )
            console.log(velocity)
            planets[0] = new Planet(planets[0].radius, planets[0].mass, planets[0].pos)
            planets[1] = new Planet(planets[1].radius, planets[1].mass, planets[1].pos)
            planets[1].velocity = velocity
            break
    }
    planets.forEach((planet) => {
        scene.add(planet)
        // planet.label = new UI.Label()
        // planet.label.updateInner(planet.uuid)
    })
    player = new Player(0, 0, 50)
    controls = new Controls(player)
}

function update() {
    camera.position.copy(player.position)
    camera.quaternion.setFromEuler(player.rotation)
    universe.updateSkybox(player.position)
}

function fixedUpdate() {
    //update camera quaternion from players
    player.velocity.copy(controls.movementVector.applyEuler(player.rotation).multiplyScalar(10))
    camera.updateMatrixWorld()
    planets.forEach((planet) => {
        planet.label.updatePosition(planet.position, camera)
    })
}

function render() {
    universe.render(renderer, camera)
    renderer.render(scene, camera)
}

init()
setInterval(fixedUpdate, 5)
const physicsTimeStep = 5
// Running collision detection and state updates asynchronously and different time steps prevents object penetration 
setInterval(physicsEngine.updateState, physicsTimeStep)
setInterval(physicsEngine.detectCollisions, physicsTimeStep / 5)

renderer.setAnimationLoop(() => {
    update()
    render()
})