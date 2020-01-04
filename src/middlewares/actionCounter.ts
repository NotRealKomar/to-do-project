import { IAction } from "../actions/todoActions";

let counter = 0;
export const actionCounter = (store: any) => (next: Function) => (action: IAction) => {
    console.warn(`${action.type} INVOKED. ACTION COUNTER:`, ++counter);
    return next(action);
}