class NotesModel {

    constructor (options) {
        this.options = options;
    }

    _send (method, data) {

        return new Promise( (resolve, reject) => {
            let request = new XMLHttpRequest();

            request.addEventListener('readystatechange', event => {

                if (request.readyState === XMLHttpRequest.DONE) {
                    resolve(JSON.parse(request.responseText));
                }

                if (request.readyState === XMLHttpRequest.ERROR) {
                    reject(request.responseText);
                }

            });

            request.open(method, this.options.url);
            request.setRequestHeader('x-apikey', '584eaeb7580bb2c143aba193');
            request.setRequestHeader('Content-Type', 'application/json');

            request.send(data);
        });

    }

    fetch () {
        return this
            ._send('GET')
            .then( list => {
                this.data = list;
                return list;
            });
    }

    create (data) {
        return this
            ._send('POST', JSON.stringify(data))
            .then( note => {
                this.data.push(note);
                return this.data;
            });
    }


}


export { NotesModel };

