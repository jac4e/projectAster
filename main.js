let scene;
let camera;
let renderer;
let cube;
let floor;
let player;
let ground;
let bgMesh;
let bgScene;
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

    player = new Player(0, 0, 2);
    // ground = new Ground(0, 0, 0, 20, 20, 0);
    ground = new Block(0,0,0);

    renderer = new THREE.WebGLRenderer({
        canvas: game
    });

    renderer.autoClearColor = false;

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

    // Adds skybox
    bgScene = new THREE.Scene();
    var loader = new THREE.TextureLoader();
    var texture = loader.load(
        '/img/sky.png',
    );
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    var shader = THREE.ShaderLib.equirect;
    var material2 = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide,
    });
    material2.uniforms.tEquirect.value = texture;
    var plane = new THREE.BoxBufferGeometry(2, 2, 2);
    bgMesh = new THREE.Mesh(plane, material2);
    bgScene.add(bgMesh);
    
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
    controls()
}

function render() {
    bgMesh.position.copy(camera.position);
    renderer.render(bgScene, camera);
    renderer.render(scene, camera);
};
init();

renderer.setAnimationLoop(() => {
    update();
    render();
})