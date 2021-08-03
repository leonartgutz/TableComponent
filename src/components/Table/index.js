/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableCell from './TableCell'
import TableFooter from './TableFooter'
import paginator from './utils/paginator'
import compareValues from './utils/compareValues'

const Table = ({ columns, data, rowLimit }) => {
  const [info, setInfo] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const [perPage, setPerPage] = useState(rowLimit)
  const [displayArr, setDisplayArr] = useState([])

  useEffect(() => {
    setInfo(data)
    setDisplayArr(paginator(data, 1, perPage))
  }, [data])

  useEffect(() => {
    setPerPage(rowLimit)
  }, [rowLimit])

  const sortHanlder = (key, order) => {
    const copy = [...displayArr]
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setDisplayArr(copy.sort(compareValues(key, order)))
  }

  const generatePages = (infoArr, limit) => {
    const pages = []

    for (let i = 1; i <= Math.ceil(infoArr.length / limit); i++) {
      pages.push(
        <li key={i}>
          <button type="button" onClick={() => setDisplayArr(paginator(info, i, perPage))}>
            {i}
          </button>
        </li>,
      )
    }

    return pages
  }

  return (
    <div className="tableStyle">
      <div className="tableStyle__inner">
        <table className="tableStyle__table">
          <TableHead>
            {columns.map((cell, index) => (
              <TableCell key={index} colWidth={cell.width}>
                {cell.text}
                <button type="button" onClick={() => sortHanlder(cell.dataField, sortOrder)}>
                  Sort
                </button>
              </TableCell>
            ))}
          </TableHead>
          <TableBody data={displayArr} columns={columns} />
          <TableFooter columns={columns} />
        </table>
      </div>
      <div className="tableStyle__pagination">
        <ul>{generatePages(info, perPage)}</ul>
      </div>
    </div>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      footer: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rowLimit: PropTypes.number,
}

Table.defaultProps = {
  rowLimit: 20,
}

export default Table
