import React, { Component } from "react";
import Webcam from "react-webcam";
import example1 from "../asset/FrontTurned.png";

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 1
    };
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    const num = this.state.tab+1;

    this.setState({ screenshot });
    this.setState({
      tab: num
    })

    console.log(this.state.tab)
  };

  render() {
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
            src={require("../asset/FrontTurned.png")}
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
            {this.state.screenshot ? (
              <img src={this.state.screenshot} height="240" width="240" />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
