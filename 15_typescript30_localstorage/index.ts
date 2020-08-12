const addItems: HTMLFormElement = document.querySelector('.add-items');
const itemsList: HTMLUListElement = document.querySelector('.plates');
const items: Plate[] = JSON.parse(localStorage.getItem('items')) || [];

interface Plate {
    text: string,
    done: boolean
}

function addItem(e): void {
    e.preventDefault();
    const text: string = (this.querySelector('[name=item]')).value;
    const item: Plate = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates: Plate[] = [], platesList: HTMLUListElement): void {
    platesList.innerHTML = plates.map((plate: Plate, i: number): string => {
        return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}

function toggleDone(e: MouseEvent): void {
    const element: HTMLElement = this;
    if (!element.matches('input')) return; // skip this unless it's an input
    const index: string = element.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
