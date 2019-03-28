import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import { BASE_URL } from '../environtment/env';
import promise from 'redux-promise-middleware';

//Reducer

const usersInitialState = {
	username: ''
};

const todosInitialState = {
	todos: [],
	isLoading: false
};

const usersReducer = (state = usersInitialState, action) => {
	switch (action.type) {
		case 'USERS_CHANGE_USERNAME':
			state = { ...state, username: action.payload };
			break;
		default:
			state;
	}

	return state;
};

const todosReducer = (state = todosInitialState, action) => {
	switch (action.type) {
		case 'ALL_TODOS_PENDING':
			state = { ...state, isLoading: true };
			break;
		case 'ALL_TODOS_FULFILLED':
			state = { ...state, todos: action.payload.data.data };
			break;
		default:
			state;
	}
	return state;
};

//Store
const rootReducers = combineReducers({
	usersReducer,
	todosReducer
});

const middlewares = applyMiddleware(logger, promise);
const store = createStore(rootReducers, middlewares);

//Subscriptions
store.subscribe(() => {
	console.log(store.getState());
});

//DISPATCHER
store.dispatch({ type: 'USERS_CHANGE_USERNAME', payload: 'pamungkas' });
store.dispatch({
	type: 'ALL_TODOS',
	payload: axios.get(`${BASE_URL}/todos`)
});
