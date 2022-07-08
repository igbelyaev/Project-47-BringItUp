import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, slides) {
        super(container, next, prev, slides);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        // if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        //     this.container.appendChild(this.slides[0]); // slide
        //     this.container.appendChild(this.slides[1]); // button
        //     this.container.appendChild(this.slides[2]); // button
        //     this.decorizeSlides();
        // } else if (this.slides[1].tagName == "BUTTON") {
        //     this.container.appendChild(this.slides[0]); // slide
        //     this.container.appendChild(this.slides[1]); // button
        //     this.decorizeSlides();
        // } else {
        //     this.container.appendChild(this.slides[0]);
        //     this.decorizeSlides();
        // }

        if (this.slides[this.slides.length-1].tagName == "BUTTON") {
            this.slides[this.slides.length-2].before(this.slides[0]);
        } else {
            this.container.appendChild(this.slides[0]);
        }
        
        this.decorizeSlides();
    }
    
    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            // for (let i = this.slides.length - 1; i > 0; i--) {
            //     if (this.slides[i].tagName !== "BUTTON") {
            //         let active = this.slides[i];
            //         this.container.insertBefore(active, this.slides[0]);
            //         this.decorizeSlides();
            //         break;
            //     }
            // } 
            if (this.slides[this.slides.length-1].tagName == "BUTTON") {
                this.slides[0].before(this.slides[this.slides.length-3]);
                this.decorizeSlides();
            } else {
                this.slides[0].before(this.slides[this.slides.length-1]);
                this.decorizeSlides();
            }   
        });
    }

    autoSwitch() {
        if (this.autoplay) {
            this.switchOn();

            this.container.addEventListener('mouseover', () => {
               clearInterval(this.switching); 
            });
            this.container.addEventListener('mouseleave', () => {
                this.switchOn(); 
            });
            this.prev.addEventListener('mouseover', () => {
               clearInterval(this.switching); 
            });
            this.prev.addEventListener('mouseleave', () => {
                this.switchOn(); 
            });
            this.next.addEventListener('mouseover', () => {
               clearInterval(this.switching); 
            });
            this.next.addEventListener('mouseleave', () => {
                this.switchOn(); 
            });
        }
    }

    switchOn() {
        this.switching = setInterval(() => this.nextSlide(), 5000);
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();
        this.autoSwitch();
    }
}

