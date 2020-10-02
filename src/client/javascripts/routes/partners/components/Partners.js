import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Partners extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        Partners Page
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

// Partners.propTypes = propTypes
export default connect(mapStateToProps, mapDispatchToProps)(Partners)
