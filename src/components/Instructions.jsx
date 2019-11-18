import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * Instructions explaining how to play the game
 * 
 * @param gameState - State of the game (placement, battle, complete)
 * @param winner - Who won? 
 */
const Instructions = ({ gameState, winner }) => {
  let mainInstruction, description;
  switch (gameState) {
    case 'placement':
      mainInstruction = 'Place Your Ships!'
      // eslint-disable-next-line no-multi-str
      description = 'Click a cell to start placing a ship. Your ship must be placed vertically \
        or horizontally. The battle will begin when both players have placed all their ships!'
      break
    case 'battle':
      mainInstruction = 'Defend The Bay!'
      // eslint-disable-next-line no-multi-str
      description = 'Click on the opponent\'s cells to fire your attack. Cells where ships were hit will \
        be marked red. Cells where attacks missed will be marked white.'
      break
    default:
      if (winner === 'player') {
        mainInstruction = 'You Win!'
      } else {
        mainInstruction = 'You Lose!'
      }
  }

  return (
    <React.Fragment>
      <h2>{mainInstruction}</h2>
      <p>{description}</p>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  gameState: state.gameState.gameState,
  winner: state.gameState.winner,
})

Instructions.propTypes = {
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
  winner: PropTypes.oneOf(['player', 'opponent']),
}

export default connect(mapStateToProps)(
  React.memo(Instructions)
)
