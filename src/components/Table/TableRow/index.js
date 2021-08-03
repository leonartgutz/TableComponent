/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableRow = ({ columns, row }) => (
  <tr className="tableStyle__row">
    {columns.map((item, index) => (
      <TableCell key={index}>{row[item.dataField]}</TableCell>
    ))}
  </tr>
)

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TableRow
