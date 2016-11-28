'use strict';

(() => {

    // import fest.MenuTemplate

    class Menu {

        constructor(node, data) {
            this.data = data;

            if (typeof data == 'object') {
                this.node = this.render(node, data);
            } else {
                this.node = node;
            }

            //this.title = this.node.querySelector('.js-title');
            //this.title.addEventListener('click', this.toggle.bind(this));
        }

        render(node, data) {
            node.innerHTML = MenuTemplate(data);
            return node;
        }

        add(item) {
            this.data.options.push(item);
            this.render(this.node, this.data);
        }

        toggle() {
            this.node.classList.toggle('menu_expanded');
        }

    }

    window.Menu = Menu;
})();