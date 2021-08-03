/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableRow = ({ column, row }) => (
  <div className="tableStyle__row">
    <TableCell>
      {row[column.dataField] ? row[column.dataField] : ''}
    </TableCell>
  </div>
)

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
}

export default TableRow
