import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import LoginForm from "../loginForm";
import Search from "../search";
import LiveCam from "../liveCam";
import Register from "../register";
import Setting from "../setting";
import jwt_decode from 'jwt-decode'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "liveCam",
      first_name: '',
      last_name: '',
      email: ''
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoeded = jwt_decode(token)
    this.setState({
      first_name: decoeded.first_name,
      last_name: decoeded.last_name,
      email: decoeded.email
    })
  }

  logout(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/login`)
  }

  renderPage = page => {
    switch (page) {
      case "search":
        return <Search />;
      case "register":
        return <Register />;
      case "setting":
        return <Setting />;
      default:
        return <LiveCam />;
    }
  };

  render() {
    const { page, email, first_name, last_name } = this.state;
    return (
      <div>
        <nav class="navbar is-white">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item brand-text" href="../">
                SmartCCTV
              </a>
              <div class="navbar-burger burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div id="navMenu" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item">{email}</a>
                <a class="navbar-item" onClick={this.logout.bind(this)}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <div class="column">
                <aside class="menu is-hidden-mobile">
                  <p class="menu-label">General</p>
                  <ul class="menu-list">
                    <li>
                      <a onClick={()=>this.setState({page: "liveCam"})}>Live Camera</a>
                    </li>
                  </ul>
                  <p class="menu-label">Administration</p>
                  <ul class="menu-list">
                    <li>
                      <a onClick={()=>this.setState({page: "search"})}>Search</a>
                    </li>
                    <li>
                      <a onClick={()=>this.setState({page: "register"})}>Member Management</a>
                    </li>
                  </ul>
                  <p class="menu-label">Setting</p>
                  <ul class="menu-list">
                    <li>
                      <a onClick={()=>this.setState({page: "setting"})}>Setting</a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
            <div class="column">{this.renderPage(page)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
