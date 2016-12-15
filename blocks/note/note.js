import template from './note.xml.js';

class Note {
    
    constructor(node, data) {
        this.node = node;
        this.data = data;
        this.render();
        
    }
    
    render() {
        this.node.innerHTML = template(this.data);
    }
}

export { Note };