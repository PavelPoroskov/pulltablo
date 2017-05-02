import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {selColumnHead, selRows} from '../selectors/selectors'
import MyTable from '../components/mytable'
//import * as UpdateActions from '../actions'

const App = ({heads,rows}) => (
  <div>
    <MyTable steps={heads} rows={rows}/>
  </div>
)

App.propTypes = {
  heads: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
//  tabledata: getStepsWithAutos( state.stepsById, state.autosById )
  heads: selColumnHead(state),
  rows: selRows(state)
})

export default connect(
  mapStateToProps
)(App)
