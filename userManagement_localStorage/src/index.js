
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import FetchUsers from './middleware/fetchUsers_middleware';
import CreateUser from './middleware/createUser_middleware';
import FetchUser from './middleware/fetchUser_middleware';
import DeleteUser from './middleware/deleteUser_middleware';
import reducers from './reducers';

import App from './app';

const middleware = {
}

const createStoreWithMiddleware = applyMiddleware( 
	FetchUsers,
	CreateUser,
	FetchUser,
	DeleteUser
)(createStore);

ReactDOM.render (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));