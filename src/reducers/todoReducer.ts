import * as types from "../actions/types";
import { IAction } from "../actions/todoActions";

export interface ToDoState {
    toDo?: any,
}

const initialState = {
    toDo: {}
}

export default function(state = initialState, action: IAction) {
    switch (action.type) {
        case types.ADD_ITEM: {
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