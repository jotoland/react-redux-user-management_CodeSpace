import { FETCH_USERS, FETCH_USER, DELETE_USER, CREATE_USER } from '../actions/types';
import _ from "lodash";

export default function(state = {}, action) {
	switch(action.type) {
		case DELETE_USER:
			return _.omit(state, action.payload);
		case FETCH_USER:
			return { ...state, [action.payload.data.id]: action.payload.data };
		case FETCH_USERS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}