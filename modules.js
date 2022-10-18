import * as moduleOne from './module-one.js'
import {sayHello as sayHi, user} from './module-one.js'
import currency from './module-two.js'

sayHi();
console.log(user.name);
console.log(currency);