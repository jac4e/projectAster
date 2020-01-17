let scene;
let camera;
let renderer;
let cube;
let floor;
let player;
let ground;
var KEY_W = false;
var KEY_A = false;
var KEY_S = false;
var KEY_D = false;
var KEY_SPACE = false;
var KEY_SHIFT = false;
var p = true;

function keyDown(e) {
    switch (e.key) {
        case 'w': //W
            KEY_W = true;
            break;
        case 'a': //A
            KEY_A = true;
            break;
        case 's': //S
            KEY_S = true;
            break;
        case 'd': //D
            KEY_D = true;
            break;
        case ' ': //S
            KEY_S = true;
            break;
        case 'Shift': //D
            KEY_D = true;
            break;
    }
    console.log('down', KEY_W)
}

function keyUp(e) {
    switch (e.key) {
        case 'w': //W
            KEY_W = false;
            break;
        case 'a': //A
            KEY_A = false;
            break;
        case 's': //S
            KEY_S = false;
            break;
        case 'd': //D
            KEY_D = false;
            break;
        case ' ': //S
            KEY_S = false;
            break;
        case 'Shift': //D
            KEY_D = false;
            break;
    }
    console.log('up', e.key)
}

function mouseMove(e) {
    if (p == false) {
        console.log(e.movementX, e.movementY);
        player.control(0, 0, 0, (e.movementY / -50) * 0.0174533, (e.movementX / -50) * 0.0174533, 0)
    }
}

function mouseClick(e) {
    gameCanvas.requestPointerLock()
    p = false;
}

function init() {
    //Get html5 canvas and set pointer lock references
    gameCanvas = document.querySelector('canvas');
    gameCanvas.requestPointerLock = gameCanvas.requestPointerLock || gameCanvas.mozRequestPointerLock;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    player = new Player(0, 10, 25);
    ground = new Ground(0, 0, 0, 5, 5, 0);

    renderer = new THREE.WebGLRenderer({
        canvas: game
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mouse and Keyboard control listeners
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener("click", mouseClick);

    //For future use when we implement a pause menu
    document.addEventListener('pointerlockchange', pause);

    var directionalLight = new THREE.DirectionalLight(0xaaaaaa, 10);
    scene.add(directionalLight);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshStandardMaterial({
        color: 0x00ff00
    });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 2, 0);
    scene.add(cube);

    // var floorGeometry = new THREE.BoxGeometry(25, 2, 25);
    // var floorMaterial = new THREE.MeshStandardMaterial({
    //     color: 0x00ff0f
    // });
    // floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.position.set(-1, -1, -1);
    // scene.add(floor);

};

function pause(e) {
    console.log(e);

    if (document.pointerLockElement === gameCanvas ||
        document.mozPointerLockElement === gameCanvas) {
        p = false;
    } else {
        p = true;
    }
}

function controls() {
    if (KEY_W) {
        player.control(0, 0, -1, 0, 0, 0)
    }
    if (KEY_A) {
        player.control(-1, 0, 0, 0, 0, 0)
    }
    if (KEY_S) {
        player.control(0, 0, 1, 0, 0, 0)
    }
    if (KEY_D) {
        player.control(1, 0, 0, 0, 0, 0)
    }
    if (KEY_SPACE) {
        player.control(0, 1, 0, 0, 0, 0)
    }
    if (KEY_SHIFT) {
        player.control(0, -1, 0, 0, 0, 0)
    }
}

function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls()
}

function render() {
    renderer.render(scene, camera);
};
init();

renderer.setAnimationLoop(() => {
    update();
    render();
})