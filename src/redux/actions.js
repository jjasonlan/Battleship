export const SHOOT_LOCATION = 'SHOOT_LOCATION'

export const shootLocation = (targetSide, row, col) => ({
  type: SHOOT_LOCATION,
  targetSide,
  rowIndex: row,
  colIndex: col
})

