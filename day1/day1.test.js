const test = require('ava');
const { one, two } = require('./day1');
const { read } = require('../index.js');

const parse = i => i.split('\n').map(v => parseInt(v));
const input = parse(read(`${__dirname}/input.txt`));

test('Day 1: it calculates resulting frequency', t => {
    t.is(one([1, 1, 1]), 3);
    t.is(one([1, 1, -2]), 0);
    t.is(one([-1, -2, -3]), -6);

    t.is(one(input), 479);

    t.log('Resulting frequency: ', one(input));
});

test('Day 1: find first duplicate frequency', t => {
    t.is(two([1, -1]), 0);
    t.is(two([3, 3, 4, -2, -4]), 10);
    t.is(two([-6, 3, 8, 5, -6]), 5);
    t.is(two([7, 7, -2, -7, -4]), 14);

    t.log('Duplicate frequency: ', two(input));
});
