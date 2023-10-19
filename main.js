document.addEventListener("DOMContentLoaded", () => {
    const images = [
        { src: "assets/1.jpg", title: "A link to the Past" },
        { src: "assets/2.jpg", title: "Twilight princess" },
        { src: "assets/3.jpg", title: "Skyward Sword" },
        { src: "assets/4.jpg", title: "WindWaker" },
        { src: "assets/5.jpg", title: "Breath of the wild" },
        { src: "assets/6.jpg", title: "Link's awakening" },
    ];

    class Slider {
        constructor(selector, images, prevSelector, nextSelector) {
            this.selector = selector;
            this.images = images;
            this.prevSelector = prevSelector;
            this.nextSelector = nextSelector;
            this.currentSlide = 0;
            this.slider = null;
            this.buildSlider();
        }

        buildSlider() {
            const slider = document.querySelector(this.selector);

            if (!slider) {
                throw new Error("No slider found");
            }
            this.slider = slider;

            this.images.forEach((image, i) => {
                // Une slide
                const slide = document.createElement("div");
                slide.classList.add("slider__item");
                if (i === 0) {
                    slide.classList.add("active");
                }

                // Une balise (node) de <img />
                const imageNode = document.createElement("img");
                imageNode.src = image.src;

                slide.appendChild(imageNode);
                slider.appendChild(slide);
            });
            this.navigate();
        }

        // prev next click
        navigate() {
            const prevBtn = document.querySelector(this.prevSelector);
            const nextBtn = document.querySelector(this.nextSelector);

            if (!prevBtn || !nextBtn) {
                throw new Error("Navigation buttons not found");
            }

            prevBtn.addEventListener("click", () => {
                this.updateSlider(-1);
            });

            nextBtn.addEventListener("click", () => {
                this.updateSlider(1);
            });
        }

        updateSlider(nextIndex) {
            this.currentSlide += nextIndex;
            if (this.currentSlide === this.images.length) {
                this.currentSlide = 0;
            } else if (this.currentSlide === -1) {
                this.currentSlide = this.images.length - 1;
            }

            const slides = this.slider.querySelectorAll(".slider__item");
            slides.forEach((slide, i) => {
                if (i === this.currentSlide - 1) {
                    slide.classList.add("slide__prev");
                    slide.classList.remove("active");
                } else if (i === this.currentSlide) {
                    slide.classList.add("active");
                    slide.classList.remove("slide__prev");
                } else {
                    slide.classList.remove("active");
                    slide.classList.remove("slide__prev");
                }
            });
        }
    }
    const mySlider = new Slider("#slider1", images, ".prev", ".next");
});
