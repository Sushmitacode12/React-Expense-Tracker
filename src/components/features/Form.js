import React, { useState, useEffect } from "react";
import classes from "./Form.module.css";
import { useDispatch } from "react-redux";
import { expenseList } from "../ReduxStore/ExpenseSlice";
import { addExpenseList } from "../ReduxStore/ExpenseSlice";
import { updateExpenseList } from "../ReduxStore/ExpenseSlice";

export const Form = (props) => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const dispatch = useDispatch();

  const expenseHandler = (e) => {
    setExpense(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(expenseList());
  }, []);

  useEffect(() => {
    if (Object.keys(props.prevExpense).length > 0) {
      setExpense(props.prevExpense.expense);
      setDescription(props.prevExpense.description);
      setCategory(props.prevExpense.category);
    }
  }, [props.prevExpense]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(
      addExpenseList({ expense, description, category, dispatch, expenseList })
    );

    setExpense("");
    setDescription("");
    setCategory("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      addExpenseList({ expense, description, category, dispatch, expenseList,
       })
    );
    setExpense("");
    setDescription("");
    setCategory("");
    props?.editState();
  };

  return (
    <form 
      className={classes.form} 
      onSubmit={
        Object.keys(props.prevExpense).length > 0
          ? updateHandler
          : submitHandler
      }
    >
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
        <option>Fuel</option>
        <option>Travelling</option>
        <option>Movie</option>
      </select>
      <button>Submit</button>
    </form>
  );
};