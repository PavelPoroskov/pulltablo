const { createServer } = require('node:http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Server: ServerIO  } = require("socket.io");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ cars: {}, steps: [], managers: {} })
  .write();

const port = 3000;

const appExp = express();
const httpServer = createServer(appExp);
const appIo = new ServerIO(httpServer);

let time_update;
let strsource='tetra';

appExp.use(express.static(path.join(__dirname, 'front', 'dist'), {
  dotfiles: 'ignore',
  index: false
}));

appExp.get('/*', function(req, res, next) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'front/dist/index.html'));
});

const jsonParser = bodyParser.json();
appExp.post('/publish-fullstate', jsonParser, function(req, res) {
  console.log('Request publish_fullstate: [POST]' );
  console.log( req.body );
  
  let obj = req.body;
  let cars = obj.cars;

  if (obj.source!=strsource) {
    return;
  };

  time_update = obj.time;
  Object.keys(cars).forEach( carid => {
    cars[carid]["time_update"] = time_update;
  });
  
  db.set('steps', obj.steps ).value();
  db.set('cars', cars ).value();

  appIo.emit('action', { for: 'everyone', type: 'message_fullstate', data: obj });
  console.log( "broadcast " );

  res.send('Ok Got a POST request');
});

appExp.post('/publish-update', jsonParser, function(req, res) {
  console.log('Request: publish_update [POST]' );
  console.log( req.body );
  
  let obj = req.body;

  if (obj.source!=strsource) {
    return;
  };

  if ( ! (obj.time_prev - time_update == 0) ) {
    res.status(400);
    res.send('Not new_time_update_prev==time_update');
    return;
  };
  time_update = obj.time;

  let cars = obj.cars;

  let db_cars = db.get('cars');

  Object.keys(cars).forEach( carid => { 
    let car = cars[carid];
    console.log( carid );
    if (car) {
      car["time_update"] = time_update;
      db_cars.set( carid, car ).value();
    }else{
      console.log( "remove " );
      console.log( carid );
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
httpServer.listen(port);

console.log('Visit: localhost:' + port);

//TODO client: server lost, server return
//TODO begin of day: full_state
//TODO reselect (steps)
//TOOD steps in array