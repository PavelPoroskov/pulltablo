/**
 * This is just a dummy server to facilidate our React SPA examples.
 * For a more professional setup of Express, see...
 * http://expressjs.com/en/starter/generator.html
 */
const port = 3000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var Clients = require('./clients.js');
//var Clients = require('./clients');
//console.log('Clients');
//console.log(Clients);

const low = require('lowdb');
const db = low('test.db.json');
//const db_result = low('result.db.json');

////db.defaults({ cars: {}, steps: {}, managers: {} }).value();
//db.setState({ cars: {}, steps: {}, managers: {} });
db.setState({ cars: {}, steps: [], managers: {} });


//import express from 'express';
//import path from 'path';
const appExp = express();
var http = require('http').Server(appExp);
var appIo = require('socket.io')(http);

//var db_cars = db.get('cars')
//var db_steps = db.get('steps')
//var db_cars;
//var db_steps;

// function db_Init() {
//   db.setState({ cars: {}, steps: {}, managers: {} });
//   let db_cars = db.get('cars');
//   let db_steps = db.get('steps');
//   return { db_steps, db_cars };
//}

//db_Init();

let time_update;
let strsource='tetra';

appExp.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'ignore',
  index: false
}));

/* 
appExp.get('/js/bundle.js', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'public/js/bundle.js'));
});
appExp.get('/css/styles.css', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
});
*/

/**
 * Always serve the same HTML file for all requests
 */

//app.get('*', function(req, res, next) {
//appExp.get('/', function(req, res, next) {
appExp.get('/*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
//  res.sendFile(path.resolve(__dirname, 'index.html'));
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

//app.post('/in', function(req, res) {
var jsonParser = bodyParser.json();


appExp.post('/publish-fullstate', jsonParser, function(req, res) {
//  console.log('Request: [POST]', req.body );
  console.log('Request publish_fullstate: [POST]' );
  console.log( req.body );
//  res.send('Ok Got a POST request');
  
  let obj = req.body;
  let cars = obj.cars;

  if (obj.source!=strsource) {
    return;
  };
  // time_update = new Date();
  // time_update.setTime(obj.time);
  time_update = obj.time;
  
  
  db.set('steps', obj.steps ).value();
  db.set('cars', cars ).value();
//  db.setState({ cars: obj.cars, steps: obj.steps, managers: {} });

//  time_fullstate_io = new Date();

  appIo.emit('action', { for: 'everyone', type: 'message_fullstate', data: obj });
  console.log( "broadcast " );

  res.send('Ok Got a POST request');

//  time_fullstate_io = Date.now();
});

appExp.post('/publish-update', jsonParser, function(req, res) {
//  console.log('Request: [POST]', req.body );
  console.log('Request: publish_update [POST]' );
  console.log( req.body );
//  res.send('Ok Got a POST request');
  
  let obj = req.body;

  if (obj.source!=strsource) {
    return;
  };

  if ( ! (obj.time_prev - time_update == 0) ) {
    //need fullstate
    res.status(400);
    res.send('Not new_time_update_prev==time_update');
    return;
  };
  time_update = obj.time;

  let cars = obj.cars;
  // Object.keys(cars).forEach( carid => {
  //   cars[carid]["time_update"] = time_update;
  // });

  let db_cars = db.get('cars');

//  obj.cars.forEach( car => { 
  Object.keys(cars).forEach( carid => { 
    let car = cars[carid];
    console.log( carid );
    if (car) {
      car["time_update"] = time_update;
      db_cars.set( carid, car ).value();
    }else{
//      db_cars.remove( { id: car.id } ).value();
      console.log( "remove " );
      console.log( carid );
//      db_cars.remove( { "id": car.id } ).value();
      db_cars.unset( carid ).value();
    };

  });

  // time_update_io = new Date();

  // if (time_fullstate_io < time_update_io && () ) {
    appIo.emit('action', { for: 'everyone', type: 'message_update', data: obj });
    console.log( "broadcast " );
  // }else{
  //   //headers: need full state
  // };

  res.send('Ok Got a POST request');
});

/**
 * Error Handling
 */

appExp.use(function(req, res, next) {
  console.log('404');
  console.log('Request: [err]', req.originalUrl)
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
appExp.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});




appIo.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);

  // socket.on('action', (action) => {
  //   console.log("socket on action " + action.type);

  //   if(action.type === 'server/subscribe_for_post'){

  //   } else if(action.type === 'server/subscribe'){

  //     let curState = db.getState();
  //     socket.emit('action', {type:'message_fullstate', data: curState} );
  //   }
  // });

  let curState = db.getState();
  socket.emit('action', {type:'message_fullstate', data: curState} );

  // socket.on('reconnect', function(){
  //     console.log("socket on reconnect");

  //     let curState = db.getState();
  //     socket.emit('action', {type:'message_fullstate', data: curState} );
  // });

  socket.on('disconnect', function(){
//      Clients.remove(clientId);
      console.log('user disconnected');
  });
});

// appIo.on('connection', function(socket){ 
//   console.log("Socket REconnected: " + socket.id);
// });

/**
 * Start Server
 */

//appExp.listen(port);
http.listen(port);

console.log('Visit: localhost:' + port);

//TODO client: server lost, server return
//TODO begin of day: full_state
//TODO reselect (steps)
//TOOD steps in array