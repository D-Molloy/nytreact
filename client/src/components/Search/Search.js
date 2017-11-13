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
    results: []
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

  _queryTimes = query => {
    API.queryTimes(query)
      .then(res => {
        this.setState({ results: res.data.response.docs }, () => {
          this._saveArticles();
        });
      })
      .catch(err => console.log(err))
  }; //end queryTimes

  _saveArticles = () => {
    let articleObj = this.state.results;
    for (let i = 0; i < articleObj.length; i++) {
      let title = articleObj[i].headline.main;
      let summary = articleObj[i].snippet;
      let url = articleObj[i].web_url;
      let date = articleObj[i].pub_date;

      // console.log(`headline: ${title} summary :" ${summary} url: ${url} date: ${date}`)

      let newArticle = {
        title: title,
        summary: summary,
        url: url,
        date: date
      };

      API.saveArticle(newArticle)
      .then(res => console.log(res))
      .catch(err => console.log(err));

      //axios call to the route defined in server.js
      // if (articleObj[i].pub_date !== undefined) {
      //     ArticleCont.saveArticle({
      //         title: title,
      //         summary: summary,
      //         url: url,
      //         date: date
      //     })
      //     .then(res => console.log(res))
      //     .catch(err => console.log(err));
      // }

      //  reset state here

    } //end for
  };

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
