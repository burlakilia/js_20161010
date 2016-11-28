'use strict';

let Menu = (() => {
    let menuTemplate = document.querySelector('#menu-template').innerHTML;

    class Menu {

        constructor(node, data) {

            if (typeof data == 'object') {
                this.node = this.render(node, data);
            } else {
                this.node = node;
            }

            this.title =this.node.querySelector('.js-title');
            this.title.addEventListener('click', this.toggle.bind(this));
        }

        render(node, data) {
            let tmpl = _.template(menuTemplate);

            node.innerHTML = tmpl(data);

            return node;
        }

        toggle() {
            this.node.classList.toggle('menu_expanded');
        }


    }

    return Menu;
})();