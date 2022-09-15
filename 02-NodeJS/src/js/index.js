//ES5-CommonJS Module Syntax
const _ = require("underscore");
const helper = require("./helper");

//ES6+
import { sum, multiply } from "./es6";
console.log("es6 sum()", sum(10, 20, 30));
console.log("es6 multiply()", multiply(5, 10, 15));

console.log(helper.getName());

var numbers = [];
for (let i = 0; i < 10; i++) {
    const number = Math.floor((Math.random() * 100)) + 1;
    if (!numbers.includes(number)) {
        numbers.push(number);
    }
    else {
        i--;
    }
}

console.log(numbers);
console.log("min :", _.min(numbers));

/*
    npm i jquery@3.1.1 //ver@ major.minor.patch
    npm i webpack --save-dev
    npm i live-server -g
    npm uninstall live-server

    npm list -g
    npm list -g --depth 0
*/