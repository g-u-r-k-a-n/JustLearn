log = function (...param) {
    console.log(...param);
}

getVarName = function (v) {
    for (let key in window) {//all variables except let or const keyword are sent globally to the window object
        if (window[key] === v) {
            return key;
        }
    }
}

info = function ($var) {
    const varName = getVarName($var);
    const type = typeof $var;

    if (type === "string") {
        console.log(`Type of ${varName} is ${type}, value of ${varName} is "${$var}"`);
    }
    else {
        console.log(`Type of ${varName} is ${type}, value of ${varName} is ${$var}`);
    }
}

name = "john doe";
number = 10.12345;
number2 = "100.9876";
number3 = number + number2;
number4 = number.toFixed();
number5 = number.toPrecision(5);
number7 = parseInt(number);
number8 = parseFloat(number2);
number9 = parseInt("10a");
number10 = parseInt("a10a");//NaN

info(name);
info(number);
info(number2);
info(number3);
info(number4);
info(number5);
info(number7);
info(number8);
info(number9);
info(number10);
if (isNaN(number10)) console.log("number10 isNaN")

//Math methods
console.log("Math.round(10.123)", Math.round(10.123));
console.log("Math.round(10.987)", Math.round(10.987));
console.log("Math.ceil(10.987)", Math.ceil(10.987));
console.log("Math.ceil(10.123)", Math.ceil(10.123));
console.log("Math.floor(10.987)", Math.floor(10.987));
console.log("Math.floor(10.123)", Math.floor(10.123));
console.log("Math.sqrt(625)", Math.sqrt(625));
console.log("Math.pow(25,2)", Math.pow(25, 2));
console.log("Math.abs(-50)", Math.abs(-50));
console.log("Math.random() <=1 | >=100 :", Math.floor((Math.random() * 100 + 1)));

//Date object
const now = new Date();
console.log("Now : ", now);
console.log("getDate()", now.getDate());
console.log("getDay()", now.getDay());//0:sunday
now.setFullYear(2025);
console.log("Year 2025 :", now);

//string methods
console.log("substring(2, 7)", name.substring(2, 7));
console.log("slice(2)", name.slice(2));
console.log('replace("h", "n")', name.replace("ü", "ö"));
console.log('replace(/h/g, "n")', name.replace(/ü/g, "ö"));//ifadedeki tüm(global) ü harflerini bulsur
languages = "c#,java,js";
console.log('split(",")', languages.split(","));
console.log('includes("j")', name.includes("j"));

//array methods
const arr = ["hello", "world"];
console.log("arr.toString()", arr.toString());
console.log('arr.join("-")', arr.join("-"));
arr.pop();
console.log("arr after pop()", arr);
arr.push("world");
console.log('arr after push("world")', arr);
arr.shift();
console.log('arr after shift()', arr);
arr.unshift("hi");
console.log('arr after unshift("hi")', arr);
const arr2 = ["and", "hello"];
const arr3 = arr.concat(arr2);
console.log("arr3 ", arr3);
arr3.splice(2, 2, "of js");
console.log('arr3 after splice(2,2,"of js")', arr3);

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log("months", months);
months.sort();
console.log("months sort()", months);
months.reverse();
console.log("months reverse()", months);

for (const month in months) {
    console.log("for-in", `index : ${month} value : ${months[month]} `);
}

for (const month of months) {
    console.log("for-of", month);
}

numbers = new Array(10);
for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.floor(Math.random() * 100 + 1);
}

console.log("numbers", numbers);
numbers.forEach(n => console.log("numbers +1", n + 1));

firstEven = numbers.find(n => n % 2 === 0);
console.log("first even number", firstEven);
numbers2 = numbers.filter(n => n % 5 === 0);
console.log("numbers %5", numbers2);
numbers3 = numbers.map(n => n * 2);
console.log("numbers *2", numbers3);

//objects
let person = {
    name: "john",
    lastName: "doe",
    birthYear: 1659,
    address: {
        city: "london",
        country: "UK"
    },
    hobbies: ["movies", "music"],
    getAge: function () {
        return new Date().getFulslYear() - this.birthYear;
    }
};

