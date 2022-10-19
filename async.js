/* Callbacks

function load(src, success, failure = () => {}) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => success(script);
    script.onerror = () => failure(new Error(`Load script ${src} failed`));
    document.head.append(script);
}

function onError(error) {
    console.log(error);
} 

// load('library.js', function() {
//     console.log('Library loaded');
//     load('index.js', function() {
//         console.log('Index loaded');
//     }, function(error) {
//     console.log(error);
// });
// }, function(error) {
//     console.log(error);
// });

function onReady() {
    console.log('Index loaded');
}

load('library.js', function(src) {
    const value = src;
    console.log('Library loaded');
    load('index.js', onReady, onError);
}, onError);

console.log('After load command');

*/

/*
- Promise has state one of ['pending', 'fulfilled', 'rejected']
- Promise state can change only once (is final after resolve or reject call)
- Promise has result on of [undefined, value passed to resolve fn, error passed to reject fn]
*/

let libraryName = new Promise(function(resolve, reject) {
    console.log('In promise (executor function)');
    // resolve(' success');
    // reject('failure');
    setTimeout(() => resolve(' library.js '), 1_000);
});

const load = (src) => new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(src);
    script.onerror = () => reject(new Error(`Load script ${src} failed`));
    document.head.append(script);
});

function showResult(result) {
    console.log(result);
} 

// libraryName
//     .then((name) => name.trim())
//     .then(load)
//     .then(() => load('index.js'))
//     .then((result) => result.toUpperCase())
//     .then(showResult, (error) => console.log(`${error}`));

// libraryName
//     .then((name) => name.trim())
//     .then(showResult, (error) => console.log(`${error}`));


// Waits for all promises to resolve (all or nothin error strategy)
/*
Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 500)),
    new Promise((resolve, reject) => setTimeout(() => reject('failure'), 1_000)),
])
.then(showResult, (error) => console.log(`${error}`));
*/

// Waits for all promises despite of result
/*
Promise.allSettled([
    new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 500)),
    new Promise((resolve, reject) => setTimeout(() => reject('failure'), 1_000)),
])
.then(showResult, (error) => console.log(`${error}`));
*/

// Waits for first promise despite of result
/*
Promise.race([
    new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 500)),
    new Promise((resolve, reject) => setTimeout(() => reject('failure'), 1_000)),
])
.then(showResult, (error) => console.log(`${error}`));
*/

// Waits for first fulfilled promise
/*
Promise.any([
    new Promise((resolve) => setTimeout(() => resolve(1), 4_000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2_000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1500)),
    new Promise((resolve, reject) => setTimeout(() => reject('failure'), 1_000)),
])
.then(showResult, (error) => console.log(`${error}`));
*/

/*
const success = Promise.resolve('sucess');
const failure = Promise.reject('failure');
*/

// async/await

function asyncTask() {
    return new Promise((resolve) => setTimeout(() => resolve(1), 4_000));
}

function failedAsyncTask() {
    return new Promise((resolve, reject) => setTimeout(() => reject(new Error('Task error')), 4_000));
}

async function process() {
    // return Promise.resolve('result');
    
    /*
    const result = await asyncTask();
    console.log(result);
    try {
        const secondResult = await failedAsyncTask();
        console.log(secondResult);
    } catch (error) {
        console.log(error);
    }
    */

    const result = await Promise.all([asyncTask(), asyncTask()]);
    return 'result';
}

process()
    .then(showResult, (error) => console.log(`${error}`));


