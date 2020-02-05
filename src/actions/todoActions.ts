import types from '../actions/types';
import * as toDoService from '../services/toDoService';
import ToDo from '../models/ToDo';
import { Dispatch } from 'react';
import { Action } from 'redux';

export interface IAction extends Action {
	type: string;
	payload?: ToDo[];
	errorMessage?: string;
}

const requestAddItem = () => {
	return {
		type: types.ADD_ITEM_REQUEST,
	};
};

const receiveAddItem = (items: ToDo[]) => {
	return {
		type: types.ADD_ITEM_SUCCESS,
		payload: items,
	};
};

const addItemError = (errorMessage: string) => {
	return {
		type: types.ADD_ITEM_FAILURE,
		errorMessage: errorMessage,
	};
};

const requestGetItems = () => {
	return {
		type: types.GET_ITEMS_REQUEST,
	};
};

const receiveGetItems = (items: ToDo[]) => {
	return {
		type: types.GET_ITEMS_SUCCESS,
		payload: items,
	};
};

const getItemsError = (errorMessage: string) => {
	return {
		type: types.GET_ITEMS_FAILURE,
		errorMessage: errorMessage,
	};
};

const requestRemoveItem = () => {
	return {
		type: types.REMOVE_ITEMS_REQUEST,
	};
};

const receiveRemoveItem = (items: ToDo[]) => {
	return {
		type: types.REMOVE_ITEMS_SUCCESS,
		payload: items,
	};
};

const removeItemError = (errorMessage: string) => {
	return {
		type: types.REMOVE_ITEMS_FAILURE,
		errorMessage: errorMessage,
	};
};

const requestUpdateItem = () => {
	return {
		type: types.UPDATE_ITEM_REQUEST,
	};
};

const receiveUpdateItem = (items: ToDo[]) => {
	return {
		type: types.UPDATE_ITEM_SUCCESS,
		payload: items,
	};
};

const updateItemError = (errorMessage: string) => {
	return {
		type: types.UPDATE_ITEM_FAILURE,
		errorMessage: errorMessage,
	};
};

export const addItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
	try {
		dispatch(requestAddItem());
		const items = await toDoService.addItem(item);
		dispatch(receiveAddItem(items));
	}
	catch (error) {
		dispatch(addItemError((error as Error).message));
	}
};

export const removeItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
	try {
		dispatch(requestRemoveItem());
		const items = await toDoService.removeItem(item);
		dispatch(receiveRemoveItem(items));
	}
	catch (error) {
		dispatch(removeItemError((error as Error).message));
	}
};

export const getItems = () => async (dispatch: Dispatch<IAction>) => {
	try {
		dispatch(requestGetItems());
		const items = await toDoService.getItems();
		dispatch(receiveGetItems(items));
	}
	catch (error) {
		dispatch(getItemsError((error as Error).message));
	}
};

export const updateItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
	try {
		dispatch(requestUpdateItem());
		const items = await toDoService.updateItem(item);
		dispatch(receiveUpdateItem(items));
	}
	catch (error) {
		dispatch(updateItemError((error as Error).message));
	}
};
