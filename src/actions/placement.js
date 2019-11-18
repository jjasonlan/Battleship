import { attemptShipPlacement } from '../helpers'

export const START_PLACEMENT = 'START_PLACEMENT'
export const PLACE_SHIP = 'PLACE_SHIP'
export const BEGIN_BATTLE_PHASE = 'BEGIN_BATTLE_PHASE'

export const startPlacement = (coordinates) => (
  {
    type: START_PLACEMENT,
    coordinates,
  }
)

export const placeShip = (side, board, startCoordinates, endCoordinates, shipSizes) => {
  const { newBoard, shipSize } = attemptShipPlacement(board, startCoordinates, endCoordinates, shipSizes)

  return ({
    type: PLACE_SHIP,
    newBoard,
    side,
    shipSize,
    startCoordinates,
    endCoordinates,
  })
}

export const beginBattlePhase = () => ({ type: BEGIN_BATTLE_PHASE })
