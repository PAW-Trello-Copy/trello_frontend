import React, { Component } from 'react';
import api from '../../networking/api';
import CardElement from "../cards/CardElement";
import ArchiveCard from"../archivecard/ArchiveCard";
import '../../style/ListElement.css';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

class ListElement extends Component {

    state = {
        isLoading: true,
        cards: [],       
        error: null,
        listArchiveMode: false,
        showModal: false
    }

    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
        this.fetchCards = this.fetchCards.bind(this);
        this.refreshListElementComponent = this.refreshListElementComponent.bind(this);
    }

    showCardModal(){    

        this.setState({showModal: true});
         
     }
 
    componentDidMount() {
        this.fetchCards();
    }
    listaArchive = () => {
        this.setState({
            listArchiveMode: !this.state.listArchiveMode
        })
    }

    fetchCards() {
        api.request({
            url: `/lists/${this.props.id}/cards?archived=false`
        })
        .then(cards => {
            this.setState({
                cards: cards,               
                isLoading: false
            })
        })
       

    }


    addCard(){
        var newCardName = document.getElementById("new_cart_title_"+this.props.id).value;
        api.request({
            url: '/cards/create',
            method: 'POST',
            body: JSON.stringify({
                listId: this.props.id,
                title: newCardName,
            })
        })
        .then(result => this.fetchCards())
        .catch(error => {console.log("failed to add new cart")});
        document.getElementById("new_cart_title_"+this.props.id).value = "";
    }

    refreshListElementComponent(){
        this.fetchCards();
        this.setState({ state: this.state });
    }

    render(){
        const { isLoading, cards} = this.state
        
     
        return (
            
            <div className="ListElement">
                <div className="titleList">
                <h3 className="titleName">{this.props.title}</h3>
                <div className="buttonArch"  >   
                      
                <ArchiveCard title={this.props.title} id={this.props.id} listId={this.props.listId}   />
               
                </div>
                </div>
                <div>
                    {!isLoading ? (
                        cards.map(card => {
                            const { title, id, listId, description } = card;
                            return (<CardElement title={title} id={id} listId={listId} description={description} callback={this.refreshListElementComponent}/>);
                        })
                    ) : (
                        <CircularProgress  color="secondary" />
                    )}
                </div>                
                <input id={"new_cart_title_"+this.props.id} placeholder="Create new Card" className="new_cart_title"/>

               
                   
                <IconButton  aria-label="edit" color="primary">
                         <Icon color="primary" onClick={this.addCard}>add</Icon>
                </IconButton>
                
                
            </div>
           
        );
    }
}

export default ListElement;