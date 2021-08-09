/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
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
      <TableCell>{column.formatter ? column.formatter(row[column.dataField], row, index) : row[column.dataField]}</TableCell>
    </div>
  )
}

TableRow.propTypes = {
  row: PropTypes.shape({}).isRequired,
  column: PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    formatter: PropTypes.func,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default TableRow
