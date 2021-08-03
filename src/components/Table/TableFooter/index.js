/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'

const TableFooter = ({ columns }) => (
  <tfoot>
    <tr>
      {columns.map((cell, index) => (
        <TableCell key={index}>{cell.footer}</TableCell>
      ))}
    </tr>
  </tfoot>
)

TableFooter.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      footer: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default TableFooter
