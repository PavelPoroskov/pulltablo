import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {selColumnHead, selColumns, selConnected,selCars} from '../selectors/selectors'
import MyTable from '../components/mytable'
//import * as UpdateActions from '../actions'

const App = ({heads,columns,isConnected,cars}) => (

//  const CSSDisConnected = isConnected ? "Connected" : "Disconnected";

  <div className={isConnected ? "Connected" : "Disconnected"}>
    <MyTable steps={heads} columns={columns} cars={cars}/>
  </div>
)

App.propTypes = {
  heads: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  cars: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
//  tabledata: getStepsWithAutos( state.stepsById, state.autosById )
  heads: selColumnHead(state),
  columns: selColumns(state),
  cars: selCars(state),
  isConnected: selConnected(state)
})

export default connect(
  mapStateToProps
)(App)
