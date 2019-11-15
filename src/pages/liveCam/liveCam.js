import React, { Component } from "react";

export default class LiveCam extends Component {
  render() {
    return (
      <div>
        <label className="label">Live Camera</label>
        <div>
          <img
            border="0"
            width="640"
            height="480"
            src="http://admin:01290129@192.168.1.120/VIDEO.CGI"
          />
        </div>
      </div>
    );
  }
}
