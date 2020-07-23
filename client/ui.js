import * as THREE from '/lib/three.module.js'

import * as physicsEngine from '/physicsEngine.js'

export class debug {
    // Debug UI Structure
    //  Dropdown containing UUID's of all physics objects
    //  Force diagram of selected object
    //  Acceleration
    //  Velocity
    //  Position
    constructor(objectArray){  
        this.menu = document.createElement('div')
        this.menu.style.position = 'absolute'
        this.menu.style.width = 100
        this.menu.style.height = 100
        this.menu.style.backgroundColor = 'hsla(0,0%,0%,0.5)'
        this.menu.style.color = 'white'
        this.menu.style.top = '0px'
        this.menu.style.left = '0px'
        this.menu.style.zIndex = "1000"
        this.menu.style.padding = '20px 20px 20px 20px'
        this.objects = objectArray
        this.objectSelector = document.createElement('select')
        this.timeSlider = document.createElement('input')
        this.timeSlider.type = 'range'
        this.timeSlider.min = 1
        this.timeSlider.max = 50
        this.timeSlider.value = 5
        this.timeSlider.oninput = physicsEngine.updateDeltaTime
        this.text = document.createElement('p')
        this.menu.appendChild(this.timeSlider)
        this.menu.appendChild(this.objectSelector)
        this.menu.appendChild(this.text)
        document.querySelector('body').appendChild(this.menu)
        this.populateSelector()
    }
    populateSelector() {
        this.objects.forEach((object) => {
            let option = document.createElement('option')
            option.innerText = object.uuid
            option.value = object.uuid
            this.objectSelector.appendChild(option)
        })
    }
    updateForceDiagram(object){
        let string = "\n"
        for (const [key, value] of Object.entries(object.forces)) {
            string = string + `${key} ${this.vectorToString(value)}\n`
        }
        return string
    }
    vectorToString(vector) {
        let precision = 4
        // Add sign detection and resolution to prevent text jittering
        return `${vector.x.toFixed(precision)} ${vector.y.toFixed(precision)} ${vector.z.toFixed(precision)}`
    }
    updateObjectInfo() {
        let objectID = this.objectSelector.options[this.objectSelector.selectedIndex].value
        this.objects.forEach((object) => {
            if(object.uuid == objectID){
                //this.updateForceDiagram(object)
                this.text.innerText = `Acceleration: ${this.vectorToString(object.acceleration)}
                Velocity: ${this.vectorToString(object.velocity)}
                Position: ${this.vectorToString(object.position)}`
            }
        })
    }
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