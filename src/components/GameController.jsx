import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { shootLocation, announceVictory } from '../actions/battle'
import { placeShip, beginBattlePhase } from '../actions/placement'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Component holding AI and game logic
 * 
 * @param turn - Player or computer turn to move
 * @param gameState - Current phase of the game (placement, battle, complete)
 * @param opponentBoard - Opponent's board
 * @param opponentAttempts - Opponent's attempts
 * @param shootLocation - Fire at cell location
 * @param shipSizesToPlace - Player's ships to place
 * @param opponentShipSizesToPlace - Opponent's ships to place
 * @param placeShip - Set ship coordinates
 * @param shipLocations - Array of start and end coordinates of player ships
 * @param opponentShipLocations - Array of start and end coordinates of opponent ships
 * @param shipSizesLeft - Array of unsunk player ship sizes
 * @param opponentShipSizesLeft - Array of unsunk opponent ship sizes
 * @param beginBattlePhase - Set gameState to battle phase
 * @param announceVictory - Set gameState to complete
 * @param children - The rendered app
 */
const GameController = (props) => {
  const {
    turn,
    gameState,
    opponentAttempts,
    shipSizesLeft,
    opponentShipSizesLeft,
    opponentBoard,
    shootLocation,
    shipSizesToPlace,
    opponentShipSizesToPlace,
    placeShip,
    beginBattlePhase,
    announceVictory,
    children
  } = props
  
  const findAvailableShipLocation = (board, size) => {
    let start
    let end
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const row = board[rowIndex]
      if (row[0] === 1) {
        continue
      }
      for (let colIndex = 0; colIndex < size; colIndex++) {
        if (row[colIndex] === 1) {
          break
        }
        if (colIndex === size - 1) {
          start = [rowIndex, 0]
          end = [rowIndex, colIndex]
          return { start, end }
        }
      }
    }
    throw new Error('AI could not place ship')
  }

  const simplePlaceShip = async () => {
    // pause a second for thinking...
    await sleep(1000)
    const size = opponentShipSizesToPlace[0]
    if (size !== undefined) {
      const { start, end } = findAvailableShipLocation(opponentBoard, size)
      placeShip('opponent', opponentBoard, start, end, opponentShipSizesToPlace)
    }
  }

  const checkPlacement = () => {
    if (shipSizesToPlace.length === 0 && opponentShipSizesToPlace.length === 0) {
      beginBattlePhase()
    }
  }

  const checkForVictory = () => {
    if (shipSizesLeft.length === 0) {
      announceVictory('opponent')
      return true
    } else if (opponentShipSizesLeft.length === 0) {
      announceVictory('player')
      return true
    }
    return false
  }

  // Make a move for AI during opponent's turn
  const simpleAI = async () => {
    if (turn === 'opponent') {
      // fire for opponent (first unattempted location)
      let rowIndex, colIndex;
      for (rowIndex = 0; rowIndex < opponentAttempts.length; rowIndex++) {
        let row = opponentAttempts[rowIndex]
        for (colIndex = 0; colIndex < row.length; colIndex++) {
          if (row[colIndex] === 0) {
            // pause half a second for thinking...
            await sleep(500)
            shootLocation(rowIndex, colIndex)
            return
          }
        }
      }
    }
  }

  // eslint-disable-next-line default-case
  switch (gameState) {
    case 'placement':
      simplePlaceShip()
      checkPlacement()
      break
    case 'battle':
      if (!checkForVictory()) {
        simpleAI()
      }
  }

  return children
}


const mapStateToProps = (state) => ({
  turn: state.gameState.turn,
  opponentBoard: state.gameState.opponentBoard,
  opponentAttempts: state.gameState.opponentAttempts,
  gameState: state.gameState.gameState,
  shipSizesToPlace: state.shipPlacement.shipSizesToPlace,
  opponentShipSizesToPlace: state.shipPlacement.opponentShipSizesToPlace,
  shipLocations: state.gameState.shipLocations,
  opponentShipLocations: state.gameState.opponentShipLocations,
  shipSizesLeft: state.gameState.shipSizesLeft,
  opponentShipSizesLeft: state.gameState.opponentShipSizesLeft,
})

const mapDispatchToProps = {
  shootLocation,
  placeShip,
  beginBattlePhase,
  announceVictory,
}

GameController.propTypes = {
  turn: PropTypes.oneOf(['player', 'opponent']).isRequired,
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
  opponentBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  opponentAttempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  shipSizesToPlace: PropTypes.arrayOf(PropTypes.number).isRequired,
  opponentShipSizesToPlace: PropTypes.arrayOf(PropTypes.number).isRequired,
  shipLocations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
  opponentShipLocations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
  shipSizesLeft: PropTypes.arrayOf(PropTypes.number).isRequired,
  opponentShipSizesLeft: PropTypes.arrayOf(PropTypes.number).isRequired,
  shootLocation: PropTypes.func.isRequired,
  announceVictory: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController);