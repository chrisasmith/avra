import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import * as yourFansActions from '../../../reducers/pages/yourFansActions'
import FilterBar from '../../../components/Filter/FilterBar'
import { createLoadingSelector, createErrorMessageSelector } from '../../../reducers/selectors'
import styles from './styles/YourFans.scss'
import Tabs from './Tabs'
import DASHBOARD_DATA from './Data'

const propTypes = {
  getHomeData: PropTypes.func.isRequired,
  homePageDataSuccess: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  children: PropTypes.element,
}

export const PROPERTY_TYPE = {
  SPORT: 'sport',
  LEAGUE: 'league',
  TEAM: 'team',
}

class YourFansPage extends Component {
  constructor(props, context) {
    super(props, context)

    this.onFilterChange = this.onFilterChange.bind(this)

    this.state = {
      filter: { ...props.filter, ages: { ...props.filter.ages } },
    }
  }

  componentDidMount() {
    this.props.homePageDataSuccess(DASHBOARD_DATA)

    this.props.getHomeData()
  }

  onFilterChange(filter) {
    this.setState({ filter }, () => this.props.getHomeData(filter))
  }

  render() {
    return (
      <div className={styles.columns}>
        <div>
          <FilterBar
            onFilterChange={this.onFilterChange}
          />
        </div>
        <div>
          <div className={styles.title}>
            <FormattedMessage
              id="your_fans.title"
              defaultMessage="Your Fans"
            />
          </div>
          <div className={styles.tabs}><Tabs location={this.props.location} /></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([yourFansActions.GET_HOME_PAGE.SELF])
  const errorSelector = createErrorMessageSelector([yourFansActions.GET_HOME_PAGE.SELF])
  const filter = state.filters.filter
  return { ...state, filter, isFetching: loadingSelector(state), errorMessage: errorSelector(state) }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...yourFansActions }, dispatch)
}

YourFansPage.propTypes = propTypes
export default connect(mapStateToProps, mapDispatchToProps)(YourFansPage)
