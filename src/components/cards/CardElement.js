import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../../style/CardElement.css'
import api from '../../networking/api';
import AttachmentCard from '../attachmentCard/AttachmentCard'
import ShowAttchment from '../attachmentCard/ShowAttchment'
import CardComment from "./CardComment"


class CardElement extends Component {

    state = {

        showModal: false,
        isLoading: true,
        comments: [],
        error: null

    }

    constructor(props) {
        super(props);
        this.closeCartModal = this.closeCartModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.getComments = this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.refreshCardElementComponent = this.refreshCardElementComponent.bind(this);
    }

    componentDidMount() {
        this.getComments();
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
            api.request({
                url: `/cards/${this.props.id}/update/title`,
                method: 'PUT',
                body: JSON.stringify({
                    title: newCardTitle
                })
            })
            .catch(error => {console.log("failed to update card's title")});
            api.request({
                url: `/cards/${this.props.id}/update/description`,
                method: 'PUT',
                body: JSON.stringify({
                    description: newCardDescription
                })
            })
            .catch(error => {console.log("failed to update card's title")});
        window.location.reload(false);
    }

    deleteCard(){
        api.request({
            url: `/cards/${this.props.id}`,
            method: 'DELETE',
            body: JSON.stringify({

            })
        })
        .catch(error => {console.log("failed to delete card")});
        window.location.reload(false);
    }

    getComments(){
        api.request({
            url: `/cards/${this.props.id}/comments`
        })
        .then(comments => {
            this.setState({
                comments: comments,
                isLoading: false
            })
        })
    }

    addComment(){
        var newCommentText = document.getElementById("new_comment_"+this.props.id).value;
        api.request({
            url: '/comments/create',
            method: 'POST',
            body: JSON.stringify({
                cardId: this.props.id,
                text: newCommentText,
            })
        })
        .then(result => this.getComments())
        .catch(error => {console.log("failed to add new comment")});
        document.getElementById("new_comment_"+this.props.id).value = "";
    }

    refreshCardElementComponent(){
        this.getComments();
        this.setState({ state: this.state });
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
        const { isLoading, comments } = this.state
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
                        <ShowAttchment title={this.props.title} id={this.props.id}/>
                    </ModalBody>

                    <div className="Attchment">
                    <AttachmentCard title={this.props.title} id={this.props.id}/>
                    </div>         
                    <div className="button_group">
                        <button color="primary" onClick={this.deleteCard} className="deleteButton_cartModal">Delete</button>
                        <button color="primary" onClick={this.saveCard} className="saveButton_cartModal hide_element">Save</button>
                        <button color="primary" onClick={this.archiveCard} className="editButton_cartModal display_element">Archive</button>
                        <button color="primary" onClick={this.showEditLayout} className="editButton_cartModal display_element">Edit</button>
                        <button color="primary" onClick={this.closeCartModal} className="closeButton_cartModal">Close</button>
                    </div>
                    <div className="comments_block">
                        {!isLoading ? (
                            comments.map(comment => {
                                const { id, text, cartId, userId, ownerName, ownedByUser } = comment;
                                return (<CardComment id={id} text={text} cartId={cartId} userId={userId} ownerName={ownerName}
                                    ownedByUser={ownedByUser} callback={this.refreshCardElementComponent}/>);
                            })
                        ) : (
                            <h3>Loading comments...</h3>
                        )}
                        <div>
                            <textarea id={"new_comment_"+this.props.id} className="new_comment display_element"/>
                        </div>
                        <div>
                            <button color="primary" onClick={this.addComment} className="addComment_cartModal">Add comment</button>
                            <button color="primary" className="addAttachment_cartModal">Add attachment</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CardElement;