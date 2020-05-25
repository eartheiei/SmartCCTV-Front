import React, { Component } from "react";
import { NavLink, push } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "liveCam",
      first_name: "",
      last_name: "",
      email: "",
      role: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoeded = jwt_decode(token);
    this.setState({
      first_name: decoeded.first_name,
      last_name: decoeded.last_name,
      email: decoeded.email,
      role: decoeded.role,
    });
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/login");
  }

  render() {
    const { page, email, first_name, last_name, role } = this.state;
    return (
      <div class="container is-fluid" style={{ margin: "0em" }}>
        <div class="container is-fluid" style={{ margin: "0em" }}>
          <div class="columns">
            <div class="column is-one-fifth sidebar" style={{ padding: "0px" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  opacity: "0.5",
                  paddingLeft: "2rem",
                }}
              >
                <div class="column">
                  <div class="navbar-brand">
                    <a
                      class="navbar-item brand-text title white"
                      style={{ paddingTop: "1rem" }}
                    >
                      SmartCCTV
                    </a>
                    <div class="navbar-burger burger" data-target="navMenu">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <aside class="menu is-hidden-mobile">
                    <p class="menu-label grey">General</p>
                    <ul class="menu-list">
                      <li>
                        <NavLink to="/livecam">
                          <a class="white">Live Camera</a>
                        </NavLink>
                      </li>
                    </ul>
                    <p class="menu-label grey">Administration</p>
                    <ul class="menu-list">
                      <li>
                        <NavLink to="/search">
                          <a class="white">Search Member</a>
                        </NavLink>
                      </li>
                      {role === "admin" ? (
                        <li>
                          <NavLink to="/members/register">
                            <a class="white">Members Management</a>
                          </NavLink>
                        </li>
                      ) : (
                        <div />
                      )}
                      {role === "super admin" && (
                        <li>
                          <NavLink to="/admin">
                            <a class="white">Admins Management</a>
                          </NavLink>
                        </li>
                      )}
                    </ul>
                    {role === "admin" ? (
                      <div>
                        <p class="menu-label grey">Setting</p>
                        <ul class="menu-list">
                          <li>
                            <NavLink to="/setting">
                              <a class="white">Setting</a>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div />
                    )}
                  </aside>
                </div>
              </div>
            </div>
            <div class="column" style={{ padding: "0px" }}>
              <div class="column headbar">
                <div
                  id="navMenu"
                  class="navbar-menu"
                  style={{ height: "5.3rem" }}
                >
                  <div class="navbar-end">
                    <NavLink
                      class="navbar-item user"
                      style={{ marginBottom: "0em", marginRight: "1rem" }}
                      to="/profile"
                    >
                      <label>{email}</label>
                    </NavLink>
                    <a
                      class="navbar-item user"
                      onClick={this.logout.bind(this)}
                    >
                      <label>Logout</label>
                    </a>
                  </div>
                </div>
              </div>
              <div class="column" style={{ padding: "3rem" }}>
                {this.props.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
