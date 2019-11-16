import React from 'react'
import './Grid.css';

/**
 * A Grid component which displays a Battleship game board
 */
const Grid = () => {
  const rowHeaders = [...Array(10).keys()] // 1 through 10
  const columnHeaders = [...Array(10).keys()].map(n => String.fromCharCode(n + 65)) // Upper case letters

  return (
    <table className='container'>
      <thead>
        <tr>
          <th className='header'></th>
          {
            columnHeaders.map(columnHeader => <th className='header'>{columnHeader}</th>)
          }
        </tr>
      </thead>
     <tbody>
      {
          rowHeaders.map((rowHeader, rowIndex) => (
            <tr>
              <td className='header'>{rowHeader}</td>
              {
                columnHeaders.map((columnHeader, columnIndex) => <td>{rowIndex}, {columnIndex}</td>)
              }
            </tr>
          ))
        }
     </tbody>
    </table>
  )
}

export default Grid;
