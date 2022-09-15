var person = "Jane Doe";

function getName() {
    return person;
}

//exports.getName = getName;
module.exports = {
    getName: getName
}