console.log("person", person);

console.log('1=="1" operator', 1 == "1");
console.log('1==="1" operator', 1 === "1");

/*  Functions have their own scopes, but other blocks(if, switch vs.)
    if you use let or const you can create its own scope for that block
*/

function sum(number1, number2) {
    return number1 + number2;
}

console.log("sum(10,20)", sum(10, 20));
console.log("sum(10,20,30)", sum(10, 20, 30));//redundant parameters are ignored
console.log("sum(10)", sum(10));//missing parameters returns NaN

//IIFE(Immediately Invoked Function Express)
(function () {
    //this scope creates its own local variables
    var name = "gürkan";

    //if the variable or object is returned it will be public
    return {
        //public members;
    }
})();

/****** DOM *******/
console.log(window);
console.log(document);
console.log("document.all", document.all);
console.log("document.images", document.images);
console.log("document.forms", document.forms);
console.log("document.scripts", document.scripts);
console.log("script src :", document.scripts[0].getAttribute("src"));

//Single Elements Selectors
document.getElementById("header");
document.querySelector("#header");
document.querySelector(".class1.class2");
let hClass = document.querySelector(".h");//if it is an array only the first element
console.log("h classes :", hClass);
document.querySelector("li:first-child").style.color = "red";
document.querySelector("li:last-child").style.color = "green";
document.querySelector("li:nth-child(2)").style.color = "blue";
document.querySelector("li:nth-child(5)").textContent = "5a";
let firstHClass = document.getElementsByClassName("h")[0];

//Multiple Elements Selectors
let hClasses = document.getElementsByClassName("h");//HtmlCollection-no forEach()
let liTags = document.getElementsByTagName("li");
console.log("h classes :", hClasses);
console.log("li elements :", liTags);
let list = document.getElementById("list");
let listsLiTags = list.getElementsByTagName("li");
console.log("li elements", listsLiTags);

list2 = document.querySelectorAll("#list2 li");//NodeList-yes forEach()
console.log("list2 li elements", list2);
list2.forEach(li => li.style.color = "red");

let listGroup = document.querySelector(".list-group");
console.log("listGroup.childNodes", listGroup.childNodes);//NodeList
console.log("listGroup.childNodes[0]", listGroup.childNodes[0]);
console.log("listGroup.childNodes[0].nodeName", listGroup.childNodes[0].nodeName);
console.log("listGroup.childNodes[0].nodeType", listGroup.childNodes[0].nodeType);
console.log(`
            1-Element
            2-Attr
            3-Text
            4-CDATA Section
            5-EntityReference
            6-Entity
            7-ProcessingInstruction
            8-Comment`);
console.log("listGroup.children", listGroup.children);
console.log("listGroup.firstChild", listGroup.firstChild);
console.log("listGroup.firstElementChild", listGroup.firstElementChild);
console.log("listGroup.parentNode", listGroup.parentNode);
console.log("listGroup.parentElement", listGroup.parentElement);
console.log("listGroup.parentNode.firstElementChild", listGroup.parentNode.firstElementChild);
console.log("listGroup.children[0].nextSibling", listGroup.children[0].nextSibling);
console.log("listGroup.children[0].nextElementSibling.", listGroup.children[0].nextElementSibling);
console.log("listGroup.children[0].previousSibling", listGroup.children[0].previousSibling);
console.log("listGroup.children[0].previousElementSibling", listGroup.children[0].previousElementSibling);

//Remove-UpdateElement
const h2 = document.querySelector("h2");
const uls = document.getElementById("list");
uls.lastChild.remove();
setTimeout(() => {
    h2.remove();
}, 1000);
let ulsClasses = uls.children[2].getAttribute("class");
uls.children[4].setAttribute("data-info", "example");
uls.children[4].classList.add("exampleClass");
console.log("uls classes : ", ulsClasses);

//Create Element-2
const li2 = document.createElement("li");

