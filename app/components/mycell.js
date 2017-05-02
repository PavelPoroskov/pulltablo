import React from 'react';
import pure from 'recompose/pure';

const MyCell = ({auto}) => {
  console.log("Rendering MyCell");
  return (
    <td key={auto.id}>
      {auto.id}
    </td>
  )
};

export default pure(MyCell)