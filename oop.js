'use strict';

function Account() {
    if (!(this instanceof Account)) { // safe constructor
        return new Account();
    }

    this.balance = 0;
    /*  function/method override
    this.getDescription = function() {
        return Account.prototype.getDescription.call(this);
    }
    */
    // return this;
}

Account.DEFAULT_CURRENCY = 'PLN';    // static like property
Account.GET_INFO = function() {      // static like function
    return 'Account constructor';
};

Account.prototype.getDescription = function() {
    return `Account has balance ${this.balance}`;
};

function PremiumAccount(discount) {
}

PremiumAccount.prototype = new Account();

const accout = Account();
accout.balance = 10;
const premiumAccount = new PremiumAccount();
console.log(accout.getDescription());
console.log(premiumAccount.getDescription());
console.log(`Is Account: ${premiumAccount instanceof Account}`); // uses constructor prototype property 
console.log(`Is PremiumAccount" ${premiumAccount instanceof PremiumAccount}`); // uses constructor prototype property 
console.log(`Static Account property: ${Account.DEFAULT_CURRENCY}`);


function Parent(name = 'not set') {
    this.name = name;
}
Parent.prototype.getDescription = function() {
    return this.name;
};

function Child(name) {
    Parent.call(this, name);
}

LIBRARY.extend(Child, Parent);

const child = new Child('Jan');
console.log(child.getDescription());
console.log(`Is Parent: ${child instanceof Parent}`); 
console.log(`Is Child: ${child instanceof Child}`);