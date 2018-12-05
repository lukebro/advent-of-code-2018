console.log(`
/**
 * --- Day 3: No Matter How You Slice It ---
 * https://adventofcode.com/2018/day/3
 */
`);

const { readFileSync } = require('fs');
const { resolve } = require('path');

// I wrote this by myself, thanks Keith.
// Pattern matches all important info in this type of string: #123 @ 3,2: 5x4
const pattern = new RegExp(/\#(\d+)\s\@\s(\d+),(\d+)\:\s(\d+)x(\d+)/);

const parse = input => {
    return input.split('\n').map(line => {
        const matches = line.match(pattern);

        return {
            id: parseInt(matches[1]),
            x: parseInt(matches[2]),
            y: parseInt(matches[3]),
            w: parseInt(matches[4]),
            h: parseInt(matches[5])
        };
    });
};

let input = parse(readFileSync(resolve(__dirname, 'input.txt'), 'utf8'));

// was going to do this, but kinda inefficient
// to create the full empty grid with no guarantee we would fill it all
// think it's better to create a set-like array and proactively fill it
//
// const grid = [...Array(1000)].map(a => [...Array(1000)]);

// use set of string so we get deep compares
// use x:y as the string
const grid = new Set();
const duplicates = new Set();

input.forEach(claim => {
    const { x, y, w, h } = claim;

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const stringId = `${x + j}:${y + i}`;

            if (grid.has(stringId) && !duplicates.has(stringId)) {
                duplicates.add(stringId);
            } else {
                grid.add(stringId);
            }
        }
    }
});

console.log('Part 1:', 'Number of duplicate plots:', duplicates.size);

// Part 2, think we need to loop through all claims and just check for any overlap.

// They are rectangles so checking bounds should be easy
/**
 * * 2 2 * * *
 * 1 X 2 * * *
 * 1 1 * * * *
 * 1 1 * * * *
 *
 * 1.x1 < 2.x2 // left corners
 * 1.x2 > 2.x1 // right corners
 *
 *
 */

input = input.map(claim => {
    // cartesian coordinates
    claim.coords = {
        x1: claim.x,
        x2: claim.x + claim.w,
        y1: claim.y,
        y2: claim.y + claim.h
    };

    return claim;
});

// both loops need to start at 0 and just skip when comparing same
// element
// the reason because when we check overlap we check if it overlaps on
// a overlaps b on the left side, need to check the opposite as well
// which would happen

let claimThatDoesNotOverlap = null;

for (let i = 0; i < input.length; ++i) {
    let a = input[i].coords;

    let overlap = true;

    for (let j = 0; j < input.length; ++j) {
        // if same just continue
        if (input[i] === input[j]) {
            continue;
        }

        let b = input[j].coords;

        if (a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1) {
            overlap = true;
            break;
        }

        overlap = false;
    }

    // if we found a claim with no overlap
    // wooohooo!
    if (!overlap) {
        claimThatDoesNotOverlap = input[i];
        break;
    }
}

console.log(
    'Part 2:',
    'Claim that does not overlap:',
    claimThatDoesNotOverlap.id
);
