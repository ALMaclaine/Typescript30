// Not a ton of code, but hard to
const nav: HTMLDivElement = document.querySelector('#main');
let topOfNav: number = nav.offsetTop;

function fixNav(e: MouseEvent): void {
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = `${0}`;
    }
}

window.addEventListener('scroll', fixNav);
