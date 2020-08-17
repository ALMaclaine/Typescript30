const triggers: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');
const highlight: HTMLSpanElement = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

function highlightLink(): void {
    const linkCoords: ClientRect = this.getBoundingClientRect();
    console.log(linkCoords);
    const coords: {[key: string]: number} = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach((a: HTMLAnchorElement) => a.addEventListener('mouseenter', highlightLink));
