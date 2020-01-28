import React, { Component } from "react";
import { Route, NavLink, Link, BrowserRouter } from "react-router-dom";
import Search from "../search";
import LiveCam from "../liveCam";
import Register from "../register";
import Setting from "../setting";
import jwt_decode from "jwt-decode";
import { register } from "../../components/UserFunctions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "liveCam",
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoeded = jwt_decode(token);
    this.setState({
      first_name: decoeded.first_name,
      last_name: decoeded.last_name,
      email: decoeded.email
    });
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/login`);
  }

  render() {
    const { page, email, first_name, last_name } = this.state;
    return (
      <BrowserRouter>
        <div>
          <nav class="navbar is-white">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item brand-text" >
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
                        <NavLink to="/livecam">
                          Live Camera
                        </NavLink>
                      </li>
                    </ul>
                    <p class="menu-label">Administration</p>
                    <ul class="menu-list">
                      <li>
                        <NavLink to="/search">
                          Search Member
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/members/register">
                          Members Management
                        </NavLink>
                      </li>
                    </ul>
                    <p class="menu-label">Setting</p>
                    <ul class="menu-list">
                      <li>
                        <NavLink to="/setting">
                          Setting
                        </NavLink>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
              <div class="column">
                <Route path="/livecam" component={LiveCam} />
                <Route path="/search" component={Search} />
                <Route path="/members/register" component={Register} />
                <Route path="/setting" component={Setting} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
