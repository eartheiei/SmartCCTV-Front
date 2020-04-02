import React, { Component } from "react";
import { getCamera } from "../../components/SettingFunction";
import axios from "axios";

export default class LiveCam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameras: []
    };
  }

  componentDidMount() {
    getCamera().then(res => {
      if (res) {
        this.setState({
          cameras: res
        });
      }
    });
  }

  render() {
    const { cameras } = this.state;
    return (
      <div>
        <label className="label title is-3">Live Camera</label>
        <div
          style={{
            padding: "1em",
            display: "flex",
            justifyContent: "center",
            flexFlow: 'row wrap'
          }}
        >
          {cameras ? (
            cameras.map((element, index) => (
              <div
                class="box"
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "45%",
                  flexDirection: "column",
                  marginRight: '1em',
                  marginBottom: '1em'
                }}
              >
                <label class="label title is-4">
                  Camera number is {element.cam_id}
                </label>
                <label class="label title is-5">
                  Camera IP address is {element.ip}
                </label>
                <img
                  border="0"
                  width="640"
                  height="360"
                  src={`http://161.246.5.159:${element.ip.slice(10)}/VIDEO.CGI`}
                />
              </div>
            ))
          ) : (
            <div></div> 
          )}
        </div>
      </div>
    );
  }
}
