import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from "./middlewares/logger";
import { crashReporter } from "./middlewares/crashReporter";
import { actionCounter } from "./middlewares/actionCounter";

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
        applyMiddleware(logger, crashReporter, actionCounter),
    ),
);

export default store;