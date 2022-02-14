import { getDom } from "../utils"
import { getState } from './data'

const nothingTodoWra = getDom('.nothing-todo')
const listNothing = getDom('.list-nothing')
const todoListEl = getDom(".todo-list")

export const todoListEmpty = () => {
  const { todoList } = getState()
  todoList.length ? listNothing.style.display = "none" : listNothing.style.display = "block"
}

export const todoHistoryEmpty = () => {
  const { todoHistory } = getState()
  todoHistory.length ? nothingTodoWra.style.display = "none" : nothingTodoWra.style.display = "block"
}

export const todoListAndtodoAddLayout = () => {
  const { todoList } = getState()
  todoList.length ? todoListEl.style.flex = "2" : todoListEl.style.flex = "1"
}