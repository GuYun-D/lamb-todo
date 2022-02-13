let timer = null

export function printer(el, text, second, cb) {
  let counter = 1
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    el.innerText = text.slice(0, counter)
    counter++

    if (counter === text.length) {
      clearInterval(timer)
      timer = null
      cb && typeof cb === 'function' && cb()
    }
  }, second)
}