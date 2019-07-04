import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from 'react-redux'

import './index.css';
import App from './containers/App';
import reducer from './store/reducer'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
