import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styles from './styles/FilterBreadCrumb.scss'
import { DEFAULT_FILTER } from '../../reducers/filters/filterActions'

const propTypes = {
  filter: PropTypes.object.isRequired,
}

const compareArray = (arr1, arr2) => arr1.length === arr2.length && arr1.sort().every((value, index) => value === arr2.sort()[index])
const addComma = str => str.length > 0 ? ', ' : ''

const FilterBreadCrumb = ({ filter }) => {
  let filterString = ''

  if (filter.country.id !== DEFAULT_FILTER.country.id) {
    filterString = 'Country'
  }

  if (!compareArray(filter.ages.men, DEFAULT_FILTER.ages.men) || !compareArray(filter.ages.women, DEFAULT_FILTER.ages.women)) {
    filterString += `${addComma(filterString)}Age & gender`
  }

  if (!compareArray(filter.income, DEFAULT_FILTER.income)) {
    filterString += `${addComma(filterString)}Income`
  }

  if (!compareArray(filter.kids, DEFAULT_FILTER.kids)) {
    filterString += `${addComma(filterString)}Kids in household`
  }

  if (!compareArray(filter.interest, DEFAULT_FILTER.interest)) {
    filterString += `${addComma(filterString)}Interest level`
  }

  return (
    <div className={styles.breadcrumb}>
      <div>
        <span className={styles.label}>
          <FormattedMessage
            id="bread_crumb.segmented"
            defaultMessage="Segmented by:"
          />
        </span>
        <span>{filterString.length > 0 ? filterString : 'None'}</span>
      </div>
      <div>
        <span className={styles.label}>
          <FormattedMessage
            id="bread_crumb.benchmark"
            defaultMessage="Benchmark:"
          />
        </span>
        <span>{filter.benchmark.name}</span>
      </div>
    </div>
  )
}

FilterBreadCrumb.propTypes = propTypes
export default FilterBreadCrumb
