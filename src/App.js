import React, { Component } from 'react';
import Header from './components/header'
import SideBar from './components/sideBar'

export default class App extends Component {
  render(){
    return(
      <div style={{display:"flex", flexDirection: "column"}}>
        <Header />
        <SideBar />
      </div>
    )
  }
}
