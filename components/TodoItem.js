import React, { Component } from 'react';
import { Icon, CheckBox, Text, SwipeRow, Button, View } from 'native-base';
import axios from 'axios';
import { BASE_URL } from '../environtment/env';
import { connect } from 'react-redux';
import { allTodos } from '../actions';
import PropTypes from 'prop-types';

class TodoItem extends Component {
	state = {
		isDone: false
	};

	componentDidMount() {
		const { todo: { is_done } } = this.props;
		console.log(this.props);
		this.setState({ isDone: Boolean(is_done) });
	}

	handleDone() {
		const { todo: { id } } = this.props;
		this.setState({
			isDone: !this.state.isDone
		});

		axios
			.patch(`${BASE_URL}/todos/${id}`, {
				is_done: this.state.isDone ? 0 : 1
			})
			.then((result) => console.log(result))
			.catch((err) => alert(err));
	}

	async handleDelete(id) {
		await axios.delete(`${BASE_URL}/todos/${id}`);
		this.props.dispatch(allTodos());
	}
	render() {
		const { todo } = this.props;
		return (
			<SwipeRow
				rightOpenValue={-75}
				key={todo.id}
				body={
					<View style={{ flexDirection: 'row' }}>
						<View style={{ padding: 10 }}>
							<CheckBox onPress={() => this.handleDone()} checked={this.state.isDone} />
						</View>
						<View style={{ padding: 10 }}>
							<Text>{todo.name}</Text>
						</View>
					</View>
				}
				right={
					<Button danger onPress={() => this.handleDelete(todo.id)}>
						<Icon active name='trash' />
					</Button>
				}
			/>
		);
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(TodoItem);
