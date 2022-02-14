import { settingInit } from './setting.js'

import { getDom, createMessageBox } from '../utils'
import { addTodo, clearInput } from './add'
import { render } from './render'
import { clearHistory } from './delete'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'

window.addEventListener('load', function () {
  const simpleAddButton = getDom("#simple-add-button")
  const detailAddButton = getDom("#detail-add-button")
  const clearDetailBtn = getDom("#detail-clear-btn")
  const clearHistort = getDom(".clear-history-button")

  todoHistoryEmpty()
  todoListEmpty()
  todoListAndtodoAddLayout()
  settingInit()

  simpleAddButton.addEventListener('click', function () {
    addTodo()
  })

  detailAddButton.addEventListener('click', function () {
    addTodo("DETAIL")
  })

  clearDetailBtn.addEventListener('click', function () {
    clearInput()
  })

  clearHistort.addEventListener('click', function () {
    createMessageBox("删除历史之后无法恢复，是否继续？").then((res) => {
      if (res === "confirm") {
        clearHistory()
      }
    })
  })

  render()
})