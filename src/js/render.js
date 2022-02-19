import { getDom, printer } from '../utils'
import { getState } from './data'
import { deleteTodoItem, changeTodoStatus } from './delete'

const todoListWrapper = getDom("#todo-list-wrapper")
const historyWrapper = getDom("#history-wrapper")
const searchHistoryEl = getDom("#search-history")

export const render = () => {
  renderHistory()
  renderTodoList()
}

export const renderTodoList = () => {
  const { todoList } = getState()
  todoListWrapper.innerText = ""
  for (let i = 0; i < todoList.length; i++) {
    _createTodoTem(todoList[i])
  }
}

export const renderHistory = (isSearch, searchList) => {
  let renderList = getState().todoHistory
  searchHistoryEl.style.display = !renderList.length ? "none" : "flex"
  if (isSearch) {
    renderList = searchList
  }
  historyWrapper.innerText = ""
  for (let i = 0; i < renderList.length; i++) {
    _createHistoryTem(renderList[i])
  }
}

function _createTodoTem(rowData) {
  const li = document.createElement("li")

  if (rowData.desc) {
    const divTip = document.createElement('div')
    divTip.className = "todo-item-tip"
    li.appendChild(divTip)
    divTip.innerText = rowData.desc

    li.addEventListener('mouseenter', function () {
      divTip.style.display = "block"
      const elInfo = divTip.getClientRects()[0]
      divTip.style.top = - elInfo.height - 13 + "px"
    })

    li.addEventListener('mouseleave', function () {
      divTip.style.display = "none"
    })
  }

  const i = document.createElement("i")
  i.style.color = rowData.done ? "#35b0d9" : "#666"
  i.addEventListener('click', function () {
    const res = changeTodoStatus(rowData.id)
    this.style.color = res ? "#35b0d9" : "#666"
  })

  const span = document.createElement("span")
  const button = document.createElement("button")
  button.innerText = "删除"

  button.addEventListener('click', () => {
    deleteTodoItem(rowData.id)
  })

  i.className = "iconfont icon-wancheng"
  span.innerText = rowData.title

  li.appendChild(i)
  li.appendChild(span)
  li.appendChild(button)

  todoListWrapper.appendChild(li)
}

function _createHistoryTem(rowData) {
  const li = document.createElement("li")

  const timeDiv = document.createElement("div")
  timeDiv.className = "time"
  timeDiv.innerText = rowData.time

  const contentDiv = document.createElement('div')
  contentDiv.className = "content"
  const span = document.createElement("span")
  span.innerText = rowData.title
  const i = document.createElement("i")
  i.className = "iconfont icon-youjiantou"
  contentDiv.appendChild(span)
  if (rowData.desc) {
    contentDiv.appendChild(i)
  }

  const descDive = document.createElement("div")
  descDive.className = "desc"
  descDive.innerText = rowData.desc

  li.appendChild(timeDiv)
  li.appendChild(contentDiv)

  if (rowData.desc) {
    li.appendChild(descDive)
  }

  historyWrapper.appendChild(li)
}