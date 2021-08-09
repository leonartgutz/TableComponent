import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'
import TableCell from '../TableCell'
import TableHeadButton from './TableHeadButton'

const TableHead = ({
  children, isSort, sortOrder, sortFunction, column, lastSort, customSortFunction,
}) => (
  <div className="tableStyle__head">
    <TableCell>
      { isSort
        ? <TableHeadButton text={children} lastSort={lastSort} column={column} sortOrder={sortOrder} sortFunction={sortFunction} customSortFunction={customSortFunction} />
        : { children }}
    </TableCell>
  </div>
)

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.shape({
    dataField: PropTypes.string,
    sortFunction: PropTypes.func,
  }).isRequired,
  isSort: PropTypes.bool,
  sortOrder: PropTypes.string,
  sortFunction: PropTypes.func,
  lastSort: PropTypes.string.isRequired,
  customSortFunction: PropTypes.func,
}

TableHead.defaultProps = {
  isSort: false,
  sortOrder: 'asc',
  sortFunction: () => {},
  customSortFunction: null,
}

export default TableHead
