import { IAction } from '../actions/todoActions';
import { MiddlewareAPI } from 'redux';

export const crashReporter = (api: MiddlewareAPI) => (next: Function) => (action: IAction) => {
	try {
		return next(action);
	} catch (error) {
		console.error('EXCEPTION OCCURRED', error);
		throw error;
	}
};
