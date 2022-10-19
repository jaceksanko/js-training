'use strict'

//Freeze

const user = {
    age: 24,
    address: {
        street: 'Dobra 10'
    }
};

Object.freeze(user);

//user.age = 11;
user.address.street = 'Polska 11';

//console.log(user.age);

// https://immutable-js.com

// Symbol

/*
const numberSymbol = Symbol('custom key');
const numberSymbolAliast = numberSymbol;
const mySecondSymbol = Symbol('custom key');
console.log(numberSymbol === mySecondSymbol);

const account = {
    balance: 0,
    [numberSymbol]: '0000001' 
};

// console.log(account[numberSymbol]);

const secondAccont = Object.assign({}, account);
console.log(secondAccont[numberSymbol]);
console.log(secondAccont[numberSymbolAliast]);

account['numberSymbol'] = '123';

for (let key in account) {
    console.log(key);
}
*/
// global symbols https://tc39.es/ecma262/#sec-well-known-symbols

// Generators

function* randomGenerator() {
    yield Math.random();
}

function* myGenerator() {
    try {
        yield 1;
        console.log('After first yeald');
        yield 2;
        console.log('After second yeald');
        yield* randomGenerator();
        const result = yield 'some value';
        console.log(result);
    } catch {
        console.log('Exception');
    }
    yield 0;
}

/*
const generator = myGenerator();
console.log(generator.next());
console.log(generator.next());
// generator.throw(new Error(('Too many data')));
// generator.return('final result');
console.log(generator.next());
console.log(generator.next());
generator.next('success');
*/

// for (let result of generator) {
//     console.log(result);
// }

async function* sequence(start, stop) {
    for (let index = start; index <= stop; index++) {
        yield await new Promise((resolve) => setTimeout(() => resolve(index), 4_000));
    }
} 

(async () => {
    const generator = sequence(1, 5);
    for await (let value of generator) {
        console.log(value);
    }
})();
