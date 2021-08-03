/* eslint-disable radix */
import React, { useState } from 'react'
import Table from './components/Table'

const array = [
  {
    id: 1,
    name: 'Leonart',
    value: 3.35,
  },
  {
    id: 2,
    name: 'Jessica',
    value: 7.35,
  },
  {
    id: 3,
    name: 'Chloe',
    value: 4.23,
  },
  {
    id: 4,
    name: 'Jess',
    value: 88.89,
  },
  {
    id: 5,
    name: 'Alini',
    value: 3.35,
  },
  {
    id: 6,
    name: 'Liz',
    value: 7.35,
  },
  {
    id: 7,
    name: 'Marina',
    value: 4.23,
  },
  {
    id: 8,
    name: 'Teste',
    value: 88.89,
  },
]

const column = [
  {
    dataField: 'id',
    text: 'ID',
    footer: 'ID',
    width: 100,
  },
  {
    dataField: 'name',
    text: 'NAME',
    footer: 'NAME',
    width: 100,
  },
  {
    dataField: 'value',
    text: 'VALUE',
    footer: 'VALUE',
    width: 100,
  },
]

const App = () => {
  const [row, setRow] = useState(2)

  const rowHandler = (Event) => {
    setRow(parseInt(Event.target.value))
  }

  return (
    <>
      <select onChange={rowHandler}>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
      </select>
      <Table data={array} columns={column} rowLimit={row} />
    </>
  )
}

export default App
