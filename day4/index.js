console.log(`
/**
 * --- Day 4: Repose Record ---
 * https://adventofcode.com/2018/day/4
 */
`);

const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8')
    .split('\n')
    .sort();

// sleep records
const records = [];

// regex to test what stage input is
const wakesUp = new RegExp(/wakes\sup/);
const fallsAsleep = new RegExp(/falls\sasleep/);
const beginsShift = new RegExp(/begins\sshift/);

// get time and guard
const getTime = new RegExp(/\:(\d{2})\]/);
const guardId = new RegExp(/Guard\s\#(\d+)/);

// going to use this obj to build sleep records
// we can do this cause we assume that they have to
// a. start shift first
// b. fall asleep after shift start
// c. wake up after falling asleep
// d. repeat b-c until next guard starts shift
let builder = {};

input.forEach(record => {
    const min = getTime.exec(record)[1];

    switch (true) {
        case beginsShift.test(record):
            builder.id = guardId.exec(record)[1];
            break;

        case fallsAsleep.test(record):
            // push start time
            builder.start = parseInt(min);
            break;

        case wakesUp.test(record):
            // calculate difference in time
            // create record
            records.push({
                id: builder.id,
                asleep: parseInt(min) - 1 - builder.start
            });

            // we don't reset builder here bkz we want to keep
            // the ID there incase guard keeps falling asleep
            // waking up
            break;
    }
});

// get max number of hours asleep
// start with first zzz...
let sleepiest = records[0];

records.forEach(record => {
    if (record.asleep > sleepiest.asleep) {
        sleepiest = record;
    }
});

// Sleepiest guard is sleepiest.id.  Now we need to the minute he sleeps the most.

const minutes = Array(60).fill(0);
let id = 0;
let start = 0;
let end = 0;

input.forEach(record => {
    const min = getTime.exec(record)[1];

    switch (true) {
        case beginsShift.test(record):
            id = guardId.exec(record)[1];
            break;
        case fallsAsleep.test(record):
            start = parseInt(min);
            break;
        case wakesUp.test(record):
            if (id !== sleepiest.id) {
                break;
            }

            end = parseInt(min);
            // increment the minutes
            for (let i = start; i < end; i++) {
                minutes[i]++;
            }
            break;
    }

});


let longestMinute = 0;

minutes.forEach((count, minute) => {
    if (minutes[longestMinute] > count) {
        longestMinute = minute;
    }
});

console.log(
    'Part 1:',
    'The sleepiest guard ID multiplied by there minute most slept is:',
    sleepiest.id * longestMinute
);
