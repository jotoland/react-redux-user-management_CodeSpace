// Middleware for creating a user; Action: createUser(values, callback)
export default function({dispatch}) {
	return next => action => {
		if(!action.payload || !action.payload.yoyoCreate) {
			return next(action);
		}

		let users = JSON.parse(localStorage.getItem('Users'));
		let id = Math.floor(Math.random() * (9999-1000+1) + 1000);
		let newUser = {
			id: id,
			fname: action.payload.yoyoCreate.values.fname,
			lname: action.payload.yoyoCreate.values.lname,
			address: action.payload.yoyoCreate.values.address
		}

		users.data.push(newUser);
		localStorage.setItem('Users', JSON.stringify(users));
		action.payload.yoyoCreate.callback();

		const newAction = { ...action, payload: { data: [newUser] } };
		dispatch(newAction);
	}
}
