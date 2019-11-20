import React, { Component } from "react";
import cookies from "browser-cookies";
import api from "../../networking/api";
import '../../style/Login.css';
import { Redirect } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          password: "",         
          loginErrors: "",
          referrer: null
         
        };    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showBoard = this.showBoard.bind(this)
      
      }
      showBoard() {
        this.setState({referrer: '/home'});
    }


      handleChange(event){
 
        this.setState({
            [event.target.name]: event.target.value
          });
      }

     

      handleSubmit(event) {
         const { name, password} = this.state;         
         let encrypted = window.btoa((name + ':' + password));        
         let whole = 'Basic ' + encrypted;  
          
         api.requestLogin({
             url: '/login',
             method: 'POST',
             headers: {
              Authorization: whole
             }
         }).then( result => {
             cookies.set("accessToken", result.string, 365);// tut ne uveren 4to result.string.
             //no w obshem prihodit JSON, v kotorom tebe nujno pole 'string'
             this.showBoard();
           

         })
         .catch(error => {
          alert("Please check your Username or password");
         })
        
        event.preventDefault();
      }
    

      render() {
        if (this.state.referrer)return <Redirect to={this.state.referrer} push></Redirect>;
        return (
          
          <div className="login-form">

                <h1>LogIn</h1>
                <fieldset>
               
            <form onSubmit={this.handleSubmit}>
           
              <input
                type="name"
                name="name"
                placeholder="Username"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
    
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />   
             
              <button type="submit" >Login</button>
            </form>
            </fieldset>
          </div>
        );
      }
}
export default Login;