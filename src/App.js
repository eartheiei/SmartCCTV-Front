import React, { Component } from "react";
import LoginForm from "./pages/loginForm";
import Home from "./pages/home";
import { Route } from "react-router-dom";
import LiveCam from "./pages/liveCam"


const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>

export default class App extends Component {
  render() {
    return (
      <div className="App container">
        {/* <Route exact path="/" component={LiveCam} /> */}
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/post" component={Post} />
        <Route path="/project" component={Project} />
        <Route path="/" component={LoginForm} />
      </div>
    );
  }
}
