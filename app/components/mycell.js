import React from 'react';
//import pure from 'recompose/pure';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const MyCell = ({car,time_actual}) => {
  console.log(`			Rendering MyCell ${car.carid}`);
  // console.log(time_actual);
  // console.log(car.time_update);
//		<div className='backgroundtext'>Moika 1</div> 
    
  const className = car.time_update && time_actual < car.time_update? "Cell NewState" : "Cell State"; 
  return (
//    <td key={auto.carid}>
	<div className={className}>
		<div className='backgroundtext'>Post 1</div> 
		<div className='CellNumber'>{car.carid}</div>  	
  </div>
  )
};

//export default pure(MyCell)
export default onlyUpdateForKeys(['car'])(MyCell)