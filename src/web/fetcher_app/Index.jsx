import React from 'react'
import {StyleRoot} from 'radium';
import Layout from './containers/Layout'
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
    userAgent: navigator.userAgent,
});
import {Provider} from "react-redux"
import {PersistGate} from 'redux-persist/integration/react'
import {render} from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import configureStore from './configureStore';

let {store, persistor} = configureStore()
const appRender = (Comp) => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <StyleRoot>
                            <Router>
                                <Route component={Comp}/>
                            </Router>
                        </StyleRoot>
                    </MuiThemeProvider>
            </PersistGate>
        </Provider>,
        document.getElementById('FetcherApp')
    )
};
appRender(Layout);