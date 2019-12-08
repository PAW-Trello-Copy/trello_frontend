import React, { Component } from 'react';
import '../../style/ArciveCard.css'
import Icon from '@material-ui/core/Icon';
import api from '../../networking/api';
import IconButton from '@material-ui/core/IconButton';


class ButtonsForArchiveList extends Component {


    state = {
        showModal: false,
        cardsArch:[],
        isLoading: true
       
        
    }
    constructor(props) {
        super(props);   
        this.removeToList =this.removeToList.bind(this)
        this.deleteCard =this.deleteCard.bind(this)
    }

    removeToList(){
       
        api.request({
            url: `/cards/${this.props.id}/update/archived`,            
            method: 'PUT',
            body: JSON.stringify({
                archived: false
            })
            
        })
        .catch(error => {console.log("failed to update card's")});
       
       
    }
    deleteCard(){
        
        api.request({
            url: `/cards/${this.props.id}`,            
            method: 'DELETE'           
            
        })
        .catch(error => {console.log("failed to update card's ")});
    }
    render(){
        return(

             <div className="cart_title display_element archive_style">
                   <h2 className="forH2">{this.props.title}</h2>
                   <IconButton  aria-label="return" color="primary">
                   <Icon onClick={this.removeToList} >redo</Icon>
                   </IconButton>
                   <IconButton aria-label="delete" color="secondary">
                    <Icon onClick={this.deleteCard} >delete</Icon> 
                    </IconButton>
            </div>
                                          
        );
    }

}
export default ButtonsForArchiveList;