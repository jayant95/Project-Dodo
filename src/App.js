import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Form from './components/form/Form';
import Login from './components/pages/Login';
import './App.css';



class App extends React.Component {
  state = {
    auth: false,
    message: "",
    expired: true
  }

  componentDidMount() {
    let expire = localStorage.getItem('expiration') || 0;
    let currentTime = (Date.now() / 1000);
    
    expire > currentTime ? this.setState({auth: true}) : this.setState({auth: false})
  }

  handleAuthCallback = (login) => {
    let expire = localStorage.getItem('expiration') || 0;
    let currentTime = Math.floor(Date.now() / 1000);

    this.setState({
      auth: true
    })
  }

  handleLogout = (val) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiration");
    localStorage.removeItem("auth");
    this.setState({
      auth: false
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Header auth={this.state.auth} expired={this.state.expired} loginAuth={this.handleLogout}/>

            <Route exact path="/" render={props => (
              <React.Fragment>
                <h2>Welcome to Piano Circle!</h2>
              </React.Fragment>
            )} />
            
            <Route exact path="/register" component={Form} />
            <Route exact path="/login"
              render={(props) => <Login {...props} authCallback={this.handleAuthCallback}/>} 
            />
        </div>
      </Router>
    );
  }

}

export default App;
