import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Header from './components/Header'
import App from './containers/App'
import rootReducer from './reducers/index'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/react-billboardjs/lib/billboard.css";
import './index.css';

import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

const middleware = [ thunk ]

const store = createStore( 
	rootReducer,
	applyMiddleware(...middleware) 
)

render(
	<Provider store={store}>
		<div>
			<Header />
			<App />
		</div>
	</Provider>,
	document.getElementById('root')
)