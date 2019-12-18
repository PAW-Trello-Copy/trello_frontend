import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
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
        this.getFile = this.getFile.bind(this);
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

    getFile(){
        api.request({
            url: `/attachments/file/${this.props.id}`          
           
                      
            
        })
        .catch(error => {console.log("failed to download file")});
    }

    render(){
       
        
        const download = this.props.filename
        return(
             <div className="cart_title display_element1 ">                  
                   <a className="ForLink"href={this.state.imgUrl} download={download}>{this.props.filename}</a> 
                   <IconButton onClick={this.deleteFile}  aria-label="edit" color="secondary" >             
                    <Icon >delete</Icon> 
                    </IconButton> 
            </div>
                                          
        );
            }
    }



export default ButtonForAttachment;