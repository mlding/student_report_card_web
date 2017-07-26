## localStorage 在客户端存储数据

####HTML5 提供了两种在客户端存储数据的新方法：
- localStorage - 没有时间限制的数据存储
- sessionStorage - 针对一个 session 的数据存储
- cookie - 主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”，这通常就是通过在 Cookie 中存入一段辨别用户身份的数据来实现的但是. cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。
在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。

#### Usage:
[localStorage](http://codular.com/localstorage)

```
localStorage.setItem("b","isaac");//设置b为"isaac"
var b = localStorage.getItem("b");//获取b的值,为"isaac"
var a = localStorage.key(0); // 获取第0个数据项的键名，此处即为“b”
localStorage.removeItem("b");//清除c的值
localStorage.clear();//清除当前域名下的所有localstorage数据
```

#### 这里的作用域指的是：如何隔离开不同页面之间的localStorage
- localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
- sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

#### 数据结构
键值对数据类型来说，“键是唯一的”这个特性也是相当重要的，重复以同一个键来赋值的话，会覆盖上次的值。

#### setItem method is converting the input to a string before storing it.

```
const testObject = { 'one': 1, 'two': 2, 'three': 3 };
console.log('typeof testObject: ' + typeof testObject);
console.log('testObject properties:');
for (let prop in testObject) {
    console.log('  ' + prop + ': ' + testObject[prop]);
}

// Put the object into storage
localStorage.setItem('testObject', testObject);
/*localStorage.setItem('testObject', JSON.stringify(testObject));*/
The JSON.stringify() method converts a JavaScript value to a JSON string
The JSON.parse() method 解析一个JSON字符串，构造由字符串描述的JavaScript值或对象
JSON.stringify({ x: 5 });            // '{"x":5}'
JSON.parse('[1, 5, "false"]')        // [1, 5, "false"]

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('typeof retrievedObject: ' + typeof retrievedObject);
console.log('Value of retrievedObject: ' + retrievedObject);
```

```
typeof testObject: object
testObject properties:
one: 1
two: 2
three: 3
typeof retrievedObject: string
Value of retrievedObject: [object Object]
```

## event

### 三种方式可以为DOM元素注册事件处理函数:
- myButton.addEventListener('click', function(){alert('Hello world');}, false);
- HTML 属性 <button onclick="function()">
- DOM 元素属性 myButton.onclick = function(event){alert('Hello world');};

common error:
1. running the .click code before the element is in the DOM (i.e. before the DOM ready event.

  - DOMContentLoaded - the whole document (HTML, scripts) has been loaded.
  - load - the whole document and its resources (e.g. images, iframes, scripts) have been loaded.

  ```
    document.addEventListener("DOMContentLoaded", function(event) {
      //do work
    });
  ```

  ```
  window.onload = function() {}
  ```
2. Event attributes in HTML are not case sensitive, so onclick, onClick and ONCLICK all work. It is common practice to write attributes in lowercase: onclick. note that javascript itself is case sensitive, so if you write document.getElementById("...").onclick = ..., then it must be all lowercase.

### DOM Event 接口
- 事件处理函数可以附加在各种对象上，包括 DOM元素，window 对象 等。当事件发生时， event 对象就会被创建并依次传递给事件监听器。
- 在处理函数中，将event对象作为第一个参数参数，可以访问 DOM Event 接口

### stopPropagation
stops the event from bubbling up the event chain.

### preventDefault
prevents the default action the browser makes on that event.

### jQuery, return false
doing 3 separate things when you call it:
1. event.preventDefault();
2. event.stopPropagation();
3. Stops callback execution and returns immediately when called.

## 事件捕获（event capturing）事件冒泡（event bubbling）
W3C很巧妙地在这场对抗中保持中立：任何W3C事件模型中发生的事件都是先捕获，直到它到达目标元素，然后再向外冒泡。
作为Web开发者，可以选择是否在捕获或者冒泡的阶段注册事件，这是通过addEventListener()方法来实现的。
如果addEventListener()的最后一个参数设置为true，那么这个事件是在捕获阶段被触发的；
如果设置为false则是在冒泡阶段被触发。
element1.addEventListener('click',doSomething2,true)
element2.addEventListener('click',doSomething,false)
