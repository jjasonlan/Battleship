export const SHOOT_LOCATION = 'SHOOT_LOCATION'
export const ANNOUNCE_VICTORY = 'ANNOUNCE_VICTORY'

export const shootLocation = (rowIndex, colIndex) => ({
  type: SHOOT_LOCATION,
  rowIndex,
  colIndex
})

export const announceVictory = (winner) => ({
  type: ANNOUNCE_VICTORY,
  winner
})
