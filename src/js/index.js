import './setting.js'

import { getDom } from '../utils'
import { addTodo } from './add'

window.addEventListener('load', function () {
  const simpleAddButton = getDom("#simple-add-button")
  simpleAddButton.addEventListener('click', function () {
    addTodo()
  })
})