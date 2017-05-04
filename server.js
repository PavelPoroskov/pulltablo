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



var timeFullState_1c;
var timeFullState_server;

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
appExp.get('/', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

//app.post('/in', function(req, res) {
var jsonParser = bodyParser.json();


appExp.post('/publish-fullstate', jsonParser, function(req, res) {
//  console.log('Request: [POST]', req.body );
  console.log('Request publish_fullstate: [POST]' );
  console.log( req.body );
//  res.send('Ok Got a POST request');
  
  let obj = req.body;

  console.log( 'obj.steps ' );
  console.log( obj.steps );

  console.log( 'obj.cars ' );
  console.log( obj.cars );

//  db.set('steps', obj.steps ).write();
//  db.set('cars', obj.cars ).write();

  db.set('steps', obj.steps ).value();
  db.set('cars', obj.cars ).value();
//  db.setState({ cars: obj.cars, steps: obj.steps, managers: {} });


  appIo.emit('action', { for: 'everyone', type: 'message_fullstate', data: obj });
  console.log( "broadcast " );

  res.send('Ok Got a POST request');
});

appExp.post('/publish-update', jsonParser, function(req, res) {
//  console.log('Request: [POST]', req.body );
  console.log('Request: publish_update [POST]' );
  console.log( req.body );
//  res.send('Ok Got a POST request');
  
  let obj = req.body;
  let cars = req.body.cars;

  let db_cars = db.get('cars');

//  obj.cars.forEach( car => { 
  Object.keys(cars).forEach( carid => { 
    let car = cars[carid];
    console.log( carid );
    if (car) {
      db_cars.set( carid, car ).value();
    }else{
//      db_cars.remove( { id: car.id } ).value();
      console.log( "remove " );
      console.log( carid );
//      db_cars.remove( { "id": car.id } ).value();
      db_cars.unset( carid ).value();
    };

  });

//  console.log( "broadcast " );
  appIo.emit('action', { for: 'everyone', type: 'message_update', data: obj });
  console.log( "broadcast " );

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

  socket.on('action', (action) => {
    if(action.type === 'server/subscribe_for_post'){

    } else if(action.type === 'server/subscribe'){
//      console.log('Got hello data!', action.data);

//      socket.emit('action', {type:'message', data:'good day!'});
      let curState = db.getState();
      // let cars = curState.cars;
      // let arrCars = [];
      // Object.keys(cars).forEach( carId => { 
      //   if (cars[carId].stepid) {
      //     arrCars.push(cars[carId]);
      //   }
      // } );
      // let steps = curState.steps;
      // let arrSteps = Object.keys(steps).map( stepId => steps[stepId] );
      // let data = {cars:arrCars, steps: arrSteps};

      // socket.emit('action', {type:'message_fullstate', data: data} );
      socket.emit('action', {type:'message_fullstate', data: curState} );
    }
  });

  socket.on('disconnect', function(){
//      Clients.remove(clientId);
      console.log('user disconnected');
  });
});

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