import React, { Component } from "react";
import { login } from "../../components/UserFunctions";

import "./login.css";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      message: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/homepage`);
      } else {
        this.setState({
          message: "Login failed! Plaese check your email."
        });
      }
    });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <section class="hero is-fullheight background">
        <div class="hero-body" style={{ justifyContent: "center" }}>
          <div class="box" style={{ minWidth: "40vw" }}>
            <div className="columns is-centered">
              <label className="title is-1">Smart CCTV</label>
            </div>
            <div className="columns is-centered">
              <div className="column is-half">
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
                  {message ? (
                    <p
                      className="help is-danger"
                      style={{ marginBottom: "10px" }}
                    >
                      {message}
                    </p>
                  ) : null}
                  <div
                    className="field is-grouped"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
