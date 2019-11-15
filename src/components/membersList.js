import React, { Component } from "react";
import axios from "axios";
import Webcam from "react-webcam";

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
    const { members } = this.state;
    console.log(members)
    return (
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member =>(
              <tr key={member.Mem_ID}>
                <td>{member.Mem_ID}</td>
                <td>{member.User_ID}</td>
                <td>{member.Name}</td>
                <td>{member.Face}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Webcam mirrored="true"/> */}
      </div>
    );
  }
}
