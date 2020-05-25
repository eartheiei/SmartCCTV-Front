import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Modal } from "react-bulma-components";
import Mapping from './mapping'

import "./search.css";

export default class Pagination extends Component {
  constructor() {
    super();

    this.state = {
      allPage: [],
      currentResult: [],
      currentPage: 1,
      playlist: [],
      index: 0,
      modal: false,
      mapModal: false,
      video_name: "",
      user_id: "",
      cam_id: 0
    };
  }

  componentDidMount() {
    this.setPage(this.props.result, 1);
  }

  componentWillReceiveProps(nextprops) {
    const temp = [];
    var count = 1;
    for (var i = 0; i < nextprops.result.length; i++) {
      if (i % 10 == 1) {
        temp.push(count);
        count++;
      }
    }
    this.setState({
      allPage: temp,
    });
    this.setPage(nextprops.result, 1);
  }

  setPage = (result, currentPage) => {
    var resultIndex = [];
    var index;
    if (currentPage * 10 > result.length) {
      index = result.length - (currentPage - 1) * 10;
    } else {
      index = currentPage * 10;
    }
    var start = index >= 10 ? index - 10 : 0 + (currentPage - 1) * 10;
    const end = index >= 10 ? 10 : index;

    for (var i = 0; i < end; i++) {
      resultIndex[i] = start;
      start++;
    }

    this.setState({
      currentResult: resultIndex,
      currentPage: currentPage,
    });
  };

  onClickPage = (state) => {
    const { allPage } = this.state;
    var temp = state ? this.state.currentPage + 1 : this.state.currentPage - 1;
    if (temp > allPage[allPage.length - 1]) temp = allPage[allPage.length - 1];
    if (temp < allPage[0]) temp = allPage[0];
    this.setState({
      currentPage: temp,
    });
    this.setPage(this.props.result, temp);
  };

  onChangeCheckBox = (video_name) => {
    const temp = this.state.playlist;
    if (temp.includes(video_name)) {
      temp.splice(temp.indexOf(video_name), 1);
    } else {
      temp.push(video_name);
    }
    this.setState({ playlist: temp });
  };

  _setIndex = (id) => {
    this.setState({
      index: id,
    });
  };

  onEnded = () => {
    this.setState(({ index }) => {
      if (index + 1 === this.state.playlist.length) {
        this.setState({ index: 0 });
      } else {
        this.setState({ index: index + 1 });
      }
    });
  };

  onClickMapping = (user_id, video_name,cam_id) => {
    this.setState({
      mapModal: true,
      user_id: user_id,
      video_name: video_name,
      cam_id: cam_id
    });
  };

  render() {
    const {
      allPage,
      currentResult,
      currentPage,
      playlist,
      modal,
      index,
      user_id,
      video_name,
      mapModal,
      cam_id
    } = this.state;
    const { result } = this.props;
    return (
      <div style={{ marginTop: "2rem" }}>
        <label class="label">Result({result.length})</label>
        <table class="table is-fullwidth" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th></th>
              <th class="has-text-centered">Camera id</th>
              <th class="has-text-centered">Video name</th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Mapping
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResult.map((element) => (
              <tr key={result[element].tran_id}>
                <td class="has-text-centered">
                  <input
                    type="checkbox"
                    onChange={() =>
                      this.onChangeCheckBox(result[element].video_name)
                    }
                  />
                </td>
                <td class="has-text-centered">{result[element].cam_id}</td>
                <td class="has-text-centered">{result[element].video_name}</td>
                <td class="has-text-centered">
                  <p
                    class="modal-icon filename"
                    onClick={() => {
                      this.onClickMapping(
                        result[element].user_id,
                        result[element].video_name,
                        result[element].cam_id
                      );
                    }}
                  >
                    <span class="icon-holder">
                      <img
                        src="https://www.flaticon.com/premium-icon/icons/svg/519/519846.svg"
                        alt="Delete"
                        class="replaced-svg"
                        style={{ width: "8%", marginRight: "3px" }}
                      />
                    </span>
                    <span>
                      <span class="description">Map</span>
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {result.length >= 1 && (
          <nav
            class="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <a
              class="pagination-previous"
              onClick={() => this.onClickPage(false)}
            >
              Previous
            </a>
            <a class="pagination-next" onClick={() => this.onClickPage(true)}>
              Next page
            </a>
            <ul class="pagination-list">
              <li>
                <label class="label pagination-link">
                  {currentPage}/{allPage[allPage.length - 1]}
                </label>
              </li>
            </ul>
          </nav>
        )}
        {playlist.length >= 1 && (
          <div class="has-text-centered" style={{ marginTop: "3rem" }}>
            <button
              class="button is-success"
              onClick={() => this.setState({ modal: true })}
            >
              Play
            </button>
          </div>
        )}
        <Modal
          show={modal}
          onClose={() => this.setState({ modal: false })}
          showClose={false}
          closeOnBlur={true}
        >
          <div class="modal-card" style={{ width: "1000px" }}>
            <header class="modal-card-head">
              <p class="modal-card-title">Video playlist</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => this.setState({ modal: false })}
              ></button>
            </header>
            <section
              class="modal-card-body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div>
                {playlist.length > 0 &&
                  playlist.map((url) => {
                    const playing = this.state.index === playlist.indexOf(url);
                    return (
                      <ReactPlayer
                        url={require(`../../../../SmartCCTV-Back/uploads/searchs/video/${url}.mp4`)}
                        className={playing ? null : "hidden"}
                        playing={playing}
                        controls
                        onEnded={this.onEnded}
                        width="640px"
                        height="480px"
                      />
                    );
                  })}
              </div>
              <div class="playlist-box">
                {playlist.map((video, index) => (
                  <div
                    class="playlist-name"
                    onClick={() => this._setIndex(index)}
                  >
                    <label class="label" style={{ color: "white" }}>
                      {video}.avi
                    </label>
                  </div>
                ))}
              </div>
            </section>
            <footer
              class="modal-card-foot"
              style={{ display: "flex", justifyContent: "center" }}
            ></footer>
          </div>
        </Modal>
        <Modal
          show={mapModal}
          onClose={() => this.setState({ mapModal: false })}
          showClose={false}
          closeOnBlur={true}
        >
          <div class="modal-card" style={{ width: "1100px" }}>
            <header class="modal-card-head">
            <p class="modal-card-title">Video Mapping</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => this.setState({ mapModal: false })}
              ></button>
            </header>
            <section
              class="modal-card-body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Mapping user_id={user_id} video_name={video_name} cam_id={cam_id}/>
            </section>
          </div>
        </Modal>
      </div>
    );
  }
}
