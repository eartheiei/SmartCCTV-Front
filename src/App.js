import React, { Component } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";



export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/homepage" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
        </div>
      </Router>
    );
  }
}
