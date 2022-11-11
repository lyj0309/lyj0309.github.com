# webApi fetch使用

## 概述
fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。
+ （1）fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
+ （2）fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
+ （3）fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
在用法上，fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。
```js
fetch(url)
  .then(...)
  .catch(...)
```

下面是一个例子，从服务器获取 JSON 数据。
```js
fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 


async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}
```


### 2.3 Response.headers 属性
Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。
Headers 对象可以使用for...of循环进行遍历。

### 2.4 读取内容的方法
Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
response.text()：得到文本字符串。response.json()：得到 JSON 对象。response.blob()：得到二进制 Blob 对象。response.formData()：得到 FormData 表单对象。response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
`response.text()`可以用于获取文本数据，比如 HTML 文件。

`response.json()`直接解析json

`response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。

`response.blob()`用于获取二进制文件。
```js
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```
上面示例读取图片文件flower.jpg，显示在网页上。


## POST 请求
```js
const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();



const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});

```
上面示例中，配置对象用到了三个属性。
method：HTTP 请求的方法，POST、DELETE、PUT都在这个属性设置。headers：一个对象，用来定制 HTTP 请求的标头。body：POST 请求的数据体。
注意，有些标头不能通过headers属性设置，比如Content-Length、Cookie、Host等等。它们是由浏览器自动生成，无法修改。
### （4）文件上传
如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。
另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。
```js
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```
上传二进制文件时，不用修改标头的Content-Type，浏览器会自动设置。
### （5）直接上传二进制数据
fetch()也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在body属性里面。
```js
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```js
