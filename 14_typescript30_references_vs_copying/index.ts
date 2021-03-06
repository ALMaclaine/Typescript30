// start with strings, numbers and booleans
// let age = 100;
// let age2 = age;
// console.log(age, age2);
// age = 200;
// console.log(age, age2);
let age: number = 100;
let age2: number = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name1: string = 'Wes';
let name2: string = name1;
console.log(name1, name2);
name1 = 'wesley';
console.log(name1, name2);

// Let's say we have an array
const players: string[] = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team: string[] = players;

console.log(players, team);
// You might think we can just do something like this:
team[3] = 'Lux';

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2: string[] = players.slice();

// one way

// or create a new array and concat the old one in
const team3: string[] = [].concat(players);

// or use the new ES6 Spread
const team4: string[] = [...players];
team4[3] = 'heeee hawww';
console.log(team4);

const team5: string[] = Array.from(players);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects

interface Person {
    name: string,
    age: number,
    number?: number,
    social?: {
        twitter: string,
        facebook: string
    }
}

const person: Person = {
    name: 'Wes Bos',
    age: 80
};

// and think we make a copy:
const captain: Person = person;
captain.number = 99;

// how do we take a copy instead?
const cap2: Person = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2);

// We will hopefully soon see the object ...spread
const cap3: Person = {...person};

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

const wes: Person = {
    name: 'Wes',
    age: 100,
    social: {
        twitter: '@wesbos',
        facebook: 'wesbos.developer'
    }
};

console.log(wes);

const dev: Person = Object.assign({}, wes);

const dev2: Person = JSON.parse(JSON.stringify(wes));
