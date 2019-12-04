import React, { Component } from "react";
import api from "../../networking/api";
import '../../style/AddTable.css';
import ButtonsArchiveTableList from  '../acrchiveTable/ButtonsArchiveTableList'

class ListArchivedComponentTables extends Component {
    state = {
        showModal: false,
        tablesArch:[],
        isLoading: true
       
        
    }
 
    componentDidMount() {
        
        this.listTableArchive();
    }
    listTableArchive() {
        
        api.request({
            url: `/tables?archived=true`       
        })
        .then(tablesArch => {
            this.setState({
                tablesArch: tablesArch,
                isLoading: false         
            })
           
        })    
       
    }
        render(){
            const {isLoading,tablesArch} = this.state 
            return (
                <div>
                          {!isLoading ? ( tablesArch.map(tables => {
                            
                            const { title,id } = tables;
                            return <ButtonsArchiveTableList title={title} id={id}/>
                        })
                        ) : (
                            <h3>Loading cards...</h3>
                        )}
                
                </div>
            );
        }
    }
export default ListArchivedComponentTables
