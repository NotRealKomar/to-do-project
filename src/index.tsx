import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { Router } from 'react-router';
import { createBrowserHistory } from "history";

import App from "./components/App";

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root'));
