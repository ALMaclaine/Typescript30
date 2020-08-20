const triggers: NodeListOf<HTMLLIElement> = document.querySelectorAll('.cool > li');
const background: HTMLDivElement  = document.querySelector('.dropdownBackground');
const nav: HTMLDivElement  = document.querySelector('.top');

function handleEnter(): void {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdown: HTMLDivElement = this.querySelector('.dropdown');
    const dropdownCoords: ClientRect = dropdown.getBoundingClientRect();
    const navCoords: ClientRect = nav.getBoundingClientRect();

    const coords: {[key: string]: number} = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    };

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave(): void {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
}

triggers.forEach((trigger: HTMLLIElement) => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach((trigger: HTMLLIElement) => trigger.addEventListener('mouseleave', handleLeave));
