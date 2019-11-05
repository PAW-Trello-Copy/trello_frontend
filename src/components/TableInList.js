import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";


class TableInList extends Component {

        constructor(props) {
            super(props)
            this.state = {
                navigate: false,
                referrer: null,
            };
            this.showBoard = this.showBoard.bind(this)
        }

        showBoard() {
            console.log('aaa');
            this.setState({referrer: '/tableComponent'});
        }

        render(){
        if (this.state.referrer) return <Redirect to={this.state.referrer}></Redirect>;
            return (
                <div onClick={this.showBoard} style={styles.container}>
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

export default TableInList;