export const SHOOT_LOCATION = 'SHOOT_LOCATION'

export const shootLocation = (rowIndex, colIndex) => ({
  type: SHOOT_LOCATION,
  rowIndex,
  colIndex
})

