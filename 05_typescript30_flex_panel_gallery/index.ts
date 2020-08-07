const panels: NodeListOf<HTMLDivElement> = document.querySelectorAll('.panel');

function toggleOpen(): void {
    console.log('Hello');
    this.classList.toggle('open');
}

function toggleActive(e): void {
    console.log(e.propertyName);
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach((panel: HTMLDivElement): void => panel.addEventListener('click', toggleOpen));
panels.forEach((panel: HTMLDivElement): void => panel.addEventListener('transitionend', toggleActive));
