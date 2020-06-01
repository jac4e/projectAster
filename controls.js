// Will need to add mouse movement controls to here and add custom event listeners for each control type
// then those can be be added to functino in player.js or wherever else needed

class Controls {
    constructor(object) {
        this.object = object
        this.moveForward = false
        this.moveBackward = false
        this.moveLeft = false
        this.moveRight = false
        this.moveUp = false
        this.moveDown = false
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
        let self = this
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
        document.addEventListener("click", this.mouseClick.bind(this));
    }

    keyDown(e) {
        switch (e.code) {
            case 'KeyW':
                this.moveForward = true;
                break;
            case 'KeyA':
                this.moveLeft = true;
                break;
            case 'KeyS':
                this.moveBackward = true;
                break;
            case 'KeyD':
                this.moveRight = true;
                break;
            case 'Space':
                this.moveUp = true;
                break;
            case 'ShiftLeft':
                this.moveDown = true;
                break;
        }
    }

    keyUp(e) {
        switch (e.code) {
            case 'KeyW':
                this.moveForward = false;
                break;
            case 'KeyA':
                this.moveLeft = false;
                break;
            case 'KeyS':
                this.moveBackward = false;
                break;
            case 'KeyD':
                this.moveRight = false;
                break;
            case 'Space':
                this.moveUp = false;
                break;
            case 'ShiftLeft':
                this.moveDown = false;
                break;
        }
    }

    get movementVector(){
        return new THREE.Vector3(Number(this.moveRight) - Number(this.moveLeft), Number(this.moveUp) - Number(this.moveDown), Number(this.moveBackward) - Number(this.moveForward)).multiplyScalar(10);
    }

    mouseClick(e) {
        canvas.requestPointerLock()
    }
    mouseMove(e) {
        // Set player rotation euler and quarternion only
        let maxY = window.innerHeight / 2
        let maxX = window.innerWidth / 2
        this.object.rotation.y -= ((e.movementX / maxX) * Math.PI) / 2
        this.object.rotation.x -= ((e.movementY / maxY) * Math.PI) / 2
        this.object.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.object.rotation.x))
    }
}