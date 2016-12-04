
'use strict';

(() => {
    
    // import fest.MenuFormTemplate
    
    class MenuForm {
        
        constructor(node, menu) {
            
            this.menu= menu;
            this.node = this.render(node);
            
            this.formButton = document.querySelector('.menu__form_submit');
            this.formTitle = document.querySelector('.menu__form_title');
            this.formHref = document.querySelector('.menu__form_href');
            
            this.onButtonSubmit = this.onButtonSubmit.bind(this);
            this.formButton.addEventListener('click', this.onButtonSubmit);
        }
        
        render(node) {
            node.innerHTML = MenuFormTemplate();
            return node;
        }
        
        onButtonSubmit() {
            const options = {
                title: this.formTitle.value,
                href: this.formHref.value
            };
            this.menu.add(options);
            this.formTitle.value = '';
            this.formHref.value = '';
        }
        
    }
    
    window.MenuForm = MenuForm;
})();
