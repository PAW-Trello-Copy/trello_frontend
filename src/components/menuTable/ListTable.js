import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
const ListTable = (props) =>{
     
    return(
        <List >
        {props.posts.map((post) => (
          <ListItem button key={post.id}>
           
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>);
};

  


export default ListTable;