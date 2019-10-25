import React, { Component } from "react";
import axios from "axios";

export default class MembersInput extends Component {
  state = {
    name: "",
    face: "",
    user_id: ""
  };

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
        <div className="field">
          <label className="label">
            Face path:
            <input
              className="input"
              type="text"
              name="face"
              onChange={this.handleChangePath}
            />
          </label>
        </div>
        <div className="control">
          <button type="submit" className="button is-link">add</button>
        </div>
      </form>
    );
  }
}
