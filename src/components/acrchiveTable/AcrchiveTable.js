import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
class AcrchiveTable extends Component {

    state = {
        
       
    }
    constructor(props) {
        super(props);       
      this.archiveTable = this.archiveTable.bind(this);

        
    }

  
    

    archiveTable(){
       
        api.request({
            url: `/tables/${this.props.id}/update/archived`,            
            method: 'PUT',
            body: JSON.stringify({
                archived: true
            })
           
            
        })
        .catch(error => {console.log("failed to update card's archive")});
       
       
    }

    render(){
        return(
            <IconButton  aria-label="archive" color="primary">
            <Icon  onClick={this.archiveTable}>archive</Icon>
            </IconButton>
        );
    }
}

export default AcrchiveTable;