const secondHand: HTMLDivElement = document.querySelector('.second-hand');
const minsHand: HTMLDivElement = document.querySelector('.min-hand');
const hourHand: HTMLDivElement = document.querySelector('.hour-hand');

function setDate(): void {
    const now: Date = new Date();

    const seconds: number = now.getSeconds();
    const secondsDegrees: number = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins: number = now.getMinutes();
    const minsDegrees: number = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour: number = now.getHours();
    const hourDegrees: number = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
