// I did not have time to test the axios calls properly
// This is a mock up of the requests / responses.. just going to call the requests for time sake.
import _ from 'lodash';

let url = 'http://reduxblog.herokuapp.com/api/posts?key=KRAMER12';

// Imported by the test-actions-index.js to uses as a mock axios function.
export function testData(db) {
	let data;
	db ? data = db : data = [];
	const createUser_request = {
		Promise: {
			config: { 
				method: "post", 
				url: url
			},

			data: data,
			request: {
				responseURL: url,
				status: 200
			}
		}
	}

	const fetchUsers_request = {
		Promise: {
			config: { 
				method: "get", 
				url: url 
			},

			data: data,
			request: {
				responseURL: url,
				status: 200
			}
		}
	}

	const fetchUser_request = {
		Promise: {
			config: { 
				method: "get", 
				url: url 
			},

			data: getUser(data),
			request: {
				responseURL: url,
				status: 200
			}
		}
	}

	const deleteUser_request = {
		Promise: {
			config: { 
				method: "post", 
				url: url 
			},

			data: deleteUser(data),
			request: {
				responseURL: url,
				status: 200
			}
		}
	}

	return {
		createUser_request,
		fetchUsers_request,
		fetchUser_request,
		deleteUser_request
	};
}

// Imported by the index-tests.js to used as mock users data, coming from the db
export const mockUsers = [
	{ id: 12345, title: "Doug", categories: "Funnie", content: "123 Memory Ln, Bloatsburg" },
	{ id: 23456, title: "Pattie", categories: "Mayonnaise", content: "124 Memory Ln, Bloatsburg" },
	{ id: 89056, title: "PorkChop", categories: "Funnie", content: "123 Memory Ln, Bloatsburg" }
]

// Helper function that returns the user give an id
const getUser = (id) => {
	return mockUsers.filter((e) => {return e.id === id});
}

// Helper function that removes the user with given id;
const deleteUser = (id) => {
	return _.reject(mockUsers, (e) => {return e.id === id});
}