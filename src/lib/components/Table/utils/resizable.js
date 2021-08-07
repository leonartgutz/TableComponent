/* eslint-disable no-shadow */
const makeResizableDiv = (div, index) => {
  const element = document.querySelector(div)
  const scrollArea = document.querySelector(`${div} .tableStyle__scroll-${index}`)
  const resizer = document.querySelector(`${div} .tableStyle__resizer`)

  const resize = (e) => {
    const pixel = e.pageX - (element.getBoundingClientRect().left - 30)
    element.style.width = `${pixel > 100 ? pixel : 100}px`
    scrollArea.style.width = `${pixel > 100 ? pixel : 100}px`

    // console.log(pixel, e.pageX, element.getBoundingClientRect().left)
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
