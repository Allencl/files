/*
 * @ 数组解构赋值  与  对象解构赋值
*/

/* 1 ‘解构赋值’ */

// 只要左右结构一样，可以一一对应
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [,,third] = ["foo", "bar", "baz"];
third // "baz"

// 结构匹配不成功，返回 undefined
var [foo] = [];
var [bar, foo] = [1];

console.log(foo);			// foo == undefined

// ‘模式匹配’只认数组. 因为array、string可以转换为objext，而undefined、null、Json不行
let foo = undefined;
let foo = null;
let foo = true;
let foo = false;
let foo = 1;
let foo = NaN;
let foo = Object;
let foo = {};

// 可以为变量设置默认值
let [a=1,b] = [];
console.log(a);				// a == 1    a 默认等于  1

let [a=1,b] = [2];
console.log(a);				// a == 2    a 修改了

// 不可以设置为 undefined,可以为 null
let [a=1] = [null];
console.log(a);				// a==null	可以赋值为 null
let [a=1] = [undefined]		// a==1     不可以赋值为 undefined

// ...表示 剩下的所有
let [a,...b] = [1,2,3,4,5,6];
conosle.log(a);					// a==1
console.log(b);					// b==[2,3,4,5,6]


// ES6内部使用严格相等运算符(===),判断一个位置是否有值。所以 null 严格不等于 undefined,当赋值 null,默认值不会生效 
let [a=1] = [undefined];
console.log(a);				//	a==1		undefined === undefined

let [a=1] = [null];
console.log(a);				// a==null		null !=== undefined


// 结构赋值   适用于   var、let、const
var [a,b,c] = [1,'2',3];
let [a,b,c] = [1,'2',3];
const [a,b,c] = [1,'2',3];

// 对于 set结构，也可以用解构赋值
var let const [a,b,c] = new Set([1,2,3]);

// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
// 下面代码中，fibs 是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5













/* 2 对象解构赋值 */
// 数组解构赋值是按位置赋值的，对象解构赋值，是按‘属性名’赋值的
let {a,c} = {a:1,b:2};
console.log(a);			// 有对应的键			a == 1
console.log(c);			// c 没有对应的值		c == undefined
conosle.log(b);			// b 没有赋值报错       Uncaught ReferenceError: 'b' is define...
let {a=1} = {a:true};			// a == true
let {a=1} = {a:false};			// a == false
let {a=1} = {a:NaN};			// a == NaN
let {a=1} = {a:{}};				// a == {}
let {a=1} = {a:new Date()};		// a == 2015/11/12 ...

// 如果 变量名与属性名 不一致时，必须保持 ‘键对键’
let foo = {first:"obj1",last:"obj2"};
let {first:obj1,last:obj2} = foo;
console.log(obj1);						// obj1 == "obj1"
console.log(obj2);						// obj2 == "obj2";

