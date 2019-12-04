import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';
import Icon from '@material-ui/core/Icon';
class ButtonForAttachment extends Component {

    state = {
        attachment:{},       
         isLoading: true,
         images:"",
         imgUrl: ""
    }

    constructor(props) {
        super(props);      
       
        this.deleteFile = this.deleteFile.bind(this)
       
      }
      componentDidMount() {
        this.showAttachment();
    }
      showAttachment() {
        api.request({
            url: `/attachments/${this.props.id}`
        })
        .then(attachment => {
            this.setState({
                imgUrl: "data:" + attachment.fileType + ";base64, " + attachment.string64,
                isLoading: false
            })
        })
       

    }
   

    
      deleteFile(){
      
        api.request({
            url: `/attachments/${this.props.id}`,            
            method: 'DELETE'
                      
            
        })
        .catch(error => {console.log("failed to update card's ")});
    }

    render(){
        return(
             <div className="cart_title display_element ">
                   <img src={this.state.imgUrl} alt={this.props.title} width="200" height="100" />                
                    <Icon onClick={this.deleteFile} >delete</Icon> 
            </div>
                                          
        );
            }
    }



export default ButtonForAttachment;