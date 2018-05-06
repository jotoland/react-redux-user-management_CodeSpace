// Middleware for fetching all the users; Action: fetchUsers()
export default function({dispatch}) {
	return next => action => {
		if (!action.payload || !action.payload.yoyoUsers) {
			return next(action);
		}

		let users = JSON.parse(localStorage.getItem('Users'));
		let blankSlateData; 

		if (!users) {
			blankSlateData = { data: [] };
			localStorage.setItem('Users', JSON.stringify(blankSlateData));
		} else {
			blankSlateData = { data: users.data };
		}

		const newAction = { ...action, payload: blankSlateData };
		dispatch(newAction);
	};
}