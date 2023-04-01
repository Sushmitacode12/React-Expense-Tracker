import { verifyEmail } from "../ReduxStore/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./StartingPage.module.css";
import { Screen } from"../features/Screen";

export const StartingPage = () => {
  // const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const verifyHandler = () => {
  dispatch(verifyEmail({ requestType: "VERIFY_EMAIL", idToken: auth.token 
}));  
  };
  const profileHandler = () => {
  // history.replace("/profile");
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
    </div>
    <Screen />
  </div>
  );
};