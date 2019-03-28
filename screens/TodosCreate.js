import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../environtment/env';
import { connect } from 'react-redux';
import { allTodos } from '../actions';

class TodosCreate extends Component {
	constructor() {
		super();
		this.state = {
			name: ''
		};
	}

	handleSubmit() {
		const name = this.state.name;
		const { goBack } = this.props.navigation;
		if (name) {
			axios
				.post(`${BASE_URL}/todos`, { name })
				.then((result) => {
					this.props.dispatch(allTodos());
					goBack();
				})
				.catch((err) => console.log(err));
		}
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#f7f7f7' }}>
				<Content>
					<Form>
						<Item floatingLabel>
							<Label>My Todo </Label>
							<Input onChangeText={(name) => this.setState({ name })} />
						</Item>
					</Form>
				</Content>
				<Button
					style={styles.btnFooter}
					onPress={() => this.handleSubmit()}
					style={{ marginTop: 20 }}
					block
					success
				>
					<Text>Save Todo</Text>
				</Button>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	btnFooter: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	}
});

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(TodosCreate);
