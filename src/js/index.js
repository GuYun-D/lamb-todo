import './setting.js'

import { getDom } from '../utils'
import { addTodo } from './add'
import { render } from './render'


window.addEventListener('load', function () {
  const simpleAddButton = getDom("#simple-add-button")
  const detailAddButton = getDom("#detail-add-button")
  simpleAddButton.addEventListener('click', function () {
    addTodo()
  })

  detailAddButton.addEventListener('click', function () {
    addTodo("DETAIL")
  })

  render()
})