/**
 * Chronal Calibration - Day 1
 * https://adventofcode.com/2018/day/1
 */
module.exports = {
    // get frequency
    one: function(input) {
        return input.reduce((acc, next) => acc + next, 0);
    },

    // find the duplicate frequency
    two: function(input) {
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
    }
};
