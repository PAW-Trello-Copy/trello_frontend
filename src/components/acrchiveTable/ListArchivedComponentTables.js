import React, { Component } from "react";
import api from "../../networking/api";
import '../../style/AddTable.css';
import ButtonsArchiveTableList from  '../acrchiveTable/ButtonsArchiveTableList'
import CircularProgress from '@material-ui/core/CircularProgress';
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
                            <CircularProgress  color="secondary" />
                        )}
                
                </div>
            );
        }
    }
export default ListArchivedComponentTables
