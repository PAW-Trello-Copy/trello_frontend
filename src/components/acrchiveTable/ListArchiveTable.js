import React, { Component } from "react";
import { Button } from '@material-ui/core';
import {Modal, ModalHeader} from 'reactstrap';
import '../../style/AddTable.css';
import ListArchivedComponentTables from './ListArchivedComponentTables'
import Icon from '@material-ui/core/Icon';
import Fab from "@material-ui/core/Fab";


class ListArchiveTable extends Component {

        state={
            showModal: false,
        }

        constructor(props) {
            super(props);
            this.closeTableModal = this.closeTableModal.bind(this);
            this.showTableModal = this.showTableModal.bind(this);
           
        } 

        showTableModal(){    

            this.setState({showModal: true})
             
         }
     
     
         closeTableModal(){
             this.setState({showModal: false});
         }
 
   

    render(){
        return(
            <div>
            <div className="archiveButton">
                 <Button  variant="contained" color="secondary" className="archiveButton" onClick={this.showTableModal}>Archive</Button>
            </div> 
            <div className="CartModal1">
                <Modal isOpen={this.state.showModal}  className="CartModal">
                 <h4>Card Archived</h4>
                 <div className="buttonClose">
                <Fab color="secondary" onClick={this.closeTableModal}>
                <Icon  >close</Icon>
                </Fab></div>
                 <ModalHeader >                        
                    <ListArchivedComponentTables title={this.props.title} id={this.props.id} /> 
                 </ModalHeader>  
                </Modal>
               </div>
       </div>
            );
    }
}

export default ListArchiveTable;