import { IAction } from "../actions/todoActions";

let counter = 0;
export const actionCounter = (store: {}) => (next: (action: IAction) => void) => (action: IAction) => {
    console.warn(`${action.type} INVOKED. ACTION COUNTER:`, ++counter);
    return next(action);
}