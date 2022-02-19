import { getDom, emitter } from "../utils"
import { getState } from "./data"

export const serachHistory = () => {
  const searchBtn = getDom(".search-btn")
  const spans = searchBtn.children
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', function () {
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = "#666"
        spans[i].style.borderColor = "#666"
      }
      this.style.color = "#fff"
      this.style.borderColor = "#fff"
      const currentSearchName = this.getAttribute("date-search-name")
      emitter.emit("searchName:change", currentSearchName)
    })
  }
}

export const searchLocalTodo = (key, searchValue) => {
  const { todoHistory } = getState()
  let searchKey = key ? key : "title"
  return todoHistory.filter(item => {
    const res = item[searchKey]
    if(typeof res === "undefined"){
      return false
    }
    if (res.length) {
      return item[searchKey].includes(searchValue)
    } else {
      return false
    }
  })
}