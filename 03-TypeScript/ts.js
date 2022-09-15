"use strict";
exports.__esModule = true;
var Direction_1 = require("./03-01-Sports/Direction");
var ForwardFootballer_1 = require("./03-01-Sports/ForwardFootballer");
var TS;
(function (TS) {
    var Types = /** @class */ (function () {
        function Types() {
            this.number = 1;
            this.name = "john doe";
            this.isSuccess = true;
            this.anything = { aaa: "111" };
            this.numbers = [1, 2, 3];
            this.names = ["john", "jane"];
            this.everything = ["a", 1, true]; //tuple
        }
        return Types;
    }());
    //Type Conversions
    var number2;
    number2 = "1";
    var numberAsString = number2;
    numberAsString = number2;
    function getAvarage() {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var total = 0;
        for (var _a = 0, numbers_1 = numbers; _a < numbers_1.length; _a++) {
            var number = numbers_1[_a];
            total += number;
        }
        return total / numbers.length;
    }
    console.log(getAvarage(10, 20, 30));
    var start = function () {
        var footballer1 = new ForwardFootballer_1.ForwardFootballer("Christian Ronaldo");
        footballer1.run();
        footballer1.turn(Direction_1.Direction.Left);
        footballer1.stop();
        footballer1.run();
        footballer1.pass();
        footballer1.turn(Direction_1.Direction.Right);
        footballer1.intercept();
        footballer1.shoot();
    };
    start();
})(TS || (TS = {}));
