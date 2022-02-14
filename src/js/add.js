import { createMessageTip, getDom, dateFormat, throttle } from '../utils'
import { mutations } from './data'
import { render } from './render'
import { todoHistoryEmpty, todoListEmpty, todoListAndtodoAddLayout } from './empty'

const simpleInp = getDom("#simple-inp")
const detailAddTitle = getDom("#detail-add-title")
const detailAddTime = getDom("#detail-add-time")
const detailAddDesc = getDom("#detail-add-desc")

const forms = [simpleInp, [detailAddTime, detailAddTitle, detailAddDesc]]

const focusType = {
  simple: "SIMPLE",
  detail: "DETAIL"
}

const todoDataTemplate = (title, time, desc) => {
  return {
    id: new Date().getTime(),
    title: title,
    time: time,
    desc: desc,
    done: false
  }
}

let onFocus = ""

function _changeFocusType(type) {
  onFocus = type
  console.log(type);
}

simpleInp.addEventListener('focus', function () {
  _changeFocusType(focusType.simple)
})

for (let i = 0; i < forms[1].length; i++) {
  forms[1][i].addEventListener("focus", function () {
    _changeFocusType(focusType.detail)
  })
}

function _validate(focusStr) {
  let value = focusStr ? detailAddTitle.value : simpleInp.value
  if (!value) {
    createMessageTip("请输入todo")
    return false
  }
  return true
}

export function clearInput(type) {
  type
    ?
    simpleInp.value = ""
    :
    (detailAddDesc.value = "", detailAddTime.value = "", detailAddTitle.value = "")
}

export const addTodo = (focusStr) => {
  if (!_validate(focusStr)) return;
  if (focusStr && focusStr === focusType.detail && onFocus === focusStr) {
    let time = detailAddTime.value ? detailAddTime.value : dateFormat(new Date())
    const data = todoDataTemplate(detailAddTitle.value, time, detailAddDesc.value)
    mutations.addItem("todoList", data)
    mutations.addItem("todoHistory", data)
    clearInput()
  } else {
    const data = todoDataTemplate(simpleInp.value, dateFormat(new Date()))
    console.log(data);
    mutations.addItem("todoList", data)
    mutations.addItem("todoHistory", data)
    clearInput(true)
  }
  render()
  todoHistoryEmpty()
  todoListEmpty()
  todoListAndtodoAddLayout()
}

window.addEventListener('keydown', throttle(function (e) {
  if (e.key === "Enter" && onFocus) {
    onFocus === focusType.simple ? addTodo() : addTodo("DETAIL")
  }
}, 500))
