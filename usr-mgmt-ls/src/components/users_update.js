import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../actions';

class UsersUpdate extends Component {
	componentDidMount() {
		if (!this.props.user) {
			const { id } = this.props.match.params;
			this.props.fetchUser(id);
		}
	}

	onSubmit(values) {
		let id = this.props.user.id;

		if (!values.hasOwnProperty('fname')) {
			values.fname = this.props.user.fname;
		} 
		if (!values.hasOwnProperty('lname')) {
			values.lname = this.props.user.lname;
		}
		if (!values.hasOwnProperty('address')) {
			values.address = this.props.user.address;
		}

		this.props.updateUser(this.props.user.id.toString(), values, () => {
			window.alert(
				`User ${id} Updated: ${JSON.stringify(
					{
						fname: values.fname, 
						lname: values.lname, 
						address: values.address 
					}, null, 2)}`
			);
			this.props.history.push('/');
		});
		
	}

	renderField(field){
		const { input, label, type, placeholder } = field;
		let labelArray = label.split('?');

		return(
			<div className="form-group">
				<label style={{margin: "5px", fontWeight: "bold"}}>{labelArray[0]}</label>
				<span>{labelArray[1]}</span>
				<input
					className='form-control'
					type="text"
					placeholder={placeholder}
					{...input}
				/>
			</div>
		);
	}

	render() {
		const { handleSubmit, user, pristine, submitting, reset } = this.props;

		if (!user) {
			return <div>Loading...</div>;
		}
		
		return (
			<form style={{margin: "15px"}} onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
				<h1 className="text-xs-left">Update User</h1>
				<Field 
					name="fname" 
					type="text" 
					component={this.renderField} label={`First Name: ?${user.fname}`} 
					placeholder="Update your first name..." 
				/>
				<Field 
					name="lname" 
					type="text" 
					component={this.renderField} 
					label={`Last Name: ?${user.lname}`} 
					placeholder="Update your last name..." 
				/>
				<Field 
					name="address" 
					type="text" 
					component={this.renderField} 
					label={`Address: ?${user.address}`} 
					placeholder="Update your address..." 
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
				<Link style={{margin: '5px'}} to={`/users/${user.id}`} className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}
 
function mapStateToProps({ users }, ownProps){
	return { user: users[ownProps.match.params.id] };
}

// These helpers are layered up
export default reduxForm({
	// Name of the form (has to be unique)
	form: 'UsersNewForm'
})(
	connect(mapStateToProps, { fetchUser, updateUser })(UsersUpdate)
);