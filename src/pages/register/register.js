import React, { Component } from "react";
import MemberList from "../../components/membersList";
import MembersInput from "../../components/memberInput";

export default class Register extends Component {
  render() {
    return (
      <div>
        <span>Register</span>
        <MembersInput/>
        <MemberList />
      </div>
    );
  }
}
