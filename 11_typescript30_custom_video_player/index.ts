/* Get Our Elements */
const player: HTMLDivElement = document.querySelector('.player');
const video: HTMLVideoElement = player.querySelector('.viewer');
const progress: HTMLDivElement = player.querySelector('.progress');
const progressBar: HTMLDivElement = player.querySelector('.progress__filled');
const toggle: HTMLButtonElement = player.querySelector('.toggle');
const skipButtons: NodeListOf<HTMLButtonElement> = player.querySelectorAll('[data-skip]');
const ranges: NodeListOf<HTMLInputElement> = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay(): void {
  const method: string = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(): void {
  const icon: string = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip(): void {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(): void {
  video[this.name] = this.value;
}

function handleProgress(): void {
  const percent: number = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e): void {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button: HTMLButtonElement): void => button.addEventListener('click', skip));
ranges.forEach((range: HTMLInputElement): void => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range: HTMLInputElement): void => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown: boolean = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e: MouseEvent): void => mousedown && scrub(e));
progress.addEventListener('mousedown', (): boolean => mousedown = true);
progress.addEventListener('mouseup', (): boolean => mousedown = false);
