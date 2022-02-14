import { createMessageTip, getDom, createMask, closeMask } from '.'

const messageBox = getDom(".messageBox")
const content = getDom("#message-content")
const cancelBtn = getDom("#cancel")
const confirmBtn = getDom("#confirm")

export const createMessageBox = (confirmInfo) => {
  if (!confirmInfo || typeof confirmInfo !== "string") {
    createMessageTip("确认信息是必须的")
    return;
  }

  _opMessageBox(true)
  createMask()

  content.innerText = confirmInfo

  return new Promise((resolve, reject) => {
    cancelBtn.addEventListener('click', function () {
      _opMessageBox(false, "取消成功")
      resolve("cancel")
    })

    confirmBtn.addEventListener("click", function () {
      _opMessageBox(false, "删除成功")
      resolve("confirm")
    })
  })
}

function _opMessageBox(op, tip) {
  op ?
    (messageBox.style.opacity = "1", messageBox.style.display = "block")
    :
    (messageBox.style.opacity = "0", messageBox.style.display = "none", closeMask(), createMessageTip(tip, "提示", "success", 800))
}