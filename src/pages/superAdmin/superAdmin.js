import React, { Component } from "react";
import {
  register,
  allAdmin,
  deleteAdmin,
} from "../../components/UserFunctions";
import { Modal } from "react-bulma-components";

import "./adminRegister.css";

export default class AdminRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      addModal: false,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
      user_id: "",
      area_name: "",
      deleteModal: false,
      deleteAdmin_id: 0,
      deleteEmail: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    allAdmin().then((res) => {
      this.setState({
        admins: res,
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role: this.state.role,
      user_id: this.state.user_id,
      area_name: this.state.area_name,
    };

    register(data).then(window.location.reload());
  }

  onClickDelete = (admin_id, email) => {
    this.setState({
      deleteAdmin_id: admin_id,
      deleteModal: true,
      deleteEmail: email,
    });
  };

  onClickConfirmDelete() {
    deleteAdmin(this.state.deleteAdmin_id).then(window.location.reload());
  }

  render() {
    const {
      admins,
      addModal,
      deleteAdmin_id,
      deleteModal,
      deleteEmail,
    } = this.state;
    return (
      <div>
        <label className="label title is-3">Admin Management</label>
        <div>
          <label className="label title is-4" style={{ paddingLeft: "2rem" }}>
            Admin
          </label>
        </div>
        <table className="table is-fullwidth" style={{ marginTop: "2rem" }}>
          <thead>
            <tr>
              <th class="has-text-centered">Admin id</th>
              <th class="has-text-centered">First name</th>
              <th class="has-text-centered">Last name</th>
              <th class="has-text-centered">Email</th>
              <th class="has-text-centered" style={{ width: "15%" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.cam_id}>
                <td class="has-text-centered">{admin.admin_id}</td>
                <td class="has-text-centered">{admin.first_name}</td>
                <td class="has-text-centered">{admin.last_name}</td>
                <td class="has-text-centered">{admin.email}</td>
                <td class="has-text-centered">
                  <p class="modal-icon filename">
                    <span class="icon-holder">
                      <img
                        src="https://image.flaticon.com/icons/svg/565/565492.svg"
                        alt="Delete"
                        class="replaced-svg"
                        style={{ width: "8%" }}
                        onClick={() =>
                          this.onClickDelete(admin.admin_id, admin.email)
                        }
                      />
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          class="is-fullwidth"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            class="button is-success"
            onClick={() => this.setState({ addModal: true })}
          >
            Add
          </button>
        </div>
        <Modal
          show={addModal}
          onClose={() => this.setState({ addModal: false })}
          showClose={false}
        >
          <form onSubmit={this.onSubmit}>
            <div class="modal-card" style={{ width: "700px" }}>
              <header class="modal-card-head">
                <p class="modal-card-title">Add Admin</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={() => this.setState({ addModal: false })}
                ></button>
              </header>
              <section class="modal-card-body">
                <div style={{ marginLeft: "30%" }}>
                  <div class="input-admin">
                    <label class="label input-text">Email</label>
                    <input
                      class="input button-input"
                      type="email"
                      name="email"
                      onChange={this.onChange}
                      style={{ width: "50%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">Password</label>
                    <input
                      class="input button-input"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      style={{ width: "43.5%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">User id</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="user_id"
                      onChange={this.onChange}
                      style={{ width: "47.5%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">First name</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="first_name"
                      onChange={this.onChange}
                      style={{ width: "42%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">Last name</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="last_name"
                      onChange={this.onChange}
                      style={{ width: "42.5%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">Role</label>
                    <input
                      class="input button-input"
                      type="text"
                      name="role"
                      onChange={this.onChange}
                      style={{ width: "52%" }}
                      required
                    />
                  </div>
                  <div class="input-admin">
                    <label class="label input-text">
                      Area of responsibility
                    </label>
                    <input
                      class="input button-input"
                      type="text"
                      name="area_name"
                      onChange={this.onChange}
                      style={{ width: "24%" }}
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
                    <button
                      className="button is-danger"
                      type="cancel"
                      onClick={() => this.setState({ addModal: false })}
                    >
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
              <label class="label">
                Confirm to delete Admin id {deleteAdmin_id}.
              </label>
              <label class="label">Email "{deleteEmail}"</label>
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
