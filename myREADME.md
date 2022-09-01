## 创建我的仓库 antd-pro-vue 的过程（使用现有的框架 ant-design-pro-vue 作为项目的基础）

### 首先将克隆下来的项目上传到自己仓库：
- clone你需要的项目（antd-pro-vue）
  `$ git clone https://gitee.com/sendya/ant-design-pro-vue.git`
- 进入项目目录(进入之后显示在master分支)
  `$ cd ant-design-pro-vue/`
- 删除原有项目中git信息（如果遇到报错就强制删除,删除之后就不再显示master分支了）
  `$ rm -f .git`
  - 这里如果提示`rm: cannot remove '.git': Is a directory`就使用强制删除`$ rm -rf .git`
- 初始化git(初始化之后又会显示master分支，这是初始化仓库的主分支)
  `$ git init`
- 将本地代码添加到仓库
  `$ git add .`
  `$ git commit -m '初始化'`
- 在git上新建一个项目(注意不要生成README文件)
  
- 关联这个远程仓库
  `git remote add origin http://192.167.10.28/Rain/antd-pro-vue.git`
- 提交代码
  `$ git push --set-upstream origin master`

### 这是在你的git仓库中已经有了上传的项目框架了，可以开始自己的开发了
- 列出分支(没有参数时，git branch 会列出你在本地的分支)
  `$ git branch`
  `$ git branch -a`
- 查看仓库当前的状态，显示有变更的文件
  `$ git status`
- 下载远程代码并合并
  `$ git pull`
- 这时可以建分支了，用两种方式建分支：在远程仓库创建分支和本地创建分支
  - 在远程仓库创建分支dev，然后本地`$ git branch -a`时发现已经有了分支dev，但是这时本地还在master分支上，这时可以1，先拉取远程仓库内容`$ git pull`再切换到dev分支`$ git chechout dev`；2，从远程仓库里拉取一条本地不存在的分支`git checkout -b 本地分支名 origin/远程分支名`(拉取不成功时,我们需要先执行git fetch，再执行本命令)
  - 创建本地分支dev2并推送到远程仓库（执行该指令后，会在本地创建一个新分支，该分支是从当前分支上检出的，所以所有文件内容都和当前分支一模一样，这是正常的。创建成功后，将自动切换至新分支上。）
  `$ git branch -b dev2`
  `$ git push --set-upstream origin dev2`

### 这时再列出分支会有master、dev、dev2；我们使用dev分支进行开发，切换到dev上

## 项目文件夹说明
- build
  - index.js: webpack配置文件

- mock: mock数据的文件夹;模拟一些假的数据mockjs实现的，因为咱们实际开发的时候，利用的是真是接口
- node_modules:项目依赖的模块
- public:经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面
- src:源代码的地方
  - api文件夹: 涉及请求相关的
  - assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
  - components文件夹：一般放置非路由组件获取全局组件
  - icons这个文件夹的里面放置了一些svg矢量图
  - layout文件夹：他里面放置一些组件与混入
  - router文件夹：与路由相关的
  - store文件夹：一定是与vuex相关的
  - style文件夹：与样式相关的
  - utils文件夹：request.js是axios二次封装文件
  - views文件夹：里面放置的是路由组件
  
- App.vue:根组件
- main.js：入口文件
- permission.js:与导航守卫先关
- settings：项目配置项文件
- .editorconfig 编程风格文件:比如缩进多少之类的控制
- .env.development  webpack配置文件 开发环境的配置文件
- .eslintignore 校验的时候忽略哪些文件
- .eslintrc.js  eslintrc配置文件
- .gitignore    忽略文件
- .travis.yml    忽略文件
- babel.config.js   babel配置文件
- jest.config.js   测试框架配置文件
- jsconfig.json    src取别名的配置文件
- LICENSE          版权声明的配置文件
- package.json     项目版本号,运行依赖
- postcss.config.js  与css相关的配置文件  比如不同浏览器对display flex有兼容性问题,在不同浏览器加上前缀,这个文件就能解决
- vue.config.js    我们可以把他当做webpack.config.js文件,像解决跨域什么的,我们经常用这个文件
  



