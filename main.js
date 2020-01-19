let scene;
let world;
let camera;
let renderer;
let cube;
let floor;
let player;
let ground;
let time;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var p = true;
var prevTime = performance.now();

function init() {
    //Get html5 canvas and set pointer lock references
    canvas = document.querySelector('#game');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({canvas});

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
    var delta = (time - prevTime) / 1000;
    player.control(Number(moveRight) - Number(moveLeft), Number(moveUp) - Number(moveDown), Number(moveBackward) - Number(moveForward), delta);
    world.update();
    prevTime = time
}

function render() {
    world.render();
    renderer.render(scene, camera);
}
init();

renderer.setAnimationLoop(() => {
    update();
    render();
})