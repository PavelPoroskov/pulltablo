import React from 'react'
import FilterLink from '../containers/filterlink'

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter="priemka">
            Priemka
        </FilterLink>
        {", "}
        <FilterLink filter="washing">
            Washing
        </FilterLink>
        {", "}
        <FilterLink filter="ALL">
            All
        </FilterLink>
    </p>
);

export default Footer