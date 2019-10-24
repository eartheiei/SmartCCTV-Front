import React, { Component } from "react";
import axios from "axios";

export default class MembersInput extends Component {
  state = {
    name: "",
    face: "",
    user_id: ""
  };

  handleChangeName = event => {
      this.setState({ name: event.target.value})
  }

  handleChangeId = event => {
      this.setState({ user_id: event.target.value})
  }

  handleChangePath = event => {
      this.setState({ face: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();

    const member = {
      Name: this.state.name,
      Face: this.state.face,
      User_ID: this.state.user_id
    };
    console.log(member)

    axios.post(`http://localhost:4000/members/add`, { member }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Member ID:
            <input type='text' name='id' onChange={this.handleChangeId}/>
        </label>
        <label>Member Name:
            <input type='text' name='name' onChange={this.handleChangeName}/>
        </label>
        <label>Face path:
            <input type='text' name='face' onChange={this.handleChangePath}/>
        </label>
        <button type="submit">add</button>
      </form>
    );
  }
}
