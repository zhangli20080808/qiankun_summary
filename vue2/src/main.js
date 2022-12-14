import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let instance = null;
console.log(instance);
export async function bootstrap() {
  console.log('vue app bootstraped');
}

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!window.__POWERED_BY_QIANKUN__) {
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app-vue');
}

export async function mount() {
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app-vue');
}
export async function unmount() {
  console.log('vue2 unmount');
  instance.$destroy();
  instance.$el.innerHTML = ''; // 将实例的dom设置为空
  instance = null;

  // const { container } = ctx;
  // if (container) {
  //   document.querySelector(container).innerHTML = '';
  // }
}
