// import { resolve } from "path";

export default {
  init: function () {
    console.log('正在初始化地图脚本...');
    const ak = 'KWSoddWr4bd1CXh1gLe4GfmIuPKXuDO9'
    const v = '2.0'
    const src = 'http://api.map.baidu.com/api'
    const script = document.createElement('script')
    script.src = `${src}?v=${v}&ak=${ak}&callback=init`
    script.type = 'text/javascript'
    return new Promise((resolve, reject) => {
      if (typeof BMap !== 'undefined') {
        // eslint-disable-next-line
        resolve(BMap)
        return
      }
      document
        .body
        .appendChild(script)
      script.onload = function () {
        console.log('地图脚本加载成功');
        // eslint-disable-next-line
        resolve(BMap)
      }
      window.onload = function () {
        // eslint-disable-next-line
        resolve(BMap)
      }
      window.onerror = function () {
        console.log('地图脚本加载失败');
        // eslint-disable-next-line
        reject()
      }
    })
  }
}
