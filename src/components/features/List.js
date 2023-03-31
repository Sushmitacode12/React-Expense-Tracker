import React, { useContext } from "react";
import { ExpenseContext } from "../Store/ExpenseContext";
import { Card } from "../Card/Card";

export const List = () => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <div>
      {expenseCtx?.expenses?.map((item) => (
        <div key={item.expense}>
          <Card
            expense={item.expense}
            description={item.description}
            category={item.category}
          />
        </div>
      ))}
    </div>
  );
}