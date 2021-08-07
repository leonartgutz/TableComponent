/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'

const TableScrollArea = ({ children, index, width }) => {
  const scrollHandler = (e, index) => {
    const active = e.target
    const scrollers = document.querySelectorAll('.tableStyle__scrollArea')

    Object.values(scrollers).map((scroller) => {
      if (!scroller.classList.contains(`tableStyle__scroll-${index}`)) {
        scroller.scrollTop = active.scrollTop
      }
    })
  }

  return (
    <div
      onScroll={(e) => scrollHandler(e, index)}
      // onWheelCapture={(e) => scrollHandler(e, index)}
      // onWheel={(e) => scrollHandler(e, index)}
      className={`tableStyle__scrollArea tableStyle__scroll-${index}`}
      style={{ width }}
    >
      {children}
    </div>
  )
}

TableScrollArea.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  width: PropTypes.any,
}

TableScrollArea.defaultProps = {
  width: 150,
}

export default TableScrollArea
