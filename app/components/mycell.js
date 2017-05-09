import React from 'react';
import pure from 'recompose/pure';

const MyCell = ({auto,time_actual}) => {
  console.log("Rendering MyCell");
  console.log(time_actual);
  console.log(auto.time_update);
    
  const className = auto.time_update && time_actual < auto.time_update? "NewState" : "State"; 
  return (
//    <td key={auto.carid}>
	<td className={className}>
      {auto.carid}
    </td>
  )
};

export default pure(MyCell)