import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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

    titleChangeConfirmed = () => {
       console.log(this.refs.theTextInput.value);

       var url = 'https://paw-trello-backend.herokuapp.com/tables/' + this.props.id + '/update/title'
       fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.refs.theTextInput.value
            })
        }).then( response => {
            console.log(response)
            if (response.ok) {
                this.setState({
                    isInEditMode: false,
                    title: this.refs.theTextInput.value
                })
            }
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
                    <Button style={styles.forbutton} variant="contained" color="primary" className={useStyles.button} onClick={this.titleChangeConfirmed}>Ok</Button>
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
