console.log(`
/**
 * --- Day 2: Inventory Management System ---
 * https://adventofcode.com/2018/day/2
 */
`);

const { readFileSync } = require('fs');
const { resolve } = require('path');

let input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8').split('\n');

// get the checksum
const one = ids => {
    let twos = 0;
    let threes = 0;

    // loop through each id
    ids.forEach(id => {
        let counts = {};

        // count characters
        id.split('').forEach(c => {
            let count = counts[c];

            counts[c] = count ? count + 1 : 1;
        });

        // we don't really care what the character is

        // get the values and check for a 2
        if (Object.values(counts).indexOf(2) > -1) {
            twos++;
        }

        // get the values and check for a 3
        if (Object.values(counts).indexOf(3) > -1) {
            threes++;
        }
    });

    return twos * threes;
};

const answerOne = one(input);

console.log('Part 1:', 'The checksum is:', answerOne);

// get the common letters between two ids
const two = ids => {
    // need to find the two ids which are
    // one letter off each other

    let match = null;

    for (let i = 0; i < ids.length - 1; i++) {
        // compare to i+1 subset
        for (let j = i + 1; j < ids.length; j++) {
            let differences = 0;
            let indexOfChar = null;
            let a = ids[i].split('');
            let b = ids[j].split('');

            // compare and count differences
            a.forEach((c, index) => {
                if (c !== b[index]) {
                    differences++;
                    indexOfChar = index;
                }
            });

            if (differences === 1) {
                // we found the two ids!
                // we know the indexOfChar
                // is the last index where there
                // was a difference

                // remove index of different character
                a.splice(indexOfChar, 1);

                match = a.join('');
                break;
            }
        }

        // if we found a match we
        // can just break the loop
        if (match !== null) {
            break;
        }
    }

    return match;
};

const answerTwo = two(input);

console.log(
    'Part 2:',
    'The common letters between the two correct box IDs are:',
    answerTwo
);
