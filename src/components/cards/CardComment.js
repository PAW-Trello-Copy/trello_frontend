import React, { Component } from 'react';
import '../../style/CardComment.css'
import api from '../../networking/api';

class CardComment extends Component {

    constructor(props) {
        super(props);
        this.editComment = this.editComment.bind(this);
        this.showEditLayout = this.showEditLayout.bind(this);
    }

    componentDidMount() {
        if(this.props.ownedByUser) {
            document.getElementById("edit_comment_"+this.props.id).classList.replace("hide_element", "display_element");
        }
    }

    showEditLayout(){
        document.getElementById("comment_text_"+this.props.id).classList.replace("display_element","hide_element");
        document.getElementById("comment_text_edit_"+this.props.id).classList.replace("hide_element","display_element");
        document.getElementById("edit_comment_"+this.props.id).classList.replace("display_element","hide_element");
        document.getElementById("save_comment_"+this.props.id).classList.replace("hide_element","display_element");
    }

    hideEditLayout(){
        document.getElementById("comment_text_"+this.props.id).classList.replace("hide_element","display_element");
        document.getElementById("comment_text_edit_"+this.props.id).classList.replace("display_element","hide_element");
        document.getElementById("edit_comment_"+this.props.id).classList.replace("hide_element","display_element");
        document.getElementById("save_comment_"+this.props.id).classList.replace("display_element","hide_element");
    }

    editComment(){
        var newCommentText = document.getElementById("comment_text_edit_"+this.props.id).value;
        api.request({
            url: `/comments/${this.props.id}/update/text`,
            method: 'PUT',
            body: JSON.stringify({
                text: newCommentText
            })
        })
        .catch(error => {console.log("failed to update comment")});
        //this.props.callback();
        window.location.reload(false);
    }

    render(){
        return (
            <div className="comment_item">
                <div id={"comment_owner_"+this.props.id} className="comment_owner">{this.props.ownerName}</div>
                <div id={"comment_text_"+this.props.id} className="comment_text display_element">{this.props.text}</div>
                <textarea id={"comment_text_edit_"+this.props.id} className="comment_text_edit hide_element" defaultValue={this.props.text}/>
                <button color="primary" onClick={this.showEditLayout} id={"edit_comment_"+this.props.id}
                    className="edit_comment hide_element">Edit comment</button>
                <button color="primary" onClick={this.editComment} id={"save_comment_"+this.props.id}
                    className="edit_comment hide_element">Save comment</button>
            </div>
        );
    }
}

export default CardComment;