import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, slides) {
        super(container, next, prev, slides);
    }

    
    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.container.appendChild(this.slides[0]);
        });

        this.prev.addEventListener('click', () => {
            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
    }
}

