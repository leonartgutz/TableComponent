/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import makeResizableDiv from '../utils/resizable'

const TableColumn = ({
  children, column, isDraggable, isResizable,
}) => {
  if (isResizable) {
    useEffect(() => {
      makeResizableDiv(`.tableStyle__column-${column}`, column)
    }, [])
  }

  if (isDraggable) {
    return (
      <Draggable draggableId={`column-${column}`} index={column}>
        {(provided) => (
          <div
            className={`tableStyle__column tableStyle__column-${column}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="tableStyle__btn-area">
              <span {...provided.dragHandleProps} title="Drag and Drop"><FontAwesomeIcon icon="grip-horizontal" /></span>
              {isResizable ? <span className="tableStyle__resizer" title="Resize"><FontAwesomeIcon icon="arrows-alt-h" /></span> : ''}
            </div>

            {children}
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <div className={`tableStyle__column tableStyle__column-${column}`}>
      {isResizable ? <span className="tableStyle__resizer">Resize</span> : ''}
      {children}
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
