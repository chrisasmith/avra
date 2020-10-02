import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import styles from '../styles/FindPartners.scss'
import * as findPartnersActions from '../../../../reducers/pages/findPartnersActions'
import { createLoadingSelector } from '../../../../reducers/selectors'
import GridCard, { CARD_TYPE } from '../../../../components/GridCards/GridCard'
import FilterBreadCrumb from '../../../../components/Filter/FilterBreadCrumb'

const propTypes = {
  data: PropTypes.object,
  filter: PropTypes.object,
  isFetching: PropTypes.bool,
  intl: PropTypes.object,
}

const messages = defineMessages({
  topProducts: {
    id: 'find_partners.tab.overview.top_products',
    defaultMessage: 'Top Products',
  },
  productCurrentlyOwn: {
    id: 'find_partners.tab.overview.currently_own',
    defaultMessage: 'Which of the following products do you currently own or have you bought recently?',
  },
  topServices: {
    id: 'find_partners.tab.overview.top_services',
    defaultMessage: 'Top Services',
  },
  serviceCurrentlyUse: {
    id: 'find_partners.tab.overview.service_currently_use',
    defaultMessage: 'Which of the following services do you currently use or have you used in the last 12 months? And which do you intend to use again in the next 12 months?',
  },
})

const OverviewTab = injectIntl(({ intl, filter, data, isFetching }) => {
  const leftColumn = [
    {
      type: CARD_TYPE.INDEX,
      dataKey: 'top_partners',
      cardData: {
        title: intl.formatMessage(messages.topProducts),
        description: intl.formatMessage(messages.productCurrentlyOwn),
      },
    },
  ]

  const rightColumn = [
    {
      type: CARD_TYPE.INDEX,
      dataKey: 'top_services',
      cardData: {
        title: intl.formatMessage(messages.topServices),
        description: intl.formatMessage(messages.serviceCurrentlyUse),
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
              <GridCard key={idx} card={card} isFetching={isFetching} data={data} />
            ))}
          </div>
          <div className="col-6">
            {rightColumn.map((card, idx) => (
              <GridCard key={idx} card={card} isFetching={isFetching} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([findPartnersActions.GET_FIND_PARTNERS_PAGE.SELF])
  const filter = state.filters.filter
  const data = state.pages.findPartners.data
  return { ...state, isFetching: loadingSelector(state), filter, data }
}

OverviewTab.propTypes = propTypes
export default connect(mapStateToProps)(OverviewTab)
