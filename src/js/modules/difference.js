export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        // this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
        this.duration = 1000;
    } 

    bindTriggers(officer, counter, items) {
    // bindTriggers() {
        // this.oldOfficer.querySelector('.plus').addEventListener('click', () => {
        //     if (this.oldCounter !== this.oldItems.length - 2) {
        //         this.oldItems[this.oldCounter].style.display = 'flex';
        //         this.oldCounter++;
        //     } else {
        //         this.oldItems[this.oldCounter].style.display = 'flex';
        //         this.oldItems[this.oldItems.length - 1].remove();
        //     }
        // });

        // this.newOfficer.querySelector('.plus').addEventListener('click', () => {
        //     if (this.newCounter !== this.newItems.length - 2) {
        //         this.newItems[this.newCounter].style.display = 'flex';
        //         this.newCounter++;
        //     } else {
        //         this.newItems[this.newCounter].style.display = 'flex';
        //         this.newItems[this.newItems.length - 1].remove();
        //     }
        // });
        officer.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                this.start = Date.now();
                this.animateElement(items[counter], this.start);
                counter++;
            } else {
                items[counter].style.display = 'flex';
                this.start = Date.now();
                this.animateElement(items[counter], this.start);
                items[items.length - 1].remove();
            }
        });
    }

    // hideItems() {
    //     this.oldItems.forEach((item, i, arr) => {
    //         if (i !== arr.length - 1) {
    //             item.style.display = 'none';
    //         }
    //     });

    //     this.newItems.forEach((item, i, arr) => {
    //         if (i !== arr.length - 1) {
    //             item.style.display = 'none';
    //         }
    //     });
    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    animateElement(item, start) {
        let progress,
            stamp = Date.now();
        
        progress = ((stamp - start)/this.duration).toFixed(2);
        // console.log(start, stamp);
        // console.log(progress);
        // console.log(this.duration);

        item.style.opacity = String(progress);
        console.log(item.style.opacity);

        if (item.style.opacity >= 1) {    
        } else { 
            // requestAnimationFrame(this.animateSlide(slide, start).bind(this));    
            requestAnimationFrame(() => this.animateElement(item, start));
        } 
    }

    init() {
        this.hideItems(this.oldItems);
        this.hideItems(this.newItems);
        this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
        this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    }
}