## 在侧边栏再加一个大屏展示页面，具体过程为：
### 配路由
- 在generator-router.js文件前端路由表中加上大屏页面
- 在router.config.js文件中配置大屏页面的路由
  - 一定要在根路径（/）的children中配置
  - 大屏展示页面是screen（父）目录下的screenshow（子），所以要在screen中为screenshow配置路由出口
  - 我们想一进入页面就默认展示大屏，所以根目录的重定向路径是/screen/screenshow；在generator-router.js文件的根级菜单下也修改一下默认路径
  
- 在views文件夹下新建screen文件夹，在screen文件夹下新建ScreenShow.vue文件
- 在permission.js中修改默认路由路径是screenshow
`const defaultRoutePath = '/screen/screenshow'`
- 在mock/services/user.js中：首先添加管理员拥有的权限；再在userNav中加上大屏这个导航标签（在这里要注意parentId和id的配置）

## 安装echarts并引入
### 用npm安装依赖echarts  `npm install echarts --save`
- 在main.js文件中引入echarts，并创建$echarts实例
- 注意在echarts5.0以上版本引入时，需要添加* as，否则会引入失败指令为：`import * as echarts from 'echarts'`
- 在需要用到echart的页面：
  - 可以：首先创建一个dom节点并绑定id用以承载echarts图表；接着在methods中通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成；
  - 也可以： （通过 npm 上安装的 ECharts会放在node_modules目录下。可以直接在项目代码中 require('echarts') 得到 ECharts。）`var echarts = require('echarts')`；
  



## 立即执行函数

### 诸如下面形式的函数称之为立即执行函数。

```
  (function() {
    // code
  }());
```
### 自执行函数

- 当声明类似`function foo(){}`或`var foo = function(){}`函数的时候，通过在后面加个括弧就可以实现自执行;
  - 比如想下面第一个声明的`function`可以在后面加一个括弧()就可以自己执行了(foo仅仅是function() { /* code */ }这个表达式的一个引用);
  - 但并不意味着后面加一个括弧都可以自动执行,比如第二行代码会报错，因为解析器在解析全局function或function内部的function关键字的时候，默认是认为function声明，而不是function表达式，如果你不显示告诉编译器，它默认会声明成一个缺少名字的function，并抛出一个语法错误，因为function声明需要一个名字；
  - 但是即便你为这个错误代码加一个名字，它也会显示语法错误，只不过显示的原因不一样；在一个表达式后面加上（），该表达式会立即执行，但是在一个语句后面加（），是完全不一样的意思，它只是分组操作符，比如第三行代码：它在语法上没问题，但依然会报错，因为分组操作符需要包含表达式；
  - 但如果你在（）传入一个表达式，如第四行代码，它不会有异常抛出，foo函数却依然不会执行；它等价于第五、六行代码：在一个function声明后面又声明了一个毫无关系的表达式
  ```
   var foo = function(){ /* code */ } 
   function(){ /* code */ }(); // SyntaxError: Unexpected token 
   function foo(){ /* code */ }();// SyntaxError: Unexpected token 
   function foo(){ /* code */ }( 1 );
   function foo(){ /* code */ }
   ( 1 );
  ```

- 要解决上述问题，我们只需要用（）将全部代码括住就行了，因为JavaScript里括弧里面不能包含语句，所以在这一点上，解析器在解析function关键字的时候，会将相应的代码解析成function表达式，而不是function声明。
  - 如下两行括弧都会立即执行(更推荐第一行的方法)
  ```
  (function () {/* code */} ());
  (function () {/** code /})()
  ```

- 用闭包保存状态
  - 和普通function执行的时候传参数一样，自执行的函数表达式也可以这么传参，因为闭包可以直接引用传入的这些参数，利用这些被lock住的传入参数，自执行函数表达式可以有效地保存状态。
  - 如以下代码，在自执行函数表达式闭包内部，i的值作为locked的索引存在，在循环执行结束以后，尽管最后i的值变成a元素总数，但闭包内部的lockedInIndex值没有变，因为它已经执行完毕了
  ```
  var elems = document.getElementsByTagName('a')
  for (var i = 0; i < elems.length; i++) {

    (function (lockedInIndex) {

        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, 'false');

    })(i);
  }
  ```
  - 以上代码也可以有另一种写法，在处理函数那里使用自执行函数表达式，而不是在addEventListener外部;
  ```
  var elems = document.getElementsByTagName('a');
  for (var i = 0; i < elems.length; i++) {

    elems[i].addEventListener('click', (function (lockedInIndex) {
        return function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        };
    })(i), 'false');

  }
  ```




