/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

const TableColumn = ({ children, width, column }) => (
  <Draggable draggableId={`column-${column}`} index={column}>
    {(provided) => (
      <div className="tableStyle__column" style={{ width }} {...provided.draggableProps} ref={provided.innerRef}>
        <span {...provided.dragHandleProps}>Drag</span>
        {children}
      </div>
    )}
  </Draggable>
)

TableColumn.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
}

export default TableColumn
