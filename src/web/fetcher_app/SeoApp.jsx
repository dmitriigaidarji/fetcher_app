import React from "react"
import { render } from "react-dom"
import {StyleRoot} from 'radium';
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'

import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import Layout from './containers/Layout'
import injectTapEventPlugin from 'react-tap-event-plugin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
//import 'bootstrap-material-design/dist/css/ripples.min.css';
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



var app = document.getElementById('SeoApp');


render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <StyleRoot>
      <Router history={browserHistory}>
          <Route path="*" component={Layout}>
          </Route>
      </Router>
    </StyleRoot>
  </MuiThemeProvider>
  ,
    app
);

