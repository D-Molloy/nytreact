import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/Search/Search";
import Results from "./components/Results/Results";
import "./App.css";

const App = () => (
  <div className="main-container ">
    <div className="jumbotron text-center" id="jumbo-img">
      <div className="jumbo-text ">
        <h1>New York Times</h1>
        < hr/>
        <h3>Article Search</h3>
      </div>
    </div>
    <Search />
    <br />
    <Results />
  </div>
);

export default App;
