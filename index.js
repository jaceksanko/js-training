'use strict';

const LIBRARY = (function(window) {
    const version = '1.0';
    const rootNamespace = {};
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
    const addPlaceholder = (object, key, placeholder = {}) => {
        if (!object.hasOwnProperty(key)) {
            object[key] = placeholder;
        }
        return object;
    };
    const namespace = (name, module) => name.split('.')
        .reduce((namespace, part) => addPlaceholder(namespace, part, module)[part], rootNamespace);


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
        extend,
        namespace,
        rootNamespace
    };
})(window);


LIBRARY.onReady(($) => {
});
