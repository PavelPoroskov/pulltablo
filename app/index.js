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


// render(
//   <Provider store={store}>
//    	<App />
//   </Provider>,
//   document.getElementById('root')
// )


console.log('location.pathname', location.pathname );

socket.on('disconnect', function (data) {	
	store.dispatch({type:'disconnected'});
});

store.dispatch({type:'server/subscribe'});

render(
  <Provider store={store}>
   	<App />
  </Provider>,
  document.getElementById('root')
)
