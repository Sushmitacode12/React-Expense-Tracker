import { verifyEmail } from "../ReduxStore/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./StartingPage.module.css";
import { Screen } from"../features/Screen";
import { toggle } from "../ReduxStore/themeSlice";

export const StartingPage = () => {
  // const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const expenses = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  
  const verifyHandler = () => {
  dispatch(verifyEmail({ requestType: "VERIFY_EMAIL", idToken: auth.token 
}));  
  };
  const profileHandler = () => {
  // history.replace("/profile");
  };

  const makeCSV = (rows) => {
    return rows.map((r) => r.join(",")).join("\n");
  };
  const csvDownload = () => {
    const expense = expenses.expenseList;

    let data = ["Expense", "Description", "Category"];

    const values = expense.map((item) => {
      const arr = [];
      arr.push(item.expense);
      arr.push(item.description);
      arr.push(item.category);

      return arr;
    });

    data = [[...data], ...values];

    const blob = new Blob([makeCSV(data)]);

    const a = document.getElementById("csv");
    a.href = URL.createObjectURL(blob);
  };

  return (
    <div>
    <div className={classes.welcome}>
      <div>Welcome to Expense Tracker!!!</div>
      <div>
        <span>Your Profile is Incomplete.</span>
        <button onClick={profileHandler}>Complete Now.</button>
      </div>
    </div>
    <div className={classes.btn}>
      <button onClick={verifyHandler}>VERIFY EMAIL ID</button>
      <button className={classes.verify} onClick={verifyHandler}>
          VERIFY EMAIL ID
        </button>
        {expenses.showPremeium ? (
          <button className={classes.premium}>Premeium</button>
        ) : null}
        {expenses.showPremeium ? (
          <button className={classes.dark} onClick={() => dispatch(toggle())}>
            Dark
          </button>
        ) : null}
        <a id="csv" href="csvFiles" download="files.csv">
          <button className={classes.csv} onClick={csvDownload}>
            Download
          </button>
        </a>
    </div>
    <Screen />
  </div>
  );
};