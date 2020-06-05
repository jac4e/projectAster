import * as THREE from '/lib/three.module.js'

export class Menu {
    constructor(name) {
        this.heading = document.createElement("h1")
        this.heading.textContent = name
        this.textList = document.createElement("ul")
        this.buttonList = document.createElement("ul")
    }
    addText(text) {
        //creates and appends a list item containing text to the menulist.
        //It assigns an random ID to the element and returns it.
        let li = document.createElement("li")
        li.innerText = text
        li.id = Math.floor(Date.now() * Math.random())
        console.log(li.id)
        this.textList.appendChild(li)
        return li.id
    }
    updateText(newText, id) {
        //Updates the text of a list element using the given ID
        let element = document.getElementById(id)
        element.innerText = newText
    }
    insert() {
        let div = document.createElement("div")
        div.appendChild(this.textList)
        div.appendChild(this.buttonList)
        document.querySelector("body").insertBefore(div, document.querySelector('canvas'))
    }

}
export class Label {
    constructor() {
        this.label = document.createElement('div');
        this.label.style.position = 'absolute';
        //this.label.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        this.label.style.width = 100;
        this.label.style.height = 100;
        this.label.style.backgroundColor = "hsla(0,0%,0%,0.5)";
        this.label.style.color = "white"
        this.label.innerHTML = "Null";
        this.label.style.top = 200 + 'px';
        this.label.style.left = 200 + 'px';
        document.body.appendChild(this.label);
    }
    updateInner(textArray) {
        this.label.innerHTML = ''
        textArray.forEach((text) => {
            this.label.innerHTML = this.label.innerHTML + `<li>${text}</li>`
        })
    }
    updatePosition(objectPosition,camera) {
        let vector = objectPosition.clone().project(camera)
        if (vector.z > 1) {
            this.label.style.zIndex = "-1"
        } else {
            this.label.style.zIndex = "1"
            this.label.style.left = (vector.x + 1) / 2 * window.innerWidth + 'px'
            this.label.style.top = -(vector.y - 1) / 2 * window.innerHeight + 'px'
        }
    }
}