//Events
function eventHandler(e) {
    console.log("event", e);
    console.log("box", e.target.id);
    //e.stopPropagation();//to prevent the event bubbling or capturing
}


const txtCoordinats = document.getElementById("txtCoordinats");
const writeCoordinats = (e) => {
    txtCoordinats.value = `${e.target.id}'s X : ${e.offsetX} Y: ${e.offsetY}
                           Page  X : ${e.clientX} Y: ${e.clientY}
                          `;
}

const boxClicked = (e) => {
    console.log(e.target.id + " clicked");
}

const boxes = document.querySelectorAll(".box");
for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.id = `box${i + 1}`;
}

boxes.forEach(b => b.addEventListener("mousemove", writeCoordinats));
boxes.forEach(b => b.addEventListener("click", boxClicked,/*Event bubbling: defalut value is true. so if you click on the inner boxes you will see the text "clicked" in the console more than once. parameter must be true for event capturing instead of bubbling*/));

const txtAnything = document.getElementById("txtAnything");
const lblAnything = document.getElementById("lblAnything");
const writtenHandler = (e) => {
    lblAnything.textContent += " " + e.key;
}
txtAnything.addEventListener("keyup", writtenHandler)
/****** DOM *******/

/****** Built-in Objects *******/
const map = new Map();
map.set(1, "Product1");
map.set(2, "Product2");
map.set(1, "Product1");//Not added because Map object is unique
map.set(3, "Product3");
console.log(map.entries());

const set = new Set();
set.add(1);
set.add(2);
set.add(1);//Not added because Set object is unique
set.add(3);
console.log(set);
/****** Built-in Objects *******/

/****** Asynchronous Operations *******/

//Async operation with callback function
const firstFunction = (callback) => {
    console.log("1st function");
    if (typeof callback === "function") {
        callback();
    }
}

const secondFunction = (callback) => {
    setTimeout(() => {
        console.log("2nd function");
        if (typeof callback === "function") {
            callback();
        }
    }, 100);
}

const thirdFunction = () => {
    console.log("3rd function waited 100 ms for 2nd function to complete to execute");
}

firstFunction(secondFunction(thirdFunction));

//AJAX
const xhr = new XMLHttpRequest();
let url = "https://jsonplaceholder.typicode.com/users";
xhr.open("get", url);
xhr.send();

const transferComplete = (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const users = JSON.parse(xhr.response);
        for (const user of users.filter(u => u.id <= 3)) {
            console.log("jsonplaceholder", user);
        }
    }
}

const transferFailed = (e) => {
    console.log("AJAX error", e);
}

xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);

const isSuccess = true;
//Promise object
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (isSuccess) {
            resolve("success");
        }
        else
            reject("bad request");
    }, 1500);
})

promise.then(data => { console.log("Promise result", data); })
    .catch(err => { console.log("Promise error", err); });

const login = (username, password) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (username == "admin" && password == "123") {
                res({ status: "success", username: username });
            }
            else {
                rej({ status: "fail", user: null });
            }
        }, 2000);
    });
}

const getInfoByUser = (user) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (user.username == "admin") {
                res("Admin Info success");
            }
            else {
                rej("Admin Info Error");
            }
        }, 2100);
    })
}

login("admin", "123")
    .then(data => {
        console.log("Promise user login", data);
        return getInfoByUser(data);
    })
    .then(data => {
        console.log("Promise login() result", data);
    })
    .catch(err => console.log(err));

//Promise & Fetch API
fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error("no data");
        }
        return res.json();
    })
    .then(data => console.log("fetch() Data :", data))
    .catch(err => console.log("fetch() :", err));

// async & await usage
const getUser = async (username, password) => {
    try {
        const promiseResponse = await login(username, password);
        console.log("waiting for login()...");
        if (promiseResponse.status == "success") {
            const promiseInfo = await getInfoByUser(promiseResponse);
            console.log("waiting for getInfoByUser()...");
            console.log("async & await :", promiseInfo);
        }
    } catch (err) {
        console.log(err);
    }
}
getUser("admin", "123");

/****** Asynchronous Operations *******/