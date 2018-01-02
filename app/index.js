import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


//import createSocketIoMiddleware from 'redux-socket.io';
import createSocketIoMiddleware from './middleware/api';

import io from 'socket.io-client';
//let socket = io('http://localhost:3000');
let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


import { setColumnsFilter } from './actions';
import App from './containers/App';
import reducer from './reducers';

let curFilter = '';
if (location.pathname in { '/':'', '/inspection':'', '/wash':'' } ) {
//	console.log('location.pathname 2', location.pathname );
	curFilter = location.pathname;
}
let preloadedStat = {
	strColumnsFilter: curFilter,
  stepsById: [],
  autosById: {},
  stepsWithCars: {},
  isConnected: false,
};

let store = createStore(reducer, preloadedStat, applyMiddleware(socketIoMiddleware) );


socket.on('disconnect', function (data) {	
	store.dispatch({type:'disconnected'});
});

//store.dispatch( setColumnsFilter(curFilter) );

store.dispatch({type:'server/subscribe'});

render(
  <Provider store={store}>
   	<App />
  </Provider>,
  document.getElementById('root')
)
