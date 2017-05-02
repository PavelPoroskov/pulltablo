import React from 'react';
import MyRow from './myrow';

const MyTableBody = function(props) {
  
  console.log("Rendering MyTableBody");

  return (
  <tbody>  
  {props.rows.map( (row, index) => {
        return (
          <MyRow row={row} key={index}/>
        );
      })}
  </tbody>
  );
};

export default MyTableBody