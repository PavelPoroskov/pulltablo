 import { combineReducers } from 'redux'

import stepsById from './stepsById'
import autosById from './autosById'
import emptyCell from './emptyCell'
import stepIdsWithCarIds from './stepsWithCars'
import isConnected from './isConnected'

const rootReducer = combineReducers({
  stepsById,
  autosById,
  emptyCell,
  stepIdsWithCarIds,
  isConnected
})


export default rootReducer
