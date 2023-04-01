import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";

export const store = configureStore({
  reducer: { expense: ExpenseReducer, auth: AuthReducer },
});