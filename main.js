let scene;
let camera;
let renderer;
let cube;
let floor;
let player;
let ground;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8FBCD4);

    player = new Player(0,10,25);
    ground = new Ground(0,0,0,5,5,0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

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

function keyControls() {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 87: //W
                player.control(0,0,-1,0,0,0)
                break;
            case 65: //A
                player.control(-1,0,0,0,0,0)
                break;
            case 83: //S
                player.control(0,0,1,0,0,0)
                break;
            case 68: //D
                player.control(1,0,0,0,0,0)
                break;
            case 32: //Space
                player.control(0,1,0,0,0,0)
                break;
            case 17: //Control
                player.control(0,-1,0,0,0,0)
                break;
        }
        console.log(e.keyCode);
    }
};

function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    keyControls();
}

function render() {
    renderer.render(scene, camera);
};
init();

renderer.setAnimationLoop(() => {
    update();
    render();
})