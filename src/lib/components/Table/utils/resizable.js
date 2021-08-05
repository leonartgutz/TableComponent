/* eslint-disable no-shadow */
const makeResizableDiv = (div) => {
  const element = document.querySelector(div)
  const resizer = document.querySelector(`${div} .tableStyle__resizer`)

  const resize = (e) => {
    element.style.width = `${e.pageX - element.getBoundingClientRect().left}px`
  }

  const stopResize = () => {
    window.removeEventListener('mousemove', resize, true)
  }

  resizer.addEventListener('mousedown', (e) => {
    e.preventDefault()

    window.addEventListener('mousemove', resize, true)
    window.addEventListener('mouseup', stopResize)
  })
}

export default makeResizableDiv
