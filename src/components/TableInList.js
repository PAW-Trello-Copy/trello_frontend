import React from 'react';

const TableInList = ({title, id}) =>{
    return(
    <div style={styles.container}>
        <h3>{title}</h3> 
        <h2> {id}</h2>       
    </div>);
};

const styles={
    container:{
       backgroundColor: "#dfe3e6",
       borderRadius:3,
       textAlign:"left",
       marginLeft:10,
       width:300
     
    }
}



export default TableInList;