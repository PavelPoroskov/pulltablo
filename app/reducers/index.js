 import { combineReducers } from 'redux'

import stepsById from './stepsById'
import autosById from './autosById'
import emptyCell from './emptyCell'
import stepsWithCars from './stepsWithCars'
import isConnected from './isConnected'

const rootReducer = combineReducers({
	strColumnsFilter,
  stepsById,
  autosById,
//  emptyCell,
  stepsWithCars,
  isConnected,
})


export default rootReducer
