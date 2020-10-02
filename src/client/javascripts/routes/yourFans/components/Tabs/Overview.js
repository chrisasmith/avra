import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import styles from '../styles/YourFans.scss'
import * as yourFansActions from '../../../../reducers/pages/yourFansActions'
import { createLoadingSelector } from '../../../../reducers/selectors'
import { MODULE_TYPE } from '../../../../components/GridCards/DashboardGraphModule'
import GridCard, { CARD_TYPE } from '../../../../components/GridCards/GridCard'
import FilterBreadCrumb from '../../../../components/Filter/FilterBreadCrumb'

const propTypes = {
  data: PropTypes.object,
  filter: PropTypes.object,
  isFetching: PropTypes.bool,
  intl: PropTypes.object,
}

const messages = defineMessages({
  fanPopulation: {
    id: 'your_fans.tab.overview.fan_population',
    defaultMessage: 'Fan Population',
  },
  fpByRegion: {
    id: 'your_fans.tab.overview.fp_by_region',
    defaultMessage: 'By Region',
  },
  fpRegion: {
    id: 'your_fans.tab.overview.fp_region',
    defaultMessage: 'Region',
  },
  useSocialPlatform: {
    id: 'your_fans.tab.overview.use_social_platform',
    defaultMessage: 'Do you use any of the following social media platforms?',
  },
  socialPlatform: {
    id: 'your_fans.tab.overview.social_platform',
    defaultMessage: 'Social media platforms',
  },
  favoriteTeam: {
    id: 'your_fans.tab.overview.favorite_team',
    defaultMessage: 'Favorite Team',
  },
  mediaBehavior: {
    id: 'your_fans.tab.overview.media_behavior',
    defaultMessage: 'Media Behavior',
  },
  howOftenDoYouUseSM: {
    id: 'your_fans.tab.overview.how_often_use_sm',
    defaultMessage: 'How often do you use the following media for news about sports?',
  },
  media: {
    id: 'your_fans.tab.overview.media',
    defaultMessage: 'Media',
  },
  fanEngagement: {
    id: 'your_fans.tab.overview.fan_engagement',
    defaultMessage: 'Fan Engagement',
  },
  watchAttendListen: {
    id: 'your_fans.tab.overview.watch_attend_listen',
    defaultMessage: 'Have you watched, attended or listened to events in the last 12 months?',
  },
})

const OverviewTab = injectIntl(({ intl, filter, data, isFetching }) => {
  const leftColumn = [
    {
      type: CARD_TYPE.GRAPH,
      dataKey: 'region',
      cardData: {
        showTotal: true,
        title: intl.formatMessage(messages.fanPopulation),
        description: intl.formatMessage(messages.fpByRegion),
        sideTitle: intl.formatMessage(messages.fpRegion),
        type: MODULE_TYPE.COUNT,
      },
    }, {
      type: CARD_TYPE.GRAPH,
      dataKey: 'social_media',
      cardData: {
        title: intl.formatMessage(messages.useSocialPlatform),
        sideTitle: intl.formatMessage(messages.socialPlatform),
        type: MODULE_TYPE.PERCENT,
      },
    },
  ]

  const rightColumn = [
    {
      type: CARD_TYPE.STRING,
      hide: !data || !data.property || !data.property.team,
      cardData: {
        title: intl.formatMessage(messages.favoriteTeam),
        value: data && data.property && data.property.team ? `${Math.round(data.property.team.favorite)}%` : null,
      },
    }, {
      type: CARD_TYPE.GRAPH,
      dataKey: 'social_media',
      cardData: {
        title: intl.formatMessage(messages.useSocialPlatform),
        sideTitle: intl.formatMessage(messages.socialPlatform),
        type: MODULE_TYPE.PERCENT,
      },
    }, {
      type: CARD_TYPE.GRAPH,
      dataKey: 'media_behavior',
      cardData: {
        title: intl.formatMessage(messages.mediaBehavior),
        description: intl.formatMessage(messages.howOftenDoYouUseSM),
        sideTitle: intl.formatMessage(messages.media),
        type: MODULE_TYPE.PERCENT,
      },
    }, {
      type: CARD_TYPE.GRAPH,
      dataKey: 'fan_engagement',
      cardData: {
        title: intl.formatMessage(messages.fanEngagement),
        description: intl.formatMessage(messages.watchAttendListen),
        type: MODULE_TYPE.PERCENT,
      },
    },
  ]

  return (
    <div className={styles.grid}>
      <div className={styles.breadCrumb}>
        <FilterBreadCrumb filter={filter} />
      </div>
      <div className="container">
        <div className="row row-grid">
          <div className="col-6">
            {leftColumn.map((card, idx) => (
              <GridCard
                key={idx}
                card={card}
                data={data}
                isFetching={isFetching}
                extra={{ propertyTitle: filter.property.name, benchmarkTitle: filter.benchmark.name }}
              />
            ))}
          </div>
          <div className="col-6">
            {rightColumn.map((card, idx) => (
              <GridCard
                key={idx}
                card={card}
                data={data}
                isFetching={isFetching}
                extra={{ propertyTitle: filter.property.name, benchmarkTitle: filter.benchmark.name }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([yourFansActions.GET_HOME_PAGE.SELF])
  const filter = state.filters.filter
  const data = state.pages.yourFans.data
  return { ...state, isFetching: loadingSelector(state), filter, data }
}

OverviewTab.propTypes = propTypes
export default connect(mapStateToProps)(OverviewTab)
