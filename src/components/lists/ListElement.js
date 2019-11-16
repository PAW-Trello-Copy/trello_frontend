import React, { Component } from 'react';

class ListElement extends Component {

    render(){
        return (
            <div style={styles.container}>
                <h3>{this.props.title}</h3>
                <h2>{this.props.id}</h2>
            </div>
        );
    }
}

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        textAlign: "left",
        marginLeft: 10,
        width: 300

    }
}

export default ListElement;