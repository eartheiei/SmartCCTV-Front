import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Modal } from "react-bulma-components";
import { changePassword } from '../../components/UserFunctions'

import "./profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      admin_id: 0,
      CPModal: false,
      oldPassword: '',
      newPassword: '',
      CfPassword:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoeded = jwt_decode(token);
    this.setState({
      user_id: decoeded.user_id,
      first_name: decoeded.first_name,
      last_name: decoeded.last_name,
      email: decoeded.email,
      role: decoeded.role,
      admin_id: decoeded.admin_id,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      admin_id: this.state.admin_id
    };

    changePassword(data).then(window.location.reload());
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      role,
      admin_id,
      CPModal,
    } = this.state;
    return (
      <div>
        <label className="label title is-3">Admin Profile</label>
        <div style={{ marginLeft: "10rem" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <label class="label font">Email : </label>
              <label class="font" style={{ marginLeft: "1rem" }}>
                {email}
              </label>
            </div>
            <button
              class="button"
              onClick={() => this.setState({ CPModal: true })}
              style={{ marginTop: "0.2rem" }}
            >
              Change Password
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <label class="label font">First Name : </label>
            <label class="font" style={{ marginLeft: "1rem" }}>
              {first_name}
            </label>
          </div>
          <div style={{ display: "flex" }}>
            <label class="label font">Last Name : </label>
            <label class="font" style={{ marginLeft: "1rem" }}>
              {last_name}
            </label>
          </div>
          <div style={{ display: "flex" }}>
            <label class="label font">Role : </label>
            <label class="font" style={{ marginLeft: "1rem" }}>
              {role}
            </label>
          </div>
        </div>
        <Modal
          show={CPModal}
          onClose={() => this.setState({ CPModal: false })}
          showClose={false}
          closeOnBlur={true}
        >
          <form onSubmit={this.onSubmit}>
            <div class="modal-card" style={{ width: "500px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Change Password</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ CPModal: false })}
                ></button>
              </header>
              <section class="modal-card-body has-text-centered">
                <div style={{ marginLeft: "3rem" }}>
                  <div class="input-group">
                    <label class="label" style={{ marginTop: ".4rem" }}>
                      Password
                    </label>
                    <input
                      class="input"
                      type="password"
                      name="oldPassword"
                      placeholder="Password"
                      style={{ marginLeft: "1.5rem", width: "67%" }}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div class="input-group">
                    <label class="label" style={{ marginTop: ".4rem" }}>
                      New Password
                    </label>
                    <input
                      class="input"
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      style={{ marginLeft: "1.5rem", width: "57.5%" }}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div class="input-group">
                    <label class="label" style={{ marginTop: ".4rem" }}>
                      Comfirm Password
                    </label>
                    <input
                      class="input"
                      type="password"
                      name="CfPassword"
                      placeholder="Confirm Password"
                      style={{ marginLeft: "1.5rem", width: "50%" }}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
              </section>
              <footer
                class="modal-card-foot"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div class="field is-grouped">
                  <div class="control">
                    <button type="submit" className="button is-link is-success">
                      Submit
                    </button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-danger is-light"
                      onClick={() => this.setState({ CPModal: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
