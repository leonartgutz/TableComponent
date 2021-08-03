/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import TableRow from '../TableRow'

const TableBody = ({ data, columns }) => (
  <tbody className="tableStyle__body">
    {data.map((tableRow, index) => (
      <TableRow key={index} columns={columns} row={tableRow} />
    ))}
  </tbody>
)

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TableBody
