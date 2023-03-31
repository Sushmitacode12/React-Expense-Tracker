import React, { useContext, useState } from "react";
import { ExpenseContext } from "../Store/ExpenseContext";
import { Card } from "../Card/Card";
import { Form } from "./Form";
import { getApiService } from "./getApiServices";

export const List = () => {
  const [edit, setEdit] = useState({});
  const expenseCtx = useContext(ExpenseContext);
  console.log(expenseCtx);

  const editForm = (id) => {
    const prevExpense = expenseCtx.expenses.filter((item) => id === item.id);
    setEdit(prevExpense[0]);
  };

  const deleteForm = (id) => {
    console.log(id);
    fetch(
      `https://expense-tracker-65ccf-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
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
              let errMsg = data.error.message;
              alert(errMsg);
            }
          });
        }
      })
      .then((data) => {
        getApiService()
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
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
       <Form prevExpense={edit} />
      {expenseCtx?.expenses?.map((item) => (
        <div key={item.id}>
          <Card
            id={item.id}
            expense={item.expense}
            description={item.description}
            category={item.category}
            editFormHandler={editForm}
            removeFormHandler={deleteForm}
          />
        </div>
      ))}
    </div>
  );
}