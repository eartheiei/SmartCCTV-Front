import React, { Component } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";

import Search from "./pages/search";
import LiveCam from "./pages/liveCam";
import Register from "./pages/register";
import Setting from "./pages/setting";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/homepage" component={Home} />
          <Route path="/login" component={Login} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/livecam">
            <Home component={<LiveCam />} />
          </Route>
          <Route path="/search">
            <Home component={<Search />} />
          </Route>
          <Route path="/members/register">
            <Home component={<Register />} />
          </Route>
          <Route path="/setting">
            <Home component={<Setting />} />
          </Route>
        </div>
      </Router>
    );
  }
}
