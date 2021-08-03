/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import TableColumn from './TableColumn'
import TableRow from './TableRow'
import TableHead from './TableHead'
import TableFooter from './TableFooter'
import paginator from './utils/paginator'
import compareValues from './utils/compareValues'

const defaultPagination = {
  currentPage: 1,
  totalPages: 1,
}

const Table = ({ columns, data, rowLimit }) => {
  const [info, setInfo] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const [perPage, setPerPage] = useState(rowLimit)
  const [displayArr, setDisplayArr] = useState([])
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    const paginationResult = paginator(data, 1, rowLimit)

    setInfo(data)
    setDisplayArr(paginationResult.data)
  }, [data])

  useEffect(() => {
    const paginationResult = paginator(data, 1, rowLimit)

    setPagination({
      currentPage: paginationResult.currentPage,
      totalPages: paginationResult.totalPages,
    })

    setPerPage(rowLimit)
    setDisplayArr(paginationResult.data)
  }, [rowLimit])

  const sortHanlder = (key, order) => {
    const copy = [...info]
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const beforePage = copy.sort(compareValues(key, order))
    setDisplayArr(paginator(beforePage, 1, perPage).data)
  }

  const generatePages = (total) => {
    const pages = []

    for (let i = 1; i <= total; i++) {
      pages.push(
        <li key={i}>
          <button type="button" onClick={() => setDisplayArr(paginator(info, i, perPage).data)}>
            {i}
          </button>
        </li>,
      )
    }

    return pages
  }

  return (
    <div className="tableStyle">
      <div className="tableStyle__table">
        {columns.map((column) => (
          <TableColumn width={column.width}>
            <TableHead>
              {column.text}
              <button type="button" onClick={() => sortHanlder(column.dataField, sortOrder)}>
                Sort
              </button>
            </TableHead>
            {displayArr.map((row) => (
              <TableRow row={row} column={column} />
            ))}
            <TableFooter>
              {column.footer}
            </TableFooter>
          </TableColumn>
        ))}
      </div>

      <div className="tableStyle__pagination">
        <ul>{generatePages(pagination.totalPages)}</ul>
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
