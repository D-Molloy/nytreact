import React, { Component } from "react";
import API from "../../utils/API";
import "./Search.css";

// SETUP VARIABLES
// ==========================================================


//variables values assigned in _handleFormSubmit
let searchTopic;
let searchStart;
let searchEnd;

// let searchTerm = "";
// let numResults = 0;
// let startYear = 0;
// let endYear = 0;


class Search extends Component {
  state = {
    topic: "",
    startYear: "",
    endYear: "",
    results:[]
  };

  _handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  _queryTimes = (query) => {
      API.queryTimes(query)
      .then(res => console.log(res.data.response.docs))
    //   .then(res => this.setState({ results: res.data.response.docs }))
    //   .then(res => console.log(res.data.response.docs))
    //   .then (console.log(this.state.results))
      .catch(err => console.log(err));
      this._saveArticles();
  }; //end queryTimes

  _saveArticles = () => {
    console.log("results: " , this.state.results)
  }

  _handleFormSubmit = event => {
    event.preventDefault();
    // let searchTopic;
    let searchStartTemp = this.state.startYear.trim();
    // let searchStart;
    let searchEndTemp = this.state.endYear.trim();
    // let searchEnd;

    /////////////////////////////////////
    //     Input Validation
    /////////////////////////////////////
    if (this.state.topic === "") {
      return alert("Please enter a Search topic.");
    } else {
      searchTopic = this.state.topic.trim();
    }

    if (searchStartTemp.match(/[1-2][0-9][0-9][0-9]/)) {
      searchStart = searchStartTemp;
    } else {
      return alert("Please enter a valid Start Year(1851 to 2017).");
    }

    if (searchEndTemp.match(/[1-2][0-9][0-9][0-9]/)) {
      searchEnd = searchEndTemp;
    } else {
      return alert("Please enter a valid End Year (1851 to 2017).");
    }

    if (parseInt(searchStart, 10) > parseInt(searchEnd, 10)) {
      return alert("Please ensure your Start Year is prior to your End Year.");
    }

    this.setState({
      topic: searchTopic,
      startYear: searchStart,
      endYear: searchEnd
    });
    // alert(
    //   `Topic: ${this.state.topic} \nstartYear: ${this.state
    //     .startYear} \nendYear: ${this.state.endYear}`
    // );

    this._queryTimes(searchTopic);
  }; //end _handleFormSubmit

  render() {
    return (
      <div className="main-container container text-center border border-secondary search-div">
        <h3>Search</h3>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="inputSearchTopic">Search Topic</label>
            <input
              value={this.state.topic}
              onChange={this._handleInputChange}
              name="topic"
              type="text"
              className="form-control"
              id="inputSearchTopic"
              placeholder="The topic you want to find articles about."
            />
          </div>
          <div className=" row">
            <div className="form-group col-sm-6">
              <label htmlFor="inputStartYear">Start Year</label>
              <input
                value={this.state.startYear}
                onChange={this._handleInputChange}
                name="startYear"
                type="text"
                className="form-control"
                id="inputStartYear"
                placeholder="Enter the beginning search year."
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="inputEndYear">End Year</label>
              <input
                value={this.state.endYear}
                onChange={this._handleInputChange}
                name="endYear"
                type="text"
                className="form-control"
                id="inputEndYear"
                placeholder="Enter the ending search year."
              />
            </div>
          </div>
        </form>
        <div className="form-control border border-white">
          <button
            className="btn btn-lg btn-primary"
            onClick={this._handleFormSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
