const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked: HTMLInputElement;

function handleCheck(e: KeyboardEvent): void {
    // Check if they had the shift key down
    // AND check that they are checking it
    let inBetween: boolean = false;
    if (e.shiftKey && this.checked) {
        // go ahead and do what we please
        // loop over every single checkbox
        checkboxes.forEach((checkbox: HTMLInputElement): void => {
            console.log(checkbox);
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log('Starting to check them in between!');
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }

    lastChecked = this;
}

checkboxes.forEach((checkbox: HTMLInputElement): void => checkbox.addEventListener('click', handleCheck));
