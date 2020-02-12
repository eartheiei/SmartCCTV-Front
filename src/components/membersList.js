import React, { Component } from "react";
import axios from "axios";
import Webcam from "react-webcam";

export default class MembersList extends Component {
  state = {
    members: []
  };

  componentDidMount() {
    axios.get(`http://localhost:4000/members`).then(res => {
      this.setState({
        members: res.data.data
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
                <td class="has-text-centered">{member.Mem_ID}</td>
                <td class="has-text-centered">{member.User_ID}</td>
                <td class="has-text-centered">{member.Name}</td>
                <td class="has-text-centered">{member.Face}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
