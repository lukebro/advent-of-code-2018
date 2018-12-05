const { readdirSync } = require('fs');
const { resolve } = require('path');

console.log(`
/**
 * Advent of Code 2018
 */
`);

// Dynamically require all day* and run them.
readdirSync(__dirname)
    .filter(d => /^day\d/.test(d))
    .forEach(d => {
        require(resolve(__dirname, d));
    });
