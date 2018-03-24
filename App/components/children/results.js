import React from "react";
var helpers = require("../utils/helpers");

class Results extends React.Component { 
  constructor(props) {
    super(props);
    this.handleSaveResult= this.handleSaveResult.bind(this);
    this.handleDeleteResult = this.handleDeleteResult.bind(this);
  }

  handleSaveResult() {
    console.log("1xxx");
    event.preventDefault();
    console.log("1xxx");
    helpers.postSaved(this.props.articleInfo).then(function(response) {
      console.log("Response=================");
      console.log("prop after response ", this.props);
      this.props.removeResult(this.props.articleInfo.url)
    }.bind(this));
  }

  handleDeleteResult() {
    event.preventDefault();
    this.props.removeResult(this.props.articleInfo.url)
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" id="resultHeader">
          <button onClick={this.handleSaveResult} className="btn btn-default btn-xs pull-right">Save</button>
           &nbsp; &nbsp;
           <a target="_blank" href={this.props.articleInfo.url}>{this.props.articleInfo.title}</a>
           &nbsp;•&nbsp; {this.props.articleInfo.pub_date.substring(0,10)}
      </div>
        <div className="panel-body">
          <p>{this.props.articleInfo.snippet}</p>
        </div>
      </div>
    )
  }
}

export default Results;