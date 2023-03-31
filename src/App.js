import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthForm } from './components/Auth/AuthForm';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import AuthContext from './components/Store/auth-context';
import Profile from './components/Profile/Profile';
import { ForgotPassword } from './components/Pages/ForgotPassword';
import { ExpenseContext } from './components/Store/ExpenseContext';

function App() {
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      <Layout>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
           <Route path="/profile" exact>
            <Profile />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/forgotpassword" exact>
              <ForgotPassword />
            </Route>
          )}
         <AuthForm /> 
        </Switch>
      </Layout> 
      </ExpenseContext.Provider>
    </ AuthContext.Provider>
  );
}

export default App;
