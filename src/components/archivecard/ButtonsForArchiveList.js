import React, { Component } from 'react';
import '../../style/ArciveCard.css'
import Icon from '@material-ui/core/Icon';
import api from '../../networking/api';

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
                   <Icon onClick={this.removeToList} >redo</Icon>
                    <Icon onClick={this.deleteCard} >delete</Icon> 
            </div>
                                          
        );
    }

}
export default ButtonsForArchiveList;