import React, { Component } from "react";
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import api from "../../networking/api";

class AddTable extends Component {

    state = {
        title: "",
        isInEditMode: false

    };
    addTableMode = () => {
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
                textAlign: "center",
                marginTop: 8,
                marginLeft: 8,
                width: 250

            },
            forbutton: {
                marginRight: 15,
                marginTop: 5
            }

        }

        return (
            <div style={styles.container}>
                <input
                    defaultValue={this.state.value}
                    ref="TableTitleInput"
                />
                <div >
                    <Button style={styles.forbutton} variant="contained" color="primary" className={useStyles.button} onClick={this.addConfirmed}>Ok</Button>
                    <Button style={styles.forbutton} variant="contained" color="secondary" className={useStyles.button} onClick={this.changeEditMode}>X</Button>
                </div>
            </div>);
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    reloadTables() {
        this.props.fetchTables();
    }

    addConfirmed() {
        let tableTitle = this.refs.TableTitleInput.value
        api.request({
            url: '/tables/create',
            method: 'POST',
            body: JSON.stringify({
                title: tableTitle
            })
        })
        .then(response => {
            this.reloadTables()
            this.setState({
                isInEditMode: false,
                title: tableTitle
    
            })
        })
        .catch(error => {
            console.log('failed to add table')
        })
    }

    rederAddButtonTable = () => {
        return (
            <div >
                <button className="addButton" onClick={this.changeEditMode}>Add Table</button>
            </div>
        );
    }

    render() {
        const { isInEditMode } = this.state;
        return (
            isInEditMode ?
                this.addTableMode() :
                this.rederAddButtonTable()

        );
    }
}

export default AddTable;