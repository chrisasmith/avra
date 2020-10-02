import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import domToImage from 'dom-to-image'
import format from 'string-format'
import { FormattedMessage } from 'react-intl'
import styles from './styles/DashboardModule.scss'
import GraphCompare from './Graph/GraphCompare'
import ChartGraph from './Graph/ChartGraph'
import { getNumberLevel, formatNumberByLevel } from '../../services/utils'
import DashboardShellModule from './DashboardShellModule'

export const MODULE_TYPE = {
  PERCENT: 'PERCENT',
  COUNT: 'COUNT',
  STRING: 'STRING',
}

const MAX_NUMBER_OF_VALUES = 4

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  propertyTitle: PropTypes.string,
  benchmarkTitle: PropTypes.string,
  sideTitle: PropTypes.string,
  chart: PropTypes.bool,
  showTotal: PropTypes.bool,
  data: PropTypes.object,
}

class DashboardGraphModule extends Component {
  constructor(props, context) {
    super(props, context)

    this.graph = React.createRef()

    this.onDownloadImage = this.onDownloadImage.bind(this)
    this.onDownloadCSV = this.onDownloadCSV.bind(this)
    this.onExpandClick = this.onExpandClick.bind(this)

    this.state = {
      expanded: false,
    }
  }

  onDownloadImage() {
    const { title } = this.props

    domToImage.toJpeg(this.graph.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${title}.jpeg`
        link.href = dataUrl
        link.click()
      })
  }

  onDownloadCSV() {
    const { title, data, propertyTitle, benchmarkTitle } = this.props

    const csvContent = data.values.reduce((p, c) => {
      const row = c.values.join(',')
      p += `${c.title},${row},\r\n`
      return p
    }, `data:text/csv;charset=utf-8,,${propertyTitle},${benchmarkTitle},\r\n`)

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${title}.csv`)
    document.body.appendChild(link)

    link.click()
  }

  onExpandClick(e) {
    if (e) e.preventDefault()

    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {
      title,
      chart,
      sideTitle,
      description,
      isFetching,
      type,
      propertyTitle,
      benchmarkTitle,
      showTotal,
      data,
    } = this.props


    if (!data || isFetching) {
      return (
        <DashboardShellModule isFetching title={title} />
      )
    }

    const { expanded } = this.state

    const values = data.values.sort((a, b) => b.values[0] - a.values[0])
    const keyDescription = data.key
    const total = data.total

    let max = values.reduce((p, c) => {
      const valueMax = c.values.reduce((pp, cc) => pp > cc ? pp : cc, 0)
      return p > valueMax ? p : valueMax
    }, 0)

    // find our levels
    const level = getNumberLevel(max)
    max = formatNumberByLevel(max, level)

    const decimals = type === MODULE_TYPE.PERCENT ? 0 : 2

    // parse all the values using the levels
    const parsedValues = values.filter((v, i) => expanded ? true : i < MAX_NUMBER_OF_VALUES).map(val => (
      {
        ...val,
        values: val.values.map(v => formatNumberByLevel(v, level, decimals).toFixed(decimals)),
      }
    ))

    // parse total
    const totalLevel = getNumberLevel(total || 0)

    return (
      <DashboardShellModule
        isFetching={isFetching}
        title={title}
        onDownloadCSV={this.onDownloadCSV}
        onDownloadImage={this.onDownloadImage}
      >
        <div>
          {showTotal && (
            <div className={classnames('p-3 text-center ', styles.totalContainer)} ref={this.graph}>
              <div className="pb-3">
                <FormattedMessage
                  id="dashboard_graph.total"
                  defaultMessage="Total"
                />
              </div>
              <h1>{formatNumberByLevel(total || 0, totalLevel, 1)}</h1>
              <div><em>{totalLevel.single}</em></div>
            </div>
          )}
          <div className={classnames(styles.graphWrapper)}>
            <div className={classnames('p-3', styles.graphContainer)} ref={this.graph}>
              {description && (
                <div className="text-center pb-3">
                  {description}
                </div>
              )}
              <div className={styles.graphHolder}>
                {sideTitle && (
                  <div className={styles.rotatedTitle}>
                    <div className={styles.centered}>
                      <em>{sideTitle}</em>
                    </div>
                  </div>
                )}
                <div>
                  {chart ? (
                    <ChartGraph
                      percent={type === MODULE_TYPE.PERCENT}
                      source={propertyTitle}
                      labels={parsedValues.map(v => v.title)}
                      values={parsedValues.reduce((p, c) => [...p, c.values[0]], [])}
                      compareValues={parsedValues.reduce((p, c) => [...p, c.values[1]], [])}
                    />
                  ) : (
                    <div>
                      {parsedValues.map((graph, idx) => (
                        <GraphCompare
                          key={idx}
                          title={graph.title}
                          values={graph.values}
                          type={type}
                          maxValue={max}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {keyDescription && (
                <div className="p-3 text-center">
                  <em>{format(keyDescription, level.plural)}</em>
                </div>
              )}
              {propertyTitle && (
                <div className={styles.keys}>
                  <div>
                    <div className={styles.valueKey} />
                    <div>{propertyTitle}</div>
                  </div>
                  <div>
                    <div className={styles.benchKey} />
                    <div>{benchmarkTitle || 'Benchmark'}</div>
                  </div>
                </div>
              )}
            </div>
            {values.length > MAX_NUMBER_OF_VALUES && (
              <div className={styles.seeMoreLink}>
                <a href="#" onClick={this.onExpandClick}>{!expanded
                  ?
                  <FormattedMessage
                    id="dashboard_graph.see_more"
                    defaultMessage="See More Results"
                  />
                  : <FormattedMessage
                    id="dashboard_graph.see_less"
                    defaultMessage="See Less Results"
                  />
                }</a>
              </div>
            )}
          </div>
        </div>
      </DashboardShellModule>
    )
  }
}

DashboardGraphModule.propTypes = propTypes
export default DashboardGraphModule
