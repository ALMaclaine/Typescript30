const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.controls input');

function handleUpdate(): void {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach((input: HTMLInputElement): void => input.addEventListener('change', handleUpdate));
inputs.forEach((input: HTMLInputElement): void =>input.addEventListener('mousemove', handleUpdate));
