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
exports.ForwardFootballer = void 0;
var Footballer_1 = require("./Footballer");
var ForwardFootballer = /** @class */ (function (_super) {
    __extends(ForwardFootballer, _super);
    function ForwardFootballer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForwardFootballer.prototype.shoot = function () {
        this.isGol = Math.round(Math.random()) == 1 ? true : false;
        console.log("".concat(this.name, " shoot! And the result is ").concat(this.isGol ? "GOAAAAAAL :)" : "not goal :("));
        return this.isGol;
    };
    return ForwardFootballer;
}(Footballer_1.Footballer));
exports.ForwardFootballer = ForwardFootballer;
