import * as types from "../actions/types";
import { IAction } from "../actions/todoActions";

export interface ToDoState {
    toDo?: any;
    isLoading?: false;
    addError: false;
    removeError: false;
    getError: false;
}

const initialState = {
    toDo: {}
}

export default function(state = initialState, action: IAction) {
    switch (action.type) {
        case types.ADD_ITEM_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case types.ADD_ITEM_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            }
        }
        case types.ADD_ITEM_FAILURE: {
            return {
                ...state,
                isLoading: false,
                addError: true,
            }
        }
        case types.GET_ITEMS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case types.GET_ITEMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            }
        }
        case types.GET_ITEMS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                getError: true,
            }
        }
        case types.REMOVE_ITEMS_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case types.REMOVE_ITEMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            }
        }
        case types.REMOVE_ITEMS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                removeError: true,
            }
        }
        default: {
            return state;
        }
    }
}