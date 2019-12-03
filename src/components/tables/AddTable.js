import React, { Component } from "react";
//import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import api from "../../networking/api";
import '../../style/AddTable.css';


class AddTable extends Component {


    constructor(props) {
        super(props);
        this.addConfirmed = this.addConfirmed.bind(this);
       // this.listCardArchive = this.listCardArchive.bind(this);
      }
    state = {
        title: "",
        isInEditMode: false
        //listArchiveMode: false

    };
    addTableMode = () => {      

        return (
            <div className="AddTable">
                <input className="forInput"
                    defaultValue={this.state.value}
                    ref="TableTitleInput"
                />
                <div >
                    <Button  variant="contained" color="primary" className="forButton" onClick={this.addConfirmed}>Ok</Button>
                    <Button  variant="contained" color="secondary" className="forButton" onClick={this.changeEditMode}>X</Button>
                </div>
            </div>);
    }
    // showListArchive = () => {      

    //     return (
    //         <div className="Archive">              
                
    //                 <div className="closeButton">                        
    //                     <Button  variant="contained" color="secondary" className="forButton" onClick={this.listaArchive}>X</Button>
    //                 </div>
    //                 <div  className="CardElem">
    //                     <h3>{this.props.title}</h3> 
    //                 </div>
                    
                   
    //         </div>);
    // }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    // listaArchive = () => {
    //     this.setState({
    //         listArchiveMode: !this.state.listArchiveMode
    //     })
    // }

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

    // listCardArchive() {
    //   /// let  lists=this.props.title;
    //     api.request({
    //         url: `/lists/${this.props.id}/cards?archived=true`,
    //         method: 'GET'          
    //     })
    //     .catch(error => {console.log("failed to update card's archive")});
    // }
    

    rederAddButtonTable = () => {
        return (
            <div className="buttonTable" >
                <div className="addButton"><Button  variant="contained" color="secondary" className="addButton" onClick={this.changeEditMode}>Add Table</Button></div>
               {/* <div className="archiveButton"> <Button  variant="contained" color="secondary" className="archiveButton" onClick={this.listaArchive}>Archive</Button></div> */}
            </div>
            
        );
    }

    render() {
        const { isInEditMode } = this.state;
        return (
            isInEditMode ?
                this.addTableMode():
                this.rederAddButtonTable()

            // listArchiveMode ?
            //     this.showListArchive() && this.listCardArchive() :
            //     this.rederAddButtonTable()

        );
    }
}

export default AddTable;