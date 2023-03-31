import React from "react";
import classes from "./Card.module.css"

export const Card = (props) => {
  return (
    <div className={classes.card}>
      <div>EXPENSE: {props.expense}</div>
      <div>DESCRIPTION: {props.description}</div>
      <div>CATEGORY: {props.category}</div>
      <div>
        <button onClick={() => props.removeFormHandler(props.id)}>
          Delete
        </button>
        <button onClick={() => props.editFormHandler(props.id)}>Edit</button>
      </div>
    </div>
  );
};