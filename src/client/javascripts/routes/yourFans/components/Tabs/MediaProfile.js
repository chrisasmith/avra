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
  premierLeague: {
    id: 'your_fans.tab.media.premier_league',
    defaultMessage: 'Interacting with Premier League',
  },
  useToFollow: {
    id: 'your_fans.tab.media.use_to_follow',
    defaultMessage: 'Which of the following do you use to interact with or follow the Premier League or your favorite Premier League team?',
  },
  activities: {
    id: 'your_fans.tab.media.activities',
    defaultMessage: 'Activities',
  },
  sportWatching: {
    id: 'your_fans.tab.media.watching',
    defaultMessage: 'Sport Watching',
  },
  whileWatching: {
    id: 'your_fans.tab.media.while_watching',
    defaultMessage: 'While Watching Sports',
  },
  howOften: {
    id: 'your_fans.tab.media.how_often',
    defaultMessage: 'How often do you do the following?',
  },
})

const MediaProfileTab = injectIntl(({ intl, filter, data, isFetching }) => (
  <div className={styles.grid}>
    <div className={styles.breadCrumb}>
      <FilterBreadCrumb filter={filter} />
    </div>
    <div className="container">
      <div className="row row-grid">
        <div className="col-6">
          <DashboardGraphModule
            title={intl.formatMessage(messages.premierLeague)}
            description={intl.formatMessage(messages.useToFollow)}
            sideTitle={intl.formatMessage(messages.activities)}
            data={data ? data.media_interacting : null}
            isFetching={isFetching}
            type={MODULE_TYPE.PERCENT}
            propertyTitle={filter.property.name}
            benchmarkTitle={filter.benchmark.name}
          />

          <DashboardGraphModule
            title={intl.formatMessage(messages.sportWatching)}
            data={data ? data.sport_media : null}
            isFetching={isFetching}
            type={MODULE_TYPE.PERCENT}
            propertyTitle={filter.property.name}
            benchmarkTitle={filter.benchmark.name}
          />
        </div>
        <div className="col-6">
          <DashboardGraphModule
            title={intl.formatMessage(messages.whileWatching)}
            description={intl.formatMessage(messages.howOften)}
            data={data ? data.while_watching : null}
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

MediaProfileTab.propTypes = propTypes
export default connect(mapStateToProps)(MediaProfileTab)
