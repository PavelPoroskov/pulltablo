import React from 'react';
import pure from 'recompose/pure';

const MyCell = ({car,time_actual}) => {
  console.log(`Rendering MyCell ${car.carid}`);
  console.log(time_actual);
//  let obj = cars[car.carid];
  console.log(car.time_update);
    
  const className = car.time_update && time_actual < car.time_update? "Cell NewState" : "Cell State"; 
  return (
//    <td key={auto.carid}>
	<div className={className}>
      {car.carid}
    </div>
  )
};

export default pure(MyCell)