import _ from 'lodash';
// Middleware for deleteing one user; Action: deleteUser(id, callback)
export default function({dispatch}) {
	return next => action => {
		if (!action.payload || !action.payload.yoyoDelete) {
			return next(action);
		}

		let users = JSON.parse(localStorage.getItem('Users'));
		users.data = _.reject(users.data, (e) => { return e.id.toString() === action.payload.yoyoDelete.id });
		localStorage.setItem('Users', JSON.stringify(users));
		action.payload.yoyoDelete.callback();

		const newAction = { ...action, payload: action.payload.yoyoDelete.id };
		dispatch(newAction);
	}
}