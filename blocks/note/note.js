(() => {

    // import fest.note
    let template = window.fest['note'];

    class Note {

        constructor (node, data) {
            this.data = data;
            this.node = node;

            this.render();

            this.node.addEventListener('click', (event) => {
                let link = event.target;

                if (!link.closest('.note__button')) {
                    return;
                }

                if (link.classList.contains('js-add-new')) {
                    this.onAddNew();
                }

            })

        }

        onAddNew () {

            this.node.dispatchEvent(new CustomEvent('add-new', {
                    detail: this.data,
                    bubbles: true,
                    cancelable: true
                }
            ));

        }

        render () {
            this.node.innerHTML = template(this.data);
        }
    }

    window.Note = Note;
})();