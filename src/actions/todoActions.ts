import * as types from "../actions/types";
import * as toDoService from "../services/toDoService";
import ToDo from "../models/ToDo";
import { Dispatch } from "react";

export interface IAction {
    type: string,
    payload: ToDo[],
}

export const addItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
    const items = await toDoService.addItem(item);
    dispatch({
        type: types.ADD_ITEM,
        payload: items,
    });
}

export const removeItem = (item: ToDo) => async (dispatch: Dispatch<IAction>) => {
    const items = await toDoService.removeItem(item);
    dispatch({
        type: types.REMOVE_ITEMS,
        payload: items,
    });
}

export const getItems = () => async (dispatch: Dispatch<IAction>) => {
    const items = await toDoService.getItems();
    dispatch({
        type: types.GET_ITEMS,
        payload: items,
    });
}
