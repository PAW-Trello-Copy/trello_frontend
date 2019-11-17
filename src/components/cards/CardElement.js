import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import api from '../../networking/api';
import '../../style/CardElement.css'

class CardElement extends Component {

    state = {
        showModal: false
    }

    constructor(props) {
        super(props);
        this.closeCartModal = this.closeCartModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
    }

    showCardModal(){
        console.log("showCardModal");
        this.setState({showModal: true});
    }

    closeCartModal(){
        console.log("showCardModal");
        this.setState({showModal: false});
    }

    render(){
        const {showModal} = this.state;
        return (
            <div>
                <div onClick={this.showCardModal} className="CardElement">
                    <h3>{this.props.title}</h3>
                </div>
                <Modal isOpen={this.state.showModal} className="CartModal">
                    <ModalHeader>
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        {this.props.description}
                    </ModalBody>
                    <button color="primary" onClick={this.closeCartModal} className="closeButton_cartModal">Close</button>
                </Modal>
            </div>
        );
    }
}

export default CardElement;