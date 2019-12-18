import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../../style/CardElement.css'
import api from '../../networking/api';
import AttachmentCard from '../attachmentCard/AttachmentCard'
import ShowAttchment from '../attachmentCard/ShowAttchment'
import CardComment from "./CardComment"
import CardLabel from "./CardLabel"
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button';
import { TwitterPicker } from 'react-color';
class CardElement extends Component {

    state = {
        showModal: false,
        labelModal: false,
        isLoading: true,
        comments: [],
        labels: [],
        allAvaliableLabels: [],
        error: null,
        pickedColor: "#FFFFFF"
        displayHistory: false

    }

    constructor(props) {
        super(props);
        this.closeCartModal = this.closeCartModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.getComments = this.getComments.bind(this);
        this.getLabels = this.getLabels.bind(this);
        this.getAllAvaliableLabels = this.getAllAvaliableLabels.bind(this);
        this.addComment = this.addComment.bind(this);
        this.refreshCardElementComponent = this.refreshCardElementComponent.bind(this);
        this.showLinkToCard = this.showLinkToCard.bind(this);
        this.showLabelModal = this.showLabelModal.bind(this);
        this.hideLabelModal = this.hideLabelModal.bind(this);
        this.archiveCard = this.archiveCard.bind(this);
        this.showAddLabelVersion = this.showAddLabelVersion.bind(this);
        this.showAddLabelVersionWithParams = this.showAddLabelVersionWithParams.bind(this);
        this.hideAddLabelVersion = this.hideAddLabelVersion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewLabel = this.addNewLabel.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
    }

