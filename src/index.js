import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './containers';
import * as serviceWorker from './serviceWorker';
import BrowserRouter from "react-router-dom/es/BrowserRouter";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
