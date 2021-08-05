/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableRow = ({ column, row, index }) => {
  const hoverEnterHandler = (rowIndex) => {
    const elements = document.querySelectorAll(`.tableStyle__row-${rowIndex}`)
    Object.values(elements).map((element) => {
      element.classList.add('tableStyle__row--hover')
    })
  }

  const hoverLeaveHandler = (rowIndex) => {
    const elements = document.querySelectorAll(`.tableStyle__row-${rowIndex}`)
    Object.values(elements).map((element) => {
      element.classList.remove('tableStyle__row--hover')
    })
  }

  const clickHandler = (rowIndex) => {
    const elements = document.querySelectorAll(`.tableStyle__row-${rowIndex}`)
    Object.values(elements).map((element) => {
      element.classList.toggle('tableStyle__row--selected')
    })
  }

  return (
    <div
      className={`tableStyle__row tableStyle__row-${index}`}
      onClick={() => clickHandler(index)}
      onMouseOver={() => hoverEnterHandler(index)}
      onMouseLeave={() => hoverLeaveHandler(index)}
    >
      {column.formatter ? (
        column.formatter(row[column.dataField], row)
      ) : (
        <TableCell>{row[column.dataField] ? row[column.dataField] : ''}</TableCell>
      )}
    </div>
  )
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default TableRow