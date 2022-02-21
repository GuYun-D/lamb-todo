import { getDom } from '../utils'
import musicInfo from '../json/music.info.json'
let currentIndex = 0
let timer = null
const musicWraEl = getDom("#music-wrapper")
const texts = getDom(".texts")
const songerEl = getDom("h3", texts)
const songNameEl = getDom("p", texts)
const nextMusicEl = getDom(".icon-play-right-r")
const preMusicEl = getDom(".icon-play-left-l")
const playEl = getDom("#icon-play")
const progressEl = getDom(".progress")
const defaultMusic = musicInfo[currentIndex]
const music = new Audio(defaultMusic.src)
const musicTime = getDom("#musicTime")

_setMusic(true)

music.addEventListener("ended", function () {
  currentIndex++
  currentIndex++
  if (currentIndex > 4) {
    currentIndex = 0
  }
  _setMusic()
})


playEl.addEventListener("click", function () {
  const classList = this.classList
  if (classList.contains("icon-play")) {
    classList.remove("icon-play")
    classList.add("icon-play_pause")
    _setMusic()
    timer = setInterval(() => {
      let percent = music.currentTime / music.duration
      progressEl.style.width = percent * 100 + "%"
      musicTime.innerText = `${_secondToText(music.currentTime)} / ${_secondToText(music.duration)}`
    }, 100)
  } else {
    classList.remove("icon-play_pause")
    classList.add("icon-play")
    music.pause()
    clearInterval(timer)
    timer = null
  }
})

nextMusicEl.addEventListener("click", function () {
  currentIndex++
  if (currentIndex > 4) {
    currentIndex = 0
  }
  _setMusic()
})

preMusicEl.addEventListener("click", function () {
  currentIndex--
  if (currentIndex < 0) {
    currentIndex = 4
  }
  _setMusic()
})

function _setMusic(init) {
  const currentMusicInfo = musicInfo[currentIndex]
  music.src = currentMusicInfo.src
  songNameEl.innerText = currentMusicInfo.title
  songerEl.innerText = currentMusicInfo.auther
  musicWraEl.style.background = `url(${currentMusicInfo.img}) no-repeat`
  musicWraEl.style.backgroundSize = "cover"
  if (!init) {
    music.play()
    _setPlayStatus()
  }
}

function _secondToText(second) {
  second = parseInt(second)
  let min = parseInt(second / 60)
  let sec = second % 60
  sec = sec < 10 ? '0' + sec : '' + sec
  return min + ':' + sec
}

function _setPlayStatus() {
  const classList = playEl.classList
  classList.remove("icon-play")
  classList.add("icon-play_pause")
}