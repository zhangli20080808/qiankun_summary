import { findAppByRoute } from '../utils'
import { getMainLifecycle } from '../const/mainLifeCycle'
import { loadHtml } from '../loader'


/**
 * 生命周期
 1. 获取到上一个应用的生命周期，执行unmounted，因为需要卸载
 2. 获取到要跳转到的子应用，执行应用的生命周期
 * @returns 
 */
export const lifecycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)
 
  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)

  if (!nextApp) {
    return
  }

  if (prevApp && prevApp.unmount) {
    if (prevApp.proxy) {
      prevApp.proxy.inactive() // 将沙箱销毁
    }
    await destroyed(prevApp)
  }

  const app = await beforeLoad(nextApp)

  await mounted(app)
}

export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad()

  // 获取所有的html资源内容
  const subApp = await loadHtml(app) // 获取的是子应用的内容
  subApp && subApp.beforeLoad && subApp.beforeLoad()

  return subApp
}

export const mounted = async (app) => {
  app && app.mount && app.mount({
    appInfo: app.appInfo,
    entry: app.entry
  })

  await runMainLifeCycle('mounted')
}

export const destroyed = async (app) => {
  app && app.unmount && app.unmount()

  // 对应的执行以下主应用的生命周期
  await runMainLifeCycle('destroyed')
}

export const runMainLifeCycle = async (type) => {
  const mainLife = getMainLifecycle()

  await Promise.all(mainLife[type].map(async item => await item()))
}
