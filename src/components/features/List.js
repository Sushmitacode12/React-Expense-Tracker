import React, { useState } from "react";
import { ExpenseContext } from "../Store/ExpenseContext";
import { Card } from "../Card/Card";
import { Form } from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseList } from "../ReduxStore/ExpenseSlice";
import { expenseList } from "../ReduxStore/ExpenseSlice";
export const List = () => {
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense);

  const editForm = (id) => {
    const prevExpense = expenses.expenseList.filter((item) => id === item.id);
    setEdit(prevExpense[0]);
  };
  const deleteForm = (id) => {
    dispatch(deleteExpenseList({ id, dispatch, expenseList }));
  };

  return (
    <div>
       <Form prevExpense={edit} editState={() => setEdit({})}/>
       {expenses?.expenseList?.map((item) => (
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