const PI = 3.14;

export function sum(...numbers) {
    return numbers.reduce((previous, current) => previous + current);
}

export function multiply(...numbers) {
    return numbers.reduce((previous, current) => previous * current);
}