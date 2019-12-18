import React, { Component } from 'react';
import api from '../../networking/api';
import '../../style/CardLabel.css'
import Icon from '@material-ui/core/Icon';

class CardLabel extends Component {

    state = {
        showModal: false,
        isLoading: true,
        isAssignedToCard: false,
        error: null
    }

    constructor(props){
        super(props);
        console.log(this.props);
        this.unassignLabel = this.unassignLabel.bind(this);
        this.assignLabel = this.assignLabel.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.editLabel = this.editLabel.bind(this);
        for(var i=0; i< this.props.labelsList.length; i++){
            if(this.props.labelsList[i].id === this.props.id) {this.isAssignedToCard = true; break;}
            else {this.isAssignedToCard = false;}
        }
        var urlParams = new URLSearchParams(window.location.search);
        this.cardId = urlParams.get('card');
    }

    unassignLabel(event){
        api.request({
            url: `/cards/${this.cardId}/remove/label`,
            method: 'PUT',
            body: JSON.stringify({
                labelId: this.props.id
            })

        })
        .then(result => window.location.reload(false))
        .catch(error => {console.log("failed to unassigne label")});
    }

    assignLabel(){
        api.request({
            url: `/cards/${this.cardId}/add/label`,
            method: 'PUT',
            body: JSON.stringify({
                labelId: this.props.id
            })

        })
        .then(result => window.location.reload(false))
        .catch(error => {console.log("failed to unassigne label")});
    }

    deleteLabel(){
        api.request({
            url: `/labels/${this.props.id}`,
            method: 'DELETE',
            body: JSON.stringify({

            })
        })
        .then(result => window.location.reload(false))
        .catch(error => {console.log("failed to delete card")});
    }

    editLabel(){
        this.props.callback(this.props.title, this.props.color, this.props.id);
    }

    render(){
        return (
            <div className='label_field_component' style={{backgroundColor: "#"+this.props.color}}>
                <div className="label_field">{this.props.title}</div>
                {this.isAssignedToCard ? <Icon className="done_icon" onClick={this.unassignLabel}>done</Icon> : <Icon className="done_icon" onClick={this.assignLabel}>add</Icon>}
                <Icon className="edit_icon" onClick={this.editLabel}>edit</Icon>
                <Icon className="delete_icon" onClick={this.deleteLabel}>close</Icon>
            </div>
        );
    }
}

export default CardLabel;