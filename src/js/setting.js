import { getDom, createMask, localStorage } from '../utils'
import { settings } from './types'

const settingBtn = getDom("#setting")
const asideEl = getDom("#aside")

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
  !asideStatus ? asideEl.style.transform = "translateX(0)" : asideEl.style.transform = "translateX(-100%)"
})

export const settingInit = () => {
  const localSetting = localStorage.getItem(settings) || settingsDefaut
  localSetting.historyPanelVisiable ? todoHistoryEl.style.display = "block" : todoHistoryEl.style.display = "none"
  localSetting.detailAddPanelVisiable ? todoAddEl.style.display = "block" : todoAddEl.style.display = "none"
}

export const changeSettings = (userSettings) => {
  localStorage.setItem(settings, userSettings)
  location.reload()
}
