(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var ClassUser_1 = require("./modules/ClassUser");
var user = new ClassUser_1.User("Petr");
alert(user.greet());

},{"./modules/ClassUser":2}],2:[function(require,module,exports){
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

},{}]},{},[1])