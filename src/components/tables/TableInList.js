import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import api from "../../networking/api";

class TableInList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigate: false,
            referrer: null,
            isInEditMode: false,
            title: props.title
        };
        this.showBoard = this.showBoard.bind(this)
    }

    showBoard() {
        this.setState({referrer: '/tableComponent'});
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    changeTitle() {
        const newTitle = this.refs.theTextInput.value;
        api.request({
            url: `/tables/${this.props.id}/update/title`,
            method: 'PUT',
            body: JSON.stringify({
                title: newTitle
            })
        })
        .then(response => {
            this.setState({
                isInEditMode: false,
                title: newTitle
            })
        })
        .catch(error => {
            console.log('failed to update title')
        })
    }

    renderEditView = () => {
        const useStyles = makeStyles(theme => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            input: {
                margin: theme.spacing(1),
                color: "white"
            },
            button: {
                margin: theme.spacing(1),
            },

        }));

        const styles = {
            container: {
                backgroundColor: "#dfe3e6",
                borderRadius: 3,
                width: 300

            },
            forbutton: {
                marginRight: 15,
                marginTop: 5
            }

        }

        return (
            <div style={styles.container}>
                <input
                    defaultValue={this.props.title}
                    ref="theTextInput"
                    />
                <div >
                    <Button style={styles.forbutton} variant="contained" color="primary" className={useStyles.button} onClick={this.changeTitle}>Ok</Button>
                    <Button style={styles.forbutton} variant="contained" color="secondary" className={useStyles.button} onClick={this.changeEditMode}>X</Button>
                </div>
            </div>);
    }

    renderDefaultView = () => {
        const styles = {
            container: {
                backgroundColor: "#dfe3e6",
                borderRadius: 3,
                textAlign: "center",
                marginLeft: 10,
                marginRight: 10,
                width: 300
                

            },
            containerForInput: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        }
        return (
            <div style={styles.container}>
                <h3 onClick={this.showBoard}>{this.state.title}</h3>
                <h4 onClick={this.changeEditMode}>Edit title </h4>           
            </div>
        );
    }

    render() {

        var tableTitle = this.props.title.replace(' ','_');
        if (this.state.referrer) return <Redirect to={this.state.referrer + '/' + tableTitle + '/' + this.props.id} push></Redirect>;

        const { isInEditMode } = this.state;

        return (
            isInEditMode ?
                this.renderEditView() :
                this.renderDefaultView()

        );
    }
}

export default TableInList;
