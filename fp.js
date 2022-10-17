'use strict';

const addOne = (value) => value + 1;
const square = (value) => value * value;

const compose = (f, g) => (x) => f(g(x));
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);

const trace = (label) => (value) => {
    console.log(`${label}: ${value}`);
    return value;
};

const addOneAndSquare = compose(square, addOne);

const addOneAndSquareWithTracing = pipe(addOne, trace('after addOne'), square, trace('after square'));

console.log(addOneAndSquare(1));
console.log(addOneAndSquareWithTracing(1));