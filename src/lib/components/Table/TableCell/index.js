import React from 'react'
import PropTypes from 'prop-types'

const TableCell = ({ children }) => (
  <div className="tableStyle__cell">
    <div className="tableStyle__cell__content">{children}</div>
  </div>
)

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TableCell
