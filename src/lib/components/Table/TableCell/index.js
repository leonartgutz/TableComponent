import React from 'react'
import PropTypes from 'prop-types'

const TableCell = ({ children, minWidth }) => (
  <div className="tableStyle__cell" style={{ minWidth }}>
    {children}
  </div>
)

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  minWidth: PropTypes.number,
}

TableCell.defaultProps = {
  minWidth: 100,
}

export default TableCell
