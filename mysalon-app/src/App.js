import React from 'react';
import './App.css';
import SalonContainer from "./SalonContainer/SalonContainer"
import LoginGateway from './LoginGateway/LoginGateway';
import { parse } from 'querystring';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      username: null
    }
  }

  handleRegister = async (formData) => {
    console.log("Attempt to register")
    console.log(formData);
    const registerResponse = await fetch("http://localhost:9000/user/register", {
      method: "POST",
      body: JSON.stringify(formData),
      //credentials: "included",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const parsedResponse = await registerResponse.json();
    console.log(parsedResponse);

    if(parsedResponse.status.code === 201){
      console.log("successful registration");
      this.setState({
        loggedIn: true,
        username: parsedResponse.data.username
      })
    }
  }

  handleLogin = async (formData) => {
    console.log("Attempt to Login")
    console.log(formData);
    const registerResponse = await fetch("http://localhost:9000/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
      //credentials: "included",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const parsedResponse = await registerResponse.json();
    console.log(parsedResponse);

    if(parsedResponse.status.code === 200){
      console.log("successful registration");
      this.setState({
        loggedIn: true,
        username: parsedResponse.data.username
      })
    }
  }

  render(){
    return (
      <div className="App">
        <img src="https://lh3.googleusercontent.com/DVPyea1QYGWtmUiovFbeB0oF495zYnxrtFTFsHhNYXhFotJt_fR9KtDXPCD4XUlxfr55Oyhv8gP2ApzSqi_Q9cUnDLbPYxdwxshuv0NrqpHYh-mwxoMCXlMPWegAJXZsRK-uwto4jw=w2400" alt="The Logo"></img>
        {
          this.state.loggedIn ?
          <SalonContainer /> :
          <LoginGateway handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
        }
        

      </div>
    );
  }
}
  

export default App;
