import { SHOOT_LOCATION } from '../actions/battle'
import { checkForSinking } from '../helpers'
import { PLACE_SHIP, BEGIN_BATTLE_PHASE } from '../actions/placement'

// initialize a 10x10 board with all 0s
const createBoard = () => ([...Array(10).keys()].map(() => Array(10).fill(0)))

const initialState = {
  gameState: 'placement',
  shipSizesLeft: [5, 4, 3, 3, 2],
  opponentShipSizesLeft: [5, 4, 3, 3, 2],
  turn: 'player',
  shipLocations: [],
  opponentShipLocations: [],
  winner: null,
  board: createBoard(),
  opponentBoard: createBoard(),
  attempts: createBoard(),
  opponentAttempts: createBoard(),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_SHIP:
      return Object.assign({},
        state,
        action.side === 'player' ? {
          board: action.newBoard,
          shipLocations: [
            ...state.shipLocations.slice(),
            [action.startCoordinates, action.endCoordinates]
          ]
        } : {
          opponentBoard: action.newBoard,
          opponentShipLocations: [
            ...state.opponentShipLocations.slice(),
            [action.startCoordinates, action.endCoordinates]
          ]
        },
      )
    case BEGIN_BATTLE_PHASE:
      return {
        ...state,
        gameState: 'battle',
      }
    case SHOOT_LOCATION:
      const isPlayerAttempt = state.turn === 'player'
      const playerAttempts = isPlayerAttempt ? state.attempts : state.opponentAttempts
      // immutably update matrix, see docs: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#updating-an-item-in-an-array
      const attempts = playerAttempts.map((row, rowIndex) => {
        if (rowIndex !== action.rowIndex) {
          return row
        }
        let newRow = row.slice()
        newRow.splice(action.colIndex, 1, 1);
        return newRow
      })
      let shipLocations = isPlayerAttempt ? state.opponentShipLocations : state.shipLocations
      let shipSizesLeft = isPlayerAttempt ? state.opponentShipSizesLeft : state.shipSizesLeft
      const { shipLength, shipIndex } = checkForSinking(attempts, shipLocations)
      let newShipLocations, newShipSizesLeft
      if (shipLength > 0) {
        newShipLocations = shipLocations.filter((item, index) => index !== shipIndex)
        const sizeIndex = shipSizesLeft.findIndex((item) => item === shipLength)
        newShipSizesLeft = shipSizesLeft.splice(sizeIndex, 1)
      } else {
        newShipLocations = shipLocations
        newShipSizesLeft = shipSizesLeft
      }
      // console.log(Object.assign({}, state,
      //   isPlayerAttempt ? {
      //     turn: 'opponent',
      //     attempts: attempts,
      //     opponentShipLocations: newShipLocations,
      //     opponentShipSizesLeft: newShipSizesLeft,
      //   } : {
      //     turn: 'player',
      //     opponentAttempts: attempts,
      //     shipLocations: newShipLocations,
      //     shipSizesLeft: newShipSizesLeft,
      //   }
      // ))
      console.log(isPlayerAttempt)
      console.log(attempts)

      return Object.assign({},
        state, 
        isPlayerAttempt ? {
          turn: 'opponent',
          attempts: attempts,
          opponentShipLocations: newShipLocations,
          opponentShipSizesLeft: newShipSizesLeft,
        } : {
          turn: 'player',
          opponentAttempts: attempts,
          shipLocations: newShipLocations,
          shipSizesLeft: newShipSizesLeft,
        }
      )
    default:
      return state
  }
}

export default reducer;
