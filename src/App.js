import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Form from './components/form/Form';
import Login from './components/pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <h2>Welcome to Piano Circle!</h2>
            </React.Fragment>
          )} />
          <Route exact path="/register" component={Form} />
          <Route exact path="/login" component={Login} />
      </div>
    </Router>
  
  );
}

export default App;
