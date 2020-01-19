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
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   
    renderer = new THREE.WebGLRenderer({canvas});

    renderer.autoClearColor = false;

    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mouse and Keyboard control listeners
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener("click", mouseClick);
    document.addEventListener('pointerlockchange', pause); //For future use when we implement a pause menu

    // Functions

    function keyDown(e) {
        if (p == false) {
            switch (e.code) {
                case 'KeyW':
                    moveForward = true;
                    break;
                case 'KeyA':
                    moveLeft = true;
                    break;
                case 'KeyS':
                    moveBackward = true;
                    break;
                case 'KeyD':
                    moveRight = true;
                    break;
                case 'Space':
                    moveUp = true;
                    break;
                case 'ShiftLeft':
                    moveDown = true;
                    break;
            }
        }
    }

    function keyUp(e) {
        if (p == false) {
            switch (e.code) {
                case 'KeyW':
                    moveForward = false;
                    break;
                case 'KeyA':
                    moveLeft = false;
                    break;
                case 'KeyS':
                    moveBackward = false;
                    break;
                case 'KeyD':
                    moveRight = false;
                    break;
                case 'Space':
                    moveUp = false;
                    break;
                case 'ShiftLeft':
                    moveDown = false;
                    break;
            }
        }
    }

    function mouseClick(e) {
        canvas.requestPointerLock()
        p = false;
    }

    function pause(e) {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            p = false;
        } else {
            p = true;
        }
    }

    //Lighting
    

    world = new World();

    //Game stuff
    player = new Player(2, 6, 8);
    document.addEventListener('mousemove', player.mouseMove);
};

function update() {
    world.update();
    var delta = (time - prevTime) / 1000;
    player.control(Number(moveRight) - Number(moveLeft), Number(moveUp) - Number(moveDown), Number(moveBackward) - Number(moveForward), delta);
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