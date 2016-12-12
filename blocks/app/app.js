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
            const noteNode = this.node.querySelector('.js-notes').appendChild(div);
    
            noteNode.querySelector('.js-close').addEventListener('click', this.delNote.bind(this));
            noteNode.querySelector('.js-add-new').addEventListener('click', this.newNote.bind(this));
            noteNode.querySelector('.js-set-color').addEventListener('click', this.setColorNote.bind(this));
            noteNode.querySelector('.note__text').addEventListener('change', this.saveNoteText.bind(this));
        }
    
        indexOfNoteInNotesData (noteNode) {
            const noteId = noteNode.dataset.id;
    
            return notesData.findIndex( note => note.id === +noteId );
        }
        
        delNote (event) {
            const noteNode = event.target.parentNode;
            
            notesData.splice(this.indexOfNoteInNotesData(noteNode), 1);
    
            event.target.parentNode.remove();
        }
        
        newNote () {
            let tags = ['all'];
            const pageLocation = '' || location.hash.replace('#', '');
            if (pageLocation) {
                tags.push(pageLocation);
            }
            
            let id = 1; //если заметок нет
            id = notesData.slice(-1)[0].id + 1 || id;
            
            const newNoteData = {
                id: id,
                type: 'text',
                color: 'yellow',
                tags: tags
            };
            
            notesData.push(newNoteData);
    
            pageLocation ? this.notesFilter(pageLocation) : this.renderNotes(notesData);
        }
        
        saveNoteText (event) {
            const noteNode = event.target.parentNode;

            notesData[this.indexOfNoteInNotesData(noteNode)].text = event.target.value;
            
        }

        setColorNote (event) {
            const noteNode = event.target.parentNode.parentNode;
            
            const currentColor = notesData[this.indexOfNoteInNotesData(noteNode)].color;
    
            // если последний цвет в массиве, то берем первый
            let newColor = notesColors[0];
            newColor = notesColors[notesColors.indexOf(currentColor) + 1] || newColor;
            
            notesData[this.indexOfNoteInNotesData(noteNode)].color = newColor;
            
            noteNode.classList.remove(`note_${currentColor}`);
            noteNode.classList.add(`note_${newColor}`);
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
