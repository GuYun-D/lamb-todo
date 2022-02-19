import { getDom, emitter } from "../utils"
import { getState } from "./data"

export const serachHistory = () => {
  const searchBtn = getDom(".search-btn")
  const spans = searchBtn.children
  const isDark = Array.prototype.slice.call(document.body.classList).includes("dark")
  const mainColor = isDark ? "#FF7A54" : "#fff"
  console.log(isDark);
  for (let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', function () {
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = "#666"
        spans[i].style.borderColor = "#666"
      }
      this.style.color = mainColor
      this.style.borderColor = mainColor
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