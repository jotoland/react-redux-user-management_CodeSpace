import {
	FETCH_USERS,
	FETCH_USER,
	CREATE_USER,
	DELETE_USER
} from '../../../src/actions/types';
import { testData } from '../data/testData';
const jaxios = testData;

// Action Creator: Fetch Users
export function fetchUsers(db) {
	// axios call that returns the Promise with a property of data
	const request = jaxios(db).fetchUsers_request;

	return {
		type: FETCH_USERS,
		payload: request
	};
}

// Action Creator: Create User
export function createUser(values, callback) {
	// axios call that returns the Promise with a property of data
	const request = jaxios([values]).createUser_request;
	callback();
	return {
		type: CREATE_USER,
		payload: request
	};
}

//Action Creator: Fetch User
export function fetchUser(id) {
	const request = jaxios(id).fetchUser_request;

	return {
		type: FETCH_USER,
		payload: request
	};
}

// Action Creator: Delete User
export function deleteUser(id, callback) {
	const request = jaxios(id).deleteUser_request;
	callback();
	return {
		type: DELETE_USER,
		payload: id,
		// used only for test to make sure we deleted the user from the test data
		request
	};
}

