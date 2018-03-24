import React from "react";
var helpers = require("../utils/helpers");

class Form extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      term: "",
      begin_date: "",
      end_date: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBeginDateChange = this.handleBeginDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    console.log("term: ", event.target.value);
    this.setState(newState);
  }

  handleBeginDateChange(event) {
    
    var newState = {};
    newState[event.target.id] = event.target.value;  
    console.log("Begin Date" + event.target.value);
    this.setState(newState);
  }

  handleEndDateChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    console.log("End Date: " + event.target.value);
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("state begin date ", this.state.begin_date);
    this.props.setTerm(this.state.term, this.state.begin_date, this.state.end_date);
    this.setState({ term: "", begin_date: "", end_date: "" });
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" id="formHeader">
          <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i> Search Parameters</strong></h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                Search Term:
              </h4>
              <input
                value={this.state.term}
                type="text"
                className="form-control"
                id="term"
                onChange={this.handleChange}
                required
              />

              <h4 className="">
                Begin Year (YYYY):
              </h4>

              <input
                value={this.state.begin_date}
                type="text"
                className="form-control"
                id="begin_date"
                onChange={this.handleBeginDateChange}
                required
              />

              <h4 className="">
                End Year (YYYY):
              </h4>

              <input
                value={this.state.end_date}
                type="text"
                className="form-control"
                id="end_date"
                onChange={this.handleEndDateChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form; 