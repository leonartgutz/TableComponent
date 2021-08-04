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
  const [info, setInfo] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const [perPage, setPerPage] = useState(rowLimit)
  const [displayArr, setDisplayArr] = useState([])
  const [pagination, setPagination] = useState({})
  const [displayCol, setDisplayCol] = useState(columns)

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
                  <TableFooter>{column.footer}</TableFooter>
                </TableColumn>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="tableStyle__pagination">
          <ul>{generatePages(pagination.totalPages)}</ul>
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
