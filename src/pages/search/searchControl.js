import React, { Component } from "react";
import { searchVideo, uploadPicture } from "../../components/SearchFunctions";
import Pagination from "./searchResult";
import { Modal } from "react-bulma-components";
import VerifyFace from "./verifyFace";

export default class SearchControl extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      user_id: "",
      picture: null,
      pictureUrl: "",
      areaName: "",
      camera: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      result: [],
      warning: "",
      open: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickVerify = this.onClickVerify.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    this.clearState();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  selectedPictureVerify = (id) => {
    this.setState({
      user_id: id,
      warning: `User id: ${id}`,
    });
  };

  onChangePicture(e) {
    if (e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        this.setState({
          picture: e.target.files[0],
          pictureUrl: URL.createObjectURL(e.target.files[0]),
          warning: "Please verify the image with database.",
        });
      } else {
        this.setState({
          warning: "Please select file type JPG or PNG.",
        });
      }
    }
  }

  onClickVerify() {
    this.setState({
      open: true,
    });
    const data = new FormData();
    data.append("file", this.state.picture);
    uploadPicture(data);
  }

  onSubmit(e) {
    e.preventDefault();

    const search = {
      name: this.state.name,
      user_id: this.state.user_id,
      picture: this.state.picture,
      areaName: this.state.areaName,
      camera: this.state.camera,
      date: this.state.date,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
    };
    console.log(search);
    searchVideo(search).then((res) => {
      this.setState({
        result: res,
      });
    });
  }

  clearState() {
    this.setState({
      name: "",
      picture: null,
      pictureUrl: "",
      areaName: "",
      camera: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      user_id:''
    });
  }

  render() {
    const {
      name,
      picture,
      pictureUrl,
      areaName,
      camera,
      date,
      time,
      result,
      warning,
      open,
    } = this.state;
    const { status } = this.props;
    return (
      <div>
        <div>
          {/* <form onSubmit={this.onSubmit}> */}
          <div className="columns">
            <div class="column" style={{ marginLeft: "2rem" }}>
              {status === "name" ? (
                <div class="field" style={{ display: "flex" }}>
                  <label
                    class="label"
                    style={{ marginRight: "2rem", marginTop: "5px" }}
                  >
                    Name
                  </label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex" }}>
                    <label
                      class="label"
                      style={{ marginRight: "1.5rem", marginTop: "5px" }}
                    >
                      Picture
                    </label>
                    <div class="file has-name is-fullwidth">
                      <label class="file-label">
                        <input
                          class="file-input"
                          type="file"
                          name="picture"
                          onChange={this.onChangePicture}
                        />
                        <span class="file-cta">
                          <span class="file-label">Choose a file</span>
                        </span>
                        {picture && (
                          <span class="file-name">{picture.name}</span>
                        )}
                      </label>
                    </div>
                    {picture && (
                      <button class="button" onClick={this.onClickVerify}>
                        Verify
                      </button>
                    )}
                  </div>
                  {!warning == "" ? (
                    <label style={{ color: "red", paddingLeft: "4.9rem" }}>
                      {warning}
                    </label>
                  ) : (
                    <div style={{ marginBottom: "0.75rem" }} />
                  )}
                </div>
              )}
              <div
                class="field"
                style={
                  !warning == ""
                    ? { display: "flex", marginTop: "0.75rem" }
                    : { display: "flex" }
                }
              >
                <label
                  class="label"
                  style={{ marginRight: "2.6rem", marginTop: "5px" }}
                >
                  Area
                </label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter Area Name"
                    name="areaName"
                    value={areaName}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div class="field" style={{ display: "flex" }}>
                <label
                  class="label"
                  style={{ marginRight: "1.2rem", marginTop: "5px" }}
                >
                  Camera
                </label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter Number of camera"
                    name="camera"
                    value={camera}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field" style={{ display: "flex" }}>
                <label
                  class="label"
                  style={{ marginRight: "1.9rem", marginTop: "5px" }}
                >
                  Date
                </label>
                <input
                  class="input"
                  type="date"
                  name="date"
                  data-date-format="DD/MM/YYYY"
                  value={date}
                  onChange={this.onChange}
                  style={{ width: "35%" }}
                  // required
                />
              </div>
              <div class="field" style={{ display: "flex" }}>
                <label
                  class="label"
                  style={{ marginRight: "1.8rem", marginTop: "5px" }}
                >
                  Time start
                </label>
                <input
                  class="input"
                  type="time"
                  name="timeStart"
                  value={time}
                  onChange={this.onChange}
                  style={{ width: "30%" }}
                  // required
                />
              </div>
              <div class="field" style={{ display: "flex" }}>
                <label
                  class="label"
                  style={{ marginRight: "1.8rem", marginTop: "5px" }}
                >
                  Time end
                </label>
                <input
                  class="input"
                  type="time"
                  name="timeEnd"
                  value={time}
                  onChange={this.onChange}
                  style={{ width: "30%" }}
                  // required
                />
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button
                class="button is-info"
                type="submit"
                value="submit"
                onClick={this.onSubmit}
              >
                Search
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
        <Modal
          show={open}
          onClose={() => this.setState({ open: false })}
          showClose={false}
        >
          <div class="modal-card" style={{ width: "1000px" }}>
            <header class="modal-card-head">
              <p class="modal-card-title">Verify member</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => this.setState({ open: false })}
              ></button>
            </header>
            <section class="modal-card-body">
              <label class="label">Please verify the face with database.</label>
              <VerifyFace
                pictureUrl={pictureUrl}
                selectedId={this.selectedPictureVerify}
              />
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
        <Pagination result={result} />
      </div>
    );
  }
}
