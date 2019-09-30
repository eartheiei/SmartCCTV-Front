import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div style={styles.container}>
                Header
            </div>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "#f0f3f5",
        width: "100%",
        height: "60px"
    }
};

export default Header