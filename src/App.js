import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthForm } from './components/Auth/AuthForm';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import AuthContext from './components/Store/auth-context';
import Profile from './components/Profile/Profile';

function App() {
  const [token, setToken] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };
  
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <Layout>
      <Switch>
      <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/" exact>
        <AuthForm />
        </Route>
        
      </Switch>
      </Layout> 
    </ AuthContext.Provider>
  );
}

export default App;
