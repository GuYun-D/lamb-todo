import { settingInit } from './setting.js'
import { getDom, createMessageBox, createMessageTip, emitter, debounce, printer, localStorage } from '../utils'
import { addTodo, clearInput } from './add'
import { render, renderHistory } from './render'
import { clearHistory, clearHandledTodo, clearTodoList } from './delete'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'
import { todoHandledAndAllTodo } from './computed'
import { getState } from './data.js'
import { serachHistory, searchLocalTodo } from './search'
import { changeTheme } from './chnageTheme'

const settings = localStorage.getItem("SETTINGS")

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
  const anWrapper = getDom(".an-wrapper")
  const themeBtn = getDom("#theme-change")
  let searchName = ""

  if (settings.isPlayMusic) {
    printer(anWrapper, "一个简单而又丰富的todo，支持历史查看，音乐播放，皮肤切换...... ", 100, function () {
      anWrapper.parentNode.style.transform = "translateX(-100%)"
    })
  } else {
    anWrapper.parentNode.style.transform = "translateX(-100%)"
  }

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

  searchInp.addEventListener("input", debounce(_searchTodo, 300, true))

  themeBtn.addEventListener('click', function () {
    changeTheme()
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
    if (!result.length || result.length === 0) {
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



