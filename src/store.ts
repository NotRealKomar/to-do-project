import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from "./middlewares/logger";
import { crashReporter } from "./middlewares/crashReporter";

const initialState = {};

const middleware = [thunk];

export const configureStore = (persistedState = initialState) => {
    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(
            applyMiddleware(...middleware),
            applyMiddleware(logger, crashReporter),
        )
    );

    return store;
}