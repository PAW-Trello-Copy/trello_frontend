import React, { Component } from "react";
import api from "../../networking/api";
import '../../style/Registration.css';

class Registration extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          email:"",
          password: "",
          verifyPassword: "",
          registrationErrors: "",
          eventbuton:false
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      
      handleChange(event){
 
        this.setState({
          [event.target.name]: event.target.value
          });
      }
      
      handleSubmit(event) {
         const { name,email, password, verifyPassword } = this.state;
         
         api.request({
          url: '/users',
          method: 'POST',
          body: JSON.stringify({
            name: name,
            email:email,
            password:password,
            verifyPassword:verifyPassword
          })
      })
      .then(result => {      
        alert("Success");
          
      })
      .catch(error => {
        alert("Wrong Data");
      })
        
        event.preventDefault();
      }
    
     

      render() {
        return (
          <div className="registration-form">
             <h1>Registration</h1>
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
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
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
    
              <input
                type="password"
                name="verifyPassword"
                placeholder="Password confirmation"
                value={this.state.verifyPassword}
                onChange={this.handleChange}
                required
              />
    
              <button type="submit">Sign up</button>
            </form>
            </fieldset>
          </div>
        );
      }
}
export default Registration;