/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableHead = ({ children, width }) => (
  <div className="tableStyle__head">
    <TableCell minWidth={width}>{children}</TableCell>
  </div>
)

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
}

export default TableHead
