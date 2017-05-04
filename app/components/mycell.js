import React from 'react';
import pure from 'recompose/pure';

const MyCell = ({auto}) => {
  console.log("Rendering MyCell");
  return (
//    <td key={auto.carid}>
    <td>
      {auto.carid}
    </td>
  )
};

export default pure(MyCell)