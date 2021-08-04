/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableFooter = ({ children }) => (
  <div className="tableStyle__footer">
    <TableCell>
      {children}
    </TableCell>
  </div>
)

TableFooter.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TableFooter
