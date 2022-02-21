import { getDom } from './getDom'
const mask = getDom("#mask")

const maskType = {
  aside: ["transform", "translateX(-100%)"],
  ["music-wrapper"]: ["transform", "translate(-50%, -120%)"]
}

export function createMask(el, cb) {
  mask.style.display = "block"

  mask.addEventListener('click', function () {
    if (el) {
      const id = el.id
      console.log(id);

      el.style[maskType[id][0]] = maskType[id][1]
      closeMask()
    }
  })
}

export const closeMask = () => {
  mask.style.display = "none"
}