function removeTransition(e: TransitionEvent) {
    if (e.propertyName !== 'transform') return;
    if(e.target instanceof HTMLDivElement) {
        e.target.classList.remove('playing');
    }
}

function playSound(e) {
    const audio: HTMLAudioElement = document.querySelector(`audio[data-key="${e.keyCode}"]`) ;
    const key: HTMLDivElement = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play()
          .catch(() => console.log(`Failed to play audio file: ${audio.src}`));
}

const keys: NodeListOf<HTMLDivElement> = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
