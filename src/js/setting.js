import { getDom, createMask, localStorage } from '../utils'
import { settings } from './types'

const settingBtn = getDom("#setting")
const asideEl = getDom("#aside")
const settingConfirm = getDom("#setting-confirm")

const todoAddEl = getDom('.todo-add')
const todoHistoryEl = getDom(".todo-history")

let asideStatus = false

const settingsDefaut = {
  historyPanelVisiable: true,
  detailAddPanelVisiable: true,
  isPlayMusic: false
}

settingBtn.addEventListener('click', function () {
  createMask(asideEl)
  switchInit()
  !asideStatus ? asideEl.style.transform = "translateX(0)" : asideEl.style.transform = "translateX(-100%)"
})

export const settingInit = () => {
  const localSetting = localStorage.getItem(settings) || settingsDefaut
  localSetting.historyPanelVisiable ? todoHistoryEl.style.display = "block" : todoHistoryEl.style.display = "none"
  localSetting.detailAddPanelVisiable ? todoAddEl.style.display = "block" : todoAddEl.style.display = "none"
}

const changeSettings = (userSettings) => {
  localStorage.setItem(settings, userSettings)
  location.reload()
}


export function switchInit() {
  const switchs = asideEl.querySelectorAll('.switch-button')
  const localSetting = localStorage.getItem(settings) || { ...settingsDefaut }

  for (let i = 0; i < switchs.length; i++) {
    const switchWrap = switchs[i]
    const dot = switchWrap.children[0]
    const settingName = dot.classList[1]
    switch (settingName) {
      case "history":
        _settingItemStatus(localSetting.historyPanelVisiable, dot, switchWrap)
        break;

      case "detail":
        _settingItemStatus(localSetting.detailAddPanelVisiable, dot, switchWrap)
        break;

      case "start":
        _settingItemStatus(localSetting.isPlayMusic, dot, switchWrap)
        break;
    }
  }

  for (let i = 0; i < switchs.length; i++) {
    switchs[i].addEventListener('click', function (e) {
      const unknownClassList = Array.prototype.slice.call(e.target.classList)
      const isDot = unknownClassList.includes('dot')
      const dot = isDot ? e.target : e.target.children[0]
      const switchWrap = isDot ? e.target.parentNode : e.target
      const settingName = dot.classList[1]

      switch (settingName) {
        case "history":
          localSetting.historyPanelVisiable = !localSetting.historyPanelVisiable
          _settingItemStatus(localSetting.historyPanelVisiable, dot, switchWrap)
          break;
        case "detail":
          localSetting.detailAddPanelVisiable = !localSetting.detailAddPanelVisiable
          _settingItemStatus(localSetting.detailAddPanelVisiable, dot, switchWrap)
          break;
        case "start":
          localSetting.isPlayMusic = !localSetting.isPlayMusic
          _settingItemStatus(localSetting.isPlayMusic, dot, switchWrap)
          break;
      }
    })
  }

  settingConfirm.addEventListener('click', function () {
    changeSettings(localSetting)
  })
}

function _settingItemStatus(status, dotEl, switchWrapEl) {
  status
    ?
    (switchWrapEl.style.background = "green", dotEl.style.left = "30px")
    :
    (switchWrapEl.style.background = "red", dotEl.style.left = "3px")
}