import React from 'react'
import PropTypes from 'prop-types'
import '../../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import upDown from '../../assets/up-down.svg'

const TableHeadButton = ({
  sortFunction, sortOrder, customSortFunction, column, lastSort, text,
}) => {
  const sortIconHandler = (order) => {
    if (order === 'asc') {
      return (<FontAwesomeIcon icon="caret-up" />)
    }
    return (<FontAwesomeIcon icon="caret-down" />)
  }

  return (
    <button type="button" onClick={column.sortFunction ? () => customSortFunction(column.dataField, sortOrder, column.sortFunction) : () => sortFunction(column.dataField, sortOrder)}>
      <p>{text}</p>
      {lastSort === column.dataField ? sortIconHandler(sortOrder) : (<img src={upDown} alt="up-down" />)}
    </button>
  )
}

TableHeadButton.propTypes = {
  sortFunction: PropTypes.func,
  sortOrder: PropTypes.string,
  customSortFunction: PropTypes.func,
  column: PropTypes.shape({
    dataField: PropTypes.string,
    sortFunction: PropTypes.func,
  }).isRequired,
  lastSort: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

TableHeadButton.defaultProps = {
  sortFunction: () => {},
  sortOrder: 'asc',
  customSortFunction: null,
}

export default TableHeadButton
