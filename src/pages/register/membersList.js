import React, { Component } from "react";
import axios from "axios";

import "./register.css"

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
              <th class="has-text-centered" style={{width:'15%'}}>Picture</th>
              <th class="has-text-centered" style={{width:'15%'}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.mem_id}>
                <td class="has-text-centered">{member.mem_id}</td>
                <td class="has-text-centered">{member.user_id}</td>
                <td class="has-text-centered">{member.name}</td>
                <td class="has-text-centered">
                  <p class="modal-icon filename">
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/665/665629.svg"
                        alt="Picture"
                        class="replaced-svg"
                        style={{ width: "8%", marginRight:'3px' }}
                      />
                    </span>
                    <span>
                      <span class="description">Picture</span>
                    </span>
                  </p>
                </td>
                <td class="has-text-centered">
                  <p class="modal-icon filename">
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/565/565492.svg"
                        alt="Delete"
                        class="replaced-svg"
                        style={{ width: "8%"}}
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
