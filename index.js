const LIBRARY = (function() {
    const version = '1.0';
    const getVersion = () => `Version ${version}`;
    const addListener = (target, eventName, listener) => target.addEventListener(eventName, listener);
    const on = (selector, eventName, listener) => addListener(document.querySelector(selector), eventName, listener);  
    const onReady = (listener) => addListener(window, 'DOMContentLoaded', () => listener(LIBRARY));

    console.log('Initializing LIBRARY')

    return {
        getVersion,
        on,
        onReady
    };
})();

const app = ($) => {
    $.on('#box', 'click', () => console.log('click'));
};

LIBRARY.onReady(app);
