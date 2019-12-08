import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
class AttachmentCard extends Component {

    constructor(props) {
        super(props);
        this.state ={
          file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }


      onFormSubmit(e){
        e.preventDefault() // Stop form submit        
        this.fileUpload(this.state.file)
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }


    fileUpload(file){  
         const formData =new FormData();
         formData.append('file',file)
       
         api.sendFile({
            url: `/cards/${this.props.id}/attachments`,           
            formData:formData
            
          })
          .then(response =>
            console.log("result", response)
           )
       
    }


    render(){
        return(
            <form onSubmit={this.onFormSubmit}>                   
                
               <Input type="file" onChange={this.onChange}  /> 
                <Button variant="contained" size="small" color="primary" type="submit">Upload</Button> 
             </form>
        );
    }
}

export default AttachmentCard;