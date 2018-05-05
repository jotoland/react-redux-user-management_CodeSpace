import React, { Component } from'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UsersIndex from './components/users_index';
import UsersNew from './components/users_new';
import UsersShow from './components/users_show';
import UsersUpdate  from './components/users_update';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
			  {/* When a user naviagtes to the path, we show the component */}
			      <Route path="/users/update/:id" component={UsersUpdate} />
						<Route path="/users/new" component={UsersNew} />
			    {/* Wild Card is a : then some text followed */}
			      <Route path="/users/:id" component={UsersShow} />
						<Route path="/" component={UsersIndex} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null)(App);
