import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {selColumnHead, selColumns, selConnected,selCars} from '../selectors/selectors'
import MyTable from '../components/mytable'
import Footer from '../components/footer'
//import * as UpdateActions from '../actions'

const App = ({heads,columns,isConnected,cars}) => (

//  const CSSDisConnected = isConnected ? "Connected" : "Disconnected";
//    <MyTable steps={heads} columns={columns} cars={cars}/>
//    <Route path='["/priemka","/washing","/"]' render={(props) => {

  <Router>
  <div className={isConnected ? "Connected" : "Disconnected"}>
    <Route exact path='(/priemka|/washing|/)' render={(props) => {

      console.log("props.match.url");
      console.log(props.match.url);

      return (
        <MyTable pathname={props.match.url} steps={heads} columns={columns} cars={cars}/>
      )
      }
    }/>    
    <Footer />
  </div>
  </Router>
)

App.propTypes = {
  heads: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  cars: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired
}


// const mapStateToProps = state => ({
// //  tabledata: getStepsWithAutos( state.stepsById, state.autosById )
//   heads: selColumnHead(state),
//   columns: selColumns(state),
//   cars: selCars(state),
//   isConnected: selConnected(state)
// })

const mapStateToProps = state => {
//  console.log(state);
  return {
//  tabledata: getStepsWithAutos( state.stepsById, state.autosById )
    heads: selColumnHead(state),
    columns: selColumns(state),
    cars: selCars(state),
    isConnected: selConnected(state)
  }
}


export default connect(
  mapStateToProps
)(App)
