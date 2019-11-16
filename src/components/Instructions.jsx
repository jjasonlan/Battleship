import React from 'react'
import { connect } from 'react-redux'

const Instructions = (props) => {
  return (
    <h2>
      These are the Instructions
    </h2>
  )
}

const shipsPlaced = (props) => {
  const { board, opponentBoard } = props;

}

/**
 * If the game state has not changed, instructions should remain the same
 */
const areEqual = (prevProps, nextProps) => {
  // if (shipsPlaced())
  return true
}

const mapStateToProps = (state) => ({
  board: state.board,
  opponentBoard: state.opponentBoard,
})

export default connect(mapStateToProps)(
  React.memo(Instructions, areEqual)
)
