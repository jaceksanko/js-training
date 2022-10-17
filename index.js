'use strict';

const LIBRARY = (function(window) {
    const version = '1.0';
    const getVersion = () => `Version ${version}`;
    const forEach = (selector, task) => document.querySelectorAll(selector).forEach(task);
    const addListener = (target, eventName, listener, context) => target.addEventListener(eventName, listener.bind(context || target) /*bind(context || target, listener)*/);
    const on = ({selector, eventName = 'click', listener, context}) => forEach(selector, (target) => addListener(target, eventName, listener, context));
    const onReady = (listener) => addListener(window, 'DOMContentLoaded', () => listener(LIBRARY));

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
        onReady
    };
})(window);


LIBRARY.onReady(($) => {
    
    function Account() {
        if (!(this instanceof Account)) {
            return new Account();
        }

        this.balance = 0;
        /*
        this.getDescription = function() {
            return Account.prototype.getDescription.call(this);
        }
        */
        // return this;
    }

    Account.DEFAULT_CURRENCY = 'PLN'; // static like property
    Account.GET_INFO = function() {  // static like function
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

});
