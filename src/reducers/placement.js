import { START_PLACEMENT, PLACE_SHIP } from '../actions/placement'

const initialState = {
  shipSizesToPlace: [5, 4, 3, 3, 2],
  opponentShipSizesToPlace: [5, 4, 3, 3, 2],
  placementStarted: false,
  startCoordinates: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PLACEMENT:
      return {
        ...state,
        placementStarted: true,
        startCoordinates: action.coordinates
      }
    case PLACE_SHIP:
      const isPlayer = action.side === 'player'
      const ships = isPlayer ? state.shipSizesToPlace : state.opponentShipSizesToPlace
      const index = ships.findIndex((item) => item === action.shipSize);
      const shipsLeft = ships.slice()
      if (index !== -1) {
        shipsLeft.splice(index, 1)
      }
      return Object.assign({},
        state,
        isPlayer ? {
          placementStarted: false,
          startCoordinates: null,
          shipSizesToPlace: shipsLeft
        } : {
          opponentShipSizesToPlace: shipsLeft
        }
      )
    default:
      return state
  }
}

export default reducer
