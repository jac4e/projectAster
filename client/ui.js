import * as THREE from '/lib/three.module.js'

export class debug {

}

export class Label {
    constructor() {
        this.label = document.createElement('div')
        this.label.style.position = 'absolute'
        this.label.hidden = true
        this.label.style.width = 100
        this.label.style.height = 100
        this.label.style.backgroundColor = "hsla(0,0%,0%,0.5)"
        this.label.style.color = "white"
        this.label.style.top = 200 + 'px'
        this.label.style.left = 200 + 'px'
        document.body.appendChild(this.label)
    }
    updateInner(textArray) {
        this.label.innerHTML = ''
        textArray.forEach((text) => {
            this.label.innerHTML = this.label.innerHTML + `${text}`
        })
    }
    updatePosition(objectPosition,camera) {
        let vector = objectPosition.clone().project(camera)
        if (vector.z > 1) {
            this.label.hidden = true
        } else { 
            this.label.hidden = false
            this.label.style.zIndex = "1"
            this.label.style.left = (vector.x + 1) / 2 * window.innerWidth - this.label.offsetWidth / 2 + 'px' 
            this.label.style.top = -(vector.y - 1) / 2 * window.innerHeight - this.label.offsetHeight / 2+ 'px'
        }
    }
}