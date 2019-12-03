import React, { Component } from 'react';
import {Modal, ModalHeader} from 'reactstrap';
import '../../style/ArciveCard.css'
import Icon from '@material-ui/core/Icon';
import ListArchived from '../archivecard/ListArchived'
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
                <Icon color="secondary" onClick={this.showCardModal} >archive</Icon>
                 <Modal isOpen={this.state.showModal}  className="CartModal">
                     <h4>Card Archived</h4>
                    <ModalHeader>                        
                       <ListArchived title={this.props.title} id={this.props.id} listId={this.props.listId}/>
                    </ModalHeader>                    
                    <div className="button_group">         
                       
                        <button color="primary"onClick={this.closeCartModal} className="closeButton_cartModal">Close</button>
                    </div>
                </Modal>
            </div>
        )}
}
export default ArciveCard;