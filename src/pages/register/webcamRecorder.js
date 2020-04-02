import React, { Component } from "react";
import Webcam from "react-webcam";

import "./register.css";

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0,
      picture: [],
      base64Img: []
    };
  }

  handleClick = () => {
    const { picture, tab, base64Img } = this.state;
    var temp = picture;
    var base64 = base64Img;
    const screenshot = this.webcam.getScreenshot();
    const num = (tab + 1) % 5;

    if (tab < 5) {
      temp[tab] = screenshot;
      base64[tab] = screenshot.split(',')[1];
      console.log(screenshot.split(',')[1])
      this.setState({
        tab: num,
        picture: temp,
        base64Img: base64
      });
      this.props.setPicture(base64)
      console.log(temp)
    }
  };

  render() {
    const { tab, screenshot, picture } = this.state;
    const path = [
      "FrontTurned.png",
      "HalfLeftTurned.png",
      "HalfRightTurned.png",
      "LeftTurned.png",
      "RightTurned.png"
    ];
    return (
      <div>
        <h1 class="title">Take Photo</h1>
        <h2 class="subtitle">Capture pictures follow by example</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <img
            src={require("../../asset/" + path[tab])}
            height="360"
            width="360"
          />
          <Webcam
            audio={false}
            ref={node => (this.webcam = node)}
            mirrored={true}
            height={360}
            width={360}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 class="subtitle" style={{ marginBottom: "12px" }}>
            Screenshots
          </h2>
          <div className="screenshots">
            <div className="controls">
              <button
                className="button is-primary"
                style={{ marginBottom: "12px" }}
                onClick={this.handleClick}
              >
                Capture
              </button>
            </div>
            {picture.map((ele, index) => (
              <img
                onClick={() => this.setState({ tab: index })}
                style={{ borderRadius: "6px", marginRight: "0.5rem", cursor: "pointer"}}
                src={ele}
                width="180"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
