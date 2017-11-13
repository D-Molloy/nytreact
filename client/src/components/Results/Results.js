import React, { Component } from "react";
import "./Results.css";
import API from "../../utils/API";

class Results extends Component {
  //get call to the database
  state = {
    _id: "",
    title:"",
    summary:"",
    url:"",
    date:"",
    results: {}
  };

  componentDidMount() {
    this._queryArticles();
  }


  _queryArticles = query => {
    API.queryArticles()
      .then(res => {
        this.setState({ results: res.data }, 
          () => {
          this._populateArticles();
        });
      })
      .catch(err => console.log(err));
  }; //end queryTimes


  _populateArticles = () => {
    console.log(this.state.results)
  }


  render() {
    return (
      <div className="main-container container text-center border border-secondary search-div">
        <h3>Results</h3>
        <hr />
        <div className="query-results" />
        <p>{this.state.results.length} articles found.</p>
      </div>
    );
  }
}

export default Results;
