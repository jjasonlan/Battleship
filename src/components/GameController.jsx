import React from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { shootLocation } from '../actions/battle'
import { placeShip, beginBattlePhase } from '../actions/placement'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Component holding AI and game logic
 * 
 * @param turn - Player or computer turn to move
 * @param gameState - Current phase of the game (placement, battle, complete)
 * @param board - Player's board
 * @param opponentBoard - Opponent's board
 * @param attempts - Player's attempts
 * @param opponentAttempts - Opponent's attempts
 * @param shootLocation - Fire at cell location
 * @param shipSizesToPlace - Player's ships to place
 * @param opponentShipSizesToPlace - Opponent's ships to place
 * @param placeShip - Set ship coordinates
 * @param shipLocations - Array of start and end coordinates of player ships
 * @param opponentShipLocations - Array of start and end coordinates of opponent ships
 * @param beginBattlePhase - Set gameState to battle phase
 * @param children - The rendered app
 */
const GameController = (props) => {
  const {
    turn,
    gameState,
    opponentAttempts,
    opponentBoard,
    shootLocation,
    shipSizesToPlace,
    opponentShipSizesToPlace,
    placeShip,
    beginBattlePhase,
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
    // pause half a second for thinking...
    await sleep(500)
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
      simpleAI()
  }

  return children
}


const mapStateToProps = (state, props) => ({
  turn: state.gameState.turn,
  board: state.gameState.board,
  opponentBoard: state.gameState.opponentBoard,
  attempts: state.gameState.attempts,
  opponentAttempts: state.gameState.opponentAttempts,
  gameState: state.gameState.gameState,
  shipSizesToPlace: state.shipPlacement.shipSizesToPlace,
  opponentShipSizesToPlace: state.shipPlacement.opponentShipSizesToPlace,
  shipLocations: state.gameState.shipLocations,
  opponentShipLocations: state.gameState.opponentShipLocations,
})

const mapDispatchToProps = {
  shootLocation,
  placeShip,
  beginBattlePhase,
}

GameController.propTypes = {
  turn: PropTypes.oneOf(['player', 'opponent']).isRequired,
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  opponentBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  opponentAttempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  shipSizesToPlace: PropTypes.arrayOf(PropTypes.number).isRequired,
  opponentShipSizesToPlace: PropTypes.arrayOf(PropTypes.number).isRequired,
  shipLocations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
  opponentShipLocations: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
  shootLocation: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController);