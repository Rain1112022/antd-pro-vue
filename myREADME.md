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
