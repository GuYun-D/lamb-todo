import { settingInit } from './setting.js'
import { getDom, createMessageBox, createMessageTip } from '../utils'
import { addTodo, clearInput } from './add'
import { render } from './render'
import { clearHistory, clearHandledTodo, clearTodoList } from './delete'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'
import { todoHandledAndAllTodo } from './computed'
import { getState } from './data.js'

window.addEventListener('load', function () {
  const simpleAddButton = getDom("#simple-add-button")
  const detailAddButton = getDom("#detail-add-button")
  const clearDetailBtn = getDom("#detail-clear-btn")
  const clearHistort = getDom(".clear-history-button")

  const clearHandedBtn = getDom("#clearHanded")
  const clearAllTodo = getDom("#clearAllTodo")

  todoHistoryEmpty()
  todoListEmpty()
  todoListAndtodoAddLayout()
  settingInit()
  todoHandledAndAllTodo()

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
    const { todoHistory } = getState()
    if(!todoHistory.length){
      createMessageTip("很干净，没有历史")
      return ;
    }

    createMessageBox("删除历史之后无法恢复，是否继续？").then((res) => {
      if (res === "confirm") {
        clearHistory()
      }
    })
  })

  clearHandedBtn.addEventListener('click', function () {
    clearHandledTodo()
  })

  clearAllTodo.addEventListener("click", function () {
    clearTodoList()
  })

  render()
})