import React from 'react';
import ReactDOM from 'react-dom';
import BasicMap from './src/router/index.jsx';
import './index.scss';
import { setMain } from './src/utils/global';

const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'));
};
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('react bootstrap');
}

export async function mount(app) {
  setMain(app); // 记录主应用传过来的方法
  console.log('react mount', app);
  render();
}

export async function unmount(ctx) {
  console.log('react unmout');
  // const { container } = ctx;
  // if (container) {
  //   document.querySelector(container).innerHTML = '';
  // }
  ReactDOM.unmountComponentAtNode(document.getElementById('app-react'));

}
