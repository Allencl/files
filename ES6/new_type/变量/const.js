/*
 * @ const 用来声明常量
*/


/* 1 常量一旦声明 不能改变 */

// 重复 声明会报错
'use strict'
const a = 1;					// a == 1
const a = 2;					// Uncaght SyntaxError: Identifier 'a' has already declared
	
// 变量提升 会报错
'use strict'
const a = 1;					// a == 1
a = 2;      					// Uncaught TypeError: Assignment to constant variable


/* 2 const的作用域跟let一样 只在块极内有效 */
'use strict'
if(true){
	const a = 1;
}
// console.log(a);			// Uncaught RefernceError: a is not undefined


/* 3 const 与let一样不存在变量提升，必须在声明后使用 */
'use strict'
if(1){
	console.log(a);			// Uncaught ReferenceError: a is not undefined
	const a = 1;
}


/* 4 const与let一样不能重复声明 */
'use strict'

var a = 1;
let b = 'a';

const a = 2;
const b = 'b';

console.log(a);				// Uncaught SyntaxError: Identifier a has already been declared
console.log(b);				// Uncaught SyntaxError: Identifier b has already brrn declared


/* 5 const常量所声明的是一个址，objext本身可以新镇属性，但是‘址’不能改变 */

const a = {};
a.name = "allen";

console.log(a.show);		//  'allen'

a = {};
console.log(a);				// Uncaught TypeofError: Assignment to constant variable

// 强制冻结 object属性
'use strict'
const a = Object.freeze({});	// a 被冻结为一个 空的{}，不能再新增或者删除
a.name = 'allen';
console.log(a);					// Uncaught TypeofError: can't add property name,objext is not extensible

// 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};


/* 6 全局对象的属性 */
// ES6 规定，var 命令和 function 命令声明的全局变量，属于全局对象的属性；let 命令、const 命令、class 命令声明的全局变量，不属于全局对象的属性
var a = 1;
// 如果在node环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