// 和数组解构一样， 对象解构也可以做嵌套
let obj = {
  p: [
    "Hello",
    { y: "World" }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"

// 对象解构赋值， 也可以设置默认值
let {a=1,b} = {b:2};
console.log(a);					// a == 1

let {a=1,b} = {a:3,b:2};
console.log(a);					// a == 3

// 赋值为 null时，默认值无效
let {a=1} = {a:undefined};		// a == 1   	默认值有效
let {a=1} = {a:null}; 			// a == null

// {x} 在 javascript中被解释为 ‘块’, 正确的写法是，放在块内。
let x;
{x} = {x:1};
console.log(x);       // 会报错

let x;
({x} = {x:111});
console.log(x);       // x == 111  

// 运用 对象解构赋值 可以更便捷的使用 JS的方法
let {log,sin,cos} = Math;       //  Math 的 圆周率、正弦、余弦
console.log(log);               //  log == Math.log
console.log(sin);               //  sin == Math.sin
console.log(cos);               //  con == Math.cos







/* 3 字符串的解构赋值 */

// 一般赋值
let [a,b,c] = "allencc";
console.log(a);                 // a == 'a'
console.log(b);                 // b == 'l'
console.log(c);                 // c == 'l'

// 字符串带 length属性
let {length:len} = "allen";
console.log(len);               // len == 5    ( len == String.length )






















/* 4 函数参数  ‘解构赋值’ */

// 运用 数组的 ‘解构赋值’
function add([x,y]){
  return x+y;
}
console.log(add([1,2]));      // 3    这里并不是传的一个数组，而是数组的 ‘解构赋值’
// 也可以设置默认值
function add([x=1,y=1]=[]){
  return [x,y];
} 
console.log(add());           // [1,1]   没有传参返回默认值
console.log(add([3,3]));      // [3,3]  有传参
// 默认值 一定要先 定义变量
function add([x,y]){
  return [x,y];
}
console.log(add());           // [x,y] 没有定义，会报错。 Uncaught Typeof: Cannot read property 'Symbol(Symbol.iterator)' of undefined
// 默认值 有了定义，没有默认值 返回 undefined
function add([x,y]=[]){
  return [x,y];
}  
console.log(add());           // [undefined,undefined]

// 运用Json ‘解构赋值’
// 定义默认值
function add({x,y}={}){
  return [x,y];
}
console.log(add());           // 没有‘传参’，也没有‘默认值’。返回 [undefined,undefined]
// 设置默认值
function add({x=1,y=1} = {}){
  return [x,y];
}
console.log(add());           // 有默认值  [1,1]
// 有传参
function add({x=1,y=1}={}){
  return [x,y];
}
cosnole.log({x:3,y:3});       // 有传参    [3,3]

// 有传参，传参为空。 有默认值
function add({x=1,y=1}={}){
  return [x,y];
}
console.log(add({}));         // 传参为空时，返回默认值

// 有传参，传参为空。没有默认值
function add({x,y}={}){
  return [x,y];
}
console.log(add({}));        // 传参为空，没有默认值时，返回 [undefined,undefined]

















/* 5 关于 ‘圆括号’ 的问题*/
解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

// 不能使用 ‘圆括号’ 的情况

// a 变量声明语句中，模式不能带有 ‘圆括号’
let [(a)] = [1];
console.log(a);             // Uncaught SyntaxError: Unexpected token (
let {obj:(a)} = {};
console.log(a);             // Uncaught SytaxError: Unexpected token  (
let {a:{b:(obj)}} = {};
console.log(obj);           // Uncaught SytaxError: Unexpected token  (

// b 函数参数中 模式不能带有 ‘圆括号’   （函数参数也属于变量声明！）
function fn([(z)]){
  return z;
}
console.log([1]);         // Uncaught SytaxError: Unexpected token (

// c 不能将整个模式，或嵌套模式中的一层，放在‘圆括号’之中
let ([a]) = [1];
console.log(a);           // Uncaught SyntaxError: Unexpected strict mode reserved word
let [({a:name}),{b:age}] = [{},{}]
console.log(name);        // Uncaught SytaxError: Unexpected token (

// 可以使用‘圆括号’的情况只有一种：赋值语句的‘非模式’部分，可以使用。
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；
其次它们的圆括号都不属于模式的一部分。
第一行语句中，模式是取数组的第一个成员，跟圆括号无关；
第二行语句中，模式是 p，而不是 d；
第三行语句与第一行语句的性质一致。















/* 解构赋值  的用途 */

/* 1 交换 变量的值 */
[x,y] = [y,x]




/* 2 函数只能返回一个‘值’，要返回多个要放在数组或者对象里面。有了‘解构赋值’，就轻松的多 */
function example(){
  return [1,2,3];
}
var [a,b,c] = example();




/* 3 函数 参数的定义 */

// 有序的参数
function example([x,y,z]){}
example([1,2,3]);

// 无序的参数
function example({x,y,z}){}
example({x:1,y:2,z:3});




/* 4 提取 Json数据 */
let Json = {
  name:"allen",
  age:23,
  hobby:{fist:"piano"}
}
let [name,age,hobby];



/* 5 函数 默认值 */
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};



/* 6 遍历 map结构 */
//任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}





/* 7 输入模块的指定方法 */
//加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。
const { SourceMapConsumer, SourceNode } = require("source-map");