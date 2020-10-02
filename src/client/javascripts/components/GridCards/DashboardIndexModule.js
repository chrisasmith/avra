import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import domToImage from 'dom-to-image'
import styles from './styles/DashboardModule.scss'
import IndexGraph from './Graph/IndexGraph'
import DashboardShellModule from './DashboardShellModule'

const MAX_NUMBER_OF_VALUES = 4

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  scarborough: PropTypes.bool,
}

class DashboardIndexModule extends Component {
  constructor(props, context) {
    super(props, context)

    this.graph = React.createRef()

    this.onDownloadImage = this.onDownloadImage.bind(this)
    this.onDownloadCSV = this.onDownloadCSV.bind(this)
    this.onExpandClick = this.onExpandClick.bind(this)
    this.onChangeType = this.onChangeType.bind(this)

    this.state = {
      expanded: false,
      type: props.data && Array.isArray(props.data) ? props.data[0].id : null,
      isDropdownData: Array.isArray(props.data),
    }
  }

  componentWillReceiveProps(next) {
    if (next.data && !this.props.data && Array.isArray(next.data)) {
      this.setState({ type: next.data[0].id, isDropdownData: true })
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
    const { title, data } = this.props
    const { type, isDropdownData } = this.state

    const dataForType = isDropdownData ? data.find(d => d.id === type) : data

    const colATitle = ''
    const colBTitle = dataForType.name || ''

    const csvContent = dataForType.values.reduce((p, c) => {
      p += `${c.title},${c.value}`
      if (c.tooltip) {
        p += `,${c.tooltip}`
      }
      p += '\r\n'
      return p
    }, `data:text/csv;charset=utf-8,${colATitle},${colBTitle}\r\n`)

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

  onChangeType(e) {
    this.setState({ type: e.target.value })
  }

  render() {
    const {
      title,
      description,
      isFetching,
      data,
      scarborough,
    } = this.props

    const { isDropdownData, type } = this.state

    if (!data || isFetching) {
      return (
        <DashboardShellModule isFetching title={title} />
      )
    }

    const dataForType = isDropdownData ? data.find(d => d.id === type) : data

    const { expanded } = this.state

    // sort them
    const values = dataForType.values.sort((a, b) => b.value - a.value)

    // find the highest value
    const max = values.reduce((p, c) => p > c.value ? p : c.value, 0)

    // only show the top values
    const parsedValues = values.filter((v, i) => expanded ? true : i < MAX_NUMBER_OF_VALUES)

    // find the max and position of 1
    const chartMax = max <= 2 ? 2 : max
    const midWay = 100 / chartMax

    return (
      <DashboardShellModule
        isFetching={isFetching}
        title={title}
        onDownloadCSV={this.onDownloadCSV}
        onDownloadImage={this.onDownloadImage}
      >
        <div>
          <div className={classnames(styles.graphWrapper)}>
            <div className={classnames('p-3', styles.graphContainer)} ref={this.graph}>
              {description && (
                <div className="text-center pb-3">
                  {description}
                </div>
              )}
              {isDropdownData && (
                <div className={styles.dropdown}>
                  <select className="form-control" onChange={this.onChangeType} value={type}>
                    {data.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className={styles.graphHolder}>
                <div>
                  <div>
                    {parsedValues.map((graph, idx) => (
                      <IndexGraph
                        key={idx}
                        title={graph.title}
                        tooltip={graph.tooltip}
                        value={graph.value}
                        maxValue={chartMax}
                      />
                    ))}
                  </div>
                  <div className={styles.line}>
                    <div className={styles.indicatorLine} style={{ left: `${midWay}%` }} />
                    <div className={styles.indicatorNumber} style={{ left: `${midWay}%` }}>1</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {scarborough && (
                <div className={styles.source}>Source: Scarborough Research</div>
              )}
              {values.length > MAX_NUMBER_OF_VALUES && (
              <div className={styles.seeMoreLink}>
                <a href="#" onClick={this.onExpandClick}>{!expanded ? 'See More Results' : 'See Less Results'}</a>
              </div>
              )}
            </div>
          </div>
        </div>
      </DashboardShellModule>
    )
  }
}

DashboardIndexModule.propTypes = propTypes
export default DashboardIndexModule
