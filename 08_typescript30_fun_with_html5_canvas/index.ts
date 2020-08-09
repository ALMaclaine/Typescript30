const canvas: HTMLCanvasElement = document.querySelector('#draw');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = 'multiply';

let isDrawing: boolean = false;
let lastX: number = 0;
let lastY: number = 0;
let hue: number = 0;
let direction: boolean = true;

function draw(e: MouseEvent): void {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

}

canvas.addEventListener('mousedown', (e: MouseEvent): void => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', (): boolean => isDrawing = false);
canvas.addEventListener('mouseout', (): boolean => isDrawing = false);
