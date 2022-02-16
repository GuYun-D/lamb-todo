import { renderHistory, renderTodoList } from './render'
import { todoHistoryType, todoListType } from './types'
import { localStorage, createMessageBox, createMessageTip } from '../utils'
import { getState } from './data'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'
import { todoHandledAndAllTodo } from './computed'

export const clearHistory = () => {
  localStorage.deleteCache(todoHistoryType)
  renderHistory()
  todoHistoryEmpty()
}

export const clearTodoList = () => {
  const { todoList } = getState()
  if (!todoList.length) {
    createMessageTip("目前没有todo去做，快去添加吧", "呵呵", "warning", 1000)
    return;
  }

  createMessageBox("确定要清空全部todo吗").then(res => {
    if (res === "confirm") {
      localStorage.deleteCache(todoListType)
      todoHandledAndAllTodo()
      renderTodoList()
      todoListEmpty()
      todoListAndtodoAddLayout()
    }
  })

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
      todoHandledAndAllTodo()
    }
  })
}

export const changeTodoStatus = (todoId) => {
  const { todoList } = getState()
  const itemIndex = todoList.findIndex(item => item.id === todoId)
  todoList[itemIndex].done = !todoList[itemIndex].done
  localStorage.setItem(todoListType, todoList)
  todoHandledAndAllTodo()
  return todoList[itemIndex].done
}

export const clearHandledTodo = () => {
  const { todoList } = getState()
  const result = todoList.filter(item => item.done === false)
  const isLiveDone = !!(todoList.length - result.length)

  if (!isLiveDone) {
    createMessageTip("目前没有完成的todo，快去完成吧", "呵呵", "warning", 1000)
    return;
  }
  createMessageBox("确定要清除已经完成的todo吗").then(res => {
    if (res === "confirm") {
      localStorage.setItem(todoListType, result)
      todoHandledAndAllTodo()
      renderTodoList()
      todoListEmpty()
      todoListAndtodoAddLayout()
    }
  })

}