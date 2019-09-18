import React, { Component, StyleSheet} from "react";
import { TextHeader, Button } from './common';

class SideBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <TextHeader>SmartCCTV</TextHeader>
        <Button style={styles.itemLink}>Test</Button> 
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "grey",
    width: "20%",
    height: "100vh",
    position: "fixed"
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    backgroundColor: "transparent",
  },
};

export default SideBar;
