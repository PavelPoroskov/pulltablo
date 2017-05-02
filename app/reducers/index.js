 import { combineReducers } from 'redux'

import stepsById from './stepsById'
import autosById from './autosById'
import emptyCell from './emptyCell'

const rootReducer = combineReducers({
  stepsById,
  autosById,
  emptyCell
})


export default rootReducer
