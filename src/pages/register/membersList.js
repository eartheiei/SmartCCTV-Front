import React, { Component } from "react";
import axios from "axios";
import { picturePersonal } from "../../components/MemberFunctions";
import { Modal } from "react-bulma-components";

import "./register.css";

export default class MembersList extends Component {
  state = {
    members: [],
    allPage: [],
    currentResult: [],
    currentPage: 1,
    memberPicture: [],
    modalShowPicture: false,
    deleteModal: false,
    deleteMem_Id: 0,
    deleteUser_Id: "" 
  };

  componentDidMount() {
    axios.get(`/members/get`).then((res) => {
      this.setState({
        members: res.data,
      });
      const temp = [];
      var count = 1;
      for (var i = 0; i < res.data.length; i++) {
        if (i % 10 == 1) {
          temp.push(count);
          count++;
        }
      }
      this.setState({
        allPage: temp,
      });
      this.setPage(res.data, 1);
    });
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
    const { allPage, members } = this.state;
    var temp = state ? this.state.currentPage + 1 : this.state.currentPage - 1;
    if (temp > allPage[allPage.length - 1]) temp = allPage[allPage.length - 1];
    if (temp < allPage[0]) temp = allPage[0];
    this.setState({
      currentPage: temp,
    });
    this.setPage(members, temp);
  };

  onClickShowPicture = (user_id) => {
    picturePersonal(user_id).then((res) => {
      setTimeout(
        ([res.picture[0], res.picture[2]] = [res.picture[2], res.picture[0]]),
        ([res.picture[0], res.picture[3]] = [res.picture[3], res.picture[0]])
      );
      this.setState({
        memberPicture: res.picture,
        modalShowPicture: true,
      });
    });
  };

  onClickDelete = (mem_id,user_id) => {
    this.setState({
      deleteModal: true,
      deleteMem_Id: mem_id,
      deleteUser_Id: user_id
    })
  };

  onClickConfirmDelete = () => {
    const mem_id = this.state.deleteMem_Id
    this.setState({
      deleteModal: false
    })
     axios
      .post("/members/delete", { mem_id: mem_id })
      .then((res) => window.location.reload());
  }

  render() {
    const {
      members,
      currentResult,
      currentPage,
      allPage,
      modalShowPicture,
      memberPicture,
      deleteModal,
      deleteUser_Id
    } = this.state;
    return (
      <div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-centered">Member ID</th>
              <th class="has-text-centered">User ID</th>
              <th class="has-text-centered">Name</th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Picture
              </th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResult.map((count) => (
              <tr key={members[count].mem_id}>
                <td class="has-text-centered">{members[count].mem_id}</td>
                <td class="has-text-centered">{members[count].user_id}</td>
                <td class="has-text-centered">{members[count].name}</td>
                <td class="has-text-centered">
                  <p
                    class="modal-icon filename"
                    onClick={() =>
                      this.onClickShowPicture(members[count].user_id)
                    }
                  >
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/665/665629.svg"
                        alt="Picture"
                        class="replaced-svg"
                        style={{ width: "8%", marginRight: "3px" }}
                      />
                    </span>
                    <span>
                      <span class="description">Picture</span>
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
                          this.onClickDelete(members[count].mem_id,members[count].user_id)
                        }
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length >= 1 && (
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
        <Modal
          show={modalShowPicture}
          onClose={() => this.setState({ modalShowPicture: false })}
          showClose={false}
          closeOnBlur={true}
        >
          <div class="modal-card" style={{ width: "1000px" }}>
            <header class="modal-card-head">
              <p class="modal-card-title">Picture</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => this.setState({ modalShowPicture: false })}
              ></button>
            </header>
            <section class="modal-card-body has-text-centered">
              {memberPicture.map((picture) => (
                <img
                  src={`data:image/png;base64,${picture}`}
                  width="180"
                  style={{ borderRadius: "6px", marginRight: "0.5rem" }}
                />
              ))}
            </section>
          </div>
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
              <label class="label">Confirm to delete {deleteUser_Id}.</label>
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
