/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import '../styles.css'

const TableHead = ({ children }) => (
  <thead className="tableStyle__head">
    <tr>{children}</tr>
  </thead>
)

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TableHead
