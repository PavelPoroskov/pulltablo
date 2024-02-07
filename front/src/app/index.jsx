import React from 'react'

// import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
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
let preloadedState = {
	strColumnsFilter: curFilter,
  stepsById: [],
  autosById: {},
  stepsWithCars: {},
  isConnected: false,
};

//let store = createStore(reducer, preloadedStat, applyMiddleware(socketIoMiddleware) );
const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketIoMiddleware),
  // enhancer? 
})

socket.on('disconnect', function (data) {	
	store.dispatch({type:'disconnected'});
});

//store.dispatch( setColumnsFilter(curFilter) );

store.dispatch({type:'server/subscribe'});

function AppConnected() {
  return (
    <Provider store={store}>
   	  <App />
    </Provider>
  )
};

export default AppConnected;