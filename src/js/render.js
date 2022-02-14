import { getDom } from '../utils'
import { getState } from './data'
import { deleteTodoItem } from './delete'

const todoListWrapper = getDom("#todo-list-wrapper")
const historyWrapper = getDom("#history-wrapper")

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

export const renderHistory = () => {
  const { todoHistory } = getState()
  historyWrapper.innerText = ""
  for (let i = 0; i < todoHistory.length; i++) {
    _createHistoryTem(todoHistory[i])
  }
}

function _createTodoTem(rowData) {
  const li = document.createElement("li")
  const i = document.createElement("i")
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