import template from './note.xml.js';

class Note {
    
    constructor(node, data, id) {
        this.node = node;
        this.data = data;
        this.id = id;
        this.render();
        
    }
    
    render() {
        this.data.id = this.id;
        this.node.innerHTML = template(this.data);
    }
}

export { Note };