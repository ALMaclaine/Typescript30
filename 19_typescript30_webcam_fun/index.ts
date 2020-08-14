const video: HTMLVideoElement = document.querySelector('.player');
const canvas: HTMLCanvasElement = document.querySelector('.photo');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const strip: HTMLDivElement = document.querySelector('.strip');
const snap: HTMLAudioElement = document.querySelector('.snap');

function getVideo(): void {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then((localMediaStream: MediaStream): void => {
            console.log(localMediaStream);

//  DEPRECIATION : 
//       The following has been depreceated by major browsers as of Chrome and Firefox.
//       video.src = window.URL.createObjectURL(localMediaStream);
//       Please refer to these:
//       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

            video.srcObject = localMediaStream;
            const playPromise: Promise<void> = video.play();

            if (playPromise) {
                playPromise.then(() => console.log('Play successful')).catch(() => console.log('Play unsuccessful'));
            }
        })
        .catch((err: Error) => {
            console.error(`OH NO!!!`, err);
        });
}

function paintToCanvas(): number {
    const width: number = video.videoWidth;
    const height: number = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval((): void => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels: ImageData = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;

        // pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto(): void {
    // played the sound
    snap.currentTime = 0;
    const playPromise = snap.play();

    if (playPromise) {
        playPromise.then(() => console.log('Play successful')).catch(() => console.log('Play unsuccessful'));
    }

    // take the data out of the canvas
    const data: string = canvas.toDataURL('image/jpeg');
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels: ImageData): ImageData {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function rgbSplit(pixels: ImageData): ImageData {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels: ImageData): ImageData {
    const levels: { [key: string]: number } = {};

    document.querySelectorAll('.rgb input').forEach((input: HTMLInputElement) => {
        levels[input.name] = parseFloat(input.value);
    });

    for (let i: number = 0; i < pixels.data.length; i = i + 4) {
        let red = pixels.data[i + 0];
        let green = pixels.data[i + 1];
        let blue = pixels.data[i + 2];
        let alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
