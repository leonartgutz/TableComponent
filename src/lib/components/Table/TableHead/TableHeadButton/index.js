import React from 'react'
import PropTypes from 'prop-types'
import '../../styles.css'

const TableHeadButton = ({
  sortFunction, sortOrder, customSortFunction, column, lastSort,
}) => (
  <button type="button" onClick={column.sortFunction ? () => customSortFunction(column.dataField, sortOrder, column.sortFunction) : () => sortFunction(column.dataField, sortOrder)}>
    {lastSort === column.dataField ? sortOrder : 'O'}
  </button>
)

TableHeadButton.propTypes = {
  sortFunction: PropTypes.func,
  sortOrder: PropTypes.string,
  customSortFunction: PropTypes.func,
  column: PropTypes.shape({
    dataField: PropTypes.string,
    sortFunction: PropTypes.func,
  }).isRequired,
  lastSort: PropTypes.string.isRequired,
}

TableHeadButton.defaultProps = {
  sortFunction: () => {},
  sortOrder: 'asc',
  customSortFunction: null,
}

export default TableHeadButton
