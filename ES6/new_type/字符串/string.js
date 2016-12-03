/*
 * @ 新增 string 方法
*/

/* 字符 以及 unicode 新增方法 */

/* 1 String.codePointAt()  ‘字符’ 返回 ‘字符编码’ */

// javascript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于需要4个字节储存的字符（Unicode断点码大于 0xFFF的字符），javascript会认为他们是两个字符
// ES6 提供 codePointAt() 方法，能正确处理4个字节存储的字符，返回一个字符的码点
var s = "𠮷";
var len = s.length;			//  len == 2

s.charCodeAt(0) 			// 55362
s.charCodeAt(1)			    // 57271

s.codePointAt(0)       // 134071
s.codePointAt(1)       // 57271

// String.codePointAt() 方法是测试一个字符由两个字节还是四个字节组成的最简单的方法
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false









/* 2 String.fromCodePoint()  ‘字符编码’ 返回 ‘字符’ */

// ES5 String.fromCharCode方法，不能识别辅助平面的字符 （编号大于 0xFFFF）
String.fromCharCode(0x20BB7);	
// "ஷ"								//最后返回码点 U+0BB7 对应的字符，而不是码点 U+20BB7 对应的字符。

// ES6 提供了 String.fromCodePoint 方法，可以识别 0xFFFF 的字符，弥补了 String.fromCharCode 方法的不足。
// 在作用上，正好与 codePointAt 方法相反。
String.fromCodePoint(0x20BB7)
// "𠮷"

//注意，fromCodePoint 方法定义在 String 对象上，而 codePointAt 方法定义在字符串的实例对象上。








/* 3 String.prototype.at() */

// ES5 提供 String.prototype.charAt 方法，返回字符串给定位置的字符。该方法不能识别码点大于 0xFFFF 的字符。
'𠮷'.charAt(0)
// '\uD842'

// ES7 提供了字符串实例的 at 方法，可以识别 Unicode 编号大于 0xFFFF 的字符，返回正确的字符。
'𠮷'.at(0)
// '𠮷'








/* 4 Unicode 表示法 */

// ES5 允许采用 '\uxxxx' 形式表示一个字符，其中‘xxxx’表示字符的码点
var s = "\u0061";			// s == "a"

// 但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达。
var s = "\uD842\uDFB7";    // s == "𠮷"

// 上面代码表示，如果直接在“\u”后面跟上超过 0xFFFF 的数值（比如 \u20BB7），JavaScript 会理解成“\u20BB+7”。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个 7。
var s = "\u20BB7";		  // s == " 7"

// ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。
var s = "\u{20BB7}";	  			// s == "𠮷"
var s = "\u{41}\u{42}\u{43}";		// s == "ABC"













/* 正则 新增方法 */
// ES6 对正则表达式添加了 u 修饰符，用来正确处理大于 \uFFFF 的Unicode字符

/* 1 点字符 */
// 点 (.) 字符在正则表达式中，表示除了换行以外的任意单个字符，对于码点大于 0xFFFF 的 Unicode 字符，点字符不能识别，必须加上 u 修饰符
var s = '𠮷';
/^.$/.test(s);			// false	解析成了两个字符
/^.$/u.test(s);			// true		解析成 一个字符

/* 2 unicode 字符表示法 */
// ES6 新增使用大括号表示 Unicode字符，这种表示法在正则中必须加上 u 修饰符，才能识别。
/\u{61}/.test('a') 		// false	如果不加 u ，'\u{61}' 被正则识别为 61个连续的 u。
/\u{61}/u.test('a') 	// true
/\u{20BB7}/u.test('𠮷') // true

/* 3 量词 */
//使用 u 修饰符后，所有量词都会正确识别大于码点大于 0xFFFF 的 Unicode 字符。
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true


/* 3 预定模式 */
/^\S$/.test('𠮷');		// false
/^\S$/u.test('𠮷');		// true
// '\S' 是预定模式，匹配所有不是空格的字符。只有加了 u 修饰符，它才能正确匹配码点大于 0xFFFF 的 unicode 字符。

// 利用这一点，可以写出一个正确返回字符串长度的函数。
function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}

var s = "𠮷𠮷";

s.length // 4
codePointLength(s) // 2



/* 4 i 修饰符 */
// 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的 K。
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true

// 上面代码中，不加 u 修饰符，就无法识别非规范的 K 字符。



















/* normalize() */

// 为了表示语调和重音符号，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
// 这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。
'\u01D1'==='\u004F\u030C' 	//false
'\u01D1'.length 			// 1
'\u004F\u030C'.length 		// 2
// 上面代码表示，JavaScript 将合成字符视为两个字符，导致两种表示方法不相等。


//ES6 提供 String.prototype.normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
'\u01D1'.normalize() === '\u004F\u030C'.normalize()			// true

//normalize 方法可以接受四个参数。
	1、NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
	2、NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
	3、NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。
	4、NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
// 上面代码表示，NFC 参数返回字符的合成形式，NFD 参数返回字符的分解形式。
// 不过，normalize 方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。

















/* 字符串 函数 */

/* 1 includes(),startsWith(),endsWith() */

1、includes()：返回布尔值，表示是否找到了参数字符串。
2、startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
3、endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

var s = "Hello world!";
s.startsWith("Hello") // true
s.endsWith("!") // true
s.includes("o") // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。
var s = "Hello world!";
s.startsWith("world", 6) // true
s.endsWith("Hello", 5) // true
s.includes("Hello", 6) // false
// 上面代码表示，使用第二个参数 n 时，endsWith 的行为与其他两个方法有所不同。它针对前 n 个字符，而其他两个方法针对从第 n 个位置直到字符串结束。

