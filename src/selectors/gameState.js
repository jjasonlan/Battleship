export const selectShips = (state, props) => (
  props.side === 'player' ? state.gameState.board : state.gameState.opponentBoard
)

export const selectAttempts = (state, props) => (
  props.side === 'player' ? state.gameState.opponentAttempts : state.gameState.attempts
)

export const selectShipSizesLeft = (state, props) => (
  props.side === 'player' ? state.gameState.shipSizesLeft : state.gameState.opponentShipSizesLeft
)
