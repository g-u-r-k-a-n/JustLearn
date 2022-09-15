"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Direction_1 = require("./Direction");
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.run = function () {
        console.log("".concat(this.name, " running..."));
    };
    Player.prototype.stop = function () {
        console.log("".concat(this.name, " stopping..."));
    };
    Player.prototype.turn = function (direction) {
        console.log("".concat(this.name, " turning to the ").concat(Direction_1.Direction[direction].toLowerCase(), "..."));
    };
    return Player;
}());
exports.Player = Player;
