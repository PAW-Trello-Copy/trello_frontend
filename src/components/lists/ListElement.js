import React, { Component } from 'react';
import api from '../../networking/api';
import CardElement from "../cards/CardElement"
import '../../style/ListElement.css'

class ListElement extends Component {

    state = {
        isLoading: true,
        cards: [],
        error: null
    }

    constructor(props) {
        super(props);
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        this.fetchCards();
    }

    fetchCards() {
        api.request({
            url: `/lists/${this.props.id}/cards`
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

    render(){
        const { isLoading, cards, error } = this.state
        return (
            <div className="ListElement">
                <h3>{this.props.title}</h3>
                <div>
                    {!isLoading ? (
                        cards.map(card => {
                            const { title, id, listId, description } = card;
                            return (<CardElement title={title} id={id} listId={listId} description={description} />);
                        })
                    ) : (
                        <h3>Loading cards...</h3>
                    )}
                </div>
                <input id={"new_cart_title_"+this.props.id} className="new_cart_title"/>
                <button className="button_addCard" onClick={this.addCard}>Add card</button>
            </div>
        );
    }
}

export default ListElement;