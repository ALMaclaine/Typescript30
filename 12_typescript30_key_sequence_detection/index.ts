const pressed: string[] = [];
const secretCode: string = 'wesbos';

window.addEventListener('keyup', (e: KeyboardEvent): void => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
        console.log('DING DING!');
        // @ts-ignore
        cornify_add();
    }
    console.log(pressed);
});
