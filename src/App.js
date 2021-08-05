/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
import React, { useState } from 'react'
import { Table } from './lib'

const LinkTest = () => <a href="#">Marina</a>

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
  {
    id: 9,
    name: 'Leonart',
    value: 3.35,
  },
  {
    id: 10,
    name: 'Jessica',
    value: 7.35,
  },
  {
    id: 11,
    name: 'Chloe',
    value: 4.23,
  },
  {
    id: 12,
    name: 'Jess',
    value: 88.89,
  },
  {
    id: 13,
    name: 'Alini',
    value: 3.35,
  },
  {
    id: 14,
    name: 'Liz',
    value: 7.35,
  },
  {
    id: 15,
    name: 'Marina',
    value: 4.23,
  },
  {
    id: 16,
    name: 'Teste',
    value: 88.89,
  },
  {
    id: 17,
    name: 'Leonart',
    value: 3.35,
  },
  {
    id: 18,
    name: 'Jessica',
    value: 7.35,
  },
  {
    id: 19,
    name: 'Chloe',
    value: 4.23,
  },
  {
    id: 20,
    name: 'Jess',
    value: 88.89,
  },
  {
    id: 21,
    name: 'Alini',
    value: 3.35,
  },
  {
    id: 22,
    name: 'Liz',
    value: 7.35,
  },
  {
    id: 23,
    name: <LinkTest />,
    value: 4.23,
  },
  {
    id: 24,
    name: 'Teste',
    value: 88.89,
  },
]

const column = [
  {
    dataField: 'id',
    text: 'ID',
    footer: '$',
    width: 300,
  },
  {
    dataField: 'name',
    text: 'NAME',
    footer: 'NAME',
    width: 200,
    formatter: (val, { value }) => console.log(val, '----->', value),
    footerFormatter: (val) => console.log(val),
  },
  {
    dataField: 'value',
    text: 'VALUE',
    footer: 'VALUE',
    sort: false,
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
        <option value="16">16</option>
        <option value="32">32</option>
      </select>
      <Table data={array} columns={column} rowLimit={row} />
    </>
  )
}

export default App
