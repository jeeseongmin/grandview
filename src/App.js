import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MainScreen from "screens/MainScreen";
import TestScreen from "screens/TestScreen";
import "./styles.scss";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={MainScreen} />
          <Route exact path='/test' component={TestScreen} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
