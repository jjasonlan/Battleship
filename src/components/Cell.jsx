import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shootLocation } from '../redux/actions'
import './Cell.css'

/**
 * Cell component displaying status of grid location (hit, miss, or unknown)
 * 
 * @param side - Identifies if cell is on player or opponent board
 * @param row - Row index of cell
 * @param col - Column index of cell
 * @param ships - Matrix with 1 for ship locations, 0 for empty
 * @param attempts - Matrix with 1 for shots fired, 0 for not fired
 * @param shootLocation - Fire at cell location
 */
const Cell = ({ side, row, col, ships, attempts, shootLocation }) => {
  const shotFired = attempts[row][col]
  const marker = !shotFired ? null
    : ships[row][col] ? 'hit'
    : 'miss'

  const handleClick = (e) => {
    e.preventDefault()
    if (!marker && side === 'opponent') {
      alert('shoot' + row + ',' + col)
      shootLocation(side, row, col)
    }
  }

  return (
    <td className={marker} onClick={handleClick}>
      <div className='cell' >
        ({String.fromCharCode(col + 65)}, {row + 1})
      </div>
    </td>
    
  )
}

Cell.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  ships: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
}

const mapDispatchToProps = (dispatch) => ({
  shootLocation: (side, row, col) => dispatch(shootLocation(side, row, col))
})

export default connect(null, mapDispatchToProps)(Cell);
