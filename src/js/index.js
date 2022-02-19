import { settingInit } from './setting.js'
import { getDom, createMessageBox, createMessageTip, emitter } from '../utils'
import { addTodo, clearInput } from './add'
import { render, renderHistory } from './render'
import { clearHistory, clearHandledTodo, clearTodoList } from './delete'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'
import { todoHandledAndAllTodo } from './computed'
import { getState } from './data.js'
import { serachHistory, searchLocalTodo } from './search'

window.addEventListener('load', function () {
  const simpleAddButton = getDom("#simple-add-button")
  const detailAddButton = getDom("#detail-add-button")
  const clearDetailBtn = getDom("#detail-clear-btn")
  const clearHistort = getDom(".clear-history-button")
  const clearHandedBtn = getDom("#clearHanded")
  const clearAllTodo = getDom("#clearAllTodo")
  const searchInp = getDom("#searchInp")
  const nothingTodo = getDom("#history-wrapper")
  const historyWrapper = getDom("#history-wrapper")
  let searchName = ""


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
    if (!todoHistory.length) {
      createMessageTip("很干净，没有历史")
      return;
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

  searchInp.addEventListener("input", function () {
    _searchTodo()
  })

  serachHistory()
  render()

  emitter.on("searchName:change", function (name) {
    searchName = name
    historyWrapper.innerText = ""
    _searchTodo()
  })

  function _searchTodo() {
    const result = searchLocalTodo(searchName, searchInp.value)
    if (!result.length || !result) {
      console.log("执行了");
      nothingTodo.innerText = ""
      const spanNothing = document.createElement("span")
      spanNothing.innerText = "nothing"
      spanNothing.className = "no-search"
      nothingTodo.appendChild(spanNothing)
    } else {
      console.log(result);
      renderHistory(true, result)
    }
  }
})



