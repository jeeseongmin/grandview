import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MainScreen from "screens/MainScreen";
import "./styles.scss";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={MainScreen} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
