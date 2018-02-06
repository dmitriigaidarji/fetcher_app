// main.js
import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {StyleRoot} from 'radium';
import Layout from './containers/Layout'

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
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {red100, grey900, red700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey900,
        primary2Color: red700,
        primary3Color: red100,
    },
}, {
    avatar: {
        borderColor: null,
    },
    userAgent: userdata.useragent,
});


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
                <MuiThemeProvider muiTheme={muiTheme}>
                    <StyleRoot>

                        <Router>
                            <Route component={Comp}/>
                        </Router>

                    </StyleRoot>
                </MuiThemeProvider>
            </AppContainer>
        </Provider>,
        document.getElementById('FetcherApp')
    )
}

appRender(Layout)


// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
    module.hot.dispose((data) => {
        data.store = store;
    });
}