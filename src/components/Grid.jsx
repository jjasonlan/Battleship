import React from 'react'
import Cell from './Cell'
import PropTypes from 'prop-types'
import './Grid.css'

/**
 * A Grid component which displays a Battleship game board
 * 
 * @param side - Identifies player or opponent board
 * @param ships - Matrix with 1 for ship locations, 0 for empty
 * @param attempts - Matrix with 1 for shots fired, 0 for not fired
 */
const Grid = (props) => {
  const rowHeaders = [...Array(10).keys()].map(n => n+1) // 1 through 10
  const columnHeaders = [...Array(10).keys()].map(n => String.fromCharCode(n + 65)) // A through J

  const renderColumnHeaders = () => (
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
  )

  const renderRows = () => (
    rowHeaders.map((rowHeader, rowIndex) => (
      <tr key={rowHeader}>
        <td className='header'>{rowHeader}</td>
        {
          columnHeaders.map((columnHeader, columnIndex) => (
            <Cell
              key={`${columnHeader}${rowHeader}`}
              className='tableContent'
              row={rowIndex}
              col={columnIndex}
              {...props}
            /> 
          ))
        }
      </tr>
    ))
  )
  return (
    <table className='container'>
      <thead>
        {renderColumnHeaders()}
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}

Grid.propTypes = {
  side: PropTypes.oneOf(['player', 'opponent']),
  ships: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
}

export default Grid;