- webSocket 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据，但是它和 HTTP 最大不同是：
  - WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和 Browser/Client Agent 都能主动的向对方发送或接收数据，就像 Socket 一样；
  - WebSocket 需要类似 TCP 的客户端和服务器端通过握手连接，连接成功后才能相互通信.

- WebSocket 对象一共支持四个消息 onopen, onmessage, onclose 和 onerror
  - 当 Browser 和 WebSocketServer 连接成功后，会触发 onopen 消息
  - 如果连接失败，发送、接收数据失败或者处理数据出现错误，browser 会触发 onerror 消息
  - 当 Browser 接收到 WebSocketServer 发送过来的数据时，就会触发 onmessage 消息，参数 evt 中包含 Server 传输过来的数据
  - 当 Browser 接收到 WebSocketServer 端发送的关闭连接请求时，就会触发 onclose 消息
  
  ```
  var ws = new WebSocket(“ws://echo.websocket.org”);  //申请一个webSocket对象，参数是需要连接的服务器端的地址
  ws.onopen = function(){ws.send(“Test!”); };
  ws.onmessage = function(evt){console.log(evt.data);ws.close();};
  ws.onclose = function(evt){console.log(“WebSocketClosed!”);};
  ws.onerror = function(evt){console.log(“WebSocketError!”);};
  ```

### eval()函数功能是将某段字符串当成JS语句来执行。
- eval() 函数计算 JavaScript 字符串，并把它作为脚本代码来执行。如果参数是一个表达式，eval() 函数将执行表达式。如果参数是Javascript语句，eval()将执行 Javascript 语句。
  
  ```
  var a=eval("12");  //相当于 var a=12;
  var obj = eval("({name:'nick',age:28})");  //相当于 var obj = {name:'nick',age:28};对象（包括函数等）需要放在括号中，否则会报错
  eval("alert('hello');");   //相当于alert('hello');
  ```

### jQuery.trigger() 函数用于在每个匹配元素上触发指定类型的事件
- 该函数可以手动触发执行元素上绑定的事件处理函数，也会触发执行该元素的默认行为:以表单元素<form>为例，使用trigger("submit")可以触发该表单绑定的submit事件，也会执行表单submit事件的默认行为——表单提交操作
- trigger()函数主要有以下两种形式的用法：
  - 1,`jQueryObject.trigger( events [, extraArguments ] )` :在每个匹配元素上触发指定类型(events)的事件，并可为事件处理函数传入额外的参数(extraArguments)。
  - 2,`jQueryObject.trigger( eventObject [, extraArguments ] )`:为指定事件处理函数传入的Event对象(eventObject)，用于触发执行对应的事件处理函数，并可为事件处理函数传入额外的参数(extraArguments)。
- 参数描述：
  - `trigger()函数`会为触发执行的事件处理函数传入一个默认参数，也就是表示当前事件的Event对象。参数`extraArguments`用于为事件处理函数传入更多额外的参数。如果`extraArguments`是数组形式，则每个元素都将充当函数的参数。
  - `events`：`String类型`,指定的事件类型和可选的命名空间，例如"click"、 "focus"、 "keydown.myPlugin"。
  - `extraArguments`: `可选/Object类型`,为事件处理函数传入的额外参数。如果要传入多个参数，请以数组方式传入。
  - `eventObject`: `Object类型`一个Event对象，用于触发传入该对象的事件处理函数。



## 利用filter，可以巧妙地去除Array的重复元素：
- filter 用于把Array的某些元素过滤掉，然后返回剩下的元素。
- 和map()类似，Array的filter()也接收一个函数。
- 和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。
- 去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了.
  
```
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
var r = arr.filter(function (element, index, self) {
     return self.indexOf(element) === index;
 });
console.log(r.toString()); //apple,strawberry,banana,pear,orange
```

## for in && for of
### 两者区别
- for of无法循环遍历对象
- 遍历输出结果不同，for in循环遍历的是数组的键值(索引)，而for of循环遍历的是数组的值。
- for in 会遍历自定义属性，for of不会（给数组添加一个自定义属性name，并且赋值"数组"。然后进行遍历输出的，会发现新定义的属性也被for in输出来了，而for of并不会对name进行输出）
### for in
- 不但可以循环遍历数组，还可以循环遍历对象
  ```
  var arr = ['nick','freddy','mike','james'];
  for(var index in arr){	
    console.log(index +'. ' + arr[index]); 
  }
  // 输出结果：0.nick  1.freddy  2.mike  3.james

  var userMsg = {
    nick: {
	    name: 'nick',
	    age: 18,
	    sex: '男'	
    },
    freddy: {
	    name: 'freddy',
	    age: 24,
	    sex: '男'
    }	
  };
  for(var key1 in userMsg){
    console.log(key1);	
    for(var key2 in userMsg[key1]){
	    console.log(key +': ' + userMsg[key1][key2]);
    }
  }
  //输出结果：nick    name: nick     age: 18     sex: 男  
             freddy  name: freddy   age: 24     sex: 男
  ```

