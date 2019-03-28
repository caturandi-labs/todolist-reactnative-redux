import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import todosReducer from '../reducers/todos';

import {
	createReduxContainer,
	createReactNavigationReduxMiddleware,
	createNavigationReducer
} from 'react-navigation-redux-helpers';

import Todos from '../screens/Todos';
import TodosCreate from '../screens/TodosCreate';

//Custom Middleware
import promise from 'redux-promise-middleware';

const AppNavigator = createStackNavigator(
	{
		Todos: {
			screen: Todos,
			navigationOptions: {
				headerTitle: 'WorkPlay Todos',
				headerStyle: {
					backgroundColor: '#4CAF50'
				},
				headerTintColor: '#fff'
			}
		},
		TodosCreate: {
			screen: TodosCreate,
			navigationOptions: {
				headerTitle: 'WorkPlay Todos',
				headerStyle: {
					backgroundColor: '#4CAF50'
				},
				headerTintColor: '#fff'
			}
		}
	},
	{
		initialRouteName: 'Todos'
	}
);

const nav = createNavigationReducer(AppNavigator); //navReducer

const appReducer = combineReducers({
	nav,
	todosReducer
});

const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = (state) => ({
	state: state.nav
});

export const AppWithNavigationState = connect(mapStateToProps)(App);

export const store = createStore(appReducer, applyMiddleware(middleware, promise));
