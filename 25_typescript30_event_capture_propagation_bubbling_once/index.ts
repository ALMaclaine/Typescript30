const divs: NodeListOf<HTMLDivElement> = document.querySelectorAll('div');
const button: HTMLButtonElement = document.querySelector('button');

function logText(): void {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
}

divs.forEach((div: HTMLDivElement): void => div.addEventListener('click', logText, {
    capture: false,
    once: true
}));

button.addEventListener('click', (): void => {
    console.log('Click!!!');
}, {
    once: true
});
