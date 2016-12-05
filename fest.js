var fest = require('fest');
var fs = require('fs');

var data = {name: 'Jack "The Ripper"'},
    template = './blocks/menuForm/menuForm.xml';

var compiled = fest.compile(template, {beautify: false});

fs.writeFileSync('./blocks/menuForm/menuForm.xml.js', 'let MenuFormTemplate = ' + compiled);
