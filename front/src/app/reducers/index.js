 import { combineReducers } from 'redux'

import strColumnsFilter from './strColumnsFilter'
import stepsById from './stepsById'
import autosById from './autosById'
import stepsWithCars from './stepsWithCars'
import isConnected from './isConnected'

//const rootReducer = combineReducers({
const rootReducer = {
    strColumnsFilter,
  stepsById,
  autosById,
//  emptyCell,
  stepsWithCars,
  isConnected,
}


export default rootReducer