### for of 
- 遍历数组里的每一项
  ```
  var arr = [
    { name:'nick', age:18 },
    { name:'freddy', age:24 },
    { name:'mike', age:26 },
    { name:'james', age:34 }
  ];
   for(var item of arr){	
    console.log(item.name,item.age);
  }
  //输出结果：nick 18   freddy 24  mike 26  james 34
  ```

## ES6：new Map()
- Map类型是键值对的有序列表，而键和值都可以是任意类型；
- Map与Set的区别：Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构
  > 集合-----是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合;
    字典-----是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同;
    Set集合是以[值，值]的形式存储元素;
    Map字典是以[键，值]的形式存储;
- 在开发过程中，涉及到数据结构，能使用Map 不使用Array 尤其是复杂的数据结构 ，如果对于数组的存储考虑唯一性,使用Set ;优先使用map, 如果要求数据储存的唯一性使用Set; 放弃使用Array
### 属性
- size：size属性返回 Map 结构的成员总数。
  ```
  const map = new Map();
  map.set('foo', true);
  map.set('bar', false);

  map.size // 2
  ```

### 方法
- set()：设置键名key对应的键值为value，然后返回整个 Map 结构;如果key已经有值，则键值会被更新，否则就新生成该键,同时返回的是当前Map对象，可采用链式写法.
  ```
  const m = new Map();
  let fn = function(){}

  m.set('edition', 6)        // 键是字符串
  m.set(fn, 'standard')     // 键是函数
  m.set(undefined, 'nah')    // 键是 undefined
  m.set(1, 'a').set(2, 'b').set(3, 'c') // 链式操作
  ```
- get(): get方法读取key对应的键值，如果找不到key，返回undefined.
  ```
  const m = new Map();
  const hello = function() {console.log('hello');};
  m.set(hello, 'Hello ES6!') // 键是函数

  m.get(hello)  // Hello ES6!
  ```
- has(): has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中.
  ```
  m.has('edition')     // true
  ```
- delete(): delete方法删除某个键，返回true。如果删除失败，返回false.
- clear(): clear方法清除所有成员，没有返回值.
  ```
  map.clear()
  ```
### 遍历
- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回所有成员的遍历器
- forEach()：遍历 Map 的所有成员
  ```
  const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
  ]);

  //keys()
  for (let key of map.keys()) {
    console.log(key);       // "F"  "T"
  }

  //values()
  for (let value of map.values()) {
    console.log(value);    // "no"  "yes"
  }

  // entries()
  for (let item of map.entries()) {
    console.log(item[0], item[1]);
  }
  // "F" "no"  、"T" "yes"

  // 或者
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  // "F" "no" 、"T" "yes"

  // 等同于使用map.entries()
  for (let [key, value] of map) {
    console.log(key, value);
  }
  // "F" "no"  、 "T" "yes"

  map.forEach(function(value, key, map) {
    console.log(key, value);    // "F" "no"  、 "T" "yes"
  });
  ```
## ES6：new Set()
- Set本身是一个构造函数，用来生成 Set 数据结构，似于数组，但它的一大特性就是所有元素都是唯一的，没有重复的值，我们一般称为集合。
  
### 方法
- add(): 添加元素,添加某个值，返回 Set 结构本身，当添加实例中已经存在的元素，set不会进行处理添加;
- delete(): 删除元素 ,删除某个值，返回一个布尔值，表示删除是否成功;
- has(): 判断某元素是否存在, 返回一个布尔值，判断该值是否为Set的成员
- clear(): 清除所有元素, 清除所有成员，没有返回值

### 遍历 
- keys():返回键名的遍历器，相等于返回键值遍历器values()
- values():返回键值的遍历器
- entries():返回键值对的遍历器
  ```
  let list=new Set(['4','5','hello'])
  for (let item of list.entries()) {
    console.log(item);
  }
  // ['4','4']   ['5','5']   ['hello','hello'] 

  ```
