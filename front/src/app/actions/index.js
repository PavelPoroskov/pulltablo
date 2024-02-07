import * as types from '../constants/ActionTypes'

export const Call_SrvConnect = ( server ) => ({ 
	type: types.UPDATE_AUTO, 
	server
})

export const updateAuto = ( autos ) => ({ 
	type: types.UPDATE_AUTO, 
	autos
})

export const updateAll = ( steps, autos ) => ({ 
	type: types.UPDATE_ALL, 
	steps, 
	autos
})

export const setColumnsFilter = (filter) => {
  return {
    type: 'set_filter',
    filter
  }
}