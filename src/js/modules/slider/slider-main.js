import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(page, btns) {
        super(page, btns);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // ТЗ п.8 решение препода
        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch(e) {}
        // end

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
        // ТЗ п.8 мое решение
        // if (this.slideIndex == 3) {
        //     const elem = this.slides[2].lastElementChild.firstElementChild.lastElementChild;
        //     elem.style.display = 'none';
        //     setTimeout(function(elem) {
        //         elem.style.display = 'block';
        //     }, 3000, elem);
        // }
        this.start = Date.now();
        this.animateSlide(this.slides[this.slideIndex - 1], this.start);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        // ТЗ п.8 решение препода
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(e) {}
        // end
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }

    animateSlide(slide, start) {
        let progress,
            stamp = Date.now();
        
        progress = ((stamp - start)/this.duration).toFixed(2);
        console.log(start, stamp);
        console.log(progress);

        slide.style.opacity = String(progress);
        console.log(slide.style.opacity);

        if (slide.style.opacity >= 1) {    
        } else { 
            // requestAnimationFrame(this.animateSlide(slide, start).bind(this));    
            requestAnimationFrame(() => this.animateSlide(slide, start));
        } 
    }
}