export function getDom(selection, el) {
  if (typeof selection !== 'string') throw TypeError("TypeError: dom选择器应该是一个字符串")
  return el ? el.querySelector(selection) : document.querySelector(selection)
}
