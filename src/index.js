import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import {configureRoutes} from './config.routes';
// import {ConnectedRouter} from 'connected-react-router';
// import testUseState from './container/testUseState';
// import {ConnectedRouter} from "connected-react-router";

ReactDOM.render(
    <BrowserRouter>
        {renderRoutes(configureRoutes())}
    </BrowserRouter>,
    document.getElementById('app-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
