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
    planets = new Array(n)
    // for (let i = 0; i<n;i++){
    //     let x = Math.floor(Math.random() * 200) - 100
    //     let y = Math.floor(Math.random() * 200) - 100
    //     let z = Math.floor(Math.random() * 200) - 100
    //     console.log(x)
    //     planets[i] = new Planet(5,100,new THREE.Vector3(x,y,z))
    // }
    // x = 0.7494421910777922289898659 * -5
    // y = 1.1501789857502275024030202 * -5
    planets[0] = new Planet(5, 10, new THREE.Vector3(-15, 0, 0))
    // //planets[0].velocity.copy(new THREE.Vector3(x*-0.5,y*-0.5,0))
    planets[1] = new Planet(5, 10, new THREE.Vector3(0, 0, 0))
    // //planets[1].velocity.copy(new THREE.Vector3(x,y,0))
     planets[2] = new Planet(5, 10, new THREE.Vector3(-7, 10, 0))
    // //planets[2].velocity.copy(new THREE.Vector3(x*-0.5,y*-0.5,0))
    planets.forEach((planet) => {
        planet.label = new UI.Label()
        planet.label.updateInner([planet.uuid])
        scene.add(planet)
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
    physicsEngine.updateState()
    player.velocity.copy(controls.movementVector.applyEuler(player.rotation).multiplyScalar(1))
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