import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
	super(props);

	this.state = {
      term: ''
	};

	/* this says that this has an onInputChange
	   and bind that function to this and replace the
     existing function with it, its called context
	 **NOTE**- the onFormSubmit() is bound the other way but the
	 do the same thing
    */
	this.onInputChange = this.onInputChange.bind(this);
	/* purposefully wrote this bind 2 different ways, 1)onInputChange 2)onFormSubmit
	this.onFormSubmit = this.onFormSubmit.bind(this);*/
  }

  onInputChange(event){
	// console.log(event.target.value);
	this.setState({ term: event.target.value });
    /* not that 'this'-keyword is not =  to the state UNLESS we bind it to the proper object*/
	// console.log(this);
  }

  onFormSubmit(event){
	event.preventDefault();
	// we need to call the action-creator here, which is fetchWeather()
    this.props.fetchWeather(this.state.term);
	// And this next line is what clears the form for the user
	this.setState({ term: '' });
  }

  render() {
    return (
      <form
		onSubmit={this.onFormSubmit.bind(this)}
		className="input-group">
		<input
		  placeholder="Get a 5-day forecast in your favorite cities"
		  className="form-control"
		  value={this.state.term}
		  onChange={this.onInputChange} />
		<span className="input-group-btn">
		  <button type="submit" className="btn btn-secondary">Submit</button>
		</span>
	  </form>
	);
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

// null is passed in to let redux know that we don't care about state here
export default connect(null, mapDispatchToProps)(SearchBar);
/*The only reason to pass null in is that we need mapDispatchToProps needs to be the second argument */
