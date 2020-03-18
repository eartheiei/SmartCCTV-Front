import React, { Component } from "react";
import { getCamera } from "../../components/SettingFunction";
import AreaManage from "./areaManage";
import { Modal } from "react-bulma-components";

import "./setting.css";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameras: [],
      open: false,
      id: 0,
      ip: ""
    };
  }

  componentDidMount() {
    //api
    getCamera().then(res => {
      if (res) {
        this.setState({
          cameras: res
        });
      }
    });
  }

  handleArea = (id, ip) => {
    this.setState({ open: true, id: id, ip: ip });
  };

  render() {
    const { cameras, open, id, ip } = this.state;
    return (
      <div>
        <label className="label title is-3">Settings</label>
        <div>
          <label className="label title is-4" style={{ paddingLeft: "2rem" }}>
            Camera Management
          </label>
        </div>
        <table className="table is-fullwidth" style={{ marginTop: "2rem" }}>
          <thead>
            <tr>
              <th class="has-text-centered">Camera Id</th>
              <th class="has-text-centered">IP Camera</th>
              <th class="has-text-centered">Location</th>
              <th class="has-text-centered" style={{ width: "15%" }}>Area</th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {cameras.map(camera => (
              <tr key={camera.cam_id}>
                <td class="has-text-centered">{camera.cam_id}</td>
                <td class="has-text-centered">{camera.ip}</td>
                <td class="has-text-centered">{camera.location}</td>
                <td class="has-text-centered">
                  <p class="modal-icon filename" onClick={e => this.handleArea(camera.cam_id, camera.ip)}>
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/1705/1705697.svg"
                        alt="Area"
                        class="replaced-svg"
                        style={{ width: "8%", marginRight:'3px'}}
                      />
                    </span>
                    <span>
                      <span class="description">Manage</span>
                    </span>
                  </p>
                </td>
                <td class="has-text-centered">
                  <p class="modal-icon filename">
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/565/565492.svg"
                        alt="Delete"
                        class="replaced-svg"
                        style={{ width: "8%" }}
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={open} onClose={() => this.setState({ open: false })}>
          <div class="modal is-active">
            <div class="modal-card" style={{ width: "1300px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Area Management</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ open: false })}
                ></button>
              </header>
              <section class="modal-card-body">
                <AreaManage id={id} ip={ip} />
              </section>
              <footer
                class="modal-card-foot"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div class="field is-grouped">
                  <div class="control">
                    <button
                      type="submit"
                      className="button is-link is-success"
                      onClick={() => this.setState({ open: false })}
                    >
                      Submit
                    </button>
                  </div>
                  <div class="control">
                    <button
                      class="button is-link is-danger is-light"
                      onClick={() => this.setState({ open: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </Modal>
        <div
          class="is-fullwidth"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button class="button is-success">add</button>
        </div>
      </div>
    );
  }
}
