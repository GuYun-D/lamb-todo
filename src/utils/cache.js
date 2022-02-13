class Cache {
  cache = window.localStorage
  constructor(isLocalstrage = true) {
    this.cache = isLocalstrage ? window.localStorage : window.sessionStorage
  }

  setItem(key, value) {
    key = _changeKey(key)
    this.cache.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    key = _changeKey(key)
    const value = this.cache.getItem(key)
    return JSON.parse(value)
  }

  deleteCache(key) {
    key = _changeKey(key)
    this.cache.removeItem(key)
  }

  clearCache() {
    this.cache.clear()
  }
}

function _changeKey(key) {
  if (typeof key !== 'string') {
    throw TypeError("TypeError: 缓存的key的类型应是string")
  }
  return key.toUpperCase()
}

const localStorage = new Cache()
const sessionStorage = new Cache(false)

export {
  localStorage,
  sessionStorage
}