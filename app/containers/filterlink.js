import React from 'react';
import { Link } from 'react-router-dom';


const FilterLink = ({ filter, children }) => (
  <Link to={filter === 'AALL' ? '/' : filter} >
    {children}
  </Link>
);

export default FilterLink;