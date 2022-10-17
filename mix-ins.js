'use strict';

const nameMixin = {
    name: 'unknown name',
    printName: function() { console.log(this.name); }
};

const user = {};
const product = {
    price: 100
};

const mix = (destination, source) => {
    // Object.keys(source).forEach((key) => destination[key] = source[key]);
    // return Object.assign({}, destination, source);
    return {...destination, ...source};
};

const newProduct = mix(product, nameMixin);
newProduct.printName();