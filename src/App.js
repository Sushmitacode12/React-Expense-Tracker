import { useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import { AuthForm } from './components/Auth/AuthForm';
import Home from './components/Pages/Home';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';
import { ForgotPassword } from './components/Pages/ForgotPassword';

function App() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Layout>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        {!auth && (
          <Route path="/forgotpassword" exact>
            <ForgotPassword />
          </Route>
        )}
        <AuthForm />
      </Switch>
    </Layout>
  );
}

export default App;
