import template from './form.xml.js';

//Если с английского на русский, то передаём вторым параметром true.
let transliterate = (function () {
    var
        rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
        eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
        ;
    return function(text, engToRus) {
        var x;
        for(x = 0; x < rus.length; x++) {
            text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
            text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
        }
        return text;
    }
})();

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
                    name: transliterate(this.form.elements.title.value).toLowerCase()
                },
                bubbles: true,
                cancelable: true
            }
        ));

    }

}

export { Form };

