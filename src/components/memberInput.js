import React, { Component } from "react";
import axios from "axios";
import { Modal } from "react-bulma-components";
import Record from '../components/webcamRecorder'

export default class MembersInput extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      name: "",
      face: "",
      user_id: ""
    };
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeId = event => {
    this.setState({ user_id: event.target.value });
  };

  handleChangePath = event => {
    this.setState({ face: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const member = {
      Name: this.state.name,
      Face: this.state.face,
      User_ID: this.state.user_id
    };

    axios.post(`http://localhost:4000/members/add`, member).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">
              Member ID:
              <input
                className="input"
                type="text"
                name="id"
                onChange={this.handleChangeId}
              />
            </label>
          </div>
          <div className="field">
            <label className="label">
              Member Name:
              <input
                className="input"
                type="text"
                name="name"
                onChange={this.handleChangeName}
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              class="button is-success"
              onClick={() => this.setState({ open: true })}
            >
              Add Photo
            </button>
          </div>
          <Modal
            show={this.state.open}
            onClose={() => this.setState({ open: false })}
          >
            <div class="modal is-active">
              <div class="modal-card" style={{width:'800px'}}>
                <header class="modal-card-head">
                  <p class="modal-card-title">Register</p>
                  <button
                    class="delete"
                    aria-label="close"
                    onClick={() => this.setState({ open: false })}
                  ></button>
                </header>
                <section class="modal-card-body">
                  <Record/>
                </section>
                <footer class="modal-card-foot">
                  <div class="field is-grouped">
                    <div class="control">
                      <button
                        type="submit"
                        className="button is-link is-success"
                        onClick={() => this.setState({ open: false })}
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
        </form>
        <div></div>
      </div>
    );
  }
}
