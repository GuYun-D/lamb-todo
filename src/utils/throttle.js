export function throttle(fn, interval, options = {
  leading: true,
  trailing: false,
}) {
  const { leading, trailing, resultCallBack } = options
  let lastTime = 0
  let timer = null

  const _throttle = function (...args) {
    const nowTime = new Date().getTime()
    if (!lastTime && !leading) lastTime = nowTime
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      const result = fn.apply(this, args)
      if (resultCallBack && typeof resultCallBack === "function") resultCallBack(result)
      lastTime = nowTime
      return;
    }
    if (trailing && !timer) {
      timer = setTimeout(() => {
        lastTime = !leading ? 0 : new Date().getTime()
        const result = fn.apply(this, args)
        if (resultCallBack && typeof resultCallBack === "function") resultCallBack(result)
      }, remainTime);
    }
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}