// @ts-ignore
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition: SpeechRecognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p: HTMLParagraphElement = document.createElement('p');
const words: HTMLDivElement = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e: SpeechRecognitionEvent) => {
    const transcript: string = Array.from(e.results)
        .map((result: SpeechRecognitionResult) => result[0])
        .map((result: SpeechRecognitionAlternative) => result.transcript)
        .join('');

    const poopScript: string = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;
    console.log(poopScript);
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();
