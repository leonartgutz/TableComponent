/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
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
import TablePagination from './TablePagination'

const Table = ({
  columns, data, rowLimit, isDraggable, isResizable,
}) => {
  const [info, setInfo] = useState(data)
  const [sortOrder, setSortOrder] = useState('desc')
  const [perPage, setPerPage] = useState(rowLimit)
  const [displayArr, setDisplayArr] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [displayCol, setDisplayCol] = useState(columns)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastSort, setLastSort] = useState('')

  useEffect(() => {
    const paginationResult = paginator(data, currentPage, rowLimit)

    setInfo(data)
    setDisplayArr(paginationResult.data)
    setTotalPages(paginationResult.totalPages)

    setCurrentPage(paginationResult.currentPage)

    setPerPage(rowLimit)
  }, [rowLimit])

  const sortHanlder = (key, order) => {
    const copy = [...info]
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const beforePage = copy.sort(compareValues(key, order))
    setInfo(beforePage)
    setDisplayArr(paginator(beforePage, currentPage, perPage).data)
    setLastSort(key)
  }

  const customSortHandler = (key, order, callback) => {
    const copy = [...info]
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const beforePage = copy.sort((a, b) => callback(a[key], b[key], order))
    setInfo(beforePage)
    setDisplayArr(paginator(beforePage, currentPage, perPage).data)
    setLastSort(key)
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
    setTotalPages(paginationResult.totalPages)
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
                  <TableHead
                    column={column}
                    minWidth={column.width}
                    isSort={column.sort}
                    sortOrder={sortOrder}
                    lastSort={lastSort}
                    customSortFunction={customSortHandler}
                    sortFunction={sortHanlder}
                  >
                    {column.text}
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

        <TablePagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
      </div>
    </DragDropContext>
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
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
}

Table.defaultProps = {
  rowLimit: 20,
  isDraggable: true,
  isResizable: true,
}

export default Table
