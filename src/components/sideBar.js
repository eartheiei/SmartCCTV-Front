import React, { Component } from "react";
import { TextHeader, Button, Row } from "./common";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from '@material-ui/icons/Search';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';

class SideBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Button style={styles.itemLink}>
          <Row style={{ justifyContent: "center", alignItem: "center" }}>
            <DashboardIcon style={styles.icon} />
            <TextHeader>Dashboard</TextHeader>
          </Row>
        </Button>

        <Button style={styles.itemLink}>
          <Row style={{ justifyContent: "center", alignItem: "center" }}>
            <SearchIcon style={styles.icon} />
            <TextHeader>Search</TextHeader>
          </Row>
        </Button>

        <Button style={styles.itemLink}>
          <Row style={{ justifyContent: "center", alignItem: "center" }}>
            <PermIdentityIcon style={styles.icon} />
            <TextHeader>Register</TextHeader>
          </Row>
        </Button>

        <Button style={styles.itemLink}>
          <Row style={{ justifyContent: "center", alignItem: "center" }}>
            <SettingsIcon style={styles.icon} />
            <TextHeader>Setting</TextHeader>
          </Row>
        </Button>

      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#23282c",
    width: "20%",
    height: "100%",
    position: "fixed"
  },
  itemLink: {
    color: "white",
    width: "auto",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    cursor:"pointer",
    backgroundColor: "#2f353a", //"transparent",
    ':hover' : {
      backgroundColor: "#2f353a"
    }
  },
  icon: {
    marginRight: "15px"
  }
};

export default SideBar;
