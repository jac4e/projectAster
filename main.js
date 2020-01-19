let scene;
let camera;
let renderer;
let cube;
let floor;
let player;
let ground;
let bgMesh;
let bgScene;
let time;
var moveForward= false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var p = true;
var prevTime = performance.now();

function keyDown(e) {
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

function keyUp(e) {
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
    ground = new Block(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
        canvas: game
    });

    renderer.autoClearColor = false;

    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mouse and Keyboard control listeners
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('mousemove', player.mouseMove);
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

    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
};

function pause(e) {
    if (document.pointerLockElement === gameCanvas ||
        document.mozPointerLockElement === gameCanvas) {
        p = false;
    } else {
        p = true;
    }
}

function update() {
    var delta = ( time - prevTime ) / 1000;
    player.control(Number(moveRight)-Number(moveLeft),Number(moveUp)-Number(moveDown),Number(moveBackward)-Number(moveForward),delta);
    prevTime = time
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