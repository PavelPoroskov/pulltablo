import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {selColumnHead, selColumns, selConnected,
  selCars, selColumnsFilter } from '../selectors/selectors'
import MyTable from '../components/mytable'
import Footer from '../components/footer'
//import * as UpdateActions from '../actions'

const App = ({heads,columns,isConnected,cars,strColumnsFilter}) => {


  //  const CSSDisConnected = isConnected ? "Connected" : "Disconnected";
  //    <MyTable steps={heads} columns={columns} cars={cars}/>
  //    <Route path='["/priemka","/washing","/"]' render={(props) => {
 let classNameDivTable = strColumnsFilter=='/wash' ? "Washing" : "NotWashing";

  return (
    <div className={isConnected ? "Connected" : "Disconnected"}>
      <div className={classNameDivTable}>
        <MyTable steps={heads} columns={columns} cars={cars}/>
      </div>
      <Footer />
    </div>
  )
}

App.propTypes = {
  heads: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  cars: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
  strColumnsFilter: PropTypes.string.isRequired
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
    isConnected: selConnected(state),
    strColumnsFilter: selColumnsFilter(state)
  }
}


export default connect(
  mapStateToProps
)(App)
