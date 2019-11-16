import React, { Component } from 'react';
import '../../style/ListElement.css'
class ListElement extends Component {

    render(){
        return (
            <div className="ListElement">
                <h3>{this.props.title}</h3>
                
            </div>
        );
    }
}



export default ListElement;