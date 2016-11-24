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
            this.node.addEventListener('click', this.nav.bind(this));
        }
    
        render(node, data) {
            let tmpl = _.template(menuTemplate);
    
            node.innerHTML = tmpl(data);
    
            return node;
        }
    
        toggle() {
            this.node.classList.toggle('menu_expanded');
        }
    
        nav(event) {
            // event.target - DOМ узел на котором произошло
            // event.currentTarget - DOM где было пойманно событие
            let link = event.target;
    
            if (link) {
                console.log(link.getAttribute('href'));
                event.preventDefault();
            }
    
    
        }
    
    
    }
    
    return Menu;
})();