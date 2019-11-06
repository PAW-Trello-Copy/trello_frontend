import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";


class ListInTable extends Component {

    constructor(props) {
        super(props)
    }

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

export default ListInTable;