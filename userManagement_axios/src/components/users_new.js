import React, { Component } from 'react';
// Similar to connect, Form is allow our component to 
// communicate to the redux store.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../actions';


class UsersNew extends Component {
	onSubmit(values) {
		// Call ActionCreator with callBack Function
		this.props.createUser(values, () => {
			// Naviagtion back to the ROOT Route
			this.props.history.push('/');
		});
	}

	renderField(field){
		const { input, label, type, placeholder, meta: { touched, error } } = field;
		const className =`form-group ${touched && error ? 'has-danger' : ''}`;

		return(
			<div className={className}>
				<label style={{margin: "5px", fontWeight: "bold"}}>{label}</label>
				<input
					className='form-control'
					type="text"
					placeholder={placeholder}
					{...input}
				/>
				<div className="text-help">
				{touched ? error : ''}
				</div>
			</div>
		);
	}

	render() {
		const { handleSubmit, user, pristine, submitting, reset, load } = this.props;

		return (
			<form style={{margin: "15px"}} onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
				<h1 className="text-xs-left">Add User</h1>
				<Field 
					name="title" 
					type="text" 
					component={this.renderField} 
					label="First Name:" 
					placeholder="Enter your first name..." 
				/>
				<Field 
					name="categories" 
					type="text" 
					component={this.renderField} 
					label="Last Name:" 
					placeholder="Enter your last name..." 
				/>
				<Field 
					name="content" 
					type="text" 
					component={this.renderField} 
					label="Address:" 
					placeholder="Enter your address..." 
				/>
				<button 
					style={{margin: '5px'}} 
					type="submit" 
					className="btn btn-primary" 
					disabled={pristine || submitting}>
						Submit
				</button>
				<button 
					style={{margin: '5px'}}  
					className="btn btn-secondary" 
					disabled={pristine || submitting} 
					onClick={reset}>
						Clear Values
				</button>
				<Link style={{margin: '5px'}}  to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

/* Helper function: passed to the reduxForm
 used to valid the input from the user
 Called when the user tries to submit the form
 Returns the values entered in the form by the user
*/ 
function validate(values) {
	const errors = {};
	// Logic to validate the inputs
	if (!values.title || values.title.length < 3) {
		errors.title = "Enter your fist name that is at least 3 characters.";
	}
	if (!values.categories) {
		errors.categories = "Enter your last name.";
	}
	if (!values.content) {
		errors.content = "Enter your address.";
	}

	return errors;
}

/* Connect: allows us to add additional
   properties to our component
   This is wired up the same way we 
   wire up connect
*/
// These helpers are layered up
export default reduxForm({
	validate,
	// Name of the form (has to be unique)
	form: 'UsersNewForm'
	// Component is UsersNew
})(
	connect(null, { createUser })(UsersNew)
);