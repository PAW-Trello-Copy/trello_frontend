import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';



class TableInListOfTables extends Component {
    state = {

        isInEditMode: false

    };
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
        console.log("dsfd");
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            title: this.refs.theTextInput.title
        })
    }

    rederEditView = () => {
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

            },
            forbutton: {
                marginRight: 15,
                marginTop: 5
            }

        }

        return (
            <div style={styles.container}>
                <Input
                    defaultValue={this.props.title}
                    ref="theTextInput"
                    variant="outlined"
                    className={useStyles.input}
                    inputProps={{
                        'aria-label': 'description',
                    }} />
                <div >
                    <Button style={styles.forbutton} variant="contained" color="secondary" className={useStyles.button} onClick={this.changeEditMode}>Ok</Button>
                    <Button style={styles.forbutton} variant="contained" color="secondary" className={useStyles.button} onClick={this.updateComponentValue}>X</Button>
                </div>
            </div>);
    }

    rederDefaultView = () => {
        const styles = {
            container: {
                backgroundColor: "#dfe3e6",
                borderRadius: 3,
                textAlign: "left",
                marginLeft: 10,
                width: 300

            },
            containerForInput: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        }
        return (

            <div style={styles.container}>
                <h3 onDoubleClick={this.changeEditMode}>{this.props.title}</h3>
                <h2> {this.props.id}</h2>
            </div>
        );
    }

    render() {


        const { isInEditMode } = this.state;

        return (
            isInEditMode ?
                this.rederEditView() :
                this.rederDefaultView()

        );
    }



}

export default TableInListOfTables;



