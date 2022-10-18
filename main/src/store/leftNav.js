import * as loading from './loading';

import * as appInfo from '../store';

export const navList = [
  {
    name: 'react15', // 应用名，唯一
    // 默认会加载9002这个html解析里面的js动态的执行（子应用必须支持跨域）fetch
    entry: '//localhost:9002', 
    loading,
    container: '#micro-container', // 容器名
    activeRule: '/react15', // 激活的路径
    props: appInfo,
  },
  {
    name: 'react16',
    entry: '//localhost:9003',
    loading,
    container: '#micro-container',
    activeRule: '/react16',
    props: appInfo,
  },
  {
    name: 'vue2',
    entry: '//localhost:9004',
    loading,
    container: '#micro-container',
    activeRule: '/vue2',
    props: appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9005',
    loading,
    container: '#micro-container',
    activeRule: '/vue3',
    props: appInfo,
  },
];
