const arrow: SVGAElement = document.querySelector('.arrow');
const speed: HTMLHeadingElement = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data: Position) => {
    console.log(data);
    speed.textContent = `${data.coords.speed || 'Not Moving'}`;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err: PositionError) => {
    console.error(err);
});
