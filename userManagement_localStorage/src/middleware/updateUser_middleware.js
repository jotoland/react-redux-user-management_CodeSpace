import _ from 'lodash';
// Middleware fro updating one user; Action: updateUser(id, callback)
export default function({dispatch}) {
	return next => action => {
		if(!action.payload || !action.payload.yoyoUpdate) {
			return next(action);
		}
		let users = JSON.parse(localStorage.getItem('Users'));
		users.data = _.reject(users.data, (e) => {return e.id.toString() === action.payload.yoyoUpdate.id });

		let updatedUser = {
			id: action.payload.yoyoUpdate.id,
			fname: action.payload.yoyoUpdate.values.fname,
			lname: action.payload.yoyoUpdate.values.lname,
			address: action.payload.yoyoUpdate.values.address
		};

		users.data.push(updatedUser);
		localStorage.setItem('Users', JSON.stringify(users));
		action.payload.yoyoUpdate.callback();
		
		const newAction = { ...action, payload: { data: [updatedUser] } };
		dispatch(newAction);
	}
}