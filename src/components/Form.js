import React, { Component } from "react";
import http from "../http";
import { toast } from 'react-toastify';



export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        user: "",
        numTel: "",
        description: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify = () => toast("sms bien envoyé");

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit(el) {
    // prevent default form submission
    el.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "Tous les champs sont requis" });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    console.log(comment);
    /*  fetch("http://localhost:1337/comments", {
        headers: {"Content-type": "application/json;charset=UTF-8"},
        method: "post",
        authorization: `bearer ${jwtToken}`,
        body: JSON.stringify(comment)
    })  */
        http.post("/comments", comment)
     // .then(res => res.json())
        .then(this.notify())
        .then(() =>{
        
        //this.props.addComment(comment);
          
            
          this.setState({
            loading: false,
            comment: { ...comment, user:"", numTel:"", description: "" }
          });
          setTimeout(window.location.reload.bind(window.location), 3000);
          

        
      })
      .catch(error => {
          console.log(error);
        this.setState({
          error: "yo! quelque chose ne va pas",
          loading: false
        });
      });
      console.log(JSON.stringify(comment))
      
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.user !== "" && this.state.comment.numTel !== "" && this.state.comment.description !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.user}
              className="form-control"
              placeholder="Nom"
              name="user"
              type="text"
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.numTel}
              className="form-control"
              placeholder="Numéro de téléphone"
              name="numTel"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.description}
              className="form-control"
              placeholder="Votre message"
              name="description"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}