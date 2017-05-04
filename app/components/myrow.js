import React from 'react';
import pure from 'recompose/pure';

import MyCell from './mycell'

const MyRow = ({row}) => {

    console.log("Rendering MyRow");

  	let cells = row.map( (auto,index) => {
  		return (
        <MyCell auto={auto} key={index}/>
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