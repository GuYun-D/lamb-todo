import { localStorage, sessionStorage } from './cache'
import { dateFormat } from './dateFormat'
import { getDom } from './getDom'
import { createMessageTip } from './message'
import { printer } from './printer'
import { createMask, closeMask } from './showMask'
import emitter from './eventBus'
import { createMessageBox } from './messageBox'
import { throttle } from './throttle'

export {
  localStorage,
  sessionStorage,
  dateFormat,
  getDom,
  createMessageTip,
  printer,
  createMask,
  emitter,
  createMessageBox,
  closeMask,
  throttle
}