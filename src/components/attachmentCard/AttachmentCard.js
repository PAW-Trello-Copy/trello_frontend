import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';

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
        // this.fileUpload(this.state.file).then((response)=>{
        //   console.log(response.data);
        // })
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
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
             </form>
        );
    }
}

export default AttachmentCard;