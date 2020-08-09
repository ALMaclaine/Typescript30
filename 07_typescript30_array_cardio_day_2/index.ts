// ## Array Cardio Day 2

interface Person {
    name: string,
    year: number
}

type People = Person[];

const people: People = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

interface CommentObj {
    text: string,
    id: number
}

type Comments = CommentObj[];

const comments: Comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19?
// const isAdult = people.some(function(person: Person): boolean {
//   const currentYear: number = (new Date()).getFullYear();
//   if(currentYear - person.year >= 19) {
//     return true;
//   }
// });

const isAdult: boolean = people.some((person: Person): boolean => ((new Date()).getFullYear()) - person.year >= 19);

console.log({isAdult});
// Array.prototype.every() // is everyone 19?

const allAdults: boolean = people.every((person: Person): boolean => ((new Date()).getFullYear()) - person.year >= 19);
console.log({allAdults});

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423


const comment: CommentObj = comments.find((comment: CommentObj): boolean => comment.id === 823423);

console.log(comment);

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
const index: number = comments.findIndex((comment: CommentObj): boolean => comment.id === 823423);
console.log(index);

// comments.splice(index, 1);

const newComments: Comments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];
