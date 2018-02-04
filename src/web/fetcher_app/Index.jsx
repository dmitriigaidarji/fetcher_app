// main.js
import React from 'react'
import {AppContainer} from 'react-hot-loader'

import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import {persistStore, autoRehydrate} from 'redux-persist'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as reducers from "./reducers"
import App from "./containers/InitialContainer";
import {hydrate, render} from 'react-dom';

let reducer = combineReducers(reducers);

// Create Redux store with initial state
const store = (module.hot && module.hot.data && module.hot.data.store)
    ? module.hot.data.store
    : createStore(
        reducer,
        composeWithDevTools(applyMiddleware(thunk)),
        autoRehydrate()
    );

const appRender = (Comp) => {
    const renderMethod = !!module.hot ? render : ReactDOM.hydrate
    renderMethod(
        <Provider store={store}>
            <AppContainer>
                <Comp />
            </AppContainer>
        </Provider>,
        document.getElementById('FetcherApp')
    )
}

appRender(App)


// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
    module.hot.dispose((data) => {
        data.store = store;
    });
}