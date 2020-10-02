import React from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'

const propTypes = {
  source: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  compareValues: PropTypes.array.isRequired,
  percent: PropTypes.bool,
}

const ChartGraph = ({ source, labels, values, compareValues, percent }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: {
      type: 'category',
      data: labels.reverse(),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 10,
        fontFamily: 'Raleway',
      },
    },
    grid: {
      left: 110,
      top: 0,
      right: 40,
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },

    series: [{
      name: source,
      data: values.reverse(),
      itemStyle: { color: '#5071dc' },
      type: 'bar',
      barGap: 0,
      label: {
        show: true,
        position: 'right',
        color: '#333645',
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        fontSize: 15,
        formatter: percent ? '{c}%' : '{c}',
      },
    }, {
      name: 'Benchmark',
      data: compareValues.reverse(),
      itemStyle: { color: '#d3dcf6' },
      type: 'bar',
      label: {
        show: true,
        position: 'right',
        color: '#333645',
        fontFamily: 'Raleway',
        fontSize: 15,
        formatter: percent ? '{c}%' : '{c}',
      },
    }],
  }

  const height = 48 * labels.length

  return (
    <div>
      <ReactEcharts option={options} style={{ height }} />
    </div>
  )
}

ChartGraph.propTypes = propTypes
export default ChartGraph
