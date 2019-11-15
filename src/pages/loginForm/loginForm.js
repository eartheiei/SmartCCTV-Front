import React from "react";
import auth from "../../firebase";
import Home from "../home";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        });
      }
    });
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          current: response.user
        });
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  logout = e => {
    e.preventDefault();
    auth.signOut().then(response => {
      this.setState({
        currentUser: null
      });
    });
    console.log("logout Done!");
  };

  render() {
    const { message, currentUser } = this.state;

    if (currentUser) {
      console.log(currentUser);
      return (
        <div>
          <Home logout={this.logout} currentUser={this.state.currentUser} />
        </div>
      );
    }

    return (
      <div>
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <label className="title is-1">Smart CCTV</label>
              </div>
              <div className="columns is-centered">
                <div className="column is-half">
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          name="password"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    {message ? (
                      <p className="help is-danger">{message}</p>
                    ) : null}
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link">Submit</button>
                      </div>
                      <div className="control">
                        <button className="button is-text">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <section className="hero is-primary">
            <div className="hero-body">
            </div>
          </section>
        </footer>
      </div>
    );
  }
}

export default LoginForm;
