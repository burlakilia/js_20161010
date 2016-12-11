import template from './note.xml.js';

class Note {

    constructor (node, data, id) {
        this.node = node;
        this.data = data;
        this.data.id = id;
        this.render();
    }

    render () {
        this.node.innerHTML = template(this.data);
    }

}

export { Note };