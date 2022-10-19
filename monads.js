/*Maybe

function getUser() {
    const user = {
        name: 'jan',
        address: Monet.None() //Monet.Some('Street x')
    }
    return Monet.Some(user);
    //return Monet.None();
}

const userName = getUser()
    .map((user) => user.name)
    .map((name) => name.toUpperCase())

console.log(userName.getOrElse('Unknown'));    

const userAddress = getUser()
    .flatMap((user) => user.address)
    .map((street) => street.toUpperCase())

console.log(userAddress.getOrElse('Unknown'));  

*/

// --- 

/*
// Either

function divide(a, b) {
    if (b === 0) {
        return Monet.Left('Division by zero');
    } else {
        return Monet.Right(a / b);
    }
}

function square(value) {
    return Monet.Right(value * value);
}

divide(2, 1)
    .flatMap((value) => square(value))
    .map((result) => `Result: ${result}`)
    .forEach((element) => console.log(element));
*/

function readTemperature() {
    return Monet.IO(() => document.querySelector('#temperature').value);
}

function writeTemperatue(temperature) {
    return Monet.IO(() => console.log(temperature));
}

function celsiusToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

const pipline = readTemperature()
    .map(parseInt)
    .map(celsiusToFahrenheit)
    .map((fahrenheit) => `Result: ${fahrenheit} fahrenheit`)
    .flatMap(writeTemperatue);

document.querySelector('#convertBtn')
    .addEventListener('click', () => {
        pipline.run();
    });