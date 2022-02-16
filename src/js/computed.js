import { getState } from './data'
import { getDom } from '../utils'

const complieEl = getDom("#hasComplie")
const totalEl = getDom("#total")
const detailOpWrap = getDom(".detail-op")

const _resizeAnalyysis = () => {
  const { todoList } = getState()
  detailOpWrap.style.display = todoList.length ? "flex" : "none"
  return [todoList.filter(item => item.done === true).length, todoList.length]
}

export const todoHandledAndAllTodo = () => {
  const computed = _resizeAnalyysis()
  complieEl.innerText = computed[0]
  totalEl.innerText = computed[1]
}