import React from 'react'
import Grid from './Grid'
import Instructions from './Instructions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './App.css'

/**
 * Page component holding game display
 * @param turn - Player or computer turn to move
 * @param gameState - Current phase of the game (placement, battle, complete)
 */
const App = ({ turn, gameState }) => {
  const battlePhase = gameState === 'battle'
  const turnIndicator = turn === 'player'
  return (
    <div className='container'>
      <div className='titleSection'>
        <h1>Battleship</h1>
        <p>by Jason Lan</p>
      </div>
      <Instructions />
      <div className='gameContainer'>
        <div className={`screen ${battlePhase ? turnIndicator ? 'active' : 'inActive': null}`}>
          <Grid side='opponent'/>
        </div>
        <div className={`screen ${battlePhase ? turnIndicator ? 'inActive' : 'active': null}`}>
          <Grid side='player'/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  turn: state.gameState.turn,
  gameState: state.gameState.gameState,
})

App.propTypes = {
  turn: PropTypes.oneOf(['player', 'opponent']).isRequired,
  gameState: PropTypes.oneOf(['placement', 'battle', 'complete']).isRequired,
}

export default connect(mapStateToProps)(App)
export { App }
