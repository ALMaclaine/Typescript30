function debounce(func: () => void, wait: number = 10, immediate: boolean = true): (() => void) {
    let timeout: number;
    return function () {
        const context: () => void = this;
        const args: IArguments = arguments;
        const later: () => void = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow: boolean = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

interface HTMLImageElement {
    originalSrc: string
}

function checkSlide(): void {
    const sliderImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('.slide-in');
    for (let i: number = 0; i < sliderImages.length; i++) {
        const sliderImage: HTMLImageElement = sliderImages[i];
        const slideInAt: number = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom: number = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown: boolean = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast: boolean = window.scrollY < imageBottom + 25;
        if (isHalfShown && isNotScrolledPast && sliderImage.complete) {
            sliderImage.classList.add('active');
        } else {
            if (!sliderImage.classList.contains('active')) continue;
            if (!sliderImage.originalSrc) {
                sliderImage.originalSrc = sliderImage.src;
            }
            sliderImage.classList.remove('active');
            sliderImage.src = sliderImage.originalSrc + `?${Date.now()}`;
        }
    }
}

window.addEventListener('scroll', debounce(checkSlide));
