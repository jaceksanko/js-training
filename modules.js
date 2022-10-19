import * as moduleOne from './module-one.js'
import {sayHello as sayHi, user} from './module-one.js'
//import currency from './module-two.js'

sayHi();
console.log(user.name);

const moduleName = 'module-two.js'

if (true) {
    import(moduleName)
        .then((currency) => console.log(currency))
        .catch((error) => console.log(error));

   const currency = await import(moduleName);  
}
