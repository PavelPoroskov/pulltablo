import React from 'react';
import MyColumn from './mycolumn';

const MyTableBody = function({steps,columns,cars}) {
  
  console.log("Rendering MyTableBody");
//  const time_actual = new Date(new Date() - durationInMinutes * MS_PER_MINUTE);
//  MS_PER_MINUTE = 60000;
  const time_actual = new Date(new Date() - 180000);
  const time_actual_ms = time_actual.getTime();
//  console.log(time_actual);

  return (
  <tbody>  
      <tr>
      {steps.map( step => {
        return (
          <MyColumn step={step} column={columns[step.stepid]} key={step.stepid} cars={cars} time_actual={time_actual_ms}/>
        );
        })}
      </tr>
  </tbody>
  );
};

export default MyTableBody