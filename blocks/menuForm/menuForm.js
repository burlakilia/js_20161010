
'use strict';

(() => {
    
    // import fest.MenuFormTemplate
    
    class MenuForm {
        
        constructor(node, menu) {
            
            this.menu= menu;
            this.node = this.render(node);
            
            this.button = this.node.querySelector('.menu__form_submit');
            this.title = this.node.querySelector('.menu__form_title');
            this.href = this.node.querySelector('.menu__form_href');
            
            this.onButtonSubmit = this.onButtonSubmit.bind(this);
            this.button.addEventListener('click', this.onButtonSubmit);
        }
        
        render(node) {
            node.innerHTML = MenuFormTemplate();
            return node;
        }
        
        onButtonSubmit() {
            const options = {
                title: this.title.value,
                href: this.href.value
            };
            this.menu.add(options);
            this.title.value = '';
            this.href.value = '';
        }
        
    }
    
    window.MenuForm = MenuForm;
})();
