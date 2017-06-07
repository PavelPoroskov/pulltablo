import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter="/priemka">
            Priemka
        </FilterLink>
        {", "}
        <FilterLink filter="/washing">
            Washing
        </FilterLink>
        {", "}
        <FilterLink filter="/">
            All
        </FilterLink>
    </p>
);

export default Footer