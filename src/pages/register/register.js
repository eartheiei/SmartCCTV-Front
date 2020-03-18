import React, { Component } from "react";
import MemberList from "./membersList";
import MembersInput from "./memberInput";

export default class Register extends Component {
  render() {
    return (
      <div>
        <label className="label title is-3">Member Management</label>
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
