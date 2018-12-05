console.log(`
/**
 * --- Day 1: Chronal Calibration ---
 * https://adventofcode.com/2018/day/1
 */
`);

const { readFileSync } = require('fs');
const { resolve } = require('path');

let input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .map(n => parseInt(n));

// get frequency
const one = input => {
    return input.reduce((acc, next) => acc + next, 0);
};

const answerOne = one(input);

console.log('Part 1:', 'The resulting frequency is:', answerOne);

// find the duplicate frequency
const two = input => {
    let duplicate = null;
    let frequency = 0;
    // start with initial frequency
    const history = [frequency];

    while (duplicate === null) {
        for (let i = 0; i < input.length; i++) {
            frequency += input[i];

            // we found a duplicate
            if (history.indexOf(frequency) > -1) {
                duplicate = frequency;
                break;
            }

            history.push(frequency);
        }
    }

    return duplicate;
};

const answerTwo = two(input);

console.log(
    'Part 2:',
    'The first frequency your device reaches twice is:',
    answerTwo
);
