import React from 'react';
import pure from 'recompose/pure';

const MyTableHead = ({steps}) => {
    console.log("Rendering MyTableHead");

    return (
      <thead>
    	<tr>
    	{steps.map( step => {
            return (
              <th key={step.stepid} className={step.classCSS}>
                {step.name}
              </th>
            );
          })}
    	</tr>
      </thead>
    );

  }

//export default MyTableHead
export default pure(MyTableHead)

//.TODO shoudComponentUpdate