//import {pickBy} from 'lodash.pickBy'
//import {sortBy} from 'lodash.sortBy'

//import {sortBy, pickBy} from 'lodash' //+

import pickBy from 'lodash.pickBy'
import sortBy from 'lodash.sortBy'
import groupBy from 'lodash.groupBy'
import _map from 'lodash.map'

import { createSelector } from 'reselect'



const inp_sel_Steps = (state) => state.stepsById;
const inp_sel_Cars = (state) => state.autosById;
const inp_sel_EmptySel = (state) => state.emptyCell;

const getColumns = (stepsById) => sortBy( stepsById, ['id'] );

// export const selColumnHead = createSelector(
// 	[inp_sel_Steps],
// 	getColumns
// 	);
export const selColumnHead = (state) => state.stepsById;

export const selConnected = (state) => state.isConnected;

const getRows = ( steps_ArrSorted, autosById, emptyCell ) => {

	let autosById_fs = sortBy( pickBy( autosById, auto => !!auto ), ['stepid', 'timestamp'] );
	let autosById_gr = groupBy( autosById_fs, auto => auto.stepid );

	let nRows = Math.max( ...( _map( autosById_gr, autos => autos.length ) ) );

	let rowsAr = [];
	let columns = steps_ArrSorted.map( step => autosById_gr[step.stepid] );
	for (var i=0; i < nRows; i++ ) {

//		rowsAr.push( columns.map(col => col[i]) );
//		rowsAr.push( columns.map( col => col[i] ? col[i] : emptyCell ) );
		rowsAr.push( columns.map( col => col && col[i] ? col[i] : emptyCell ) );
	};
	return rowsAr;
}

export const selRows = createSelector(
	[selColumnHead, inp_sel_Cars, inp_sel_EmptySel],
	getRows
	);

const getOneColumnsForDiv = ( autosById ) => {

	let autosById_fs = sortBy( autosById, ['timestamp'] );
}

const getColumns = ( steps_ArrSorted, stepsWithCars, emptyCell ) => {

	let columns = steps_ArrSorted.map( step => stepsWithCars[step.id] );

//	let maxLength = Math.max( ...( _map( autosById_gr, autos => autos.length ) ) );
	let arLen = columns.map( col => col.length );
	let maxLength = Math.max( ...arLen );
	let minLength = Math.min( ...arLen );

	if (minLength < maxLength) {
		columns = columns.map( col => {
			if (col.length==maxLength) {
				return col;
			}else{
				let newCol = [...col];
				for (var lenCol=col.length; lenCol < maxLength; lenCol++ ){
					newCol.push(inp_sel_EmptySel);	
				}
				return newCol;
			}
		})
	};

	

	return columns;
}
