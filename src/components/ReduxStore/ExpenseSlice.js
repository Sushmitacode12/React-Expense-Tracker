import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL =
  "https://expense-tracker-19662-default-rtdb.firebaseio.com//expenses.json";

export const addExpenseList = createAsyncThunk(
  "users/expensePost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(Base_URL, {
        expense: param.expense,
        description: param.description,
        category: param.category,
      });
      console.log(response.data);
      param.dispatch(param.expenseList());
    } catch (error) {
      alert("Expense List fetched unsuccessful");
      return error;
    }
  }
);

export const expenseList = createAsyncThunk("users/expense", async () => {
  try {
    const response = await axios.get(Base_URL);
    console.log(response.data);
    const finalData = [];
    const objKeys = Object.keys(response.data === null ? {} : response.data);
    objKeys.forEach((keys) => {
      const objElement = response.data[keys];
      objElement.id = keys;
      finalData.push(objElement);
    });
    return finalData;
  } catch (error) {
    alert("Expense List fetched unsuccessful");
    return error;
  }
});

export const deleteExpenseList = createAsyncThunk(
  "users/expenseDelete",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://expense-tracker-19662-default-rtdb.firebaseio.com//expenses/${param.id}.json`
      );
      console.log(response.data);
      param.dispatch(param.expenseList());
    } catch (error) {
      alert("Expense List fetched unsuccessful");
      return error;
    }
  }
);

export const updateExpenseList = createAsyncThunk(
  "users/expenseUpdate",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://expense-tracker-19662-default-rtdb.firebaseio.com//expenses/${param.id}.json`,
        {
          expense: param.expense,
          description: param.description,
          category: param.category,
        }
      );
      console.log(response.data);
      param.dispatch(param.expenseList());
    } catch (error) {
      alert("Expense List fetched unsuccessful");
      return error;
    }
  }
);

const initialExpensesState = {
  isLoading: false,
  error: false,
  expenseList: [],
  showPremeium: false,
};

const ExpenseSlice = createSlice({
  name: "Expenses",
  initialState: initialExpensesState,
  extraReducers: (builder) => {
    builder.addCase(expenseList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(expenseList.fulfilled, (state, action) => {
      const total = action.payload.reduce((total, expenses) => {
        return total + Number(expenses.expense);
      }, 0);

      state.isLoading = false;
      state.error = false;
      state.expenseList = action.payload;
      state.showPremeium = total > 10000;
    });
    builder.addCase(expenseList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(addExpenseList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.expenseList = action.payload;
    });

    builder.addCase(deleteExpenseList.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(updateExpenseList.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
    });
  },
});

export default ExpenseSlice.reducer;