- forEach():使用回调函数遍历每个成员

### 使用场景
-  用于数组去重
  ```
  let arr = [3, 5, 2, 2, 5, 5];
  let setArr = new Set(arr)     // 返回set数据结构  Set(3) {3, 5, 2}

  //方法一   es6的...解构
  let unique1 =  [...setArr ];      //去重转数组后  [3,5,2]

  //方法二  Array.from()解析类数组为数组
  let unique2 = Array.from(setArr )   //去重转数组后  [3,5,2]

  ```
-  用于字符串去重
  ```
  let str = "352255";
  let unique = [...new Set(str)].join("");     // 352 
  ```
-  实现并集、交集、和差集
  ```
  let a = new Set([1, 2, 3]);
  let b = new Set([4, 3, 2]);

  // 并集
  let union = new Set([...a, ...b]);
  // Set {1, 2, 3, 4}

  // 交集
  let intersect = new Set([...a].filter(x => b.has(x)));
  // set {2, 3}

  // （a 相对于 b 的）差集
  let difference = new Set([...a].filter(x => !b.has(x)));
  // Set {1}
  ```

## ES6  扩展运算符（...）

### 对象的扩展运算符
- > 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
- Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）,方法的第一个参数是目标对象，后面的参数都是源对象。(如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性)。
  ```
  let bar = { a: 1, b: 2 };
  let baz = { ...bar }; // { a: 1, b: 2 }
  // 上述方法实际上等价于:
  let baz = Object.assign({}, bar); // { a: 1, b: 2 }
  // 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
  let baz = {...bar, ...{a:2, b: 4}};  // {a: 2, b: 4}
  ```

### 数组的扩展运算符
- 可以将数组转换为参数序列
  ```
  function add(x, y) {
  return x + y;
  }
  const numbers = [4, 38];
  add(...numbers) // 42
  ```
- 可以复制数组
  ```
  // 直接通过赋值的方式进行数组复制是不可取的
  const arr1 = [1, 2];
  const arr2 = arr1;
  arr2[0] = 2;
  arr1 // [2, 2]
  // 用扩展运算符就很方便 
  const arr2 = [...arr1];
  ```
- 扩展运算符可以与解构赋值结合起来，用于生成数组(如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错)
  ```
  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]
  ```
- 扩展运算符还可以将字符串转为真正的数组
  ```
  [...'hello']  // [ "h", "e", "l", "l", "o" ]
  ```
- 将某些数据结构转为数组
  ```
  // arguments对象
  function foo() {
    const args = [...arguments];
  }
  ```


## JS sort() 方法
  -  sort() 方法用于对数组的元素进行排序；语法：arrayObject.sort(sortby)；参数sortby可选。规定排序顺序。必须是函数。
  -  如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较；
  -  如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字;比较函数应该具有两个参数 a 和 b，其返回值如下：
    - 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    - 若 a 等于 b，则返回 0。
    - 若 a 大于 b，则返回一个大于 0 的值。
  ```
  function sortNumber(a, b){
   return a - b; //这里返回的是他们的差值，如果是大于0的值，就会将b排在前面，如果小于0,
   就会将a排在前面，如果是0的话，就随便。（冒泡排序法！！）
   }
  ```

  ```
  var arr = [23,12,1,34,116,8,18,37,56,50];
  function sequence(a,b){
    if (a>b) {
      return 1;
    }else if(a<b){
      return -1
    }else{
      return 0;
    }
  }
  console.log(arr.sort(sequence)); //[1, 8, 12, 18, 23, 34, 37, 50, 56, 116]
  ```

  ```
  var arr = [23,12,1,34,116,8,18,37,56,50];
  var arr2 = arr.sort(function(a,b){
     if (a>b) {
      return 1;
    }else if(a<b){
      return -1
    }else{
      return 0;
    } 
  })
  console.log(arr2)  //[1, 8, 12, 18, 23, 34, 37, 50, 56, 116]
  ```
- 也可以简化成这样的写法(因为：若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值)
  ```
  var arr = [23,12,1,34,116,8,18,37,56,50];
  function sequence(a,b){
    return a - b;
  }
  console.log(arr.sort(sequence));  //[1, 8, 12, 18, 23, 34, 37, 50, 56, 116]
  ```





## 