import * as types from "../actions/types";
import * as toDoService from "../services/toDoService";
import ToDo from "../models/ToDo";
import { Dispatch } from "react";
import { Action } from "redux";

export interface IAction extends Action {
    type: string;
    payload?: ToDo[];
    errorMessage?: string;
}

const requestAddItem = () => {
    return {
        type: types.ADD_ITEM_REQUEST,
    };
}

const receiveAddItem = (items: ToDo[]) => {
    return {
        type: types.ADD_ITEM_SUCCESS,
        payload: items,
    };
}

const addItemError = () => {
    return {
        type: types.ADD_ITEM_FAILURE,
    };
}

const requestGetItems = () => {
    return {
        type: types.GET_ITEMS_REQUEST,
    };
}

const receiveGetItems = (items: ToDo[]) => {
    return {
        type: types.GET_ITEMS_SUCCESS,
        payload: items,
    };
}

const getItemsError = () => {
    return {
        type: types.GET_ITEMS_FAILURE,
    };
}

const requestRemoveItem = () => {
    return {
        type: types.REMOVE_ITEMS_REQUEST,
    };
}

const receiveRemoveItem = (items: ToDo[]) => {
    return {
        type: types.REMOVE_ITEMS_SUCCESS,
        payload: items,
    };
}

const removeItemError = () => {
    return {
        type: types.REMOVE_ITEMS_FAILURE,
    };
}

export const addItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
    try {
        dispatch(requestAddItem());
        const items = await toDoService.addItem(item);
        dispatch(receiveAddItem(items));
    }
    catch (error){
        dispatch(addItemError());
    }
}

export const removeItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
    try {
        dispatch(requestRemoveItem());
        const items = await toDoService.removeItem(item);
        dispatch(receiveRemoveItem(items));
    }
    catch {
        dispatch(removeItemError());
    }
}

export const getItems = () => async (dispatch: Dispatch<IAction>) => {
    try {
        dispatch(requestGetItems());
        const items = await toDoService.getItems();
        dispatch(receiveGetItems(items));
    }
    catch {
        dispatch(getItemsError());
    }
}
