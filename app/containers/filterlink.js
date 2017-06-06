import React from 'react';
import { NavLink } from 'react-router-dom';


const FilterLink = ({ filter, children }) => (
  <NavLink exact to={'/' + (filter === 'ALL' ? '' : filter)} activeClassName="selectedNavLink">
    {children}
  </NavLink>
);

export default FilterLink;