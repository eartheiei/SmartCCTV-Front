import React, { Component } from "react";
import { Modal } from "react-bulma-components";
import { BlockScope } from "./areaBlock";
import { addBlock } from "../../components/SettingFunction";

import "./setting.css";

export default class AreaManage extends Component {
  constructor() {
    super();

    this.state = {
      status: 1,
      blockNumber: 0,
      areaName: "",
      realRow: "",
      realColumn: "",
      cam_id: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { blockNumber } = this.state
    var col=0,row=0,pixelRow=0,pixelCol=0

    if (this.state.status == 1) {
      col = Math.floor(blockNumber / 16);
      row = Math.floor(blockNumber % 16);
    } else if (this.state.status == 5) {
      col = Math.floor(blockNumber / 20);
      row = Math.floor(blockNumber % 20);
    } else {
      col = Math.floor(blockNumber / 24);
      row = Math.floor(blockNumber % 24);
    }
    console.log(row,col)

    if (this.state.status == 1) {
      pixelCol = 80 * col + 40;
      pixelRow = 45 * row + 22.5;
    } else if (this.state.status == 5) {
      pixelCol = 64 * col + 32;
      pixelRow = 36 * row + 18;
    } else {
      pixelCol = 53.33 * col + 26.665;
      pixelRow = 30 * row + 15;
    }

    const block = {
      area_name: this.state.areaName,
      size: this.state.status,
      realRow: parseInt(this.state.realRow),
      realColumn: parseInt(this.state.realColumn),
      pixelRow: pixelRow,
      pixelColumn: pixelCol,
      cam_id: parseInt(this.props.id)
    };

    console.log(block)

    addBlock(block).then(console.log("Send!"));
  }

  assignRealBlock = num => {
    this.setState({
      blockNumber: num
    });
  };

  render() {
    const { id, ip } = this.props;
    const { status, blockNumber, areaName, realRow, realColumn } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 class="subtitle">
            Input your area's name then select block on this area. Camera is{" "}
            {id}.
          </h1>
          <div class="center">
            <BlockScope grid={status} real={this.assignRealBlock} />
            <img
              src={require(`../../asset/${ip.slice(10)}.png`)}
              style={{ width: "1024px", height: "576px" }}
            />
            <div class="input-value">
              <div class="field">
                <label class="label">Area's name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    name="areaName"
                    placeholder="Enter area's name"
                    value={areaName}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="button-group">
                <button
                  class={
                    status == 1
                      ? "button is-active is-light"
                      : "button is-light"
                  }
                  onClick={() => this.setState({ status: 1 })}
                >
                  x1
                </button>
                <button
                  class={
                    status == 5
                      ? "button is-active is-light"
                      : "button is-light"
                  }
                  onClick={() => this.setState({ status: 5 })}
                >
                  x5
                </button>
                <button
                  class={
                    status == 10
                      ? "button is-active is-light"
                      : "button is-light"
                  }
                  onClick={() => this.setState({ status: 10 })}
                >
                  x10
                </button>
              </div>
              <div class="field">
                <label class="label" style={{ marginTop: "1rem" }}>
                  Insert row and column on Real block number {blockNumber}
                </label>
                <div class="center control">
                  <input
                    class="input"
                    tpye="text"
                    name="realRow"
                    placeholder="Row"
                    style={{ marginLeft: "1em" }}
                    value={realRow}
                    onChange={this.onChange}
                  />
                  <input
                    class="input"
                    tpye="text"
                    name="realColumn"
                    placeholder="Column"
                    style={{ marginLeft: "1em" }}
                    value={realColumn}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="field">
                <div class="center control">
                  <button
                    type="button"
                    class="button is-info"
                    style={{ marginTop: "1em" }}
                    onClick={this.onSubmit}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
