import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { bindActionCreators } from 'redux'
import { injectIntl, defineMessages, FormattedMessage, FormattedNumber } from 'react-intl'
import styles from './styles/FilterBar.scss'
import FilterButton from './FilterButton'
import FlyoutButton from './FlyoutButton'
import SaveFilter from './SaveFilter'
import { PROPERTY_TYPE } from '../../routes/yourFans/components/YourFans'
import * as filterActions from '../../reducers/filters/filterActions'

const propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  saveFilter: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  intl: PropTypes.object,
}

export class FilterBar extends Component {
  constructor(props, context) {
    super(props, context)

    this.onChangeFilter = this.onChangeFilter.bind(this)
    this.onPropertySelected = this.onPropertySelected.bind(this)
    this.onFilterSelected = this.onFilterSelected.bind(this)
    this.onBenchmarkSelected = this.onBenchmarkSelected.bind(this)
    this.onCountrySelected = this.onCountrySelected.bind(this)
    this.onSaveFilter = this.onSaveFilter.bind(this)

    const benchmarks = [...props.options.benchmark]
    if (props.filter.property.type !== PROPERTY_TYPE.SPORT) {
      benchmarks.push({ name: `All ${props.filter.property.sport} Fans`, id: 1 })
    }

    this.state = {
      filters: { ...props.filter },
      benchmarks,
      savedFilter: undefined,
    }
  }

  messages = defineMessages({
    selectProperty: {
      id: 'filter_bar.select_property',
      defaultMessage: 'Select Property',
    },
    benchmark: {
      id: 'filter_bar.benchmark',
      defaultMessage: 'Benchmark',
    },
    savedSegmentation: {
      id: 'filter_bar.saved_segmentation',
      defaultMessage: 'Saved Segmentation',
    },
    country: {
      id: 'filter_bar.country',
      defaultMessage: 'Country',
    },
  })

  filterDidChange(filters, savedFilter) {
    // update locally
    this.setState({ filters, savedFilter })

    // update the store
    this.props.updateFilter(filters)

    // fire an event
    this.props.onFilterChange(filters)
  }

  onChangeFilter(filter, value) {
    const filters = { ...this.state.filters }

    const addRemove = (arr, val) => {
      if (arr.includes(val)) {
        return arr.filter(a => a !== val)
      }

      return [...arr, val]
    }

    switch (filter) {
      case 'men_age':
        filters.ages.men = addRemove(filters.ages.men, value)
        break

      case 'women_age':
        filters.ages.women = addRemove(filters.ages.women, value)
        break

      case 'income':
        filters.income = addRemove(filters.income, value)
        break

      case 'kids':
        filters.kids = addRemove(filters.kids, value)
        break

      case 'interest':
        filters.interest = addRemove(filters.interest, value)
        break

      default:
        throw new Error(`missing button state ${filter}`)
    }

    this.filterDidChange(filters)
  }

  onPropertySelected(property) {
    // get the available benchmarks for the property
    const benchmarks = [...this.props.options.benchmark]
    if (property.type !== PROPERTY_TYPE.SPORT) {
      benchmarks.push({ name: `All ${property.sport} Fans`, id: 1 })
    }

    // reset the benchmark and countries
    const filters = {
      ...this.state.filters,
      property,
      country: this.props.options.country[0],
      benchmark: benchmarks[0],
    }

    this.setState({ filters, benchmarks })
    this.props.updateFilter(filters)
    this.props.onFilterChange(filters)
  }

  onFilterSelected(filter) {
    // do a deep copy
    const filters = {
      ...JSON.parse(JSON.stringify(filterActions.DEFAULT_FILTER)),
      filter,
      benchmark: this.state.filters.benchmark,
      property: this.state.filters.property,
    }
    this.filterDidChange(filters, filter)
  }

  onBenchmarkSelected(benchmark) {
    const filters = { ...this.state.filters, benchmark }
    this.setState({ filters })
    this.props.updateFilter(filters)
    this.props.onFilterChange(filters)
  }

  onCountrySelected(country) {
    const filters = { ...this.state.filters, country }
    this.filterDidChange(filters)
  }

