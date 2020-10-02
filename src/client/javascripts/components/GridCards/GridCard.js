import React from 'react'
import PropTypes from 'prop-types'
import DashboardIndexhModule from './DashboardIndexModule'
import DashboardStringModule from './DashboardStringModule'
import DashboardGraphModule from './DashboardGraphModule'

const propTypes = {
  card: PropTypes.object.isRequired,
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  extra: PropTypes.object,
}

export const CARD_TYPE = {
  INDEX: 'INDEX',
  STRING: 'STRING',
  GRAPH: 'GRAPH',
}

const GridCard = ({ card, data, isFetching, extra }) => {
  if (card.hide) { return null }

  let dataForCard = card.cardData.data
  if (!dataForCard && data && card.dataKey) {
    dataForCard = data[card.dataKey]
  }

  const cardData = { ...card.cardData, data: dataForCard }

  if (card.type === CARD_TYPE.INDEX) {
    return (
      <DashboardIndexhModule
        {...cardData}
        {...extra}
        isFetching={isFetching}
      />
    )
  }

  if (card.type === CARD_TYPE.STRING) {
    return (
      <DashboardStringModule
        {...cardData}
        {...extra}
        isFetching={isFetching}
      />
    )
  }

  if (card.type === CARD_TYPE.GRAPH) {
    return (
      <DashboardGraphModule
        {...cardData}
        {...extra}
        isFetching={isFetching}
      />
    )
  }

  throw new Error('missing type')
}

GridCard.propTypes = propTypes
export default GridCard
