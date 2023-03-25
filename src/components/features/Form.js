import React, { useContext, useState } from "react";
import { ExpenseContext } from "../store/ExpenseContext";
import classes from "./Form.module.css";

export const Form = () => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const expenseCtx = useContext(ExpenseContext);

  const expenseHandler = (e) => {
    setExpense(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    expenseCtx.setExpenses([
      ...expenseCtx.expenses,
      { expense, description, category },
    ]);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label>EXPENSE:</label>
      <div>
        <input
          name="expense"
          type="text"
          placeholder=""
          onChange={expenseHandler}
          value={expense}
        />
      </div>
      <label>DESCRIPTION:</label>
      <div>
        <input
          name="description"
          type="text"
          placeholder=""
          onChange={descriptionHandler}
          value={description}
        />
      </div>
      <label>CATEGORY:</label>
      <select name="category" onChange={categoryHandler} value={category}>
        <option>Food</option>
        <option>Petrol</option>
        <option>Travelling</option>
        <option>Movie</option>
      </select>
      <button>Submit</button>
    </form>
  );
};