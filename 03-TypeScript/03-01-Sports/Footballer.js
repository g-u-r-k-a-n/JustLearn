"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Footballer = void 0;
var Player_1 = require("./Player");
var Footballer = /** @class */ (function (_super) {
    __extends(Footballer, _super);
    function Footballer(name) {
        return _super.call(this, name) || this;
    }
    Footballer.prototype.intercept = function () {
        console.log("".concat(this.name, " intercepted the ball..."));
    };
    Footballer.prototype.pass = function () {
        console.log("".concat(this.name, " passing..."));
    };
    return Footballer;
}(Player_1.Player));
exports.Footballer = Footballer;
