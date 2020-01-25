import React, { Component } from "react";
import LoginForm from "./pages/loginForm";
import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LiveCam from "./pages/liveCam";
import "react-bulma-components/dist/react-bulma-components.min.css";

const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/homepage" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/post" component={Post} />
          <Route path="/login" component={Login} />
          {/* <Route path="/login" component={LoginForm} /> */}
        </div>
      </Router>
    );
  }
}
