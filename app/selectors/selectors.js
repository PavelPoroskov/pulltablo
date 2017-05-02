//import {pickBy} from 'lodash.pickBy'
//import {sortBy} from 'lodash.sortBy'

//import {sortBy, pickBy} from 'lodash' //+

import pickBy from 'lodash.pickBy'
import sortBy from 'lodash.sortBy'
import groupBy from 'lodash.groupBy'
import _map from 'lodash.map'

import { createSelector } from 'reselect'


// function fnSortBy( sign_name, fnMinor ) {

// 	var name = sign_name;
// 	var signSort = 1;
// 	if (sign_name.charAt(0) == '-') {
//     	name = sign_name.slice( 1 );
//     	signSort = -1;
// 	}

// 	return function( o, p ) {
//     	var a, b;


//     	if ( o && p && typeof o === 'object' && typeof p === 'object') {
//         	a = o[name];
//         	b = p[name];
//         	if (a===b) {
//             	return typeof fnMinor === 'function' ? fnMinor( o, p ) : 0;
//         	}
//         	if (typeof a === typeof b) {
// //                	return a < b ? -1 : 1;
//             	var res = a < b ? -1 : 1;
// //                	if (name == 'edition_Red') {
// //                    	res = -res;
// //                	}
//             	res = res*signSort;
//             	return res;
//         	}
//         	return typeof a < typeof b ? -1 : 1;
//     	} else {
//         	throw {
//             	name: 'Error',
//             	message: 'Expected an object when sorting by ' + name
//         	};
//     	}
// 	};
// }


// const getStepsWithAutos0 = function( stepsById, autosById ) {
// 	let steps_ArrSorted = sortBy( stepsById, ['id'] );
// 	let autosById0 = pickBy( autosById, (auto) => {return !!auto} );
// 	let stepsWithAutos = steps_ArrSorted.map( step => ({
// 		...step,
// 		autos: sortBy( pickBy(autosById0, (auto) => { (auto.stepid==step.id) }) , ['timestamp'] )
// 	}));

// 	return stepsWithAutos;
// }


// const ObjToArr = function(_obj) {
// //	return _obj.values();
// 	return _obj.keys().map( key => _obj[key] );
// }

// const getStepsWithAutos = function( stepsById, autosById ) {

// 	let steps_ArrSorted = ObjToArr(stepsById).sort( fnSort( 'id' ) );

// 	let autosById0 = ObjToArr(autosById).filter( auto => !!auto );

// 	let stepsWithAutos = steps_ArrSorted.map( step => ({
// 		...step,
// 		autos: autosById0.filter( auto => auto.stepid==step.id ).sort( fnSort( 'timestamp' ) )
// 	}));

// 	return {		
// 		stepsWithAutos,
// 		maxRows: Math.max( ...(stepsWithAutos.map( step => step.autos.length )) ) 
// 	};
// }

// const getStepsWithAutos0 = function( stepsById, autosById ) {

// 	let steps_ArrSorted = sortBy( stepsById, ['id'] );
// 	let autosById0 = pickBy( autosById, (auto) => {return !!auto} );

// 	let stepsWithAutos = steps_ArrSorted.map( step => ({
// 		...step,
// 		autos: sortBy( pickBy(autosById0, (auto) => { (auto.stepid==step.id) }) , ['timestamp'] )
// 	}));

// 	return {		
// 		stepsWithAutos,
// 		maxRows: Math.max( ...(stepsWithAutos.map( step => step.autos.length )) ) 
// 	};
// }

// const getStepsWithAutos1 = function( stepsById, autosById ) {

// 	let steps_ArrSorted = sortBy( stepsById, ['id'] );
// 	let autosById_fs = sortBy( pickBy( autosById, auto => !!auto ), ['stepid', 'timestamp'] );
// 	let autosById_gr = groupBy( autosById_fs, auto => auto.stepid );
// //	console.log(steps_ArrSorted );
// //	console.log(autosById_gr );
// //	let autosById_gr_ar = groupBy( autosById_fs, auto => auto.stepid );

// 	let nRows = Math.max( ...( _map( autosById_gr, autos => autos.length ) ) );
// //	console.log('nRows ' + nRows );

// 	let rowsAr = [];
// 	let columns = steps_ArrSorted.map( step => autosById_gr[step.id] );
// 	for (var i=0; i < nRows; i++ ) {
// //		rowsAr.concat( [ steps_ArrSorted.map( step => { autosById_gr[step.id][ i ] }) ] );
// //		rowsAr.push( steps_ArrSorted.map( step => { autosById_gr[step.id][ i ] }) );
// 		rowsAr.push( columns.map(col => col[i]) );
// 	};
// //	console.log(rowsAr);
// //	console.log(rowsAr[0] );
// //	console.log(rowsAr[1] );

// 	return {		
// 		'head': steps_ArrSorted,
// 		'rows': rowsAr
// 	};
// }

const inp_sel_Steps = (state) => state.stepsById;
const inp_sel_Cars = (state) => state.autosById;
const inp_sel_EmptySel = (state) => state.emptyCell;

const getColumns = (stepsById) => sortBy( stepsById, ['id'] );

export const selColumnHead = createSelector(
	[inp_sel_Steps],
	getColumns
	);

const getRows = ( steps_ArrSorted, autosById, emptyCell ) => {

	let autosById_fs = sortBy( pickBy( autosById, auto => !!auto ), ['stepid', 'timestamp'] );
	let autosById_gr = groupBy( autosById_fs, auto => auto.stepid );

	let nRows = Math.max( ...( _map( autosById_gr, autos => autos.length ) ) );

	let rowsAr = [];
	let columns = steps_ArrSorted.map( step => autosById_gr[step.id] );
	for (var i=0; i < nRows; i++ ) {

//		rowsAr.push( columns.map(col => col[i]) );
		rowsAr.push( columns.map( col => col[i] ? col[i] : emptyCell ) );
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

const getAllColumnsForDiv = ( steps_ArrSorted, stepsWithCars, emptyCell ) => {

	let columns = steps_ArrSorted.map( step => getOneColumnsForDiv(stepsWithCars[step.id]) );

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
	}

	return columns;
}
