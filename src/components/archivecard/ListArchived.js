import React, { Component } from 'react';
import '../../style/ArciveCard.css';
import api from '../../networking/api';
import ButtonsForArchiveList from '../archivecard/ButtonsForArchiveList';
import CircularProgress from '@material-ui/core/CircularProgress';
class ListArchived extends Component {

    state = {
        showModal: false,
        cardsArch:[],
        isLoading: true
       
        
    }
 
    componentDidMount() {
        
        this.listCardArchive();
    }
    listCardArchive() {
        
        api.request({
            url: `/lists/${this.props.id}/cards?archived=true`       
        })
        .then(cardsArch => {
            this.setState({
                cardsArch: cardsArch,
                isLoading: false         
            })
           
        })    
       
    }

    render(){
        const {isLoading,cardsArch} = this.state 
        return(<div>

              
            {!isLoading ? ( cardsArch.map(cards => {
                            
                            const { title,id } = cards;
                            return <ButtonsForArchiveList title={title} id={id}/>
                        })
                        ) : (
                            <CircularProgress  color="secondary" />
                        )}
                </div>);
            }
}
export default ListArchived;
