(() => {
    let app;

    let menuData =  [
        {
            title: 'Все заметки',
            name: 'all'
        },
        {
            title: 'Текст',
            name: 'text'
        }
    ];

    let notesData = [
        {
            type: 'text',
            text: 'Тестовая заметка',
            color: 'yellow',
            tags: ['text', 'all']
        },

        {
            type: 'text',
            text: 'Тестовая заметка 2',
            color: 'yellow',
            tags: ['text', 'all']
        }
    ];


    // import Menu ../menu/menu
    let Menu = window.Menu;

    // import Note ../note/note
    let Note = window.Note;

    class App {

        constructor() {
            this.node = document.body;
            this.render();

            this.setRoute(location.hash);


            this.node.addEventListener('add-new', this.onAddNew.bind(this));

        }

        setRoute (route) {
            this.route = route.replace('#', '');
            this.menu.toggleActive(this.route);
        }

        onAddNew (event) {
            this.addNote(event.detail); // в чем подвох ?
        }

        render () {
            this.node.innerHTML = window.fest['app']({});

            this.menu = new Menu(this.node.querySelector('.js-menu'), {
                list: menuData
            });

            this.notesNode = this.node.querySelector('.js-notes');
            notesData.forEach( item => this.addNote(item));
        }

        addNote (item) {
            let itemNode = document.createElement('div');
            let note = new Note(itemNode, item);

            itemNode.classList.add('app__note');

            this.notesNode.appendChild(note.node);
        }

    }

    document.addEventListener('DOMContentLoaded', () => {
        let app = new App();

        window.addEventListener('hashchange', () => {
            app.setRoute(location.hash);
        });
    });



})();