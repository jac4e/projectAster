var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color( 0x8FBCD4 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.set(0,0,10);
function keyControls(){
    document.onkeydown = function(e) {
        switch (e.keyCode){
            case 37: //Left
                camera.rotateY(-0.1);
                break;
            case 38: //Up
                camera.rotateX(-0.1);
                break;
            case 39: //Right
                camera.rotateY(0.1);
                break;
            case 40: //Down
                camera.rotateX(0.1);
                break;
        }
    }
};
var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    keyControls();
    renderer.render( scene, camera );

    keyControls();
};

animate();