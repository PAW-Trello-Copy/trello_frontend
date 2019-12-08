import React, { Component } from 'react';
import {Modal, ModalHeader} from 'reactstrap';
import '../../style/ArciveCard.css'
import Icon from '@material-ui/core/Icon';
import ListArchived from '../archivecard/ListArchived'
import Fab from "@material-ui/core/Fab";
import IconButton from '@material-ui/core/IconButton';
class ArciveCard extends Component {

    state = {
        showModal: false,        
        isLoading: true
       
        
    }
    constructor(props) {
        super(props);
        this.closeCartModal = this.closeCartModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
       
       
    }


    showCardModal(){    

       this.setState({showModal: true})
        
    }


    closeCartModal(){
        this.setState({showModal: false});
    }
     
    render(){
        
        return (
            <div>
                 <IconButton  aria-label="edit" color="secondary">    
                <Icon color="secondary" onClick={this.showCardModal} >archive</Icon>
                </IconButton>
                <div className="CartModal1">
                 <Modal isOpen={this.state.showModal}  className="CartModal">
                     <h4>Card Archived</h4>
                     <div className="buttonClose">
                <Fab color="secondary" onClick={this.closeCartModal}>
                <Icon  >close</Icon>
                </Fab></div>
                    <ModalHeader>                        
                       <ListArchived title={this.props.title} id={this.props.id} listId={this.props.listId}/>
                    </ModalHeader>                    
                    
                </Modal>
                </div>
            </div>
        )}
}
export default ArciveCard;