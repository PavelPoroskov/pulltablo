import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {selColumnHead, selRows, selConnected} from '../selectors/selectors'
import MyTable from '../components/mytable'
//import * as UpdateActions from '../actions'

const App = ({heads,rows,isConnected}) => (

//  const CSSDisConnected = isConnected ? "Connected" : "Disconnected";

  <div className={isConnected ? "Connected" : "Disconnected"}>
    <MyTable steps={heads} rows={rows}/>
  </div>
)

App.propTypes = {
  heads: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  isConnected: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
//  tabledata: getStepsWithAutos( state.stepsById, state.autosById )
  heads: selColumnHead(state),
  rows: selRows(state),
  isConnected: selConnected(state)
})

export default connect(
  mapStateToProps
)(App)
