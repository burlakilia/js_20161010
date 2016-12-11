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
            type: 'text',
            text: '1234',
            color: 'yellow',
            tags: ['text', 'all']
        },
        {
            type: 'text',
            text: '2345',
            color: 'yellow',
            tags: ['text']
        }
    ];

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
            data.forEach( (item, index) => this.addNote(item, index) );
        }

        addNote (item, id) {
            let div = document.createElement('div');
            let note = new Note(div, item, id);

            this.notes.push(note);
            const nodeNote = this.node.querySelector('.js-notes').appendChild(div);
    
            nodeNote.querySelector('.js-close').addEventListener('click', this.delNote.bind(this));
    
            nodeNote.querySelector('.js-add-new').addEventListener('click', this.newNote.bind(this));
        }
        
        delNote (event) {
            const nodeNote = event.target.parentNode;
            const delNoteId = nodeNote.dataset.id;
            notesData.splice(delNoteId, 1);
            nodeNote.remove();
        }
        
        newNote () {
            let tags = ['all'];
            const pageLocation = '' || location.hash.replace('#', '');
            tags = pageLocation ? tags.push(pageLocation) : tags;
            const newNoteData = {
                type: 'text',
                color: 'yellow',
                tags: tags
            };
            
            notesData.push(newNoteData);
            this.renderNotes(notesData);
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
