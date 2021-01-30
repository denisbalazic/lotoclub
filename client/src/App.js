import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CombinationsPage from "./pages/CombinationsPage";
import MycombinationsPage from "./pages/MycombinationsPage";
import TablePage from "./pages/TablePage";
import SettingsPage from "./pages/SettingsPage";
import { authService } from "./service/auth";
import "./App.css";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [navigationOn, setNavigationOn] = useState(false);

  useEffect(() => {
    setIsLogged(authService.isLoggedIn());
  }, []);

  return (
    <div>
      <Header isLogged={isLogged} setNavigationOn={setNavigationOn} />
      <Navbar
        visibility={navigationOn}
        setNavigationOn={setNavigationOn}
        setIsLogged={setIsLogged}
      />
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route exact path="/register" render={() => <RegisterPage />} />
        <Route exact path="/login" render={() => <LoginPage setIsLogged={setIsLogged} />} />
        <PrivateRoute exact path="/combinations" component={CombinationsPage} />
        <PrivateRoute exact path="/mycombinations" component={MycombinationsPage} />
        <PrivateRoute exact path="/table" component={TablePage} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
      </Switch>
    </div>
  );
};

export default App;
