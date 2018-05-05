import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
/* LINK TAGS:*****************************
 Link tags act like anchor tags but they prevent the browser
 from doing default actions, like a new HTTP request.
 react-router is a one page application that renders 
 new components to trick the user into thinking
 they are naviagting to a different page.
*/
import { Link } from 'react-router-dom';
import _ from 'lodash';

let count = 0;

class UsersIndex extends Component {
	// LifeCycle method of React
	componentDidMount() {
		this.props.fetchUsers();
	}

	renderUsers() {
		return _.map(this.props.users, user => {
			let userString = `${user.title}	${user.categories}`;
			return (
				<li className="list-group-item" key={user.id}>
					<Link to={`/users/${user.id}`}>
					{userString}
					</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div style={{margin: "10px"}}>
				<h1 className="text-xs-left">User Management Application</h1>
				<div className="text-xs-right">
					<Link style={{margin: "5px"}} className="btn btn-primary" to="/users/new">
						Add a User
					</Link>
				</div>
				<h3 style={{margin: "3px"}}>Users</h3>
				<p>You have {_.size(this.props.users)} users</p>
				<ul className="list-group">
					{this.renderUsers()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers })(UsersIndex);