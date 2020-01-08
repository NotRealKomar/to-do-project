import { IAction } from "../actions/todoActions";

export const crashReporter = (store: any) => (next: Function) => (action: IAction) => {
    try {
        return next(action);
    } catch (error) {
        console.error("EXCEPTION OCCURRED", error);
        throw error;
    }
}