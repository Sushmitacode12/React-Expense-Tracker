import React from "react";
import classes from "./Card.module.css"

export const Card = (props) => {
  return (
    <div className={classes.card}>
      <div>EXPENSE: {props.expense}</div>
      <div>DESCRIPTION: {props.description}</div>
      <div>CATEGORY: {props.category}</div>
    </div>
  );
};