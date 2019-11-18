import { combineReducers } from 'redux'
import gameState from './gameState'
import shipPlacement from './placement'

export default combineReducers({
  gameState,
  shipPlacement
})