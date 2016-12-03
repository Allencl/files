/*
 * @ let 用来声明变量
*/


/* 1 只在代码块内有效 */

// let 定义的变量，只在作用块内有效
{ 
	var a = 1;
	let b = 2;
}
// a	ReferenceError: a is not undefined
// b	2
 
// 每个let变量在作用块内都是唯一的，不受外部干扰。so i 的结果不再是3，而是 ReferenceError: a is not undefined
for(let i=0;i<3;i++){
} // console.log(i) 	ReferenceError: i is not undefined

// a[i]的每一个函数都是唯一的，so a[6]: result is 6,not is 10.
var a = [];
for(let i=0;i<10;i++){
	a[i] = function(){
		console.log(i);
	}
}// a[6]()	6	let 变量的赋值是唯一的












/* 2 不存在变量提升*/

// var 变量会预加载缓存 undefined,let不会。	so 在let未定义之前使用 ReferenceError: b is not undefined
function (){
	console.log(a);
	console.log(b);

	var a = 1;
	let b = 2;
}
// a	undefined
// b	ReferenceError: a is not undefined

// 意味着 typeof 不再是一个安全的操作
function(){
	console.log(typeof a);		// undefined
	console.log(typeof b);		// ReferenceError: b is not undefined

	var a = 1;
	let b = 2;
}

// 只要在块内 let 声明了变量，let声明的变量就只属于块内，不受外部干扰
var a = 1;
if(1){
	let a = 2;		// a =2
}// console.log(a)	 a = 1;

// 如果块内存在 let const命令，块内对这些变量的声明就形成了‘暂时死区’。凡是在声明前调用，都会 ReferenceError.
if(1){
	// 暂时死区 begin
	a = 'ewewe';		// ReferenceError: a is not undefined
	console.log(a);		// ReferenceError: a is not undefined

	let a = 'abc'; 
	// 暂时死区结束

	a = 123;
	console.log(a);		// a = 123
}










/* 3 不允许变量重复申明 */
// 报错
{
	var a = 1;		// Uncaught SyntaxError: Identifier 'a' has already been declared
	let a = 1;		// let const 优先级高
}
// 报错
{
	let a = 1;		//	变量不能重复申明
	let a = 2;		// Uncaught SyntaxError: Identifier 'a' has already been declared
}

// 函数内 重复申明 报错
function tem(a){
	let a = 2;		// Uncaught SyntaxError: Identifier a has already been declared
}
tem(1);

// 函数内 嵌套块级 不会报错	
function tem(a){
	{
		let a = 2;	// a == 2
	}
}
tem(1);










/* 5 新增了块级作用域 */
// 作用域 从函数提升到块级
function (){
	let a = 1;
	{
		let a = 2;
		console.log(a);			// a == 2 
	}

	console.log(a);				// a == 1 
}

// 闭包功能 被块级作用域 代替
// 闭包
(function(){
	console.log("12");
}();

// 块级 作用域
'use strict'
{
	function tem(){
		alert(1);
	}
}
tem();	// tem is not undefined

// 'use strict'下 不存在变量提升

// ES5
function fn(){ console.log("this is out"); }

(function(){
	if(false){
		function fn(){ console.log("this is in"); }
	}
	fn();	// fn() == this is in	  // ES5 存在变量提升  if不执行，也会在函数顶部，缓存 fn.   
})();

// ES6 
'use strict'
function fn(){ console.log("this is out"); }
(function(){
	if(false){
		function fn(){ console.log("this is in"); }
	}
	fn();	// fn() == this is out	  // ES6 不存在变量提升，if不走，变量不会缓存。for等块级也是一样的。 并且变量只能在顶层声明。
})();


/* 6 全局对象的属性 */
// ES6 规定，var 命令和 function 命令声明的全局变量，属于全局对象的属性；let 命令、const 命令、class 命令声明的全局变量，不属于全局对象的属性
var a = 1;
// 如果在node环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined