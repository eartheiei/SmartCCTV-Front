import React, { Component } from 'react';
import LoginForm from './pages/loginForm'
import { Route } from 'react-router-dom'

export default class App extends Component {
  render(){
    return(
      // <div style={{display:"flex", flexDirection: "column"}}>
      //   <Header />
      //   <div>
      //     <SideBar />
      //   </div>
      // </div>
      // <div>
      //   <LoginForm />
      // </div>
      <div className="App container">
        <Route exact path="/" component={LoginForm} />
      </div>
    )
  }
}
