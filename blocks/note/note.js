(() => {
    'use strict';
    let template = window.fest['note'];
    
    class Note {

        constructor (node, data) {
            this.node = node;
            this.data = data;
            this.render();
        }
        
        render () {
            this.node.innerHTML = template(this.data);
        }
        
    }

    window.Note = Note;
})();