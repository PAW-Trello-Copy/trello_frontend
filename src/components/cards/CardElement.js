import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../../style/CardElement.css'
import api from '../../networking/api';
import AttachmentCard from '../attachmentCard/AttachmentCard'
import ShowAttchment from '../attachmentCard/ShowAttchment'
import CardComment from "./CardComment"
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button';
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
                <div className="CartModal1">
                <Modal isOpen={this.state.showModal} className="CartModal">
                    <ModalHeader>
                        <textarea id="cart_title_input" className="hide_element" defaultValue={this.props.title}/>
                        <div className="cart_title display_element"><h2>{this.props.title}</h2></div>
                        <div className="buttonClose">
                         <Fab color="secondary" onClick={this.closeCartModal}>
                            <Icon  >close</Icon>
                         </Fab></div>
                       
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
                        <div className="saveButton_cartModal hide_element">
                             <Button variant="contained" size="small" color="secondary"onClick={this.saveCard} >Save</Button>
                        </div>
                         <div className="deleteButton_cartModal"> 
                         <Button variant="contained" size="small" color="primary"onClick={this.deleteCard} >Delete</Button>
                         </div>                         
                         <div className="editButton_cartModal ">
                         <Button variant="contained" size="small" color="primary"onClick={this.archiveCard} >Archive</Button>
                         </div>
                         <div className="editButton_cartModal display_element"> 
                         <Button variant="contained" size="small" color="primary"onClick={this.showEditLayout} >Edit</Button>
                         </div>

                       
                    </div>
                    <div className="comments_block">
                        {!isLoading ? (
                            comments.map(comment => {
                                const { id, text, cartId, userId, ownerName, ownedByUser } = comment;
                                return (<CardComment id={id} text={text} cartId={cartId} userId={userId} ownerName={ownerName}
                                    ownedByUser={ownedByUser} callback={this.refreshCardElementComponent}/>);
                            })
                        ) : (
                            <CircularProgress  color="secondary" />
                        )}
                        <div>
                            <textarea id={"new_comment_"+this.props.id} className="new_comment display_element"/>
                        </div>
                        <div>
                        <div className="addComment_cartModal"> 
                        <Button variant="contained" size="small" color="primary"onClick={this.addComment}>Add comment</Button>
                        </div>
                        <div className="addAttachment_cartModal"> 
                        <Button variant="contained" size="small" color="primary">Add attachment</Button>
                        </div>
                        </div>
                    </div>
                </Modal>
                </div>
            </div>
        );
    }
}

export default CardElement;