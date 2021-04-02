'use strict';

const {run} = require('madrun');

module.exports = {
    'start': () => 'bin/thecat.js',
    'lint': () => 'putout .',
    'fix:lint': () => run('lint', '--fix'),
};

