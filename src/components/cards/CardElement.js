import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../../style/CardElement.css'
import api from '../../networking/api';
import AttachmentCard from '../attachmentCard/AttachmentCard'

class CardElement extends Component {

    state = {
        showModal: false
       
    }

    constructor(props) {
        super(props);
        this.closeCartModal = this.closeCartModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.archiveCard = this.archiveCard.bind(this);
       
    }

    showCardModal(){
        this.setState({showModal: true});
    }


    closeCartModal(){
        this.setState({showModal: false});
    }

    showEditLayout(){
        document.getElementsByClassName("saveButton_cartModal")[0].classList.replace("hide_element","display_element");
        document.getElementsByClassName("editButton_cartModal")[0].classList.replace("display_element","hide_element");
        document.getElementById("cart_title_input").classList.replace("hide_element","display_element");
        document.getElementsByClassName("cart_title")[0].classList.replace("display_element","hide_element");
        document.getElementById("cart_description_input").classList.replace("hide_element","display_element");
        document.getElementsByClassName("cart_description")[0].classList.replace("display_element","hide_element");
    }

    hideEditLayout(){
        document.getElementsByClassName("saveButton_cartModal")[0].classList.replace("display_element","hide_element");
        document.getElementsByClassName("editButton_cartModal")[0].classList.replace("hide_element","display_element");
        document.getElementById("cart_title_input").classList.replace("display_element","hide_element");
        document.getElementsByClassName("cart_title")[0].classList.replace("hide_element","display_element");
        document.getElementById("cart_description_input").classList.replace("display_element","hide_element");
        document.getElementsByClassName("cart_description")[0].classList.replace("hide_element","display_element");
    }

    saveCard(){
        var newCardTitle = document.getElementById("cart_title_input").value;
        var newCardDescription = document.getElementById("cart_description_input").value;
        if(newCardTitle !== this.props.title){
            api.request({
                url: `/cards/${this.props.id}/update/title`,
                method: 'PUT',
                body: JSON.stringify({
                    title: newCardTitle
                })
            })
            .catch(error => {console.log("failed to update card's title")});
        }
        if(newCardDescription !== this.props.description){
            api.request({
                url: `/cards/${this.props.id}/update/description`,
                method: 'PUT',
                body: JSON.stringify({
                    description: newCardDescription
                })
            })
            .catch(error => {console.log("failed to update card's title")});
        }
        this.hideEditLayout();
        this.props.callback();
    }
    archiveCard(){
       
        api.request({
            url: `/cards/${this.props.id}/update/archived`,            
            method: 'PUT',
            body: JSON.stringify({
                archived: true
            })
            
        })
        .catch(error => {console.log("failed to update card's archive")});
       
       this.props.callback();
    }
    render(){
        return (
            <div>
                <div onClick={this.showCardModal} className="CardElement">
                    <h3>{this.props.title}</h3>
                    
                </div>
                <Modal isOpen={this.state.showModal} className="CartModal">
                    <ModalHeader>
                        <textarea id="cart_title_input" className="hide_element" defaultValue={this.props.title}/>
                        <div className="cart_title display_element">{this.props.title}</div>
                    </ModalHeader>
                    <ModalBody>
                        <textarea id="cart_description_input" className="hide_element" defaultValue={this.props.description}/>
                        <div className="cart_description display_element">{this.props.description}</div>
                    </ModalBody>
                    <div className="button_group">
                        <AttachmentCard/>
                        <button color="primary" onClick={this.saveCard} className="saveButton_cartModal hide_element">Save</button>
                        <button color="primary" onClick={this.archiveCard} className="editButton_cartModal display_element">Archive</button>
                        <button color="primary" onClick={this.showEditLayout} className="editButton_cartModal display_element">Edit</button>
                        <button color="primary" onClick={this.closeCartModal} className="closeButton_cartModal">Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CardElement;