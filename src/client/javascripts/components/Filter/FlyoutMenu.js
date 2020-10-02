import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import styles from './styles/FlyoutMenu.scss'

const propTypes = {
  options: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
}

class FlyoutMenu extends Component {
  constructor(props, context) {
    super(props, context)

    this.onSelectItem = this.onSelectItem.bind(this)
    this.onGlobalClick = this.onGlobalClick.bind(this)
    this.self = React.createRef()

    this.state = {
      page: 0,
      items: [
        [...props.options],
        [],
        [],
      ],
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.onGlobalClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onGlobalClick, false)
  }

  onGlobalClick(e) {
    // bail if this is a detached element
    // this can happen if we removed the element we clicked on, generally
    // that means we didn't click outside the popup
    if (!document.body.contains(e.target)) {
      return
    }

    // check to see if we contain this click
    const domElement = this.self.current
    if (domElement && !domElement.contains(e.target)) {
      this.props.onItemSelected()
    }
  }


  onSelectItem(item) {
    if (item.children) {
      const page = this.state.page + 1
      const items = [...this.state.items]
      items[page] = [...item.children]

      this.setState({ items, page })
    } else {
      this.props.onItemSelected(item)
    }
  }

  render() {
    return (
      <div className={styles.flyout} ref={this.self}>
        {[0, 1, 2].map(page => (
          <CSSTransition
            key={page}
            in={this.state.page === page}
            timeout={300}
            classNames={{
              enter: styles.pageEnter,
              enterActive: styles.pageEnterActive,
              exit: styles.pageExit,
              exitActive: styles.pageExitActive,
            }}
            unmountOnExit
          >
            <div onClick={this.onPageClick} className={styles.page}>
              {this.state.items[page].map(item => (
                <div key={item.id}>
                  <div
                    onClick={() => this.onSelectItem(item)}
                    className={classnames('pt-2 pb-2', styles.item)}
                  >
                    {item.name}
                    {item.children && (
                      <i className={classnames('fa fa-chevron-right', styles.next)} />
                    )}
                  </div>
                  <div className={classnames({ [styles.top]: item.isGroup })} />
                </div>
              ))}
            </div>
          </CSSTransition>
        ))}
      </div>
    )
  }
}

FlyoutMenu.propTypes = propTypes
export default FlyoutMenu
