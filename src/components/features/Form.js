import React, { useContext, useState, useEffect } from "react";
import { ExpenseContext } from "../Store/ExpenseContext";
import classes from "./Form.module.css";

export const Form = (props) => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

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
      "https://expense-tracker-65ccf-default-rtdb.firebaseio.com//expenses.json",
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
            if (data && data.error && data.error.message) {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        const finalData = [];
        const objKeys = Object.keys(data === null ? {} : data);
        objKeys.forEach((keys) => {
          const objElement = data[keys];
          objElement.id = keys;
          finalData.push(objElement);
        });
        expenseCtx.setExpenses(finalData);
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    getApiHandler();
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
    // expenseCtx.setExpenses([
    //   ...expenseCtx.expenses,
    //   { expense, description, category },
    // ]);
    fetch(
      "https://expense-tracker-65ccf-default-rtdb.firebaseio.com//expenses.json",
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
              if (data && data.error && data.error.message) {
                let errorMessage = data.error.message;
                throw new Error(errorMessage);
              }
            });
          }
        })
        .then((data) => {
          console.log(data);
          getApiHandler();
        })
        .catch((err) => alert(err.message));

        setExpense("");
    setDescription("");
    setCategory("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://expense-tracker-65ccf-default-rtdb.firebaseio.com//expenses/${props.prevExpense.id}.json`,
      {
        method: "PUT",
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
            if (data && data.error && data.error.message) {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        getApiHandler();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form 
      className={classes.form} 
      onSubmit={props.prevExpense ? updateHandler : submitHandler}
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
        <option>Petrol</option>
        <option>Travelling</option>
        <option>Movie</option>
      </select>
      <button>Submit</button>
    </form>
  );
}