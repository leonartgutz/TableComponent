import React from 'react'
import PropTypes from 'prop-types'

const TableColumn = ({ children, width }) => <div className="tableStyle__column" style={{ width }}>{children}</div>

TableColumn.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
}

export default TableColumn
