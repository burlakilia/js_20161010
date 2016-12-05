'use strict';

(() => {

    // import fest.MenuTemplate
    let template = window.fest['menu'];


    class Menu {

        constructor(node, data) {
            this.data = JSON.parse(JSON.stringify(data));

            if (typeof data == 'object') {
                this.node = this.render(node, data);
            } else {
                this.node = node;
            }

            //this.title = this.node.querySelector('.js-title');
            //this.title.addEventListener('click', this.toggle.bind(this));
        }

        render(node, data) {
            node.innerHTML = template(data);
            return node;
        }

        /**
         * Добавлеят новый item в меню
         * @param {Object} item - описанием пункта меню
         * @param {string} item.title
         * @param {string} item.name
         */
        add(item) {
            this.data.list.push(item);
            this.render(this.node, this.data);
        }

        /**
         * Метод переключает активный пункт меню
         * @param {string} name - имя активного пункта меню
         */
        toggleActive (name) {
            let links = [].slice.call(this.node.querySelectorAll('.menu__link'));

            links.forEach( link => {
                link.classList.remove('menu__link_active');
            });

            let active = this.node.querySelector(`.menu__link.js-${name}`);

            if (active) {
                active.classList.add('menu__link_active');
            }

        }

    }

    window.Menu = Menu;
})();