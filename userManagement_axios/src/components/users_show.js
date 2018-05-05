import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, deleteUser, updateUser } from '../actions';
import { Link } from 'react-router-dom';

class UsersShow extends Component {
	componentDidMount() {
		if (!this.props.user) {
			const { id } = this.props.match.params;

			this.props.fetchUser(id);
		}
	}

	onDeleteClick() {
		const { id } = this.props.match.params;

		this.props.deleteUser(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { user } = this.props;

		if (!user) {
			return <div>Loading...</div>;
		}

		return(
			<div style={{margin: '5px'}}>
				<h1 className="text-xs-left">User Info</h1>
				<Link to="/">Back To Index</Link>
				<div className="text-xs-right">
					<button
						style={{margin: '5px'}}
						className="btn btn-danger pull-xs-right"
						onClick={this.onDeleteClick.bind(this)}
					>
						Delete User
					</button>
					<Link
						style={{margin: '5px'}} 
						className="btn btn-primary" 
						to={`/users/update/${user.id}`}
					>
						Update User
					</Link>

				</div>
				<h4>Name: {user.title} {user.categories}</h4>
				<p>Address: {user.content}</p>
			</div>
		);
	}
}

/* ownProps is the props object headed to the UserShow component
   Second argument of mapStateToProps is the set of props going
   to the target component, making mapStateToProps a great place 
   to do intermediate level calculations or lookups
*/
function mapStateToProps({ users }, ownProps) {
	return { user: users[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { 
	fetchUser, 
	deleteUser, 
	updateUser
} )(UsersShow);