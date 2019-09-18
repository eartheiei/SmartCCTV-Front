import React, { Component, StyleSheet } from 'react'
import { TextHeader } from './common/TextHeader'

class Header extends Component {
    render() {
        return (
            <div style={styles.container}>
                <TextHeader>
                    Dashboard
                </TextHeader>
            </div>
        )
    }
}

const styles = {
    container: {
        backgroundColor: "red",
        width: "100%",
        height: "50px"
    }
};

export default Header