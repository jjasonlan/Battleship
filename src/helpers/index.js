export const attemptShipPlacement = (board, startCoordinates, endCoordinates, shipSizes) => {
  let validPlacement = true
  const bigY = startCoordinates[0] > endCoordinates[0] ? startCoordinates[0] : endCoordinates[0] 
  const smallY = startCoordinates[0] < endCoordinates[0] ? startCoordinates[0] : endCoordinates[0] 
  const bigX = startCoordinates[1] > endCoordinates[1] ? startCoordinates[1] : endCoordinates[1] 
  const smallX = startCoordinates[1] < endCoordinates[1] ? startCoordinates[1] : endCoordinates[1] 
  const width = bigX - smallX + 1
  const length = bigY - smallY + 1
  let shipSize
  // validate shape of ship
  if (width === 1 && shipSizes.includes(length)) {
    shipSize = length
  } else if (length === 1 && shipSizes.includes(width)) {
    shipSize = width
  } else {
    return { newBoard: board, shipSize: 0 }
  }
  // write new ship into board or mark as invalid
  const newBoard = board.map((row, rowIndex) => {
    if (rowIndex < smallY ||
      rowIndex > bigY) {
        return row
      } else {
        return row.map((cell, colIndex) => {
          if (colIndex < smallX ||
            colIndex > bigX) {
              return cell
            } else {
              if (cell === 1) {
                validPlacement = false
                return 1
              } else {
                return 1
              }
            }
        })
      }
  })
  if (!validPlacement) {
    return { newBoard: board, shipSize: 0 }
  }
  return { newBoard, shipSize: shipSize }
}

export const checkForSinking = (attempts, shipLocations) => {
  let shipSize = 0
  let shipIndex = 0
  shipLocations.forEach((ship, index) => {
    const startCoordinates = ship[0]
    const endCoordinates = ship[1]
    const bigY = startCoordinates[0] > endCoordinates[0] ? startCoordinates[0] : endCoordinates[0] 
    const smallY = startCoordinates[0] < endCoordinates[0] ? startCoordinates[0] : endCoordinates[0] 
    const bigX = startCoordinates[1] > endCoordinates[1] ? startCoordinates[1] : endCoordinates[1] 
    const smallX = startCoordinates[1] < endCoordinates[1] ? startCoordinates[1] : endCoordinates[1] 
    const width = bigX - smallX + 1
    const length = bigY - smallY + 1
    const size = width > length ? width : length
    for (let row = smallY; row <= bigY; row++) {
      for (let col = smallX; col <= bigX; col++) {
        if (attempts[row][col] === 0) {
          return
        }
        if (col === bigX && row === bigY && attempts[row][col] === 1) {
          shipSize = size
          shipIndex = index
        }
      }
    }
  })
  return { shipSize, shipIndex }
}