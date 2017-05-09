 import { combineReducers } from 'redux'

import stepsById from './stepsById'
import autosById from './autosById'
import emptyCell from './emptyCell'
import isConnected from './isConnected'

const rootReducer = combineReducers({
  stepsById,
  autosById,
  emptyCell,
  isConnected
})


export default rootReducer
