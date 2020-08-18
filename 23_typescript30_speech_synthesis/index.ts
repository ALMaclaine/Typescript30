const msg: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
let voices: SpeechSynthesisVoice[] = [];
const voicesDropdown: HTMLInputElement = document.querySelector('[name="voice"]');
const options: NodeListOf<HTMLInputElement> = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton: HTMLButtonElement = document.querySelector('#speak');
const stopButton: HTMLButtonElement = document.querySelector('#stop');

function populateVoices(e: SpeechSynthesisEvent): void {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice(e: InputEvent): void {
    msg.voice = voices.find((voice: SpeechSynthesisVoice) => voice.name === this.value);
    toggle();
}

function toggle(startOver: boolean = true): void {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption(e: InputEvent): void {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach((option: HTMLInputElement) => {
    setOption.apply(option)
    option.addEventListener('input', setOption)
});
speakButton.addEventListener('click', (e: MouseEvent) => toggle());
stopButton.addEventListener('click', (e: MouseEvent) => toggle(false));
