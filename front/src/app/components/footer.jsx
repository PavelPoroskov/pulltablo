import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter="/inspection">
            Inspection
        </FilterLink>
        {", "}
        <FilterLink filter="/wash">
            Wash
        </FilterLink>
        {", "}
        <FilterLink filter="/">
            All
        </FilterLink>
    </p>
);

export default Footer