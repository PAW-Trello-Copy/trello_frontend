import React, { Component } from 'react';
import '../../style/ArciveCard.css'
import Icon from '@material-ui/core/Icon';
import api from '../../networking/api';

class ButtonsArchiveTableList extends Component {


    state = {
        showModal: false,       
        isLoading: true
       
        
    }
    constructor(props) {
        super(props);   
        this.removeToList =this.removeToList.bind(this)
        this.deleteTable =this.deleteTable.bind(this)
    }

    removeToList(){
       
        api.request({
            url: `/tables/${this.props.id}/update/archived`,            
            method: 'PUT',
            body: JSON.stringify({
                archived: false
            })
            
        })
        .catch(error => {console.log("failed to update card's")});
       
       
    }
    deleteTable(){
      
        api.request({
            url: `/tables/${this.props.id}`,            
            method: 'DELETE'
                      
            
        })
        .catch(error => {console.log("failed to update card's ")});
    }
    render(){
        return(
             <div className="cart_title display_element archive_style">
                   <h2 >{this.props.title}</h2>
                  
                   <Icon onClick={this.removeToList} className="redo">redo</Icon>
                    <Icon onClick={this.deleteTable} className="delete" >delete</Icon> 
                    
            </div>
                                          
        );
    }

}
export default ButtonsArchiveTableList;