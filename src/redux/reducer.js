import { SHOOT_LOCATION } from './actions'

// initialize a 10x10 board with all 0s
const createBoard = () => ([...Array(10).keys()].map(() => Array(10).fill(0)))

const initialState = {
  gameState: 'setup',
  shipSizesToPlace: [5, 4, 3, 3, 2],
  // board: createBoard(),
  board: [ [ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ],
  // opponentBoard: createBoard(),
  opponentBoard: [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ] ],
  attempts: createBoard(),
  opponentAttempts: createBoard(),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOOT_LOCATION:
      const isPlayerAttempt = action.targetSide === 'opponent'
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
      return isPlayerAttempt ? {
        ...state,
        attempts
      } : {
        ...state,
        opponentAttempts: attempts,
      }
    default:
      return state
  }
}

export default reducer;
