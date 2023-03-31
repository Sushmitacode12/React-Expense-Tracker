import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../Store/ExpenseContext";
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
  const getApiHandler = () => {
    fetch(
      `https://crudcrud.com/api/3f386f3ba9b2444fb77bd739335eee9f/expenses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        expenseCtx.setExpenses(data);
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    getApiHandler()
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // expenseCtx.setExpenses([
    //   ...expenseCtx.expenses,
    //   { expense, description, category },
    // ]);
    fetch(
        `https://crudcrud.com/api/405c6913852d40559f1baf8a3cfd9ff9/expenses`,
        {
          method: "POST",
          body: JSON.stringify({
            expense,
            description,
            category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          getApiHandler()
        })
        .catch((err) => alert(err.message));
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
}