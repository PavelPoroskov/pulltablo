import React from 'react';
import MyTableHead from './mytablehead';
import MyTableBody from './mytablebody';

const MyTable = function({steps,cars,columns}) {

  console.log("Rendering MyTable");

  return (
	<table>
  		<MyTableHead steps={steps}/>
  		<MyTableBody steps={steps} columns={columns} cars={cars} />
  	</table>
  );
};

export default MyTable