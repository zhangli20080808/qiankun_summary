import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setMain } from './utils/global';

let instance = null;

function render() {
  instance = createApp(App);
  instance.use(router).mount('#app');
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  console.log('vue3.0 app bootstrap');
}

export async function mount(app) {
  setMain(app);
  render();
}

export async function unmount(ctx) {
  console.log('vue3 unmout', ctx);
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;

  // const { container } = ctx;
  // if (container) {
  //   document.querySelector(container).innerHTML = '';
  // }

}
