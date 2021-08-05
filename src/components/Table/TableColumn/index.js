/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import makeResizableDiv from '../utils/resizable'

const TableColumn = ({ children, column, isDraggable, isResizable }) => {
  if (isResizable) {
    useEffect(() => {
      makeResizableDiv(`.tableStyle__column-${column}`)
    }, [])
  }

  if (isDraggable) {
    return (
      <Draggable draggableId={`column-${column}`} index={column} test="test">
        {(provided) => (
          <div
            className={`tableStyle__column tableStyle__column-${column}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <span {...provided.dragHandleProps} title="Drag and Drop">Drag</span>
            {children}

            {isResizable ? <span className="tableStyle__resizer">Resize</span> : ''}
          </div>
        )}
      </Draggable>
    )
  }
  return (
    <div className={`tableStyle__column tableStyle__column-${column}`}>
      {children}
      {isResizable ? <span className="tableStyle__resizer">Resize</span> : ''}
    </div>
  )
}

TableColumn.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.number.isRequired,
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
}

TableColumn.defaultProps = {
  isDraggable: true,
  isResizable: true,
}

export default TableColumn
