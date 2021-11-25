---
title: "webApi fetch使用"
date: 2021-10-21T18:52:55+08:00
draft: true
---

fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。
（1）fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
（2）fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
（3）fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
在用法上，fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。

fetch(url)
  .then(...)
  .catch(...)

下面是一个例子，从服务器获取 JSON 数据。

fetch('https://api.github.com/users/ruanyf')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 

上面示例中，fetch()接收到的response是一个 Stream 对象，response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。
Promise 可以使用 await 语法改写，使得语义更清晰。

async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}

上面示例中，await语句必须放在try...catch里面，这样才能捕捉异步操作中可能发生的错误。
后文都采用await的写法，不使用.then()的写法。
二、Response 对象：处理 HTTP 回应
2.1 Response 对象的同步属性
fetch()请求成功以后，得到的是一个 Response 对象。它对应服务器的 HTTP 回应。

const response = await fetch(url);

前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status); 
  console.log(response.statusText);
}

上面示例中，response.status和response.statusText就是 Response 的同步属性，可以立即读取。
标头信息属性有下面这些。
Response.ok
Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
Response.status
Response.status属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
Response.statusText
Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
Response.url
Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
Response.type
Response.type属性返回请求的类型。可能的值如下：
basic：普通请求，即同源请求。cors：跨域请求。error：网络错误，主要用于 Service Worker。opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求。opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分。
Response.redirected
Response.redirected属性返回一个布尔值，表示请求是否发生过跳转。
2.2 判断请求是否成功
fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。
这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。
只有通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。请看下面的例子。

async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}

上面示例中，response.status属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为fetch()会将跳转的状态码自动转为 200。
另一种方法是判断response.ok是否为true。

if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}

2.3 Response.headers 属性
Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。
Headers 对象可以使用for...of循环进行遍历。

const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}

// 或者
for (let [key, value] of response.headers.entries()) { 
  console.log(`${key} : ${value}`);  
}

Headers 对象提供了以下方法，用来操作标头。
Headers.get()：根据指定的键名，返回键值。Headers.has()： 返回一个布尔值，表示是否包含某个标头。Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。Headers.append()：添加标头。Headers.delete()：删除标头。Headers.keys()：返回一个遍历器，可以依次遍历所有键名。Headers.values()：返回一个遍历器，可以依次遍历所有键值。Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。
这些方法中，最常用的是response.headers.get()，用于读取某个标头的值。

let response =  await  fetch(url);  
response.headers.get('Content-Type')
// application/json; charset=utf-8

Headers.keys()和Headers.values()方法用来分别遍历标头的键名和键值。

// 键名
for(let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for(let value of myHeaders.values()) {
  console.log(value);
}

Headers.forEach()方法也可以遍历所有的键值和键名。

let response = await fetch(url);
response.headers.forEach(
  (value, key) => console.log(key, ':', value)
);

2.4 读取内容的方法
Response对象根据服务器返回的不同类型的数据，提供了不同的读取方法。
response.text()：得到文本字符串。response.json()：得到 JSON 对象。response.blob()：得到二进制 Blob 对象。response.formData()：得到 FormData 表单对象。response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
上面5个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。
response.text()
response.text()可以用于获取文本数据，比如 HTML 文件。

const response = await fetch('/users.html');
const body = await response.text();
document.body.innerHTML = body

response.json()
response.json()主要用于获取服务器返回的 JSON 数据，前面已经举过例子了。
response.formData()
response.formData()主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。
response.blob()
response.blob()用于获取二进制文件。

const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;

上面示例读取图片文件flower.jpg，显示在网页上。
response.arrayBuffer()
response.arrayBuffer()主要用于获取流媒体文件。

const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;

上面示例是response.arrayBuffer()获取音频文件song.ogg，然后在线播放的例子。
2.5 Response.clone()
Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

let text =  await response.text();
let json =  await response.json();  // 报错

上面示例先使用了response.text()，就把 Stream 读完了。后面再调用response.json()，就没有内容可读了，所以报错。
Response 对象提供Response.clone()方法，创建Response对象的副本，实现多次读取。

const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);

上面示例中，response.clone()复制了一份 Response 对象，然后将同一张图片读取了两次。
Response 对象还有一个Response.redirect()方法，用于将 Response 结果重定向到指定的 URL。该方法一般只用在 Service Worker 里面，这里就不介绍了。
2.6 Response.body 属性
Response.body属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。
它可以用来分块读取内容，应用之一就是显示下载的进度。

const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}

上面示例中，response.body.getReader()方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块。
这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。
三、fetch()的第二个参数：定制 HTTP 请求
fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

fetch(url, optionObj)

上面命令的optionObj就是第二个参数。
HTTP 请求的方法、标头、数据体都在这个对象里面设置。下面是一些示例。
（1）POST 请求

const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();

上面示例中，配置对象用到了三个属性。
method：HTTP 请求的方法，POST、DELETE、PUT都在这个属性设置。headers：一个对象，用来定制 HTTP 请求的标头。body：POST 请求的数据体。
注意，有些标头不能通过headers属性设置，比如Content-Length、Cookie、Host等等。它们是由浏览器自动生成，无法修改。
（2）提交 JSON 数据

const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});

上面示例中，标头Content-Type要设成'application/json;charset=utf-8'。因为默认发送的是纯文本，Content-Type的默认值是'text/plain;charset=UTF-8'。
（3）提交表单

const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})

（4）文件上传
如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。
另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。

const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});

上传二进制文件时，不用修改标头的Content-Type，浏览器会自动设置。
（5）直接上传二进制数据
fetch()也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在body属性里面。

let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
