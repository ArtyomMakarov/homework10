"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.greet = function () {
        var xhr = new XMLHttpRequest();
        var states;
        xhr.open('GET', '../json/states.json');
        xhr.onload = function () {
            if (this.status == 200) {
                states = JSON.parse(xhr.response);
                console.log(states);
            }
            else {
                alert(xhr.status + ': ' + xhr.statusText);
            }
        };
        xhr.send();
        return 'Hello ' + this.name;
    };
    return User;
}());
exports.User = User;
