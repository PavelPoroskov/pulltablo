import React from 'react';
import pure from 'recompose/pure';

import MyCell from './mycell'

const MyColumn = ({step,column,time_actual,cars}) => {

    console.log(`Rendering MyColumn ${step.stepid}`);

  	let cells = column.map( (car,index) => {
  		return (
        <MyCell car={cars[car.carid]} key={car.carid} time_actual={time_actual}/>
//        <MyCell auto={auto}/>
  		)
  	});

    return (
    	<td>
    	{cells}
      </td>
    )
};

export default pure(MyColumn)