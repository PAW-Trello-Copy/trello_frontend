 const initialState = [
     {
     title: "First",
     id:0
   
 },
 {
    title: "Second",
    id:1
  
},
{
    title: "Therd",
    id:0
  
},
 ];


const listReducer = (state = initialState ,action) => {

    switch(action.type){
        default:
        return state;
    }
};

export  default listReducer;