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
  


## js mjpeg buffer stream

### Uint8Array  ArrayBuffer
`let lineBuffer = new Uint8Array(new ArrayBuffer(1000));` 创建初始化为0，包含1000个字节的缓存区的无符号整型数组；
- `Uint8Array` 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素；
- `ArrayBuffer` 对象用来表示 「通用的、固定长度的」原始二进制数据缓冲区。「ArrayBuffer 不能直接操作，而是要通过类型数组对象 或 DataView 对象来操作」 ，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
- `new Uint8Array(new ArrayBuffer(imageLength))`:创建初始化为0，包含imageLength字节个元素的无符号整型数组

### Blob
- `Blob（Binary Large Object）`表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。Blob构造函数的语法为：`var aBlob = newBlob(blobParts, options);`  blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。 options：一个可选的对象
- 在浏览器中，我们使用 `URL.createObjectURL` 方法来创建 Blob URL，该方法接收一个 Blob 对象，并为其创建一个唯一的 URL。浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 「URL → Blob」映射。因此，此类 URL 较短，但可以访问 Blob 。
- 这里我们先把响应对象转换为 ArrayBuffer 对象，然后通过调用 Blob 构造函数，把 ArrayBuffer 对象转换为 Blob 对象，再利用 createObjectURL 方法创建 Object URL，最终实现图片预览

### Canvas
- 在画布上定位图像—> context.drawImage(img,x,y);
- 在画布上定位图像，并规定图像的宽度和高度—> context.drawImage(img,x,y,width,height);
- 剪切图像，并在画布上定位被剪切的部分—> context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
- 绘制一个描边矩形，直接绘制,不需要手动调用stroke()：ctx.strokeRect( 起点x轴坐标，起点y轴坐标，宽，高 )


### console.error()   

- console.error() 方法用于输出错误信息到控制台。
- console.log() 用于输出普通信息
- 主要区别在于console.error()会显示带有错误标志的错误信息提示，更加醒目

### 流操作：ReadableStream
- 流操作API中的`ReadableStream`接口呈现了一个可读取的二进制流操作。Fetch API 通过`Response`的`body`属性提供了一个具体的`ReadableStream`对象；
- `ReadableStream.getReader()`方法创建一个读取器并将流锁定于其上，一旦流被锁定，其他读取器不能读取它，直到它被释放；

### obj[key]和obj[‘key’]
- 两个的主要区别是：如果key值不确定，而是一个变量的时候，只能通过obj[key]来访问
- obj[key] : key代表的是循环中的一个变量
- obj[‘key’] : key代表的是obj的一个属性，obj[‘key’]即代表的是取obj的key属性值
- obj.key : 此时obj.key相当于obj[‘key’],key代表的是obj的一个属性

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
