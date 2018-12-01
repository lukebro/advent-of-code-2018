const test = require('ava');
const { getFrequency, duplicateFrequency } = require('./day1');
const { read } = require('../index.js');

const parse = i => i.split('\n').map(v => parseInt(v));
const input = parse(read(`${__dirname}/input.txt`));

test('Day 1: it calculates resulting frequency', t => {
    t.is(getFrequency([1, 1, 1]), 3);
    t.is(getFrequency([1, 1, -2]), 0);
    t.is(getFrequency([-1, -2, -3]), -6);

    t.is(getFrequency(input), 479);

    t.log('Resulting frequency: ', getFrequency(input));
});

test('Day 1: find first duplicate frequency', t => {
    t.is(duplicateFrequency([1, -1]), 0);
    t.is(duplicateFrequency([3, 3, 4, -2, -4]), 10);
    t.is(duplicateFrequency([-6, 3, 8, 5, -6]), 5);
    t.is(duplicateFrequency([7, 7, -2, -7, -4]), 14);

    t.log('Duplicate frequency: ', duplicateFrequency(input));
});
