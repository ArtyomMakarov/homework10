export class User {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    greet() {
        let xhr = new XMLHttpRequest();
        let states: object;
        xhr.open('GET', '../json/states.json');
        xhr.onload = function() {
            if (this.status == 200) {
                states = JSON.parse( xhr.response );
                console.log(states);
            } else {
                alert( xhr.status + ': ' + xhr.statusText );
            }
        };
        xhr.send();
        return 'Hello ' + this.name;
    }
}

