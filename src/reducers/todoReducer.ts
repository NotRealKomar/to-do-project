import types from '../actions/types';
import { IAction } from '../actions/todoActions';
import ToDo from '../models/ToDo';

interface IToDo {
		items: ToDo[];
		isLoading: boolean;
}

export interface ToDoState {
		toDo: IToDo;
}

const initialState = {
	isLoading: false,
};

export default (state = initialState, action: IAction) => {
	switch (action.type) {
	case types.ADD_ITEM_REQUEST: {
		return {
			...state,
			isLoading: true,
		};
	}
	case types.ADD_ITEM_SUCCESS: {
		return {
			...state,
			isLoading: false,
			items: action.payload,
		};
	}
	case types.ADD_ITEM_FAILURE: {
		return {
			...state,
			isLoading: false,
			addError: true,
		};
	}
	case types.GET_ITEMS_REQUEST: {
		return {
			...state,
			isLoading: true,
		};
	}
	case types.GET_ITEMS_SUCCESS: {
		return {
			...state,
			isLoading: false,
			items: action.payload,
		};
	}
	case types.GET_ITEMS_FAILURE: {
		return {
			...state,
			isLoading: false,
			getError: true,
		};
	}
	case types.REMOVE_ITEMS_REQUEST: {
		return {
			...state,
			isLoading: true,
		};
	}
	case types.REMOVE_ITEMS_SUCCESS: {
		return {
			...state,
			isLoading: false,
			items: action.payload,
		};
	}
	case types.REMOVE_ITEMS_FAILURE: {
		return {
			...state,
			isLoading: false,
			removeError: true,
		};
	}
	default: {
		return state;
	}
	}
};
