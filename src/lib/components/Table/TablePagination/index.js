/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React from 'react'
import PropTypes from 'prop-types'

const TablePagination = ({ currentPage, totalPages, changePage }) => {
  const generatePages = (currentPage, totalPages) => {
    const pages = []

    pages.push(
      <li key="first">
        <button type="button" onClick={() => changePage(1)} disabled={currentPage <= 1}>
          first
        </button>
      </li>,
    )

    pages.push(
      <li key="back">
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage - 1 <= 0}
        >
          prev
        </button>
      </li>,
    )

    for (let i = 2; i >= 1; i--) {
      if (currentPage - i > 0) {
        pages.push(
          <li key={`prev-${i}`}>
            <button type="button" onClick={() => changePage(currentPage - i)}>
              {currentPage - i}
            </button>
          </li>,
        )
      }
    }

    pages.push(
      <li key="current-page">
        <button type="button" disabled>
          {currentPage}
        </button>
      </li>,
    )

    for (let i = 1; i <= 2; i++) {
      if (currentPage + i <= totalPages) {
        pages.push(
          <li key={`next-${i}`}>
            <button type="button" onClick={() => changePage(currentPage + i)}>
              {currentPage + i}
            </button>
          </li>,
        )
      }
    }

    pages.push(
      <li key="next">
        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage + 1 > totalPages}
        >
          next
        </button>
      </li>,
    )

    pages.push(
      <li key="last">
        <button
          type="button"
          onClick={() => changePage(totalPages)}
          disabled={currentPage >= totalPages}
        >
          last
        </button>
      </li>,
    )

    return pages
  }

  return (
    <div className="tableStyle__pagination">
      <div className="tableStyle__manyPages">Page {currentPage} of {totalPages}</div>
      <ul>{generatePages(currentPage, totalPages)}</ul>
    </div>
  )
}

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
}

export default TablePagination
