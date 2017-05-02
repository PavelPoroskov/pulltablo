import React from 'react';
import MyTableHead from './mytablehead';
import MyTableBody from './mytablebody';

const MyTable = function(props) {

  console.log("Rendering MyTable");

  return (
	<table>
  <MyTableHead steps={props.steps}/>
  <MyTableBody rows={props.rows}/>
  </table>
  );
};

export default MyTable