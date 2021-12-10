import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import Header from './header';
import HomePage from "./HomePage";
import LoginForm from "./loginForm";

class App extends Component {
 
  render() {

    return (

      <Router>
        <Header />
        <div className="container-fluid d-flex align-items-center flex-column p-0">
        <Switch> 
          
          <Route path="/login">
              <LoginForm />
          </Route>
          <PrivateRoute exact path="/" comp={HomePage}>
              
          </PrivateRoute>
    
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

