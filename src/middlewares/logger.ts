import { IAction } from "../actions/todoActions";
import { MiddlewareAPI } from "redux";

export const logger = (api: MiddlewareAPI) => (next: Function) => (action: IAction) => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', api.getState());
    console.groupEnd();
    return result;
}