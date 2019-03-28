import { Provider } from 'react-redux';
import React from 'react';

import { AppWithNavigationState, store } from './navigators';
class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}

export default App;
