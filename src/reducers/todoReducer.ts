import * as types from "../actions/types";
import ToDo from "../models/ToDo";
import { IAction } from "../actions/todoActions";

export interface ToDoState {
    toDo?: any,
    items: ToDo[],
}

const initialState: ToDoState = {
    items: []
}

export default function(state = initialState, action: IAction) {
    switch (action.type) {
        case types.ADD_ITEM: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case types.CLEAR_ITEMS: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case types.GET_ITEMS: {
            return {
                ...state,
                items: action.payload,
            }
        }
        case types.REMOVE_ITEMS: {
            return {
                ...state,
                items: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}