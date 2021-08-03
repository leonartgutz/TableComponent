import React from 'react'
import PropTypes from 'prop-types'

const TableCell = ({ children }) => (
  <div className="tableStyle__cell">
    {children}
  </div>
)

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TableCell
