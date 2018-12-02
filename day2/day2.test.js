const test = require('ava');
const { one, two } = require('./day2');
const { read } = require('../index.js');

const parse = i => i.split('\n');
const input = parse(read(`${__dirname}/input.txt`));

test('Day 2: calculate the checksum', t => {
    t.is(
        one([
            'abcdef',
            'bababc',
            'abbcde',
            'abcccd',
            'aabcdd',
            'abcdee',
            'ababab'
        ]),
        12
    );

    t.log('Checksum: ', one(input));
});

test('Day 2: get common letters between two ids', t => {
    t.is(
        two(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']),
        'fgij'
    );

    t.log('Common letters: ', two(input));
});
