// Not a good way to test this project, short on time so just using mock data / functins to test axios calls
import {expect} from 'chai';
import {  	
	FETCH_USERS, FETCH_USER,
	CREATE_USER, DELETE_USER,
} from '../../src/actions/types';
import { 
	fetchUsers, createUser,
	fetchUser, deleteUser,
} from './helpers/test-actions-index';
import { mockUsers } from './data/testData';

let users, user;
let url = 'http://reduxblog.herokuapp.com/api/posts?key=KRAMER12';

// Helper function that checks the Promise to exist and have general porpeties shared across all tests.
function promiseExistsWithProperties(Promise) {
	expect(Promise).to.exist;
	expect(Promise).to.be.an('object');
	expect(Promise.config).to.be.an('object');
	expect(Promise.config.url).to.equal(url);
	expect(Promise.data).to.be.a('array')
	expect(Promise.request).to.be.a('object');
	expect(Promise.request.responseURL).to.equal(url);
	expect(Promise.request.status).to.equal(200);
}

// Tests Begin
// Actions: 
describe('Actions: index.js', () => {
	// FetchUsers(): should return 0 users for rendering on users_index.js
	describe('Action: fetchUsers(), Side Effect: returns 0 users', () => {
		beforeEach(() => {
			users = fetchUsers();
		});
		it('has the correct type', () => {
			expect(users.type).to.equal(FETCH_USERS);
		});
		it('has the correct payload', () => {
			let Promise = users.payload.Promise;

			promiseExistsWithProperties(Promise);
			expect(Promise.config.method).to.equal('get');
			expect(Promise.data).to.be.empty;
		});
	});

	// FetchUsers(): should return 3 users for rendering on users_index.js
	describe('Action: fetchUsers(), Side Effect: returns 3 users', () => {
		beforeEach(() => {
			users = fetchUsers(mockUsers);
		});
		it('has the correct type', () => {
			expect(users.type).to.equal(FETCH_USERS);
		});
		it('has the correct payload', () => {
			let Promise = users.payload.Promise;
			promiseExistsWithProperties(Promise);

			expect(Promise.config.method).to.equal('get');
			expect(Promise.data).to.not.be.empty;
			expect(Promise.data.length).to.be.above(2);
			expect(Promise.data.length).to.be.below(4);
			expect(Promise.data).to.include(mockUsers[0]);
			expect(Promise.data).to.include(mockUsers[1]);
			expect(Promise.data).to.include(mockUsers[2]);
		});
	});

	// CreateUser(values, callback): should create a user for rendering on users_index.js
	describe('Action: createUser(), Side Effect: creates a user', () => {
		let values;
		beforeEach(() => {
			values = {
				title: mockUsers[0].title,
				categories: mockUsers[0].categories,
				content: mockUsers[0].content
			}
			user = createUser(values, () => {
				//callback function
			});
		});
		it('has the correct type', () => {
			expect(user.type).to.equal(CREATE_USER);
		});	
		it('has the correct payload', () => {
			let Promise = user.payload.Promise;
			promiseExistsWithProperties(Promise);

			expect(Promise.config.method).to.equal('post');
			expect(Promise.data).to.not.be.empty;
			expect(Promise.data.length).to.equal(1);
			expect(Promise.data).to.include(values);
		});
	});


	// FetchUser(id): should return a user given an id for rendering in users_show.js
	describe('Action: fetchUser(id), Side Effect: returns 1 user with givend id', () => {
		let id = 12345;
		beforeEach(() => {
			user = fetchUser(id);
		});
		it('has the correct type', () => {
			expect(user.type).to.equal(FETCH_USER);
		});
		it('has the correct payload', () => {
			let Promise = user.payload.Promise;
			promiseExistsWithProperties(Promise);

			expect(Promise.config.method).to.equal('get');
			expect(Promise.data).to.not.be.empty;
			expect(Promise.data.length).to.equal(1);
			expect(Promise.data[0].id).to.equal(id);
		});
	});

	// DeleteUser(id): should remove a user given an id for rendering in users_index.js
	describe('Action: deleteUser(id, callback), Side Effect: deletes user given an id', () => {
		let id = 12345;
		beforeEach(() => {
			user = deleteUser(id, () => {
				// callback function
			});
		});
		it('has the correct type', () => {
			expect(user.type).to.equal(DELETE_USER);
		});
		it('has the correct payload', () => {
			expect(user.payload).to.exist;
			expect(user.payload).to.equal(id);

			let Promise = user.request.Promise;
			promiseExistsWithProperties(Promise);

			expect(Promise.config.method).to.equal('post');
			expect(Promise.data.filter((e) => {return e.id === id})).to.be.empty;
			expect(Promise.data.indexOf(mockUsers.filter((e) => {return e.id == id}))).to.equal(-1);
		});
	});
});
// Tests End: Actions