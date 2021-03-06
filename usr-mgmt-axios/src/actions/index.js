import axios from 'axios';
import {
	FETCH_USERS,
	FETCH_USER,
	CREATE_USER,
	DELETE_USER
} from './types';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = `?key=KRAMER12`;

// Action Creator: Fetch Users
export function fetchUsers() {
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

	return {
		type: FETCH_USERS,
		payload: request
	};

}

// Action Creator: Create User
export function createUser(values, callback) {
	const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
		.then(() => callback());

	return {
		type: CREATE_USER,
		payload: request
	};
}

//Action Creator: Fetch User
export function fetchUser(id) {
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

	return {
		type: FETCH_USER,
		payload: request
	};
}

// Action Creator: Delete User
export function deleteUser(id, callback) {
	const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
		.then(() => callback());

	return {
		type: DELETE_USER,
		payload: id
	};
}