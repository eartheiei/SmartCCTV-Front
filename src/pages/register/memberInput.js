import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bulma-components";
import Record from "./webcamRecorder";

import "./register.css";

export default class MembersInput extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      name: "",
      face: "",
      user_id: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setPicture = picture => {
    this.setState({
      face: picture
    });
  };

  onSubmit(e) {
    e.preventDefault();

    this.setState({ open: false });

    const member = {
      name: this.state.name,
      picture: this.state.face,
      user_id: this.state.user_id
    };

    axios.post(`http://localhost:4000/members/add`, member).then(res => {
      console.log(res);
      // console.log(res.data);
    });
  }

  render() {
    const { name, user_id, face } = this.state;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <button
            class="button is-success"
            onClick={() => this.setState({ open: true })}
          >
            Add Member
          </button>
        </div>
        <Modal
          show={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <div class="modal is-active">
            <div class="modal-card" style={{ width: "1000px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Register</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ open: false })}
                ></button>
              </header>
              <section class="modal-card-body">
                <div className="field text-input">
                  <label className="label" style={{ width: "35%" }}>
                    Member ID:
                    <input
                      className="input"
                      type="text"
                      name="user_id"
                      onChange={this.onChange}
                    />
                  </label>
                </div>
                <div className="field text-input">
                  <label className="label" style={{ width: "35%" }}>
                    Member Name:
                    <input
                      className="input"
                      type="text"
                      name="name"
                      onChange={this.onChange}
                    />
                  </label>
                </div>
                <Record setPicture={this.setPicture} />
              </section>
              <footer class="modal-card-foot">
                <div class="field is-grouped">
                  <div class="control">
                    <button
                      type="submit"
                      className="button is-link is-success"
                      onClick={this.onSubmit}
                    >
                      Submit
                    </button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-danger is-light"
                      onClick={() => this.setState({ open: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
