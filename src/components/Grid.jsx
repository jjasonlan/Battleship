import React from 'react'
import Cell from './Cell'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectShipSizesLeft } from '../selectors/gameState'
import { selectShipSizesToPlace } from '../selectors/placement'
import './Grid.css'

/**
 * A Grid component which displays a Battleship game board
 * 
 * @param shipSizesLeft - Array indicating ship sizes not sunk
 * @param shipSizesToPlace - Array indicating ship sizes to place
 * @param side - Identifies player or opponent board
 * @param gameState - Current phase of the game (placement, battle, complete)
 */
const Grid = ({ side, shipSizesLeft, gameState, shipSizesToPlace }) => {
  const rowHeaders = [...Array(10).keys()].map(n => n+1) // 1 through 10
  const columnHeaders = [...Array(10).keys()].map(n => String.fromCharCode(n + 65)) // A through J

  const renderColumnHeaders = () => (
    <tr>
      <th className='header' />
        {
          columnHeaders.map(columnHeader => (
            <th className='header' key={columnHeader}>
              <div className='tableContent'>
                {columnHeader}
              </div>
            </th>
          ))
        }
    </tr>
  )

  const renderRows = () => (
    rowHeaders.map((rowHeader, rowIndex) => (
      <tr key={rowHeader}>
        <td className='header'>{rowHeader}</td>
        {
          columnHeaders.map((columnHeader, columnIndex) => (
            <Cell
              key={`${columnHeader}${rowHeader}`}
              className='tableContent'
              row={rowIndex}
              col={columnIndex}
              side={side}
            /> 
          ))
        }
      </tr>
    ))
  )
  const boardName = `${side.charAt(0).toUpperCase() + side.slice(1)}'s board`
  const shipCounter = gameState === 'placement'
    ? `Ship sizes left to place: [${shipSizesToPlace}]`
    : gameState === 'battle'
      ? `Ship sizes left to sink: [${shipSizesLeft}]`
      : null

  return (
    <React.Fragment key={side}>
      <h2>{boardName}</h2>
      <p>{shipCounter}</p>
      <table className='container'>
        <thead>
          {renderColumnHeaders()}
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  shipSizesLeft: selectShipSizesLeft(state, props),
  gameState: state.gameState.gameState,
  shipSizesToPlace: selectShipSizesToPlace(state, props)
})

Grid.propTypes = {
  side: PropTypes.oneOf(['player', 'opponent']).isRequired,
  shipSizesLeft: PropTypes.arrayOf(PropTypes.number).isRequired,
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
}

export default connect(mapStateToProps)(Grid);
