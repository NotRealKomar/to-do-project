import { IAction } from "../actions/todoActions";

export const logger = (store: any) => (next: Function) => (action: IAction) => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
}