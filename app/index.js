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


import App from './containers/App';
import reducer from './reducers';
//import 'todomvc-app-css/index.css'

//const store = createStore(reducer,applyMiddleware(socketIoMiddleware));
//let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
let store = createStore(reducer, applyMiddleware(socketIoMiddleware) );


socket.on('disconnect', function (data) {	
	store.dispatch({type:'disconnected'});
});



// const selectFilter = (state) => state.strColumnsFilter

// let currentFilter

// const handleColumnsFilterChange = () => {
//   let previousFilter = currentFilter
//   currentFilter = (store.getState()) 

//   if (previousFilter !== currentFilter) {
// //    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
// 		store.dispatch({type:'server/subscribe'});
//   }
// }

// store.subscribe(handleColumnsFilterChange);


console.log('location.pathname', location.pathname );
//if (location.pathname in { '//':'', '//priemka':'', '//washing':'' }) {
if (location.pathname == '//washing') {
	store.dispatch( { type:'set_filter', 'filter': location.pathname });
}

store.dispatch({type:'server/subscribe'});


render(
  <Provider store={store}>
   	<App />
  </Provider>,
  document.getElementById('root')
)
