'use strict';

const {run} = require('madrun');

module.exports = {
    'start': () => 'bin/thecat.js',
    'lint': () => 'putout bin lib madrun.js',
    'fix:lint': () => run('lint', '--fix'),
};

