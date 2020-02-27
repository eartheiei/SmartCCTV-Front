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
      id: 0
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

  handleArea = id => {
    this.setState({ open: true, id: id });
  };

  render() {
    const { cameras, open, id } = this.state;
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
              <th class="has-text-centered">Area</th>
              <th class="has-text-centered">Edit</th>
              <th class="has-text-centered">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map(camera => (
              <tr key={camera.cam_id}>
                <td class="has-text-centered">{camera.cam_id}</td>
                <td class="has-text-centered">{camera.ip}</td>
                <td class="has-text-centered">{camera.location}</td>
                <td class="has-text-centered">
                  <a
                    class="textOnClick"
                    onClick={e => this.handleArea(camera.cam_id, e)}
                  >
                    Area
                  </a>
                </td>
                <td class="textOnClick has-text-centered">Edit</td>
                <td class="textOnClick has-text-centered">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={open} onClose={() => this.setState({ open: false })}>
          <div class="modal is-active">
            <div class="modal-card" style={{ width: "1200px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Area Management</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ open: false })}
                ></button>
              </header>
              <section class="modal-card-body">
                <AreaManage id={id}/>
              </section>
              <footer class="modal-card-foot" style={{display:"flex", justifyContent:"center"}}>
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
