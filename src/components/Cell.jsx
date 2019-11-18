import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shootLocation } from '../actions/battle'
import { selectShips, selectAttempts } from '../selectors/gameState'
import { selectShipSizesToPlace } from '../selectors/placement'
import { startPlacement, placeShip } from '../actions/placement'
import './Cell.css'

/**
 * Cell component displaying status of grid location (hit, miss, or unknown)
 * 
 * @param gameState - Current phase of the game (placement, battle, complete)
 * @param side - Identifies if cell is on player or opponent board
 * @param turn - Identifies player or opponent turn
 * @param row - Row index of cell
 * @param col - Column index of cell
 * @param ships - Matrix with 1 for ship locations, 0 for empty
 * @param attempts - Matrix with 1 for shots fired, 0 for not fired
 * @param shootLocation - Action to fire at cell location
 * @param startPlacement - Set start coordinates for ship placement
 * @param placementStarted - Identifies if ship is being placed
 * @param startCoordinates - Identifies ship starting point
 * @param placeShip - Action to place a ship between coordinates
 * @param shipSizesLeft - Array of possible ship sizes to place
 */
const Cell = (props) => {
  const {
    gameState,
    side,
    turn,
    row,
    col,
    ships,
    attempts,
    shootLocation,
    placementStarted,
    startPlacement,
    startCoordinates,
    placeShip,
    shipSizesToPlace
  } = props
  const shotFired = attempts[row][col] === 1
  const hasShip = ships[row][col] === 1
  const placing = side === 'player' && startCoordinates &&
    row === startCoordinates[0] && col === startCoordinates[1]
    ? 'placing' : null
  const marker = !shotFired ? null
    : hasShip ? 'hit'
    : 'miss'
  const ship = side === 'player' && hasShip ? 'ship' : null
  
  const handleClick = (e) => {
    e.preventDefault()
    switch (gameState) {
      case 'placement':
        if (side === 'opponent') {
          return
        }
        if (!placementStarted) {
          if (!hasShip) {
            startPlacement([row, col])
          }
        } else {
          placeShip(side, ships, startCoordinates, [row, col], shipSizesToPlace)
        }
        return
      case 'battle':
        if (!marker && side === 'opponent' && turn === 'player') {
          shootLocation(row, col)
        }
        return
      default:
        return
    }
  }
  

  return (
    <td className={`${marker || ship || placing}`} onClick={handleClick}>
      <div className='cell' >
        ({String.fromCharCode(col + 65)}, {row + 1})
      </div>
    </td>
    
  )
}

Cell.propTypes = {
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
  side: PropTypes.oneOf(['player', 'opponent']).isRequired,
  turn: PropTypes.oneOf(['player', 'opponent']).isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  ships: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  shootLocation: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  gameState: state.gameState.gameState,
  turn: state.gameState.turn,
  ships: selectShips(state, props),
  attempts: selectAttempts(state, props),
  placementStarted: state.shipPlacement.placementStarted,
  startCoordinates: state.shipPlacement.startCoordinates,
  shipSizesToPlace: selectShipSizesToPlace(state, props)
})

const mapDispatchToProps = {
  shootLocation,
  startPlacement,
  placeShip,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
