import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      picture: null,
      areaName: "",
      camera: "",
      date: new Date(),
      time: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const search = {
      name: this.state.name,
      picture: this.state.picture,
      areaName: this.state.areaName,
      camera: this.state.camera,
      date: this.state.date,
      time: this.state.time
    };
    console.log(search);
    //axios
  }

  clearState() {
      this.setState({
        name: "",
        picture: null,
        areaName: "",
        camera: "",
        date: new Date(),
        time: ""
      })
  }

  render() {
    const { name, picture, areaName, camera, date, time } = this.state;
    return (
      <div>
        <label className="label" style={{ marginBottom: "1rem" }}>
          Search
        </label>
        <div className="columns">
          <div class="column" style={{ marginLeft: "2rem" }}>
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
            <div className="field" style={{ display: "flex" }}>
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
                    value={picture}
                    onChange={this.onChange}
                  />
                  <span class="file-cta">
                    <span class="file-label">Choose a file</span>
                  </span>
                  <span class="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                  </span>
                </label>
              </div>
            </div>
            <div class="field" style={{ display: "flex" }}>
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
                style={{width:"50%"}}
              />
            </div>
            <div class="field" style={{ display: "flex" }}>
              <label
                class="label"
                style={{ marginRight: "1.8rem", marginTop: "5px" }}
              >
                Time
              </label>
              <input
                class="input"
                type="time"
                name="time"
                value={time}
                onChange={this.onChange}
                style={{width:"50%"}}
              />
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-info" onClick={this.onSubmit}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}
