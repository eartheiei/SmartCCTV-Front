import React, { Component } from "react";
import MemberList from "../../components/membersList";
import MembersInput from "../../components/memberInput";

export default class Register extends Component {
  render() {
    return (
      <div>
        <label className="label">Member Management</label>
        <div className="columns is-centered">
          <div className="column is-half">
            <MembersInput />
          </div>
        </div>
        <MemberList />
      </div>
    );
  }
}
