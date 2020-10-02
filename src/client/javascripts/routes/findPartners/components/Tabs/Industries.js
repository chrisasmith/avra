import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import styles from '../styles/FindPartners.scss'
import * as findPartnersActions from '../../../../reducers/pages/findPartnersActions'
import { createLoadingSelector } from '../../../../reducers/selectors'
import GridCard, { CARD_TYPE } from '../../../../components/GridCards/GridCard'
import FilterBreadCrumb from '../../../../components/Filter/FilterBreadCrumb'
import IndustryBreadcrumb from './components/IndustryBreadcrumb'

const propTypes = {
  data: PropTypes.object,
  filter: PropTypes.object,
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  intl: PropTypes.object,
}

const messages = defineMessages({
  topProducts: {
    id: 'find_partners.tab.industries.top_products',
    defaultMessage: 'Top Products',
  },
  productCurrentlyOwn: {
    id: 'find_partners.tab.industries.product_currently_own',
    defaultMessage: 'Which of the following products do you currently own or have you bought recently?',
  },
  autoOwnership: {
    id: 'find_partners.tab.industries.auto_ownership',
    defaultMessage: 'Auto Ownership',
  },
  autoOwnershipDesc: {
    id: 'find_partners.tab.industries.auto_ownership_desc',
    defaultMessage: 'Make of any vehicle owned or leased',
  },
  beerConsumed30: {
    id: 'find_partners.tab.industries.beer_consumed_30',
    defaultMessage: 'Beer Consumed in Last 30 Days',
  },
  softDrinks: {
    id: 'find_partners.tab.industries.soft_drinks',
    defaultMessage: 'Soft Drinks Consumed in Last 7 Days',
  },
  telephoneServiceProvider: {
    id: 'find_partners.tab.industries.telephone_service_providers',
    defaultMessage: 'Telephone Service Providers',
  },
  wirelessPhoneCarriers: {
    id: 'find_partners.tab.industries.wireless_phone_carriers',
    defaultMessage: 'Current Wireless/Cell Phone Carriers',
  },
  internetService: {
    id: 'find_partners.tab.industries.internet_services',
    defaultMessage: 'Internet Service Providers',
  },
  cableTv: {
    id: 'find_partners.tab.industries.cable_tv',
    defaultMessage: 'Cable/TV Service Provider',
  },
})

const IndustriesTab = injectIntl(({ intl, filter, data, isFetching, params }) => {
  const industry = data ? data.industries.find(i => i.id === params.industry_id) : null

  const industryId = params.industry_id
  let subsection = null

  if (industry && industry.subsections && !params.subsection_id) {
    subsection = industry.subsections.sort((a, b) => a.name.localeCompare(b.name))[0]
  } else if (industry && industry.subsections && params.subsection_id) {
    subsection = industry.subsections.find(s => s.id === params.subsection_id)
  }

  const title = subsection ? subsection.name : industry ? industry.name : ''
  const subsectionId = subsection ? subsection.id : null

  const leftColumn = [
    {
      type: CARD_TYPE.INDEX,
      dataKey: 'top_partners',
      cardData: {
        title: 'Top Products',
        description: 'Which of the following products do you currently own or have you bought recently?',
      },
    },
  ]

  const centerColumn = [
    {
      type: CARD_TYPE.STRING,
      cardData: {
        title: `${title} Overview`,
        value: 'Placeholder',
      },
    },
  ]

  const rightColumn = [
    {
      hide: industryId !== 'auto',
      type: CARD_TYPE.INDEX,
      dataKey: 'auto_ownership',
      cardData: {
        title: intl.formatMessage(messages.autoOwnership),
        description: intl.formatMessage(messages.autoOwnershipDesc),
        scarborough: true,
      },
    }, {
      hide: subsectionId !== 'beer',
      type: CARD_TYPE.INDEX,
      dataKey: 'beer',
      cardData: {
        scarborough: true,
        title: intl.formatMessage(messages.beerConsumed30),
      },
    }, {
      hide: subsectionId !== 'soft_drinks',
      type: CARD_TYPE.INDEX,
      dataKey: 'soft_drinks',
      cardData: {
        scarborough: true,
        title: intl.formatMessage(messages.softDrinks),
      },
    }, {
      hide: subsectionId !== 'telephone',
      type: CARD_TYPE.INDEX,
      dataKey: 'telephone_service_providers',
      cardData: {
        title: intl.formatMessage(messages.telephoneServiceProvider),
        scarborough: true,
      },
    }, {
      hide: subsectionId !== 'wireless_phone_carriers',
      type: CARD_TYPE.INDEX,
      dataKey: 'wireless_phone_carriers',
      cardData: {
        scarborough: true,
        title: intl.formatMessage(messages.wirelessPhoneCarriers),
      },
    }, {
      hide: subsectionId !== 'internet',
      type: CARD_TYPE.INDEX,
      dataKey: 'internet_services',
      cardData: {
        scarborough: true,
        title: intl.formatMessage(messages.internetService),
      },
    }, {
      hide: subsectionId !== 'cable_tv',
      type: CARD_TYPE.INDEX,
      dataKey: 'cable_tv',
      cardData: {
        scarborough: true,
        title: intl.formatMessage(messages.cableTv),
      },
    },
  ]

  return (
    <div className={styles.grid}>
      <div>
        <IndustryBreadcrumb industry={industry} params={params} />
      </div>
      <div className={styles.breadCrumb}>
        <FilterBreadCrumb filter={filter} />
      </div>
      <div className="container">
        <div className="row row-grid">
          <div className="col-12">
            {centerColumn.map((card, idx) => (
              <GridCard key={idx} card={card} data={data} isFetching={isFetching} />
            ))}
          </div>
          <div className="col-6">
            {leftColumn.map((card, idx) => (
              <GridCard key={idx} card={card} data={data} isFetching={isFetching} />
            ))}
          </div>
          <div className="col-6">
            {rightColumn.map((card, idx) => (
              <GridCard key={idx} card={card} data={data} isFetching={isFetching} />
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

IndustriesTab.propTypes = propTypes
export default connect(mapStateToProps)(IndustriesTab)
