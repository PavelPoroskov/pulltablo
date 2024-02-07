
import { connect } from 'react-redux'
import { setColumnsFilter } from '../actions';
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.strColumnsFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      let obj = { title: document.title, url: ownProps.filter };
      history.pushState( obj, document.title, ownProps.filter )
      dispatch(setColumnsFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink