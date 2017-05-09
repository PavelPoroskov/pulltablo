import React from 'react';
import MyRow from './myrow';

const MyTableBody = function(props) {
  
  console.log("Rendering MyTableBody");
//  const time_actual = new Date(new Date() - durationInMinutes * MS_PER_MINUTE);
//  MS_PER_MINUTE = 60000;
  const time_actual = new Date(new Date() - 180000);
  const time_actual_ms = time_actual.getTime();
//  console.log(time_actual);

  return (
  <tbody>  
  {props.rows.map( (row, index) => {
        return (
          <MyRow row={row} key={index} time_actual={time_actual_ms}/>
        );
      })}
  </tbody>
  );
};

export default MyTableBody