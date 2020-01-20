let scene;
let world;
let camera;
let renderer;
let player;
let ground;
let time;
let canvas;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let p = true;
let prevTime = performance.now();

function init() {
    //Get html5 canvas and set pointer lock references
    canvas = document.querySelector('#game');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        canvas
    });

    renderer.autoClearColor = false;

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new Controls();
    controls.connect();

    world = new World();

    //Game stuff
    player = new Player(2, 6, 8);
    document.addEventListener('mousemove', player.mouseMove);
};

function update() {
    let delta = (time - prevTime) / 1000;
    if (moveRight || moveLeft || moveUp || moveDown || moveForward || moveBackward) {
        player.control(Number(moveRight) - Number(moveLeft), Number(moveUp) - Number(moveDown), Number(moveBackward) - Number(moveForward), delta);
        requestRender();
    }
    prevTime = time
}

let renderRequested = false;

function render() {
    renderRequested = undefined;
    world.render();
    renderer.render(scene, camera);
}

function requestRender() {
    if (!renderRequested) {
        renderRequested = true;
        render();
    }
}

init();
requestRender();

renderer.setAnimationLoop(() => {
    update();
})