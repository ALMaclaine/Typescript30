const hero: HTMLDivElement = document.querySelector('.hero');
const text: HTMLHeadingElement = hero.querySelector('h1');
const walk: number = 500; // 500px

interface DOMEvent<T extends EventTarget> extends MouseEvent {
    target: T
}

function shadow(e: DOMEvent<HTMLElement>): void {
    const target: HTMLElement = e.target;
    const { offsetWidth: width, offsetHeight: height }: HTMLDivElement = hero;
    let { offsetX: x, offsetY: y }: DOMEvent<HTMLElement> = e;

    if (this !== target) {
        x = x + target.offsetLeft;
        y = y + target.offsetTop;
    }

    const xWalk: number = Math.round((x / width * walk) - (walk / 2));
    const yWalk: number = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
      ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
      ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
      ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
      ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;

}

hero.addEventListener('mousemove', shadow);
