interface City {
    city: string,
    growth_from_2000_to_2013: string,
    latitude: number,
    longitude: number,
    population: string,
    rank: string,
    state: string
}

type Cities = City[];

const endpoint: string = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities: Cities = [];
fetch(endpoint)
    .then((blob: Response): Promise<Cities> => blob.json())
    .then((data: Cities): number => cities.push(...data));

function findMatches(wordToMatch: string, cities: Cities): Cities {
    return cities.filter((place: City): boolean => {
        // here we need to figure out if the city or state matches what was searched
        const regex: RegExp = new RegExp(wordToMatch, 'gi');
        const cityMatch = place.city.match(regex);
        const stateMatch = place.state.match(regex);
        return cityMatch && cityMatch.length !== 0
            || stateMatch && stateMatch.length !== 0;
    });
}

function numberWithCommas(x): string {
    return x.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(): void {
    const matchArray: Cities = findMatches(this.value, cities);
    const html: string = matchArray.map((place: City): string => {
        const regex: RegExp = new RegExp(this.value, 'gi');
        const cityName: string = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName: string = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput: HTMLInputElement = document.querySelector('.search');
const suggestions: HTMLUListElement = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
