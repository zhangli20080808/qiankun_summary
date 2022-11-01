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

1. 实现 start 函数,开启微前端框架
   a. 验证当前子应用列表是否为空
   b. 有子应用的内容，查找到当前路由的子应用. 根据 pathname 和 activeRule 作对比
   c. app & hash -> window.history.pushState('', '', url) 设置标记 window.**CURRENT_SUB_APP** = app.activeRule
   c. !hash -> window.history.pushState(null, null, '/vue3#/index')
   a. isTurnChild 函数监听子应用是否做了切换，进行后续操作

#### 微前端生命周期
1. 获取到上一个应用，在切换的时候，卸载上一个应用，执行对应的卸载周期
2. 获取到需要跳转的下一个应用，执行下一个应用的各个生命周期
3. 实现一些列方法
```js
// 缓存生命周期
let lifecycle = {};
export const getMainLifecycle = () => lifecycle;
export const setMainLifecycle = (data) => (lifecycle = data);
// 注册
export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList);
  setMainLifecycle(lifeCycle);
};
export const starMicroApp = () => {
  // 注册子应用
  registerMicroApps(
    leftNav.navList,
    // 生命周期
    {
      beforeLoad: [
        (app) => {
          // 比如说 权限相关的一些验证
          // 每次改动，都将头部和底部显示出来，不需要头部和底部的页面需要子应用自己处理
          headerState.changeHeader(true);
          footerState.changeFooter(true);
          console.log('开始加载 -- ', app.name);
          loading.openLoading();
        },
      ],
      afterMount: [
        (app) => {
          console.log('加载完成 -- ', app.name);
          setTimeout(() => {
            loading.closeLoading();
          }, 200);
        },
      ],
      afterUnmount: [
        (app) => {
          console.log('卸载完成 -- ', app.name);
        },
      ],
    },
    {}
  );

  // 如果当前是跟路由，且没有子应用，默认进入到 vue3
  if (window.location.pathname === '/') {
    window.history.pushState(null, null, '/vue3#/index');
  }

  // 启动, 开启微前端框架
  start();
};
```

#### 获取需要展示的页面 - 加载和解析 html
1. 实现加载html的方法 loadHtml，使用get请求获取子应用信息
```js
export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad()

  // 获取所有的html资源内容
  const subApp = await loadHtml(app) // 获取的是子应用的内容
  subApp && subApp.beforeLoad && subApp.beforeLoad()

  return subApp
}
```
2. 实现 parseHtml 方法
```js
// fetch
export const fetchResource = url => fetch(url).then(async res => await res.text())
export const parseHtml = async (entry, name) => {
  if (cache[name]) {
    return cache[name]
  }
  const html = await fetchResource(entry)

  let allScript = []
  const div = document.createElement('div')
  div.innerHTML = html
// 标签 link  script
  const [dom, scriptUrl, script] = await getResources(div, entry)

  const fetchedScripts = await Promise.all(scriptUrl.map(async item => fetchResource(item)))

  allScript = script.concat(fetchedScripts)
  cache[name] = [dom, allScript]

  return [dom, allScript]
}

#### 获取需要展示的页面 - 加载和解析 js
1. new Function
```js
export const performScriptForFunction = (script, appName, global) => {
  window.proxy = global
  console.log(global)
  const scriptText = `
    return ((window) => {
      ${script}
      return window['${appName}']
    })(window.proxy)
  `
  return new Function(scriptText)()
}
```
2. eval

#### 执行 js 脚本

### 辅助功能

#### 微前端环境变量设置
```js
// 子应用生命周期处理， 环境变量设置
export const sandBox = (app, script) => {
  const proxy = new ProxySandbox()
  if (!app.proxy) {
    app.proxy = proxy
  }
  // 1. 设置环境变量
  window.__MICRO_WEB__ = true
  // 2. 运行js文件，获取应用声明周期内容 并且挂载到
  const lifecycle = performScriptForEval(script, app.name, app.proxy.proxy)
  // 生命周期，挂载到app上
  if (isCheckLifeCycle(lifecycle)) {
    app.bootstrap = lifecycle.bootstrap
    app.mount = lifecycle.mount
    app.unmount = lifecycle.unmount
  }
}
```
#### 运行环境隔离 - 快照沙箱
为什么需要隔离？ -  主要是对于变量的影响，将子应用运行到沙箱环境中，来解决这个问题
```js
// 快照沙箱
// 应用场景：比较老版本的浏览器，降级方案，可能会挂很多的属性
export class SnapShotSandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = window
    this.active()
  }
  // 沙箱激活
  active() {
    // 创建一个沙箱快照
    this.snapshot = new Map()
    // 遍历全局环境
    for(const key in window) {
      this.snapshot[key] = window[key]
    }
  }
  // 沙箱销毁
  inactive () {
    for (const key in window) {
      if (window[key] !== this.snapshot[key]) {
        // 还原操作
        window[key] = this.snapshot[key]
      }
    }
  }
}
```
#### 运行环境隔离 - 代理沙箱

#### css 样式隔离

#### 应用间通信 - 父子通信

#### 应用间通信 - 子应用间通信

#### 提高加载性能 - 应用缓存

#### 全局状态管理 - 预加载子应用
