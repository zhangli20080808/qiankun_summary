import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom';
import BasicMap from './src/router';
import { setMain } from './src/utils/global';

export const render = () => {
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

export async function mount(props) {
  setMain(props);
  console.log('react mount', props);
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev, 'onGlobalStateChange');
  });
  setTimeout(() => {
    props.setGlobalState({
      a: 3,
      b: 4,
    });
  }, 1000);
  render();

  // setTimeout(() => {
  //   // 调用隐藏底部方法 false 隐藏  true 显示
  //   app.appInfo.footerState.changeFooter(false)
  //
  //   // 调用隐藏头部方法 false 隐藏  true 显示
  //   app.appInfo.headerState.changeHeader(false)
  // }, 3000)
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  console.log('react unmout', props);
  // const { container } = props;
  // if (container) {
  //   document.querySelector(container).innerHTML = '';
  // }
  ReactDOM.unmountComponentAtNode(document.getElementById('app-react'));
}
