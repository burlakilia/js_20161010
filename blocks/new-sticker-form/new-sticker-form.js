'use strict';

(() => {
    
    // import fest.MenuFormTemplate
    
    class MenuForm {
        
        constructor(node, menu) {
            
            this.menu= menu;
            this.node = this.render(node);
            
            this.formButton = document.querySelector('.new-sticker-form__submit');
            this.formTitle = document.querySelector('.new-sticker-form__title');
            this.formHref = document.querySelector('.new-sticker-form__href');
            
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
        }
        
    }
    
    window.MenuForm = MenuForm;
})();