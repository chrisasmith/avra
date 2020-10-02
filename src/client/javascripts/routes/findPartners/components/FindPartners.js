import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import * as findPartnersActions from '../../../reducers/pages/findPartnersActions'
import FilterBar from '../../../components/Filter/FilterBar'
import { createLoadingSelector, createErrorMessageSelector } from '../../../reducers/selectors'
import styles from './styles/FindPartners.scss'
import Tabs from './Tabs'
import DASHBOARD_DATA from './Data'

const propTypes = {
  getFindPartnersData: PropTypes.func.isRequired,
  findPartnersPageDataSuccess: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  children: PropTypes.element,
  data: PropTypes.object,
}

export const PROPERTY_TYPE = {
  SPORT: 'sport',
  LEAGUE: 'league',
  TEAM: 'team',
}

class FindPartners extends Component {
  constructor(props, context) {
    super(props, context)

    this.onFilterChange = this.onFilterChange.bind(this)

    this.state = {
      filter: { ...props.filter, ages: { ...props.filter.ages } },
    }
  }

  componentDidMount() {
    this.props.findPartnersPageDataSuccess(DASHBOARD_DATA)
  }

  componentWillReceiveProps(next) {
    if ((next.params.industry_id !== this.props.params.industry_id) ||
      (next.params.subsection_id !== this.props.params.subsection_id)) {
      this.refresh()
    }
  }

  refresh() {
    this.props.getFindPartnersData()
  }

  onFilterChange(filter) {
    this.setState({ filter }, () => this.props.getFindPartnersData(filter))
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
            <h4>
              <FormattedMessage
                id="find_partners.title"
                defaultMessage="Find Partners"
              />
            </h4>
          </div>
          <div className={styles.tabs}>
            <Tabs location={this.props.location} industries={this.props.data ? this.props.data.industries : null} />
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([findPartnersActions.GET_FIND_PARTNERS_PAGE.SELF])
  const errorSelector = createErrorMessageSelector([findPartnersActions.GET_FIND_PARTNERS_PAGE.SELF])
  const filter = state.filters.filter
  const data = state.pages.findPartners.data

  return { ...state, filter, isFetching: loadingSelector(state), errorMessage: errorSelector(state), data }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...findPartnersActions }, dispatch)
}

FindPartners.propTypes = propTypes
export default connect(mapStateToProps, mapDispatchToProps)(FindPartners)
