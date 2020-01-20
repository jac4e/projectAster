// Will need to add mouse movement controls to here and add custom event listeners for each control type
// then those can be be added to functino in player.js or wherever else needed

class Controls {
    constructor() {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    }

    connect() {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener("click", this.mouseClick);
        document.addEventListener('pointerlockchange', this.pause); //For future use when we implement a pause menu
    }

    keyDown(e) {
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

    keyUp(e) {
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

    mouseClick(e) {
        canvas.requestPointerLock()
        p = false;
    }

    pause(e) {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            p = false;
        } else {
            p = true;
        }
    }
}