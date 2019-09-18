import React, { Component, StyleSheet } from 'react'
import { TextHeader } from './common/TextHeader'

class Header extends Component {
    render() {
        return (
            <div style={styles.container}>
                Dashboard
            </div>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "#f0f3f5",
        width: "100%",
        height: "50px"
    }
};

export default Header