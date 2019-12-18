import React, { Component } from 'react';
import '../../style/CardElement.css'
import api from '../../networking/api';
import ButtonForAttachment from '../attachmentCard/ButtonForAttachment';
import CircularProgress from '@material-ui/core/CircularProgress';

class ShowAttchment extends Component {

    state = {
        attachments:[],
         isLoading: true
    }

    constructor(props) {
        super(props);      
       
        this.showAttachment = this.showAttachment.bind(this)
      }

      componentDidMount() {
        this.showAttachment();
    }
      showAttachment() {
        api.request({
            url: `/cards/${this.props.id}/attachments`
        })
        .then(attachments => {
            this.setState({
                attachments: attachments,               
                isLoading: false
            })
            
        })
       

    }
    


    render(){
        const {isLoading,attachments} = this.state 
        return(<div>

              
            {!isLoading ? ( attachments.map(attachments => {
                            
                            const { filename,id } = attachments;
                            return <ButtonForAttachment filename={filename} id={id}/>
                        })
                        ) : (
                            <CircularProgress  color="secondary" />
                        )}
                </div>);
            }
    }


export default ShowAttchment;