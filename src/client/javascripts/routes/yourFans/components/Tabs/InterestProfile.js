import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import styles from '../styles/YourFans.scss'
import * as yourFansActions from '../../../../reducers/pages/yourFansActions'
import { createLoadingSelector } from '../../../../reducers/selectors'
import DashboardGraphModule, { MODULE_TYPE } from '../../../../components/GridCards/DashboardGraphModule'
import FilterBreadCrumb from '../../../../components/Filter/FilterBreadCrumb'

const propTypes = {
  data: PropTypes.object,
  filter: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  intl: PropTypes.object,
}

const messages = defineMessages({
  areasTitle: {
    id: 'your_fans.tab.interest.areas_title',
    defaultMessage: 'Interest Areas',
  },
  areasSideTitle: {
    id: 'your_fans.tab.interest.areas_side',
    defaultMessage: 'Interest areas',
  },
  additionalInterest: {
    id: 'your_fans.tab.interest.additional',
    defaultMessage: 'Additional Interests',
  },
  sportsInterestArea: {
    id: 'your_fans.tab.interest.sports_area',
    defaultMessage: 'Sports Interest Areas',
  },
})

const InterestProfileTab = injectIntl(({ intl, filter, data, isFetching }) => (
  <div className={styles.grid}>
    <div className={styles.breadCrumb}>
      <FilterBreadCrumb filter={filter} />
    </div>
    <div className="container">
      <div className="row row-grid">
        <div className="col-6">
          <DashboardGraphModule
            title={intl.formatMessage(messages.areasTitle)}
            sideTitle={intl.formatMessage(messages.areasSideTitle)}
            data={data ? data.interest_areas : null}
            isFetching={isFetching}
            type={MODULE_TYPE.PERCENT}
            propertyTitle={filter.property.name}
            benchmarkTitle={filter.benchmark.name}
          />
          <DashboardGraphModule
            title={intl.formatMessage(messages.additionalInterest)}
            sideTitle={intl.formatMessage(messages.areasSideTitle)}
            data={data ? data.additional_interests : null}
            isFetching={isFetching}
            type={MODULE_TYPE.PERCENT}
            propertyTitle={filter.property.name}
            benchmarkTitle={filter.benchmark.name}
          />
        </div>
        <div className="col-6">
          <DashboardGraphModule
            title={intl.formatMessage(messages.sportsInterestArea)}
            sideTitle={intl.formatMessage(messages.areasSideTitle)}
            data={data ? data.sports_interest_areas : null}
            isFetching={isFetching}
            type={MODULE_TYPE.PERCENT}
            propertyTitle={filter.property.name}
            benchmarkTitle={filter.benchmark.name}
          />
        </div>
      </div>
    </div>
  </div>
))

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([yourFansActions.GET_HOME_PAGE.SELF])
  const filter = state.filters.filter
  const data = state.pages.yourFans.data
  return { ...state, isFetching: loadingSelector(state), filter, data }
}

InterestProfileTab.propTypes = propTypes
export default connect(mapStateToProps)(InterestProfileTab)
