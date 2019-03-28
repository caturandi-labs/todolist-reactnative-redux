import { BASE_URL } from '../environtment/env';
import axios from 'axios';

export function allTodos() {
	return {
		type: 'ALL_TODOS',
		payload: axios.get(`${BASE_URL}/todos`)
	};
}
