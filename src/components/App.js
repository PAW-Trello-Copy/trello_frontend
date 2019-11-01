import React, { Component } from 'react';
import TableList from "./TableList"
import {connect} from "react-redux"
import MenuTable from "./MenuTable"
import '../style/App.css';

class App extends Component {
render(){
  const {lists} = this.props;
  return (
    <div className="App">
        
<MenuTable />
      <div style ={styles.listTableStyle}>        
        {lists.map(list =><TableList key={lists.id} title={list.title}/>)}
        </div>  
       
      
    </div>
  );
}
}


const styles = {
  listTableStyle:{
    display:"flex",
    flexDirection:"row",
    marginLeft:10
  }
};

const mapStateToProps = state => ({
  lists:state.lists
})




export default connect(mapStateToProps) (App);
