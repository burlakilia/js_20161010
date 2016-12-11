import { Menu } from '../menu/menu.js';
import { Form } from '../form/form.js';
import { Note } from '../note/note.js';
import template from './app.xml.js';

    let menuData = {
        list: [
            {
                title: 'Все заметки',
                name: 'all'
            },
            {
                title: 'Текст',
                name: 'text'
            }
        ]
    };

    let notesData = [
        {
            id: 1,
            type: 'text',
            text: '1234',
            color: 'yellow',
            tags: ['text', 'all']
        },
        {
            id: 2,
            type: 'text',
            text: '2345',
            color: 'yellow',
            tags: ['text']
        }
    ];
    
    const notesColors = ['yellow', 'green'];

    class App {

        constructor (node) {
            this.node = node;
            this.render();

            this.menu = new Menu(document.querySelector('.js-menu'), menuData);
            this.form = new Form(document.querySelector('.js-menu-form'));
            this.notes = [];

            this.form.node.addEventListener('add-new', event => {
                this.menu.add(event.detail);
            });

            this.renderNotes(notesData);

            this.setRoute(location.hash.replace('#', ''));
        }

        setRoute (route) {
            this.menu.toggleActive(route);
            
            if (route) {
                this.notesFilter(route);
            }
        }

        render () {
            this.node.innerHTML = template();
        }
        
        renderNotes (data) {
            document.querySelector('.js-notes').innerHTML = '';
            data.forEach( item => this.addNote(item) );
        }

        addNote (item) {
            let div = document.createElement('div');
            let note = new Note(div, item);

            this.notes.push(note);
            const nodeNote = this.node.querySelector('.js-notes').appendChild(div);
    
            nodeNote.querySelector('.js-set-color').addEventListener('click', this.setColorNote.bind(this));
        }
        
        setColorNote (event) {
            const nodeNote = event.target.parentNode.parentNode;
            const noteId = nodeNote.dataset.id;
            
            const indexOfNoteInNotesData = notesData.findIndex( note => note.id === +noteId );
            
            const currentColor = notesData[indexOfNoteInNotesData].color;
    
            // если последний цвет в массиве, то берем первый
            let newColor = notesColors[0];
            newColor = notesColors[notesColors.indexOf(currentColor) + 1] || newColor;
            
            notesData[indexOfNoteInNotesData].color = newColor;
            
            nodeNote.classList.remove(`note_${currentColor}`);
            nodeNote.classList.add(`note_${newColor}`);
        }
        
        notesFilter (route) {
            const filterData = notesData.filter((note) => {
                return note.tags.indexOf(route) !== -1;
            });
            
            this.renderNotes(filterData);
        }

    }

    document.addEventListener('DOMContentLoaded', () => {
        let app = new App(document.body);

    window.addEventListener('hashchange', () => {
        app.setRoute(location.hash.replace('#', ''));
    });

});
