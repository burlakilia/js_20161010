var fest = require('fest');
var fs = require('fs');

var data = {name: 'Jack "The Ripper"'},
    template = './blocks/menu/menu.xml';

var compiled = fest.compile(template, {beautify: false});

fs.writeFileSync('./blocks/menu/menu.xml.js', 'let MenuTemplate = ' + compiled);
