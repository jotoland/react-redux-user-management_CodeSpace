import {
	FETCH_USERS,
	FETCH_USER,
	CREATE_USER,
	DELETE_USER,
	UPDATE_USER
} from './types';

// Action Creator: Fetch Users
export function fetchUsers() {
	let yoyoUsers = 'yoyo';
	return {
		type: FETCH_USERS,
		payload: { yoyoUsers }	
	};
}

// Action Creator: Create User
export function createUser(values, callback) {
	return {
		type: CREATE_USER,
		payload: { yoyoCreate: { values, callback } }
	};
}

//Action Creator: Fetch User
export function fetchUser(id) {
	return {
		type: FETCH_USER,
		payload: { yoyoUser: { id } }
	};
}

// Action Creator: Delete User
export function deleteUser(id, callback) {
	return {
		type: DELETE_USER,
		payload: { yoyoDelete: { id, callback } }
	};
}

// Action Creator: Update User
export function updateUser(id, values, callback) {
	return {
		type: UPDATE_USER,
		payload: { yoyoUpdate: { id, values, callback } }
	};
}