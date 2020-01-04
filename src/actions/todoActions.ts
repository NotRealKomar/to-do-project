import * as types from "../actions/types";
import * as toDoService from "../services/toDoService";
import ToDo from "../models/ToDo";
import { Dispatch } from "react";

export interface IAction {
    type: string,
    payload: ToDo[],
}

export const addItem = (item: ToDo) => (dispatch: Dispatch<IAction>) => {
    const items = toDoService.addItem(item);
    dispatch({
        type: types.ADD_ITEM,
        payload: items,
    });
}

export const removeItem = (id: string) => (dispatch: Dispatch<IAction>) => {
    const items = toDoService.removeItem(id);
    dispatch({
        type: types.REMOVE_ITEMS,
        payload: items,
    });
}

export const getItems = () => (dispatch: Dispatch<IAction>) => {
    const items = toDoService.getItems();
    dispatch({
        type: types.GET_ITEMS,
        payload: items,
    });
}
