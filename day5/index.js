console.log(`
/**
 * --- Day 5: Alchemical Reduction ---
 * https://adventofcode.com/2018/day/5
 */
`);

const { readFileSync } = require('fs');
const { resolve } = require('path');

let input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8').split('');

// determine offset between lower and upper
const offset = 'a'.charCodeAt(0) - 'A'.charCodeAt(0);

/**
 * This is pretty cool, after thinking about this more...
 * we can initialize a counter variable
 * check to see if that variable has hit our "max".
 * "max" is a dynamic length since the inner for loop
 * will be constantly searching for a pair to remove
 * if the loop ever hits the end (polymer.length - 1)
 * the while loop will finally eval to false causing
 * a continue!! Never have I written something like this.
 */
const react = input => {
    let polymer = [...input];
    let i = 0;

    while (i < polymer.length - 1) {
        for (i = 0; i < polymer.length - 1; i++) {
            let a = polymer[i];
            let b = polymer[i + 1];

            // check for something like aA or Aa
            // by converting aA -> AA or Aa -> aa and compare
            if (
                a.charCodeAt(0) + offset === b.charCodeAt(0) ||
                a.charCodeAt(0) - offset === b.charCodeAt(0)
            ) {
                // we have a match so remove the 2 elements (i, i+1)
                // starting at i
                polymer.splice(i, 2);

                // break out of loop
                // loop no longer valid
                break;
            }
        }
    }

    return polymer;
};

const fullyReactedPolymer = react(input);

console.log(
    'Part 1:',
    'Number of units remaining after fully reacting the polymer: ',
    fullyReactedPolymer.length
);

/**
 * For part two, we need to remove a unique +/- unit and fully react it.
 * Capture the smallest reacted polymer.
 */

const isUpper = char => char.toUpperCase() === char;

// we'll use lower case because a + offset === A
const uniqueUnits = [];

fullyReactedPolymer.forEach(unit => {
    if (isUpper(unit)) {
        unit = unit.toLowerCase();
    }

    if (uniqueUnits.indexOf(unit) === -1) {
        uniqueUnits.push(unit);
    }
});

// our uniqueUnits now has an array of lowercase units
// lets go through each unique unit, filter our array, and try to find
// the smallest length reacted

// we know fullyReactPolymer can be made smaller
let shortestPolymer = [...fullyReactedPolymer];

uniqueUnits.forEach(unit => {
    let polymer = [...fullyReactedPolymer];

    // filter out the unit (we stored lowercase so also remove uppercase)
    polymer = polymer.filter(u => u !== unit && u !== unit.toUpperCase());

    // react the polymer
    polymer = react(polymer);

    // if our current polymer is shorter than the shortest..
    // we have a new shortest!
    if (polymer.length < shortestPolymer.length) {
        shortestPolymer = polymer;
    }
});

console.log(
    'Part 2:',
    'Length of the shortest polymer you can produce: ',
    shortestPolymer.length
);
