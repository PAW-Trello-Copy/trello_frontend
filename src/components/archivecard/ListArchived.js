import React, { Component } from 'react';
import '../../style/ArciveCard.css';
import api from '../../networking/api';
import ButtonsForArchiveList from '../archivecard/ButtonsForArchiveList';

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
                            <h3>Loading cards...</h3>
                        )}
                </div>);
            }
}
export default ListArchived;
