// Middleware for fethcing one user; Action: fetchUser(id)
export default function({dispatch}) {
	return next => action => {
		if(!action.payload || !action.payload.yoyoUser) {
			return next(action);
		}

		let users = JSON.parse(localStorage.getItem('Users'));
		let user = users.data.filter((e) => { return e.id === action.payload.yoyoUser.id });

		const newAction = { ...action, payload: { data: user[0] } };
		dispatch(newAction);
	}
}