/*
A function is a process which takes some input, called arguments, and produces some output called a return value.

Alonzo Church invented lambda calculus - universal model of computation based on function application.
Basic assumptions:
1. Functions are always anonymous. In JavaScript we can express this with anonymous function expression like (x, y) => x + y.
2. Functions in lambda calculus are always unary - they only accept a single parameter. The n-ary function 
(x, y) => x + y can be expressed as curried function (x) => (y) => x + y.
3. Functions are first-class elements - can be used as inputs to other functions, and can return functions as result.

Pure function
1. Given the same input, will always return the same output.
2. Produces no side effects - can’t alter any external state and promotes immutability.

Functional programming is a programming paradigm where applications are composed using pure functions,
avoiding shared mutable state and side-effects. Functional programming is usually more declarative 
than imperative, meaning that we express what to do rather than how to do it.

A higher order function is any function which takes a function as an argument, returns a function,
or both. Higher order functions are often used to:

• Abstract or isolate actions, effects, or async flow control using callback functions, promises, monads, etc.
• Create utilities which can act on a wide variety of data types
• Partially apply a function to its arguments or create a curried function for the purpose of reuse or function composition
• Take a list of functions and return some composition of those input functions

One of the most important aspect of fp is immutability, this can be achieved with tools like:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
https://immutable-js.com

*/

'use strict';

//const compose = (f, g) => (x) => f(g(x));
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
const flip = (fn) => (a) => (b) => fn(b)(a);
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
};
const reduce = (reducer, initialValue, arr) => {
    if (arr.length === 0) {
        return initialValue;
    } else {
        const [head, ...tail] = arr;
        const accumulatedResult = reducer(initialValue, head);
        return reduce(reducer, accumulatedResult, tail);
    }
} 
const map = (mapper, arr) => reduce((result, item) => [...result, mapper(item)], [], arr);
const filter = (predicate, arr) => reduce((result, item) => predicate(item) ? [...result, item] : result, [], arr);

const trace = (label) => (value) => {
    console.log(`${label}: ${value}`);
    return value;
};

const addOne = (value) => value + 1;
const square = (value) => value * value;

const addOneAndSquare = compose(square, addOne); // square(addOne(x))
const addOneAndSquareWithTracing = pipe(addOne, trace('after addOne'), square, trace('after square'));

// console.log(addOneAndSquare(1));
// console.log(addOneAndSquareWithTracing(1));

const flippedTrace = flip(trace);
flippedTrace('value')('label');

// const add = (a, b) => a + b;
const add = (a) => (b) => a + b;
// console.log(add(2)(3));

// Partial function application

const add1 = add(1);
// console.log(add1(3));

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));

// Reduce, map, filer

const reducer = (prev, curr) => prev + curr;
const mapper = (value) => value * 2;
const predicate = (value) => value % 2 === 0;

console.log(reduce(reducer, 0, [1, 2, 3]));
console.log(map(mapper, [1, 2, 3]));
console.log(filter(predicate, [1, 2, 3]));

const filterByEven = curry(filter)(predicate);
console.log(filterByEven([1, 2, 3]));
console.log(filterByEven([2, 5, 6]));

/*
A functor data type is something you can map over. It’s a container which has a map operation
which can be used to apply a function to the values inside it. When you see a functor datatype, you
should think “mappable”. In JavaScript, functor types are typically represented as an object with a
.map() method that maps from inputs to outputs, e.g., Arrays, promises, streams, trees, objects, etc.

Functors are great for several reasons:
• The details of the underlying data structure implementation are abstracted away. Users don’t
need to know if iteration is required, or how it’s handled if it is. You can map over arrays,
streams, trees, or anything else.
• Functors hide the types of the data they contain, which allows you to act on the containers
using generic functions, without caring about what you’re storing inside them. You don’t need
special arrays for numbers, and special arrays for strings. Instead, you pass functions into map()
that can deal with the type contained inside the functor.
• Mapping over an empty functor is the same as mapping over a functor containing many items.
Switching logic is not needed in the case of an empty collection, and there’s no need to keep
track of iteration state if the data structure enumerates over a collection of items.
• Most importantly, functors allow you to easily compose functions over the data inside.

The functor laws:
- Identity - if you pass the identity function (x) => x into a.map(), where a is any functor type, the result should
be equivalent to a.
- Composition - functors must obey the composition law: a.map(g).map(f) is equivalent to a.map(x => f(g(x))).
 */

const numbers = [1, 2, 3 ,4]
    .map((value) => value * 2)
    .map((value) => value * 3);
    
const composedMapper = compose((value) => value * 3, (value) => value * 2); 

console.log(numbers);
console.log(numbers, numbers.map((x) => x));
console.log(numbers, [1, 2, 3 ,4].map(composedMapper));

// Custom functor

const Box = (value) => ({
    map: (fn) => Box(fn(value)),
    toString: () => value
});

const box = Box(1)
    .map((value) => value * 2)
    .map((value) => value * 3);

const functorMap = curry((mapper, functor) => functor.map(mapper));

const multiplyByTwo = functorMap((value) => value * 2);
console.log(multiplyByTwo([1, 2, 3]));
console.log(multiplyByTwo(Box(2)).toString());

/*
A monad is a way of composing functions that require context in addition to the return value, such as computation, branching, or effects.
*/

const x = 20; // Some data of type `a`
const f = n => n * 2; // A function from `a` to `b`
const arr = Array.of(x); // The type lift.
const result = arr.map(f); // [40] .map() applies the function f to the value x in the context of the array.

/*
But what if we have a function that takes a value and returns an array of values?
*/

const repeat = (n) => (x) => Array.from({ length: n }).fill(x);

/*
Using map() with this, we’ll end up with an array of arrays.
*/

console.log([1, 2, 3].map(repeat(3))); // [[1, 1, 1], [2, 2, 2], [3, 3, 3]]   

/*
We can use flatMap to flat the result
 */

console.log([1, 2, 3].flatMap(repeat(3))); // [1, 1, 1, 2, 2, 2, 3, 3, 3]

/*
Monads are needed because lots of functions aren’t simple mappings from a => b. Some functions
need to deal with side effects (promises, streams), handle branching (Maybe), deal with exceptions
(Either), etc…

Monad is composed from (functor extension):
• of: A type lift a => M(a)
• map: The application of a function a => M(b) inside the monad context, which yields M(M(b))
• flatten: The unwrapping of one layer of monadic context: M(M(b)) => M(b)

Combination of map and flatten is flatMap.

Monads must satisfy three laws (axioms), collectively known as the monad laws:
• Left identity: unit(x).flatMap(f) ==== f(x)
• Right identity: m.flatMap(unit) ==== m
• Associativity: m.flatMap(f).flatMap(g) ==== m.flatMap(x => f(x).flatMap(g))
*/

const Monad = value => ({
    flatMap: (f) => f(value),
    map (f) {
        return this.flatMap((a) => Monad.of(f(a)));
    }
});

Monad.of = (x) => Monad(x);

Monad(21)
    .map((x) => x * 2)
    .flatMap((x) => Monad.of(x + 1))
    .map((x) => x + 3);