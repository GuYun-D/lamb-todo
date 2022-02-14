import { renderHistory, renderTodoList } from './render'
import { todoHistoryType, todoListType } from './types'
import { localStorage, createMessageBox } from '../utils'
import { getState } from './data'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'

export const clearHistory = () => {
  localStorage.deleteCache(todoHistoryType)
  renderHistory()
  todoHistoryEmpty()
}

export const clearTodoList = () => {
  localStorage.deleteCache(todoListType)
  renderTodoList()
}

export const clearAll = () => {
  localStorage.clearCache()
}

export const deleteTodoItem = (todoId) => {
  const { todoList } = getState()
  const itemIndex = todoList.findIndex(item => item.id === todoId)
  createMessageBox(`你确定要删除[ ${todoList[itemIndex].title} ]这条todo吗`).then((res) => {
    if (res === "confirm") {
      todoList.splice(itemIndex, 1)
      localStorage.setItem(todoListType, todoList)
      renderTodoList()
      todoListEmpty()
      todoListAndtodoAddLayout()
    }
  })
}