  onSaveFilter(filterName) {
    const filter = { ...this.state.filters, property: undefined, benchmark: undefined }

    this.props.saveFilter(filterName, filter).then(() => {
      toast.success('Segmentation saved')
    }).catch((error) => {
      if (error && error.code === 409) {
        toast.error(`${filterName} already exists. Please choose another name.`)
      } else {
        toast.error('Failed to save. Please try again.')
      }
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.detailsArea}>{this.state.filters.property.name}</div>
        <FlyoutButton
          options={this.props.options.property}
          onItemSelected={this.onPropertySelected}
          label={this.props.intl.formatMessage(this.messages.selectProperty)}
        />

        <FlyoutButton
          options={this.state.benchmarks}
          onItemSelected={this.onBenchmarkSelected}
          label={this.props.intl.formatMessage(this.messages.benchmark)}
          className="pt-3"
        />
        <div className="pl-3 pt-1 pb-3">{this.state.filters.benchmark.name}</div>

        <div className={styles.filters}>
          <h5 className="text-center">
            <FormattedMessage
              id="filter_bar.title"
              defaultMessage="SEGMENTATION"
            />
          </h5>

          <div>
            <FlyoutButton
              options={this.props.options.filter}
              onItemSelected={this.onFilterSelected}
              label={this.props.intl.formatMessage(this.messages.savedSegmentation)}
              disabled={!this.props.options.filter || this.props.options.filter.length === 0}
            />
            <div className="pl-3 pt-1 pb-3">{this.state.savedFilter ? this.state.savedFilter.name : 'None'}</div>

            <FlyoutButton
              options={this.props.options.country}
              onItemSelected={this.onCountrySelected}
              label={this.props.intl.formatMessage(this.messages.country)}
            />
            <div className="pl-3 pt-1 pb-3">{this.state.filters.country.name}</div>
          </div>
        </div>

        <div className="text-center">
          <h6 className="pl-3 mt-3 pb-1 text-left">
            <FormattedMessage
              id="filter_bar.age_gender"
              defaultMessage="Age & Gender"
            />
          </h6>
          <div className={styles.genderColumns}>
            <div>
              <FormattedMessage
                id="filter_bar.gender_men"
                defaultMessage="Men"
              />
              {['18-29', '30-59', '60+'].map((val, idx) => (
                <FilterButton
                  value={idx}
                  key={idx}
                  values={this.state.filters.ages.men}
                  name="men_age"
                  onChange={this.onChangeFilter}
                >
                  {val}
                </FilterButton>
              ))}
            </div>
            <div>
              <FormattedMessage
                id="filter_bar.gender_women"
                defaultMessage="Women"
              />
              {['18-29', '30-59', '60+'].map((val, idx) => (
                <FilterButton
                  value={idx}
                  key={idx}
                  values={this.state.filters.ages.women}
                  name="women_age"
                  onChange={this.onChangeFilter}
                >
                  {val}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h6 className="pl-3 mt-3 pb-1 text-left">
            <FormattedMessage
              id="filter_bar.income"
              defaultMessage="Income"
            />
          </h6>
          <div className={styles.incomeButtons}>
            {['$', '$$', '$$$'].map((val, idx) => (
              <FilterButton
                value={idx}
                key={idx}
                values={this.state.filters.income}
                name="income"
                onChange={this.onChangeFilter}
              >
                {val}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h6 className="pl-3 mt-3 pb-1 text-left">
            <FormattedMessage
              id="filter_bar.kids_n_home"
              defaultMessage="Kids in Household"
            />
          </h6>
          <div className={styles.incomeButtons}>
            {['Kids', 'No Kids'].map((val, idx) => (
              <FilterButton
                value={idx}
                key={idx}
                values={this.state.filters.kids}
                name="kids"
                onChange={this.onChangeFilter}
              >
                {val}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h6 className="pl-3 mt-3 pb-1 text-left">
            <FormattedMessage
              id="filter_bar.interest_level"
              defaultMessage="Interest Level"
            />
          </h6>
          <div className={styles.interestButtons}>
            {[0, 1, 2, 3, 4].map(num => (
              <FilterButton
                value={num}
                key={num}
                values={this.state.filters.interest}
                name="interest"
                onChange={this.onChangeFilter}
              >
                <FormattedNumber
                  value={num + 1}
                />
              </FilterButton>
            ))}
          </div>
          <div className={styles.interestContainer}>
            <div className={styles.notInterested}>
              <FormattedMessage
                id="filter_bar.not_interested"
                defaultMessage="Not Interested"
              />
            </div>
            <div className={styles.veryInterested}>
              <FormattedMessage
                id="filter_bar.interested"
                defaultMessage="Very Interested"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 text-center mt-3">
          <SaveFilter onSave={this.onSaveFilter} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const filter = state.filters.filter
  const options = state.filters.options

  return { ...state, filter, options }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...filterActions }, dispatch)
}

FilterBar.propTypes = propTypes
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(injectIntl(FilterBar))
