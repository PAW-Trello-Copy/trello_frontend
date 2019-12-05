import React, { Component } from "react";
import { Button } from '@material-ui/core';
import {Modal, ModalHeader} from 'reactstrap';
import '../../style/AddTable.css';
import ListArchivedComponentTables from './ListArchivedComponentTables'



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
        
                <Modal isOpen={this.state.showModal}  className="CartModal">
                 <h4>Card Archived</h4>
                 <ModalHeader >                        
                    <ListArchivedComponentTables title={this.props.title} id={this.props.id} /> 
                 </ModalHeader>                    
                   <div className="button_group">         
              
                <button color="primary"onClick={this.closeTableModal} className="closeButton_cartModal">Close</button>
           </div>
                </Modal>
       </div>
            );
    }
}

export default ListArchiveTable;