// import fest.form
import template from './form.xml.js';

class Form {

    constructor(node, menu) {

        this.menu= menu;
        this.node = this.render(node);

        this.form = this.node.querySelector('.js-form');
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    render(node) {
        node.innerHTML = template();
        return node;
    }

    onSubmit(event) {
        event.preventDefault();

        this.node.dispatchEvent(new CustomEvent('add-new', {
                detail: {
                    title: this.form.elements.title.value,
                    name: this.form.elements.link.value
                },
                bubbles: true,
                cancelable: true
            }
        ));

    }

}

export { Form };