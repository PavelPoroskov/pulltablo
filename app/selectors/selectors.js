//import {pickBy} from 'lodash.pickBy'
//import {sortBy} from 'lodash.sortBy'

//import {sortBy, pickBy} from 'lodash' //+

//import pickBy from 'lodash.pickBy'
//import sortBy from 'lodash.sortBy'
import sortBy from 'lodash.sortby'
//import groupBy from 'lodash.groupBy'
//import _map from 'lodash.map'

import { createSelector } from 'reselect'
import { createObjectSelector } from 'reselect-map'


export const selColumnsFilter = (state) => state.strColumnsFilter
const selColumnHead0 = (state) => state.stepsById;

// {'stepid': '01.1','name':'Приемка','classCSS':'HeadCell_01_1'}, 
// {'stepid': '02.0','name':'Мойка (ожидание)','classCSS':'HeadCell_02_0'}, 
// {'stepid': '02.1','name':'Мойка','classCSS':'HeadCell_02_1'}, 
// {'stepid': '04.0','name':'Прямая приемка (ожидание)','classCSS':'HeadCell_04_0'}, 
// {'stepid': '04.1','name':'Прямая приемка','classCSS':'HeadCell_04_1'}, 
// {'stepid': '05.0','name':'Выполнение работ (ожидание)','classCSS':'HeadCell_05_0'}, 

let setFilterWashing = { 
	'01.1':true,
	'02.0':true,
	'02.1':true,
	'04.0':true,
	'04.1':true,
	'05.0':true
};

export const selColumnHead = createSelector(
	selColumnsFilter,
	selColumnHead0,
	(filter,steps) => {
		console.log("selColumnHead filter=", filter);
		if (filter=='/washing') {
			return steps.filter( step => step.stepid in setFilterWashing );
		}else if (filter=='/priemka') {
//			return steps.filter( step => step.stepid in setFilterPriemka );
			return steps
		}else if (filter=='/') {
			return steps
		}else{
			return [];
		}
	}
);



export const selCars = (state) => state.autosById;
//const inp_sel_EmptySel = (state) => state.emptyCell;

export const selConnected = (state) => state.isConnected;


const selStepsWithCars0 = (state) => state.stepsWithCars;
const selStepsWithCars = createSelector(
	selColumnsFilter,
	selStepsWithCars0,
	(filter,steps) => {
		console.log("selStepsWithCars filter=", filter);
		if (filter=='/washing') {
			
      let newObj = Object.keys(steps)
        .filter( stepid => stepid in setFilterWashing )
        .reduce( (objSum, stepid) => {
          objSum[stepid] = steps[stepid];
          return objSum;
        }, {} );

			return newObj;
		}else if (filter=='/priemka') {
			return steps
		}else if (filter=='/') {
			return steps
		}else{
			return {}
		}
	}
	);

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
