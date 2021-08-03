import React from 'react'
import PropTypes from 'prop-types'

const TableCell = ({ children, colWidth }) => (
  <td className="tableStyle__cell" style={{ width: colWidth }}>
    {children}
  </td>
)

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  colWidth: PropTypes.number,
}

TableCell.defaultProps = {
  colWidth: 100,
}

export default TableCell
