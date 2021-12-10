import React, { Component } from "react";

import http from "./http";
import List from "./components/List";
import Form from "./components/Form";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });
    console.log(http.get("/comments"));
    // get all the comments
    http.get("/comments")
    .then(res => res.data)
      //.then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  /**
   * Add new comment
   * 
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  render() {

    <header className="App-header">
   
    <h1 className="App-title">
      SMS

    </h1>
   
  </header>
   
    return (

      
      <div className="App container bg-light shadow">
        

        <div className="row">
          <div className="col-sm-4  pt-3 border-right">
            <h6>Envoyer votre sms</h6>
            <ToastContainer />
            <Form addComment={this.addComment} />
          </div>
          <div className="col-sm-8  pt-3 bg-white">
            <List
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
     
    );
  }
}

export default HomePage;
