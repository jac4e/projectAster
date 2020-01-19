class Player {
    constructor(x, y, z) {
        this.spawn = new THREE.Vector3(x, y, z);
        this.accel = new THREE.Vector3(0, 0, 0);
        this.vel = new THREE.Vector3(0, 0, 0);
        this.maxSpeed = 0.1;
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(x, y, z);
    }
    control(x, y, z, delta) {
        camera.translateX(x*this.maxSpeed);
        camera.translateY(y*this.maxSpeed);
        camera.translateZ(z*this.maxSpeed);
    }
    mouseMove(e) {
        console.log(e)
        if (p == false) {
            var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
            euler.setFromQuaternion( camera.quaternion );
            var maxY = screen.height/2;
            var maxX = screen.width/2;
            //turn mouse movement into a percent of overall screen size and times that by max quarternion rotation (pi/2)
            
            euler.y -= e.movementX/maxX * Math.PI/2 
            euler.x -= e.movementY/maxY * Math.PI/2
            console.log(euler)
            euler.x = Math.max( - Math.PI/2, Math.min( Math.PI/2, euler.x ) );
            camera.quaternion.setFromEuler( euler );
        }
    }
}