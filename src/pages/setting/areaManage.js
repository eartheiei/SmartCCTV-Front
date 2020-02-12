import React, { Component } from "react";
import { Modal } from "react-bulma-components";
import { BlockScope} from "./areaBlock";

import "./setting.css";

export default class AreaManage extends Component {
  constructor() {
    super();

    this.state = {
      status: 1
    };
  }

  render() {
    const { id } = this.props;
    const { status } = this.state;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 class="subtitle">
            Input your area's name then select block on this area. Camera is{" "}
            {id}.
          </h1>
          <div class="center">
            <BlockScope grid={status}/>
            <img
              src={require("../../asset/testing.jpg")}
              style={{ width: "640px", height: "360px" }}
            />
            <div class="input-value">
              <label class="label">Area's name</label>
              <input
                class="input"
                type="text"
                name="areaName"
                placeholder="Enter area's name"
              />
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
