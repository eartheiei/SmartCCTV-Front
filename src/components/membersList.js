import React, { Component } from "react";
import axios from "axios";
import Webcam from "react-webcam";

export default class MembersList extends Component {
  state = {
    members: []
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/members/get`).then(res => {
      this.setState({
        members: res.data
      });
    });
  }

  render() {
    const { members } = this.state;
    return (
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-centered">Member ID</th>
              <th class="has-text-centered">User ID</th>
              <th class="has-text-centered">Name</th>
              <th class="has-text-centered">Video</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member =>(
              <tr key={member.Mem_ID}>
                <td class="has-text-centered">{member.mem_id}</td>
                <td class="has-text-centered">{member.user_id}</td>
                <td class="has-text-centered">{member.name}</td>
                <td class="has-text-centered">{member.face}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
