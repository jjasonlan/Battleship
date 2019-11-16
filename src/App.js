import React from 'react'
import Grid from './components/Grid'
import Instructions from './components/Instructions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './App.css'

/**
 * Page component holding game state
 */
const App = ({ board, opponentBoard, attempts, opponentAttempts }) => {
  return (
    <div className='container'>
      <div className='titleSection'>
        <h1>Battleship</h1>
        <p>by Jason Lan</p>
      </div>
      <Instructions />
      <div className='gameContainer'>
        <div className='screen'>
          <h2>Opponent's Board</h2>
          <Grid side='opponent' ships={opponentBoard} attempts={attempts}/>
        </div>
        <div className='screen'>
          <h2>Your Board</h2>
          <Grid side='player' ships={board} attempts={opponentAttempts}/>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  board: state.board,
  opponentBoard: state.opponentBoard,
  attempts: state.attempts,
  opponentAttempts: state.opponentAttempts,
})

App.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  opponentBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  attempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  opponentAttempts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
}

export default connect(mapStateToProps)(App);
