import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'
import TableHeadButton from './TableHeadButton'

const TableHead = ({
  children, minWidth, isSort, sortOrder, sortFunction, column, lastSort, customSortFunction,
}) => (
  <div className="tableStyle__head">
    <TableCell minWidth={minWidth}>
      {children}
      { isSort ? <TableHeadButton lastSort={lastSort} column={column} sortOrder={sortOrder} sortFunction={sortFunction} customSortFunction={customSortFunction} /> : ''}
    </TableCell>
  </div>
)

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.shape({
    dataField: PropTypes.string,
    sortFunction: PropTypes.func,
  }).isRequired,
  minWidth: PropTypes.number,
  isSort: PropTypes.bool,
  sortOrder: PropTypes.string,
  sortFunction: PropTypes.func,
  lastSort: PropTypes.string.isRequired,
  customSortFunction: PropTypes.func,
}

TableHead.defaultProps = {
  isSort: false,
  minWidth: 100,
  sortOrder: 'asc',
  sortFunction: () => {},
  customSortFunction: null,
}

export default TableHead
