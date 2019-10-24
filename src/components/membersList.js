import React, { Component } from "react";
import axios from "axios";

export default class MembersList extends Component {
  state = {
    members: []
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/members`).then(res => {
      console.log(res);
      this.setState({
        members: res.data.data
      });
    });
  }

  render() {
      const { members } = this.state
    return (
      <ul>
          {members.map(member => <li key={member.Mem_ID}>{member.Name}</li>)}
      </ul>
    );
  }
}
