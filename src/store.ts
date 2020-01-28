import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from "./middlewares/logger";
import { crashReporter } from "./middlewares/crashReporter";
import { actionCounter } from "./middlewares/actionCounter";
import { verifyAuth } from "./actions/loginActions";

const initialState = {};

const middleware = [thunk];

export const configureStore = (persistedState = initialState) => {
    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(
            applyMiddleware(...middleware),
            applyMiddleware(logger, crashReporter, actionCounter),
        )
    );
    store.dispatch(verifyAuth() as any);

    return store;
}