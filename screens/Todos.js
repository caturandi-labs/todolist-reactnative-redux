import React, { Component } from 'react';
import { Container, Content, List, Fab, Icon } from 'native-base';
import { FlatList, StatusBar } from 'react-native';
import TodoItem from '../components/TodoItem';
import { connect } from 'react-redux';
import { allTodos } from '../actions';

class Todos extends Component {
	componentDidMount() {
		this.props.dispatch(allTodos());
	}

	_keyExtractor = (item, index) => String(item.id);

	render() {
		return (
			<Container>
				<StatusBar barStyle='light-content' backgroundColor='#388E3C' />
				<Content>
					<List>
						<FlatList
							renderItem={({ item }) => <TodoItem key={item.id} todo={item} />}
							keyExtractor={this._keyExtractor}
							data={this.props.todosReducer.todos}
						/>
					</List>
				</Content>

				<Fab
					onPress={() => this.props.navigation.navigate('TodosCreate')}
					style={{ backgroundColor: '#FFA000' }}
					position='bottomRight'
				>
					<Icon name='add' />
				</Fab>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return { todosReducer: state.todosReducer };
};
export default connect(mapStateToProps)(Todos);
