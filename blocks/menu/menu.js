'use strict';

(() => {

    // import fest.menu

    class Menu {

        /**
         * Конструктор меню
         * @param {Node} node - DOM узел куда нужно добавить меню
         * @param {Object} data - данные, на основнаии которого нужно нарисовать меню
         */
        constructor(node, data) {
            this.data = data;
            this.node = node;
            this.render();
        }

        render(node) {
            this.node.innerHTML = window.fest.menu(this.data);
            return node;
        }

        toggleActive(name) {
            let links = [].slice.call(this.node.querySelectorAll('.menu__link')) || [];

            links.forEach(link => {
                link.classList.remove('menu__link_active')
            });


            let active = this.node.querySelector(`.menu__link.js-${name}`);

            if (active) {
                active.classList.add('menu__link_active');
            }
        }

        add(item) {
            this.data.options.push(item);
            this.render();
        }

    }

    window.Menu = Menu;
})();