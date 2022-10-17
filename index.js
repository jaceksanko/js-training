'use strict';

const LIBRARY = (function(window) {
    const version = '1.0';
    const getVersion = () => `Version ${version}`;
    const forEach = (selector, task) => document.querySelectorAll(selector).forEach(task);
    const addListener = (target, eventName, listener, context) => target.addEventListener(eventName, listener.bind(context || target) /*bind(context || target, listener)*/);
    const on = ({selector, eventName = 'click', listener, context}) => forEach(selector, (target) => addListener(target, eventName, listener, context));
    const onReady = (listener) => addListener(window, 'DOMContentLoaded', () => listener(LIBRARY));
    const extend = (function() {
        const TemporaryConstructor = function() {};
        return function(Child, Parent) {
            TemporaryConstructor.prototype = Parent.prototype;
            Child.prototype = new TemporaryConstructor();
            Child.uber = Parent.prototype;
            Child.prototype.constructor = Child; 
        };
    })();

    /*
    const bind = function(context, fn) {
        return function() {
            return fn.apply(context, arguments);
        }
    };
    */

    console.log('Initializing LIBRARY')

    return {
        getVersion,
        on,
        onReady,
        extend
    };
})(window);


LIBRARY.onReady(($) => {
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
});


// const nameMixin = {
//     name: 'unknown name',
//     printName: function() { console.log(this.name); }
// };

// const user = {};
// const product = {
//     price: 100
// };

// const mix = (destination, source) => {
//     // Object.keys(source).forEach((key) => destination[key] = source[key]);
//     // return Object.assign({}, destination, source);
//     return {...destination, ...source};
// };

// const newProduct = mix(product, nameMixin);
// newProduct.printName();




// function Parent(name = 'not set') {
//     this.name = name;
// }
// Parent.prototype.getDescription = function() {
//     return this.name;
// };

// function Child(name) {
//     Parent.call(this, name);
// }

// $.extend(Child, Parent);

// const child = new Child('Jan');
// console.log(child.getDescription());
// console.log(`Is Parent: ${child instanceof Parent}`); 
// console.log(`Is Child: ${child instanceof Child}`);





// function Account() {
//     if (!(this instanceof Account)) { // safe constructor
//         return new Account();
//     }

//     this.balance = 0;
//     /*  function/method override
//     this.getDescription = function() {
//         return Account.prototype.getDescription.call(this);
//     }
//     */
//     // return this;
// }

// Account.DEFAULT_CURRENCY = 'PLN';    // static like property
// Account.GET_INFO = function() {      // static like function
//     return 'Account constructor';
// };

// Account.prototype.getDescription = function() {
//     return `Account has balance ${this.balance}`;
// };

// function PremiumAccount(discount) {
// }

// PremiumAccount.prototype = new Account();

// const accout = Account();
// accout.balance = 10;
// const premiumAccount = new PremiumAccount();
// console.log(accout.getDescription());
// console.log(premiumAccount.getDescription());
// console.log(`Is Account: ${premiumAccount instanceof Account}`); // uses constructor prototype property 
// console.log(`Is PremiumAccount" ${premiumAccount instanceof PremiumAccount}`); // uses constructor prototype property 
// console.log(`Static Account property: ${Account.DEFAULT_CURRENCY}`);