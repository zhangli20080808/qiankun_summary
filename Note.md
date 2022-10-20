## 框架设计

[架构设计](./images/car.png)
## 路由基础


### 整体架构

#### 中央控制器

主应用开发 - MainHeader、MicroBody、Footer 组件的开发

#### 子应用注册

micro - 微前端框架
start.js - 入口文件
const - subApp，管理和获取注册的子应用

1. 整体导航跳转对应的链接，useRoute, useRouter 的使用
2. 实现 registerMicroApps，将子应用注册到微前端当中 setList,getList 方法

#### 路由拦截

新建router 文件夹，start中调用rewriteRouter方法
a. rewriteRouter - 实现路由拦截

```js
import { patchRouter } from '../utils';
import { turnApp } from './routerHandle';
// 重写window的路由跳转
export const rewriteRouter = () => {
  window.history.pushState = patchRouter(
    window.history.pushState,
    'micro_push'
  );
  window.history.replaceState = patchRouter(
    window.history.replaceState,
    'micro_replace'
  );

  window.addEventListener('micro_push', turnApp);
  window.addEventListener('micro_replace', turnApp);

  // 监听返回事件
  window.onpopstate = async function () {
    await turnApp();
  };
};
```

b. routerHandle

```js
function turnApp() {
  console.log('路由切换了');
}
```

utils -> index.js

```js
// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName);
    globalEvent.apply(this, arguments);
    window.dispatchEvent(e);
  };
};
```

```js
  {
    name: 'react15', // 应用名，唯一
    // 默认会加载9002这个html解析里面的js动态的执行（子应用必须支持跨域）fetch
    entry: '//localhost:9002',
    loading,
    container: '#micro-container', // 容器名
    activeRule: '/react15', // 激活的路径
    props: appInfo,
  },
```

#### 获取首个子应用

#### 微前端生命周期

#### 获取需要展示的页面 - 加载和解析 html

#### 获取需要展示的页面 - 加载和解析 js

#### 执行 js 脚本

### 辅助功能

#### 微前端环境变量设置

#### 运行环境隔离 - 快照沙箱

#### 运行环境隔离 - 代理沙箱

#### css 样式隔离

#### 应用间通信 - 父子通信

#### 应用间通信 - 子应用间通信

#### 提高加载性能 - 应用缓存

#### 全局状态管理 - 预加载子应用
