import { todoHistoryType, todoListType } from './types'
import { localStorage } from '../utils'

const getState = function () {
  return {
    todoList: localStorage.getItem(todoListType) || [],
    todoHistory: localStorage.getItem(todoHistoryType) || []
  }
}

const mutations = {
  addItem: (name, playload) => {
    const cacheKey = name === "todoList" ? todoListType : todoHistoryType
    const state = { ...getState() }
    state[name].unshift(playload)
    localStorage.setItem(cacheKey, state[name])
  }
}

export {
  getState, mutations
}