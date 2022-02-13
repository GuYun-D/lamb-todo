class GYEventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallBack, thisArguments) {
    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }

    handlers.push({
      eventCallBack, thisArguments
    })
  }

  off(eventName, eventCallBack) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return;
    const newHandler = [...handlers]
    for (let i = 0; i < newHandler.length; i++) {
      const handler = newHandler[i]
      if (handler.eventCallBack === eventCallBack) {
        let index = handlers.indexOf(handler)
        handlers.splice(index, 1)
      }
    }

  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return;
    handlers.forEach(handler => {
      handler.eventCallBack.apply(handler.thisArguments, payload)
    })
  }
}

export default new GYEventBus()