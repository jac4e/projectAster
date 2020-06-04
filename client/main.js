let scene
let world
let camera
let renderer
let player
let ground
let canvas

let clock = new THREE.Clock()

let n = 3

function init() {
    //Get html5 canvas and set pointer lock references
    canvas = document.querySelector('#game')

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
    universe = new Universe()
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
    planets[2] = new Planet(5, 10, new THREE.Vector3(35, 0, 0))
    // //planets[2].velocity.copy(new THREE.Vector3(x*-0.5,y*-0.5,0))
    planets.forEach((planet) => {
        planet.label = new Label()
    })
    player = new Player(0, 0, 50)
    controls = new Controls(player)
    document.addEventListener('mousemove', (e) => {
        controls.mouseMove(e)
    })
    debugMenu = new Menu("Debug")
    fps = debugMenu.addText("FPS:")
    debugMenu.insert()
}

function update() {
    camera.position.copy(player.position)
    camera.quaternion.setFromEuler(player.rotation)
    universe.updateSkybox(player.position)
}

function fixedUpdate() {
    //update camera quaternion from players
    physicsObject.updateState()
    player.velocity.copy(controls.movementVector.applyEuler(player.rotation).multiplyScalar(1))
    camera.updateMatrixWorld()
    let decimalPlace = 4
    planets.forEach((planet) => {
        planet.label.updateInner([`ID: ${planet.uuid}`,
        `POS: ${planet.position.x.toFixed(decimalPlace)} ${planet.position.y.toFixed(decimalPlace)} ${planet.position.z.toFixed(decimalPlace)}\n`,
        `VEL: ${planet.velocity.x.toFixed(decimalPlace)} ${planet.velocity.y.toFixed(decimalPlace)} ${planet.velocity.z.toFixed(decimalPlace)}\n`,
        `ACC: ${planet.acceleration.x.toFixed(decimalPlace)} ${planet.acceleration.y.toFixed(decimalPlace)} ${planet.acceleration.z.toFixed(decimalPlace)}\n`])
        planet.label.updatePosition(planet.position)
    })
}

function render() {
    debugMenu.updateText(`FPS: ${(1/clock.getDelta()).toFixed(2)}`, fps)
    universe.render()
    renderer.render(scene, camera)
}

init()
setInterval(fixedUpdate, 5)

renderer.setAnimationLoop(() => {
    update()
    render()
})