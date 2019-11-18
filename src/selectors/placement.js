export const selectShipSizesToPlace = (state, props) => (
  props.side === 'player' ? state.shipPlacement.shipSizesToPlace
    : state.shipPlacement.opponentShipSizesToPlace
)