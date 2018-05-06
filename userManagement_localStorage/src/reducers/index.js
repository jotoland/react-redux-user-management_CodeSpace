import { combineReducers } from 'redux';
import usersReducer from './reducer_users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	users: usersReducer,
	form: formReducer
});

export default rootReducer;
