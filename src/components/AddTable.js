import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class AddTable extends Component {

    state = {
        value: "new table",
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
                width: 300

            },
            forbutton: {
                marginRight: 15,
                marginTop: 5
            }

        }

        return (
            <div style={styles.container}>
                <Input
                    defaultValue={this.state.value}
                    ref="theTextInput"
                    variant="outlined"
                    className={useStyles.input}
                    inputProps={{
                        'aria-label': 'description',
                    }} />
                <div >
                    <Button style={styles.forbutton} variant="contained" color="primary" className={useStyles.button} onClick={this.updateComponentValue}>Ok</Button>
                    <Button style={styles.forbutton} variant="contained" color="secondary" className={useStyles.button} onClick={this.changeEditMode}>X</Button>
                </div>
            </div>);
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
        console.log("dsfd");
    }

    updateComponentValue = () => {
       
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
            
        })

        const styles = {
            container: {
                backgroundColor: "#dfe3e6",
                borderRadius: 3,
                textAlign: "center",
                marginLeft: 10,
                marginRight: 10,
                width: 300
                

            },
          
        }
        return (
            <div style={styles.container}>
                <h3 >{this.props.value}</h3>               
            </div>
        );
        
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
            isInEditMode?
            this.addTableMode():            
            this.rederAddButtonTable()

        );
    }
}

export default AddTable;