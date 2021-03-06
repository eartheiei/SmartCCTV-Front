import React, { Component } from "react";
import {
  getCamera,
  deleteCam,
  addCamera,
} from "../../components/SettingFunction";
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
      ip: "",
      modalAddCam: false,
      camID: "",
      camLocation: "",
      camSpec: "",
      deleteCam_id: 0,
      deleteCam_ip: "",
      deleteModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //api
    getCamera().then((res) => {
      if (res) {
        this.setState({
          cameras: res,
        });
      }
    });
  }

  handleArea = (id, ip) => {
    this.setState({ open: true, id: id, ip: ip });
  };

  onClickConfirmDelete() {
    deleteCam(this.state.deleteCam_id).then((res) => window.location.reload());
  }

  onClickDelete = (id, ip) => {
    this.setState({
      deleteModal: true,
      deleteCam_id: id,
      deleteCam_ip: ip,
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const camera = {
      ip: this.state.camID,
      location: this.state.camLocation,
      spec: this.state.camSpec,
    };

    addCamera(camera).then(window.location.reload());
  }

  render() {
    const {
      cameras,
      open,
      id,
      ip,
      modalAddCam,
      deleteCam_ip,
      deleteCam_id,
      deleteModal,
    } = this.state;
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
              <th class="has-text-centered" style={{ width: "15%" }}>
                Area
              </th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.cam_id}>
                <td class="has-text-centered">{camera.cam_id}</td>
                <td class="has-text-centered">{camera.ip}</td>
                <td class="has-text-centered">{camera.location}</td>
                <td class="has-text-centered">
                  <p
                    class="modal-icon filename"
                    onClick={(e) => this.handleArea(camera.cam_id, camera.ip)}
                  >
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/1705/1705697.svg"
                        alt="Area"
                        class="replaced-svg"
                        style={{ width: "8%", marginRight: "3px" }}
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
                        onClick={() =>
                          this.onClickDelete(camera.cam_id, camera.ip)
                        }
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          show={open}
          onClose={() => this.setState({ open: false })}
          showClose={false}
        >
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
        </Modal>
        <div
          class="is-fullwidth"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            class="button is-success"
            onClick={() => this.setState({ modalAddCam: true })}
          >
            Add
          </button>
        </div>
        <Modal
          show={modalAddCam}
          onClose={() => this.setState({ modalAddCam: false })}
          showClose={false}
        >
          <form onSubmit={this.onSubmit}>
            <div class="modal-card" style={{ width: "700px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Add Camera</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ modalAddCam: false })}
                ></button>
              </header>
              <section class="modal-card-body">
                <div style={{ marginLeft: "30%" }}>
                  <div class="input-camera">
                    <label class="label input-text">IP Camera</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="camID"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div class="input-camera">
                    <label class="label input-text">Location</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="camLocation"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div class="input-camera">
                    <label class="label input-text">Spec Camera</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="camSpec"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <div className="is-grouped center" style={{ width: "100%" }}>
                  <div className="control">
                    <button className="button is-success" type="submit">
                      Submit
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-danger" type="cancel">
                      Cancel
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </form>
        </Modal>
        <Modal
          show={deleteModal}
          onClose={() => this.setState({ deleteModal: false })}
          showClose={false}
          closeOnBlur={true}
        >
          <div class="modal-card" style={{ width: "500px" }}>
            <header class="modal-card-head">
              <p class="modal-card-title">Delete</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => this.setState({ deleteModal: false })}
              ></button>
            </header>
            <section class="modal-card-body has-text-centered">
              <label class="label">Confirm to delete cam id {deleteCam_id}.</label>
              <label class="label">Camera ip is {deleteCam_ip}.</label>
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
                    onClick={() => this.onClickConfirmDelete()}
                  >
                    Submit
                  </button>
                </div>
                <div class="control">
                  <button
                    class="button is-link is-danger is-light"
                    onClick={() => this.setState({ deleteModal: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </Modal>
      </div>
    );
  }
}
