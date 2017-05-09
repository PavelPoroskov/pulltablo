import React from 'react';
import pure from 'recompose/pure';

import MyCell from './mycell'

const MyRow = ({row,time_actual}) => {

    console.log("Rendering MyRow");

  	let cells = row.map( (auto,index) => {
  		return (
        <MyCell auto={auto} key={index} time_actual={time_actual}/>
//        <MyCell auto={auto}/>
  		)
  	});

    return (
    	<tr>
    	{cells}
      </tr>
    )
};

export default pure(MyRow)