import { getDom, createMask } from '../utils'

const settingBtn = getDom("#setting")
const asideEl = getDom("#aside")

let asideStatus = false

settingBtn.addEventListener('click', function () {
  createMask(asideEl)
  !asideStatus ? asideEl.style.transform = "translateX(0)" : asideEl.style.transform = "translateX(-100%)"
})
