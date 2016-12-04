var fest = require('fest');
var fs = require('fs');

var data = {name: 'Jack "The Ripper"'},
    template = './blocks/menu/menu.xml';
    template2 = './blocks/new-sticker-form/new-sticker-form.xml';

var compiled1 = fest.compile(template, {beautify: false});
var compiled2 = fest.compile(template2, {beautify: false});

fs.writeFileSync('./blocks/menu/menu.xml.js', 'let MenuTemplate = ' + compiled1);
fs.writeFileSync('./blocks/new-sticker-form/new-sticker-form.xml.js', 'let MenuFormTemplate = ' + compiled2);
