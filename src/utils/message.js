import { getDom } from '../utils'

const wrapper = getDom(".message-wrapper")
const message = getDom("#message")
const title = getDom(".header", message)
const content = getDom(".body", message)
const btns = getDom(".footer", message)

let messageTimer = null

const messageTypes = {
  warning: "#f7b52c",
  success: "#67c23a"
}

export function createMessageTip(text, titleText = "提示", type = "warning", closeTime = 3000) {
  title.innerText = titleText
  content.innerText = text
  message.style.display = "block"
  wrapper.style.transform = "translateY(0)"

  message.style.borderColor = messageTypes[type]
  title.style.color = messageTypes[type]
  title.style.borderColor = messageTypes[type]

  if (titleText === "提示") {
    btns.style.display = "none"
    content.style.paddingBottom = "20px"
    closeTime = 500
  }

  if (type === "warning") {
    btns.style.display = "none"
    content.style.paddingBottom = "20px"
  }

  if (messageTimer) clearTimeout(messageTimer)
  messageTimer = setTimeout(() => {
    messageTimer = null
    // message.style.display = "none"
    wrapper.style.transform = "translateY(-120%)"
    clearTimeout(messageTimer)

    console.log(closeTime);
  }, closeTime)
}