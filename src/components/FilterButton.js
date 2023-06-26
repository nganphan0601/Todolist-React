import React from "react";

const FilterButton = (props) => {
    const buttonStyle = { textDecoration: 'none'};
    return (
        <button id={props.id} 
        type="button" 
        className="btn toggle-btn" 
        aria-pressed={props.isPressed} 
        onClick={() => props.setFilter(props.name)}>
          <span className="visually-hidden">Show </span>
          <span>{props.name}</span>
          <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterButton