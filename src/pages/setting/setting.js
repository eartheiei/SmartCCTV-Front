import React, { Component } from "react";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: ""
    };
  }

  render() {
    return (
      <div>
        <label className="label">Setting</label>
      </div>
    );
  }
}
