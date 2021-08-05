/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react'
import './styles.css'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TableColumn from './TableColumn'
import TableRow from './TableRow'
import TableHead from './TableHead'
import TableFooter from './TableFooter'
import paginator from './utils/paginator'
import compareValues from './utils/compareValues'
import TableScrollArea from './TableScrollArea'

const Table = ({ columns, data, rowLimit, isDraggable, isResizable }) => {
  const [info, setInfo] = useState(data)
  const [sortOrder, setSortOrder] = useState('desc')
  const [perPage, setPerPage] = useState(rowLimit)
  const [displayArr, setDisplayArr] = useState([])
  const [pagination, setPagination] = useState({})
  const [displayCol, setDisplayCol] = useState(columns)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const paginationResult = paginator(data, currentPage, rowLimit)

    setInfo(data)
    setDisplayArr(paginationResult.data)
    setPagination({
      totalPages: paginationResult.totalPages,
      nextPage: paginationResult.nextPage,
      prevPage: paginationResult.prePage,
    })

    setCurrentPage(paginationResult.currentPage)

    setPerPage(rowLimit)
  }, [rowLimit])

  const sortHanlder = (key, order) => {
    const copy = [...info]
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const beforePage = copy.sort(compareValues(key, order))
    setInfo(beforePage)
    setDisplayArr(paginator(beforePage, currentPage, perPage).data)
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    const colId = draggableId.split('column-')[1]

    if (!destination) {
      return false
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return false
    }

    const newArr = [...displayCol]
    newArr.splice(source.index, 1)
    newArr.splice(destination.index, 0, displayCol[colId])

    setDisplayCol(newArr)
  }

  const changePage = (page) => {
    const paginationResult = paginator(info, page, perPage)
    setCurrentPage(page)
    setDisplayArr(paginationResult.data)
    setPagination({
      ...pagination,
      nextPage: paginationResult.nextPage,
      prevPage: paginationResult.prePage,
    })
  }

  const generatePages = (currentPage, totalPages) => {
    const pages = []

    pages.push(
      <li>
        <button type="button" onClick={() => changePage(1)} disabled={currentPage <= 1}>
          first
        </button>
      </li>,
    )

    pages.push(
      <li>
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
      <li key="pages-current">
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
      <li>
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
      <li>
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="tableStyle">
        <Droppable droppableId="DroppableId" direction="horizontal" type="column">
          {(provided) => (
            <div className="tableStyle__table" {...provided.droppableProps} ref={provided.innerRef}>
              {displayCol.map((column, index) => (
                <TableColumn
                  key={`column-${index}`}
                  column={index}
                  isDraggable={isDraggable}
                  isResizable={isResizable}
                >
                  <TableHead width={column.width}>
                    <button type="button" onClick={() => sortHanlder(column.dataField, sortOrder)}>
                      {column.text}
                    </button>
                  </TableHead>
                  <TableScrollArea index={index}>
                    {displayArr.map((row, rowIndex) => (
                      <TableRow key={rowIndex} row={row} column={column} index={rowIndex} />
                    ))}
                  </TableScrollArea>
                  <TableFooter>
                    {column.footerFormatter ? column.footerFormatter(column, index) : column.footer}
                  </TableFooter>
                </TableColumn>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="tableStyle__pagination">
          <ul>{generatePages(currentPage, pagination.totalPages)}</ul>
        </div>
      </div>
    </DragDropContext>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string.isRequired,
      text: PropTypes.any.isRequired,
      footer: PropTypes.any.isRequired,
    }),
  ).isRequired,
  rowLimit: PropTypes.number,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
}

Table.defaultProps = {
  rowLimit: 20,
  isDraggable: true,
  isResizable: true,
}

export default Table
