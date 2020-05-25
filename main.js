let scene
let world
let camera
let renderer
let player
let ground
let canvas
let initTime = performance.now()
let prevTime = performance.now()

let clock = new THREE.Clock()

function init() {
    //Get html5 canvas and set pointer lock references
    canvas = document.querySelector('#game')

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )

    renderer = new THREE.WebGLRenderer({
        canvas
    })

    renderer.autoClearColor = false

    renderer.setSize(window.innerWidth, window.innerHeight)

    world = new World()

    //Game stuff
    player = new Player(2, 6, 8)
    controls = new Controls(player)
    document.addEventListener('mousemove', (e) => {
        controls.mouseMove(e)
    })
}

function fixedUpdate() {
    
    //update camera quarternion from players
    //console.log(controls.movementVector)
    player.movement(controls.movementVector)
    camera.position.copy(player.position)
    camera.quaternion.setFromEuler(player.rotation)
    world.updateBackground(player.position)
}

function render() {
    clock.getDelta()
    world.render()
    renderer.render(scene, camera)
}

init()
setInterval(fixedUpdate, 5)

renderer.setAnimationLoop(() => {
    render()
})