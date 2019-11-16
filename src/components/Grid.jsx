import React from 'react'
import Cell from './Cell'
import './Grid.css'

/**
 * A Grid component which displays a Battleship game board
 * 
 * @param ships - Matrix with 1 for ship locations, 0 for empty
 * @param attempts - Matrix with 1 for shots fired, 0 for not fired
 */
const Grid = (props) => {
  const rowHeaders = [...Array(10).keys()] // 1 through 10
  const columnHeaders = [...Array(10).keys()].map(n => String.fromCharCode(n + 65)) // Upper case letters

  return (
    <table className='container'>
      <thead>
        <tr>
          <th className='header' />
          {
            columnHeaders.map(columnHeader => (
              <th className='header' key={columnHeader}>
                <div className='tableContent'>
                  {columnHeader}
                </div>
              </th>
            ))
          }
        </tr>
      </thead>
     <tbody>
      {
        rowHeaders.map((rowHeader, rowIndex) => (
          <tr key={rowHeader}>
            <td className='header'>{rowHeader}</td>
            {
              columnHeaders.map((columnHeader, columnIndex) => (
                <td key={`${columnHeader}${rowHeader}`}>
                  <Cell
                    className='tableContent'
                    row={rowIndex}
                    col={columnIndex}
                    {...props}
                  /> 
                </td>
              ))
            }
          </tr>
        ))
      }
     </tbody>
    </table>
  )
}

export default Grid;
