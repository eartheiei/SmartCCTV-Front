import React, { Component } from 'react'
import { Route , NavLink} from 'react-router-dom'
import LoginForm from '../loginForm'

const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // onClicklogout = () => (
    //     this.props.logout()

    // )

  render() {
    return (
      <div className="my-app">
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              {/* <a className="navbar-item">
                <img src="../../asset/cctv.png" alt="CCTV LOGO" width="28" height="28" />
              </a> */}
            </div>
            <div className="navbar-end">
                <NavLink to="/home" activeClassName="is-active" className="navbar-item">Home</NavLink>
                <NavLink to="/post" activeClassName="is-active" className="navbar-item">Post</NavLink>
                <NavLink to="/project" activeClassName="is-active" className="navbar-item">Project</NavLink>
                <NavLink to="/about" activeClassName="is-active" className="navbar-item">About</NavLink>
                {/* <a onClick={this.onClicklogout()} className="navbar-item">Logout</a> */}
            </div>
          </div>
        </nav>
        <div className="App container">
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/post" component={Post} />
          <Route path="/project" component={Project} />
          {/* <Route path="/" component={LoginForm} /> */}
        </div>
      </div>
    )
  }
}

export default Home