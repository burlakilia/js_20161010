#!/usr/bin/env node

var fest = require('fest');
var fs = require('fs');
var glob = require('glob');
var argv = require('argv');

argv.option({
    name: 'dir',
    short: 'd',
    type: 'string',
    description: 'Path to folders with templates',
    example: "'./fest-build --dir=./blocks"
});

var args = argv.run();

glob(args.options.dir + '/**/*.xml', function (err, list) {

    if (err) {
        console.error(err);
        return;
    }

    list.forEach( template => {
        fs.writeFileSync(template + '.js', 'export default ' + fest.compile(template, {beautify: false}));
    });

    console.log(list)
});

console.log(args);
