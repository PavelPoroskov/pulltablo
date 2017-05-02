import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'


import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
//let socket = io('http://localhost:3000');
let socket = io();
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


import App from './containers/App';
import reducer from './reducers';
//import 'todomvc-app-css/index.css'

//const store = createStore(reducer,applyMiddleware(socketIoMiddleware));
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
//store.dispatch({type:'init'});
//store.subscribe(()=>{
//  console.log('new client state', store.getState());
//});
store.dispatch({type:'server/subscribe'});