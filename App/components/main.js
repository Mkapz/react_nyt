var React = require('react');

var Form = require('./Children/Form');
var Results = require('./Children/Results');
var History = require('./Children/History');

var helpers = require('./utils/helpers.js');


var Main = React.createClass({


	getInitialState: function(){
		return {
		
			searchTerm: "",

			
			results: [],


			history: [] 
		}
	},	

	
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			
			helpers.runQuery(this.state.searchTerm)
				.then(function(data){
					if (data != this.state.results)		
					{
						

						console.log("Address", data);

						console.log(data);

						this.setState({
							results: data
						})

						
						helpers.postHistory(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								helpers.getHistory()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	
	componentDidMount: function(){

		
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">Address Finder!</h2>
						<p className="text-center"><em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em></p>
					</div>

					<div className="col-md-6">
					
						<Form setTerm={this.setTerm}/>

					</div>

					<div className="col-md-6">
				
						<Results address={this.state.results} />

					</div>

				</div>

				<div className="row">

					<History history={this.state.history}/> 

				</div>

			</div>
		)
	}
});


module.exports = Main;