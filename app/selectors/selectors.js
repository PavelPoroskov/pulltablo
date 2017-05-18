//import {pickBy} from 'lodash.pickBy'
//import {sortBy} from 'lodash.sortBy'

//import {sortBy, pickBy} from 'lodash' //+

//import pickBy from 'lodash.pickBy'
import sortBy from 'lodash.sortBy'
//import groupBy from 'lodash.groupBy'
//import _map from 'lodash.map'

//import { createSelector } from 'reselect'
import { createObjectSelector } from 'reselect-map'



export const selColumnHead = (state) => state.stepsById;

export const selCars = (state) => state.autosById;
//const inp_sel_EmptySel = (state) => state.emptyCell;

export const selConnected = (state) => state.isConnected;


const selStepsWithCars = (state) => state.stepsWithCars;
//const selF = (state) => 1;

export const selColumns = createObjectSelector(
  selStepsWithCars,
//  state => state.multiplier,
//  (number, multiplier, key) => { 
  (objCars, stepid) => { 
//  	console.log(stepid);

//   selStepsWithCars,
//   selF,
//   (objCars, selF, stepid) => { 
//   	console.log(stepid);
// //  	let Object.keys(objCarIds).map( carid => )
  	return sortBy( objCars, ['sort'] );
  }
)

// const selMaxColumnHeight = createSelector(
// 	selColumns,
// 	Columns => Math.max( ...(Object.keys(Columns).map( stepid => Columns[stepid].length )) )
// 	);

// export const selColumnsEqHight = createObjectSelector(
//   selColumns,
//   selMaxColumnHeight,
// //  (number, multiplier, key) => { 
//   (arrCarIds, maxHeight, stepid) => { 
//   	if (arrCarIds.length == maxHeight) {
//   		return arrCarIds;
//   	}else{
//   		let arr = [...arrCarIds];
//   		for (let i=arrCarIds.length; i < maxHeight; i++) {
//   		  arr.push("");
//   		};
//   		return arr;
//   	}
//   }
// );
