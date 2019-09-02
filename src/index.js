import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from "redux";
import {reducer} from "./redux/reducers";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

store.subscribe(() => {
    console.log("store:", store.getState());
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
