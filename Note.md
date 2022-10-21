## 框架设计

[架构设计](./images/car.png)

## 路由基础

hash 模式和 history 的区别？

- 语法结构不同 - 以#结尾，当我们刷新页面，页面并没有变化，#前面的部分，我们一般认为是一个完整的 url，#后面的值可以理解为辅助说明(锚点，定位)，并不会改变页面的资源。history 模式，要重新请求资源
- seo 问题 - 对 hash 模式不友好，整个站点就一个链接
- 部署方式不同

### hash - 稍微复杂一点的 SPA，都需要路由 通过 hash 的变化触发视图的更新

### hash 的特点

我们通过 hash 的变化来监听路由的变化

- hash 的变化会触发网页跳转，即浏览器的前进后退，但浏览器不会刷新
- hash 变化 永远不会刷新页面
- hash 永远不会提交到 serve 端

```js
// html
<div id='btn1'>改变hash</div>;
// hash变化包括
// 1. js修改 url 2.手动修改url的hash 3. 浏览器 前进后退
window.onhashchange = (event) => {
  console.log('old-url', event.oldURL);
  console.log('new-url', event.newURL);

  console.log('hash', location.hash);
};

// 页面初次加载 获取 hash
document.addEventListener('DOMContentLoaded', () => {
  console.log(location.hash);
});

// js修改url
document.getElementById('btn1').addEventListener('click', function () {
  location.hash = '#/user';
});

// 指定要事件触发时执行的函数  addEventListener补充
// true - 事件句柄在捕获阶段执行
// false- 默认。事件句柄在冒泡阶段执行
```

### H5 history

- 用 URL 规范的路由，但跳转时不刷新页面 - 看不出是前端还是后端路由，可以简单理解
- 主要通过 history.pushState 和 onpopstate 来实现

普通路由-history 路由

- https://github.com/zhangli20080808/xxxx 刷新页面
- https://github.com/zhangli20080808/xxxx/yyy 前端路由，刷新不页面
- https://github.com/zhangli20080808/xxxx/yyy/zzz 前端路由，刷新不页面
  比如由第三个页面后退到第二个，也是通过前端路由跳转，不刷新页面

```js
// 页面初次加载，获取 path
document.addEventListener('DOMContentLoaded', () => {
  console.log('load', location.pathname);
});

// 打开一个新的路由
// 【注意】用 pushState 方式，浏览器不会刷新页面
document.getElementById('btn1').addEventListener('click', () => {
  const state = { name: 'page1' };
  console.log('切换路由到', 'page1');
  history.pushState(state, '', 'page1'); // 重要！！
});

// 监听浏览器前进、后退
window.onpopstate = (event) => {
  // 重要！！
  console.log('onpopstate', event.state, location.pathname);
};

// 需要 server 端配合，可参考
// https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
```

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

新建 router 文件夹，start 中调用 rewriteRouter 方法
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