    componentDidMount() {
        this.getComments();
        this.getLabels();
        this.getAllAvaliableLabels();
        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('card') === this.props.id+''){
            this.showCardModal();
        }
    }

    showCardModal(){
        if(!window.location.href.includes('card')){
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?card=' + this.props.id;
            window.history.pushState({path:newurl},'',newurl);
        }
        this.setState({showModal: true});
    }

    handleChange(color){
        this.setState({ pickedColor: color.hex });
        console.log(this.state.pickedColor);
    }


    closeCartModal(){
        if(window.location.href.includes('card')){
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path:newurl},'',newurl);
        }
        this.setState({showModal: false, labelModal: false});
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

    showLinkToCard(){
        document.getElementsByClassName("linkToCard")[0].classList.replace("hide_element","display_element");
    }

    hideLinkToCard(){
        document.getElementsByClassName("linkToCard")[0].classList.replace("display_element","hide_element");
    }

    showLabelModal(){
        this.setState({labelModal: true});
    }

    hideLabelModal(){
        this.setState({labelModal: false});
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
            .then(result => window.location.reload(false))
            .catch(error => {console.log("failed to update card's title")});
    }

    deleteCard(){
        if(window.location.href.includes('card')){
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path:newurl},'',newurl);
        }
        api.request({
            url: `/cards/${this.props.id}`,
            method: 'DELETE'
           
        })
        .then(result => window.location.reload(false))
        .catch(error => {console.log("failed to delete card")});
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

    getLabels(){
        api.request({
            url: `/cards/${this.props.id}/labels`
        })
        .then(labels => {
            this.setState({
                labels: labels,
                isLoading: false
            })
        })
    }

    getAllAvaliableLabels(){
        var tableId = window.location.href.substr(window.location.href.lastIndexOf('/')+1,2);
        api.request({
            url: `/tables/${tableId}/labels`
        })
        .then(labels => {
            this.setState({
                allAvaliableLabels: labels,
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

    displayQuestion = () => {
        this.setState({
            displayHistory: !this.state.displayHistory
    }) 
    
    }

    addNewLabel(){
        var tableId = parseInt(window.location.href.substr(window.location.href.lastIndexOf('/')+1,2));
        var title = document.getElementsByClassName("labelText_input")[0].value;
        var labelColor = this.state.pickedColor.replace('#','');
        api.request({
            url: '/labels/create',
            method: 'POST',
            body: JSON.stringify({
                tableId: tableId,
                title: title,
                color: labelColor
            })
        })
        .then(result => this.getAllAvaliableLabels())
        .then(result => this.hideAddLabelVersion())
        .catch(error => {console.log("failed to add new comment")});
    }

    updateLabel(){
        var title = document.getElementsByClassName("labelText_input")[0].value;
        var labelColor = this.state.pickedColor.replace('#','');

        api.request({
            url: `/labels/${this.labelId}/update/title`,
            method: 'PUT',
            body: JSON.stringify({
                title: title,
            })
        })
        .catch(error => {console.log("failed to update labels title")});

        api.request({
            url: `/labels/${this.labelId}/update/color`,
            method: 'PUT',
            body: JSON.stringify({
                color: labelColor,
            })
        })
        .then(result => window.location.reload(false))
        .catch(error => {console.log("failed to update labels color")});
    }

    showAddLabelVersion(){
        document.getElementsByClassName("addNewLabel_version")[0].classList.replace("hide_element","display_element2");
        document.getElementsByClassName("showAllLabels_version")[0].classList.replace("display_element2","hide_element");
        document.getElementsByClassName("addLabel_button")[0].classList.replace("hide_element","display_element2");
    }

    showAddLabelVersionWithParams(title, color, labelId){
        document.getElementsByClassName("addNewLabel_version")[0].classList.replace("hide_element","display_element2");
        document.getElementsByClassName("showAllLabels_version")[0].classList.replace("display_element2","hide_element");
        document.getElementsByClassName("updateLabel_button")[0].classList.replace("hide_element","display_element2");
        document.getElementsByClassName("labelText_input")[0].value = title;
        color = "#" + color;
        this.labelId = labelId;
        this.setState({ pickedColor: color });
    }

    hideAddLabelVersion(){
        document.getElementsByClassName("showAllLabels_version")[0].classList.replace("hide_element","display_element2");
        document.getElementsByClassName("addNewLabel_version")[0].classList.replace("display_element2","hide_element");
        document.getElementsByClassName("addLabel_button")[0].classList.replace("display_element2","hide_element");
        document.getElementsByClassName("updateLabel_button")[0].classList.replace("display_element2","hide_element");

    }

    render(){
        const { isLoading, comments, labels, allAvaliableLabels } = this.state
        return (
            <div>
                <div onClick={this.showCardModal} className="CardElement">
                    <h3>{this.props.title}</h3>
                    
                </div>
                <div className="CartModal1">
                <Modal isOpen={this.state.showModal} className="CartModal">
                    <ModalHeader>
                        <div className="labels_section">
                           {!isLoading ? (
                               labels.map(label => {
                                   const { title, color } = label;
                                   return (<div style={{backgroundColor: "#"+color}} className="label_item">{title}</div>);
                               })
                           ) : (
                               <CircularProgress  color="secondary" />
                           )}
                        </div>
                        <textarea id="cart_title_input" className="hide_element" defaultValue={this.props.title}/>
                        <div className="cart_title display_element"><h2>{this.props.title}</h2></div>
                        <div className="buttonClose">
                        <Fab color="secondary" onClick={this.closeCartModal}>
                            <Icon >close</Icon>
                        </Fab></div>
                    </ModalHeader>
                    <ModalBody>
                        <textarea id="cart_description_input" className="hide_element" defaultValue={this.props.description}/>
                        <div className="cart_description display_element">{this.props.description}</div>
                        <h4 className="textAttach">Attachments:</h4>
                        <div className="textAttach">
                        <ShowAttchment  title={this.props.title} id={this.props.id}/>
                       
                        </div>
                       
                      
                    </ModalBody>
                    <p></p>
                    
                    
                    <div className="button_group_cust">
                    <div className="Attchment1 "> 
                             <AttachmentCard title={this.props.title} id={this.props.id}/>
                         </div>  
                        <span className="saveButton_cartModal hide_element">
                             <Button variant="contained" size="small" color="secondary"onClick={this.saveCard} >Save</Button>
                        </span>
                         <span className="deleteButton_cartModal"> 

                    <div className="Attchment">
                    <AttachmentCard title={this.props.title} id={this.props.id}/>
                    </div>         
                    <div className="button_group_cust">
                        <span className="saveButton_cartModal hide_element">
                            <Button variant="contained" className="saveButton_cartModal hide_element" size="small" color="secondary" onClick={this.saveCard} >Save</Button>
                        </span>
                        <span className="eeButton_cartModal">
                            <Button variant="contained" className="deleteButton_cartModal" size="small" color="primary" onClick={this.deleteCard}>Delete</Button>
                        </span>
                        <span className="editButton_cartModal">
                            <Button variant="contained" className="editButton_cartModal" size="small" color="primary" onClick={this.archiveCard}>Archive</Button>
                        </span>
                        <span className="editButton_cartModal display_element">
                            <Button variant="contained" className="editButton_cartModal display_element" size="small" color="primary" onClick={this.showEditLayout}>Edit</Button>
                        </span>
                        <span className="shareButton_cartModal">
                            <Button variant="contained" className="shareButton_cartModal" size="small" color="primary" onClick={this.showLinkToCard}>Share</Button>
                        </span>
                        <span className="shareButton_cartModal">
                            <Button variant="contained" className="labelButton_cartModal" size="small" color="primary" onClick={this.showLabelModal}>Labels</Button>
                        </span>
                        
                         <Button variant="contained" size="small" color="primary"onClick={this.displayQuestion} >History</Button>
                         </span>                         
                         <span className="editButton_cartModal ">
                         <Button variant="contained" size="small" color="primary"onClick={this.archiveCard} >Archive</Button>
                         </span>
                         <span className="editButton_cartModal display_element"> 
                         <Button variant="contained" size="small" color="primary"onClick={this.showEditLayout} >Edit</Button>
                         </span>
                         <span className="shareButton_cartModal">
                            <Button variant="contained" className="shareButton_cartModal" size="small" color="primary" onClick={this.showLinkToCard}>Share</Button>
                        </span>

                        <span className="linkToCard hide_element">
                        <input className="linkToCard_input" defaultValue={window.location.href}></input>
                        <Icon className="linkToCard_closeButton" onClick={this.hideLinkToCard}>close</Icon>
                        </span>
                    </div>
                   
                    <div className="comments_block">
                        {!isLoading ? (
                            comments
                            .filter(comment => {
                            
                                if (this.state.displayHistory) {
                                    return true;
                                }
                                return !comment.history;
                            })
                            .map(comment => {
                                const { id, text, cartId, userId,timestamp, ownerName, ownedByUser, history } = comment;
                               
                                return (<CardComment key={id} id={id} isHistory={history} timestamp={timestamp} text={text} cartId={cartId} userId={userId} ownerName={ownerName}
                                    ownedByUser={ownedByUser}/>);
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
                        {/* <div className="Attchment1"> 
                        <AttachmentCard title={this.props.title} id={this.props.id}/>
                        </div> */}
                        </div>
                    </div>
                    <Modal isOpen={this.state.labelModal} className="LabelsModal">
                        <div className="showAllLabels_version display_element2">
                            <div className="iconSection_labelModal">
                                <span><Icon className="iconClose_LabelsModal" onClick={this.hideLabelModal}>close</Icon></span>
                            </div>
                            {!isLoading ? (
                                allAvaliableLabels.map(avaliableLabel => {
                                    const { id, title, color, tableId } = avaliableLabel;
                                    return (<CardLabel id={id} title={title} color={color} tableId={tableId} labelsList={this.state.labels} callback={this.showAddLabelVersionWithParams}/>);
                                })
                            ) : (
                                <CircularProgress  color="secondary" />
                            )}
                            <Button className="addNewLabel_button" variant="contained" size="small" color="primary" onClick={this.showAddLabelVersion}>Add new label</Button>
                        </div>
                        <div className="addNewLabel_version hide_element">
                            <div className="iconSection_labelModal">
                                <span><Icon className="iconBack_labelModal" onClick={this.hideAddLabelVersion}>arrow_back_los</Icon></span>
                                <span><Icon className="iconClose_LabelsModal" onClick={this.hideLabelModal}>close</Icon></span>
                            </div>
                            <div>
                                <input className="labelText_input"/>
                                <TwitterPicker color={this.state.pickedColor} colors={['#fff700', '#ff0000', '#09ff00', '#50daf9']} width="-webkit-fill-available" onChange={this.handleChange}/>
                            </div>
                            <Button className="updateLabel_button hide_element" variant="contained" size="small" color="primary" onClick={this.updateLabel}>Update label</Button>
                            <Button className="addLabel_button hide_element" variant="contained" size="small" color="primary" onClick={this.addNewLabel}>Add label</Button>
                        </div>
                    </Modal>
                </Modal>
                </div>
            </div>
        );
    }
}

export default CardElement;
